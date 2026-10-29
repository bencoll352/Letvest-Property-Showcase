import { useEffect } from 'react';
import Home from '@/pages/home';
import ServicePage from '@/pages/service-page';
import InformationPage from '@/pages/information';
import { ErrorBoundary } from '@/components/error-boundary';
export default function App() {
 const view=new URLSearchParams(window.location.search).get('view');
 const kind=view==='privacy'?'privacy':view==='professional-standards'?'professional-standards':view==='complaints'?'complaints':null;
 useEffect(()=>{if(view&&['rent-to-rent','lettings','about','industry-news','contact'].includes(view))return;document.title=kind==='privacy'?'Enquiry Privacy Notice | JM LetVest Ltd':kind==='complaints'?'Complaints Procedure | JM LetVest Ltd':kind?'Professional Standards | JM LetVest Ltd':'JM LetVest Ltd | Letting in West Sussex';const canonical=document.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(canonical&&kind) canonical.href=`${canonical.href.split('?')[0]}?view=${kind}`;},[kind,view]);
 return <ErrorBoundary>{kind?<InformationPage kind={kind}/>:view&&['rent-to-rent','lettings','about','industry-news','contact'].includes(view)?<ServicePage view={view}/>:<Home />}</ErrorBoundary>;
}
