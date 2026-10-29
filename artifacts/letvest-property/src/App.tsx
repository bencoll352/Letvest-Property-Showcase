import { PageMetadata } from '@/components/page-metadata';
import { Chatbot } from '@/components/chatbot';
import Home from '@/pages/home';
import ServicePage from '@/pages/service-page';
import InformationPage from '@/pages/information';
import { ErrorBoundary } from '@/components/error-boundary';
export default function App() {
 const view=new URLSearchParams(window.location.search).get('view') === 'lettings' ? 'rent-to-rent' : new URLSearchParams(window.location.search).get('view');
 const kind=view==='privacy'?'privacy':view==='professional-standards'?'professional-standards':view==='complaints'?'complaints':null;
 return <ErrorBoundary>{kind?<InformationPage kind={kind}/>:view&&['rent-to-rent','lettings','about','industry-news','contact'].includes(view)?<ServicePage view={view}/>:<Home />}<PageMetadata/><Chatbot/></ErrorBoundary>;
}
