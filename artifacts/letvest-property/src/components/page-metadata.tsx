import { useEffect } from 'react';
export const pages:Record<string,[string,string]>={
 home:['Rent to Rent & Lettings in West Sussex','JM LetVest is a family-run West Sussex property business offering Rent to Rent and landlord letting and management support.'],
 'rent-to-rent':['Rent to Rent in West Sussex','Explore contractual rental income, bill coverage and property care with JM LetVest. Request a written rental offer for your West Sussex property.'],
 lettings:['Lettings & Property Management','Discuss tenant finding, referencing and ongoing property management in West Sussex. Ask JM LetVest for the service scope and landlord fee schedule.'],
 about:['About JM LetVest','Meet the approach behind JM LetVest: family-run, rooted in West Sussex and focused on clear communication and practical property support.'],
 contact:['Contact JM LetVest','Email JM LetVest about your West Sussex property or search for a home. Separate landlord and tenant enquiry routes.'],
 'industry-news':['Landlord Guides & Updates','Practical landlord guides covering tenancy reform, property safety, deposits, licensing and energy standards, with links to official sources.'],
 privacy:['Email Enquiry Privacy Notice','How JM LetVest handles email enquiries and how to ask questions about your personal information.'],
 complaints:['Complaints Procedure','How to raise a service concern with JM LetVest and find Property Redress information.'],
 'professional-standards':['Professional Standards','JM LetVest business information, Property Redress membership and guidance on gas safety and data protection.'],
};
export function PageMetadata(){useEffect(()=>{const view=new URLSearchParams(location.search).get('view')||'home';const [label,description]=pages[view]||pages.home;const title=label+' | JM LetVest Ltd';const base=new URL(import.meta.env.BASE_URL,location.origin);const url=new URL(view==='home'?'':`?view=${encodeURIComponent(view)}`,base).href;document.title=title;const set=(selector:string,value:string)=>{const el=document.querySelector<HTMLMetaElement>(selector);if(el)el.content=value;};set('meta[name="description"]',description);set('meta[property="og:title"]',title);set('meta[property="og:description"]',description);set('meta[property="og:url"]',url);set('meta[name="twitter:title"]',title);set('meta[name="twitter:description"]',description);const canonical=document.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(canonical)canonical.href=url;},[]);return null;}
