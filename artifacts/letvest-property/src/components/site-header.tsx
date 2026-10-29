import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { destination } from './service-features';
const links=[['rent-to-rent','Rent to Rent'],['lettings','Lettings'],['about','About us'],['industry-news','Landlord Guides & Updates']];
export function SiteHeader(){
 const [open,setOpen]=useState(false);const button=useRef<HTMLButtonElement>(null);const current=new URLSearchParams(location.search).get('view');
 useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==='Escape'&&open){setOpen(false);button.current?.focus();}};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);},[open]);
 return <header className="site-header"><div className="container-wide header-inner"><a className="brand" href={import.meta.env.BASE_URL} aria-label="JM LetVest home"><img className="brand-logo" src={`${import.meta.env.BASE_URL}letvest-logo-sm.png`} alt="JM LetVest Ltd" width="600" height="400"/></a><button ref={button} className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="main-nav" className={`nav-links${open?' open':''}`} aria-label="Main navigation">{links.map(([key,label])=><a key={key} href={destination(key)} aria-current={current===key?'page':undefined} onClick={()=>setOpen(false)}>{label}</a>)}<a className="btn btn-gold nav-cta" aria-current={current==='contact'?'page':undefined} href={destination('contact')}>Contact us</a></nav></div></header>;
}
