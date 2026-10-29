import { HeartHandshake, MapPin, MessagesSquare, House } from 'lucide-react';
const asset=(path:string)=>`${import.meta.env.BASE_URL}${path.replace(/^\//,'')}`;
export function FamilyStory(){
 return <div className="story-layout"><figure className="story-image"><img src={asset('letvest-home.jpg')} alt="Residential property exterior" width="960" height="720" loading="lazy" /><figcaption>Property imagery for illustration.</figcaption></figure><div className="story-copy"><span className="eyebrow">Local roots. Personal service.</span><h3 className="display">A family-run business.<br />A local understanding.</h3><p>Born and bred in West Sussex, we bring local knowledge and a personal approach to helping landlords care for their properties.</p><p>Every home and every landlord is different. We take the time to understand your priorities, explain your options and agree the practical details with you.</p><a className="text-link" href={`${import.meta.env.BASE_URL}?view=contact`}>Tell us about your property →</a></div></div>;
}
export function FamilyCommitments(){
 const items=[{Icon:MapPin,title:'Local knowledge',detail:'An understanding of West Sussex and its communities.'},{Icon:HeartHandshake,title:'Personal service',detail:'A family-run approach centred on your priorities.'},{Icon:MessagesSquare,title:'Clear communication',detail:'Straightforward conversations about your property and options.'},{Icon:House,title:'Practical support',detail:'Property care and responsibilities agreed from the outset.'}];
 return <div className="commitment-grid">{items.map(({Icon,title,detail})=><article key={title}><Icon size={24} aria-hidden="true" /><h3>{title}</h3><p>{detail}</p></article>)}</div>;
}
