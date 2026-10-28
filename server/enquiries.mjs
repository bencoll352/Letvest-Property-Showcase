import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
export function createEnquiryHandler({ env = process.env, fetchImpl = fetch, now = Date.now } = {}) {
 const rate = new Map();
 const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(x=>x.trim()).filter(Boolean);
 return async function handler(req,res) {
  const origin=req.headers.origin;const allowedOrigin=origin&&allowed.includes(origin);
  const respond=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store',...(allowedOrigin?{'Access-Control-Allow-Origin':origin,'Vary':'Origin'}:{})});res.end(JSON.stringify(data));};
  if(req.url!=='/api/enquiries')return respond(404,{error:'not-found'});
  if(!allowedOrigin)return respond(403,{error:'origin-not-allowed'});
  if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'});res.end();return;}
  if(req.method!=='POST')return respond(405,{error:'method-not-allowed'});
  if(!env.RESEND_API_KEY||!env.ENQUIRY_FROM||!env.ENQUIRY_TO||!env.TURNSTILE_SECRET_KEY||!env.TURNSTILE_HOSTNAMES||env.PRIVACY_APPROVED!=='true')return respond(503,{error:'submission-unavailable'});
  const current=now(); for(const [key,value] of rate)if(current-value.started>=600000)rate.delete(key);
  const ip=req.socket.remoteAddress||'unknown';const previous=rate.get(ip);if((previous?.count||0)>=5||(!previous&&rate.size>=10000))return respond(429,{error:'too-many-requests'});rate.set(ip,{started:previous?.started||current,count:(previous?.count||0)+1});
  if(!req.headers['content-type']?.startsWith('application/json'))return respond(415,{error:'json-required'});
  let raw='';try { for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>16384)return respond(413,{error:'request-too-large'});} }catch{return respond(400,{error:'invalid-body'});}
  let data;try{data=JSON.parse(raw);}catch{return respond(400,{error:'invalid-json'});}
  if(!data||typeof data!=='object'||Array.isArray(data))return respond(400,{error:'invalid-fields'});
  const valid=(value,min,max)=>typeof value==='string'&&value.trim().length>=min&&value.length<=max;
  if(data.website)return respond(400,{error:'invalid-request'});
  if(!valid(data.name,1,100)||!valid(data.email,3,254)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||/[\r\n]/.test(data.email)||!valid(data.location,1,120)||!valid(data.message,10,4000)||!['Guaranteed Rent','Fully Managed Letting','Not sure yet'].includes(data.service)||data.privacy!=='accepted'||!valid(data.turnstileToken,1,2048)||!valid(data.requestId,36,36)||!/^[0-9a-f-]{36}$/i.test(data.requestId))return respond(400,{error:'invalid-fields'});
  try {
   const verified=await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:data.turnstileToken}),signal:AbortSignal.timeout(10000)});const verification=await verified.json();
   if(!verified.ok||verification.success!==true||verification.action!=='landlord-enquiry'||!env.TURNSTILE_HOSTNAMES.split(',').map(x=>x.trim()).includes(verification.hostname))return respond(400,{error:'security-check-failed'});
   const delivery=await fetchImpl('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`enquiry-${data.requestId}`},body:JSON.stringify({from:env.ENQUIRY_FROM,to:[env.ENQUIRY_TO],reply_to:data.email,subject:'JM LetVest property appraisal enquiry',text:`Name: ${data.name}\nEmail: ${data.email}\nProperty: ${data.location}\nService: ${data.service}\n\n${data.message}`}),signal:AbortSignal.timeout(10000)});const result=await delivery.json();
   if(!delivery.ok||typeof result.id!=='string'||!result.id)return respond(502,{error:'email-not-accepted'});
   return respond(202,{status:'accepted',id:result.id});
  }catch{return respond(502,{error:'submission-not-confirmed'});}
 };
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){createServer(createEnquiryHandler()).listen(Number(process.env.PORT||8787),'127.0.0.1',()=>console.log('Enquiry server listening'));}
