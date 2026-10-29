import { useState } from 'react';
import { House, KeyRound, Copy, Mail } from 'lucide-react';
import { siteConfig } from '@/site-config';
const landlord=['Property town or postcode','Property type and bedrooms','Availability','Service of interest'];
const tenant=['Preferred area','Monthly budget','Bedrooms','Move-in date'];
export function EmailEnquiries(){
 const [copied,setCopied]=useState('');
 async function copy(){try{await navigator.clipboard.writeText(siteConfig.email);setCopied('Email address copied.');}catch{setCopied(`Please copy the address: ${siteConfig.email}`);}}
 return <section className="section container-wide"><div className="email-enquiry-grid">{[{id:'landlord',title:'I own a property',Icon:House,fields:landlord,subject:'Landlord property enquiry'},{id:'tenant',title:'I’m looking for a home',Icon:KeyRound,fields:tenant,subject:'Tenant home enquiry'}].map(({id,title,Icon,fields,subject})=><article className="email-enquiry-card" id={id} key={id}><Icon aria-hidden="true"/><h2 className="display">{title}</h2><p>Include these details so we can understand what you need:</p><ul>{fields.map(field=><li key={field}>{field}</li>)}</ul><a className="btn btn-gold" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fields.map(field=>`${field}: `).join('\n'))}`}><Mail size={18} aria-hidden="true"/>Email your enquiry</a><small>Opens your email application. Review your message and send it from there.</small></article>)}</div><div className="email-copy"><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><button className="btn btn-outline-navy" onClick={copy}><Copy size={17} aria-hidden="true"/>Copy email address</button><span role="status">{copied}</span></div><p>We’ll respond by email to discuss your requirements. Please avoid sending identity documents, bank details or sensitive information with an initial enquiry.</p></section>;
}
