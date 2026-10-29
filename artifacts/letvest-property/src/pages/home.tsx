import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Menu, ShieldCheck, KeyRound, MessageSquare, X } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { siteConfig, pageHref } from '@/site-config';
import { HowItWorks } from '@/components/how-it-works';
import { ComparisonTable } from '@/components/comparison-table';
import { HomeFaqs } from '@/components/home-faqs';
import { CaseStudies } from '@/components/case-studies';
import { Benefits, Included, destination } from '@/components/service-features';
import { Reviews } from '@/components/reviews';
import { TrustBadges } from '@/components/trust-badges';
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
function AppraisalLink() { return <a className="btn btn-gold" href={destination('contact')}>Request My Free Property Appraisal <ArrowRight size={17} aria-hidden="true" /></a>; }
export function SiteFooter() {
  const reg = siteConfig.registrations;
  return <footer className="site-footer"><div className="container-wide footer-grid">
    <div className="footer-brand"><img src={asset('letvest-logo-sm.png')} alt={siteConfig.companyName} width="600" height="400" /><p>Letting and property management in West Sussex. Clear arrangements, considered property care.</p></div>
    <div><h4>Explore</h4><ul><li><a href={`${import.meta.env.BASE_URL}#services`}>Explore Rent to Rent</a></li><li><a href={destination("about")}>About us</a></li><li><a href={pageHref('professional-standards')}>Professional Standards</a></li><li><a href={pageHref('privacy')}>Privacy notice</a></li><li><a href={pageHref('complaints')}>Complaints procedure</a></li></ul></div>
    <div><h4>Contact</h4><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p>{siteConfig.baseTown}</p></div>
  </div>
  <div className="container-wide footer-standards"><TrustBadges compact /><a className="text-link" href={destination('about')}>Our approach and professional standards →</a></div>
  <div className="container-wide footer-legal"><span>© {new Date().getFullYear()} {siteConfig.companyName}</span><span>{[reg.companyNumber && `Company number: ${reg.companyNumber}`, reg.registeredOffice, reg.icoNumber && reg.icoVerified && `ICO: ${reg.icoNumber}`, reg.clientMoneyProtection].filter(Boolean).join(' · ')}</span></div></footer>;
}
export default function Home() {
  const [, setVideoPaused] = useState(false); const heroRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { const video = heroRef.current; if (!video) return; video.defaultPlaybackRate = .5; video.playbackRate = .5; const preference = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => { if (preference.matches) { video.pause(); setVideoPaused(true); } else void video.play().then(() => setVideoPaused(false)).catch(() => setVideoPaused(true)); }; update(); preference.addEventListener('change', update); return () => preference.removeEventListener('change', update); }, []);
  const groups = siteConfig.occupants.filter(group => group.approved);
  return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader />
    <main id="main-content">
      <section className="hero" id="top"><div className="hero-media" aria-hidden="true"><video ref={heroRef} poster={asset("images/home-hero-poster.jpg")} muted loop playsInline preload="metadata" tabIndex={-1}><source src={asset('hero-house-fronts.mp4')} type="video/mp4" /></video></div><div className="container-wide hero-inner"><div className="hero-copy"><span className="eyebrow">West Sussex Property Management</span><h1 className="display">Guaranteed rent.<em>A simpler, stress-free way to let.</em></h1><p className="hero-lead">Guaranteed monthly rental income and agreed utility cover for West Sussex landlords. We lease your property, house vetted working professionals and NHS staff, and take care of day-to-day management — giving you zero void periods and complete peace of mind.</p><div className="hero-actions"><a className="btn btn-gold" href={destination('contact')}>Request Free Property Appraisal <ArrowRight size={17} aria-hidden="true" /></a><a className="btn btn-outline-navy" href="#services">How Rent to Rent Works</a></div></div></div></section>
      <div className="brand-banner"><div className="container-wide"><h2>Guaranteed rent. Bills covered.<br />Total peace of mind.</h2><p>Our Rent to Rent service provides agreed contractual rental income and covers the utilities specified in your agreement. A hands-off, trusted partnership with local West Sussex property specialists.</p></div></div>
      <section className="section services" id="services"><div className="container-wide"><div className="section-head"><span className="eyebrow">Rent to Rent</span><h2 className="display">Your property.<em>A simpler rental arrangement.</em></h2><p>Agreed rental income, utilities covered as specified in your contract and day-to-day room management.</p></div><div className="service-grid">
        <article className="service-card"><div className="service-media"><img src={asset('images/english-brick-homes.jpg')} alt="Traditional English red-brick house with a front garden" width="960" height="600" loading="lazy" /></div><div className="service-body"><span className="service-card-icon"><ShieldCheck size={30} strokeWidth={1.7} aria-hidden="true" /></span><h3 className="display">Rent to Rent</h3><p>We offer to lease your property for an agreed contractual period and pay you the agreed rent. Enjoy a more hands-off arrangement, with protection from void periods and occupant non-payment subject to your contract.</p><ul><li><Check size={18} /> Guaranteed rent under the agreed contract</li><li><Check size={18} /> Utilities and bills covered as agreed</li><li><Check size={18} /> Clear terms, responsibilities and exclusions</li></ul><a href={destination('rent-to-rent')} className="btn btn-outline-navy">Explore Rent to Rent</a></div></article>
      </div></div></section>
      <HowItWorks />
      <ComparisonTable />
      <Benefits />
      <section className="section occupants-section" id="occupants"><div className="container-wide"><div className="section-head"><span className="eyebrow">A home with an agreed purpose</span><h2 className="display">Who will occupy<em>your property?</em></h2><p>We provide rooms for working professionals and NHS/key workers. Suitability depends on screening, affordability and the agreed use. We do not provide family accommodation.</p></div><div className="occupant-grid">{groups.map(group => <article className="care-card" key={group.name}><h3>{group.name}</h3><p>{group.description}</p></article>)}</div><div className="editorial-note"><h3>Screening and property use</h3><p>{siteConfig.screening}</p><p>Ask for the proposed occupant profile, occupancy limits and permitted use in writing. Our service is for room accommodation, with the occupancy and use agreed in writing.</p></div><AppraisalLink /></div></section>
      <Included />
      <section className="section local" id="local"><div className="container-wide local-editorial"><span className="eyebrow">West Sussex</span><h2 className="display">Start with the property.<em>Understand the local fit.</em></h2><p>Location, condition, access and the type of home all affect its suitability. Tell us about your West Sussex property so we can discuss the service and occupant profile that may fit.</p><p>From coastal neighbourhoods to inland communities, start with a conversation about your home and what you need from letting it.</p></div></section>
      <CaseStudies />
      <Reviews />
      <HomeFaqs />
      <section className="section home-contact-section" aria-labelledby="home-contact-heading"><div className="container-wide"><div className="home-contact-panel"><span className="contact-panel-icon"><MessageSquare size={28} strokeWidth={1.7} aria-hidden="true" /></span><div><span className="eyebrow">Start a conversation</span><h2 id="home-contact-heading" className="display">Let’s talk about your property.</h2><p>Tell us about your property and what you’re looking for. We’ll help you explore the right arrangement, with clear advice on the next step.</p></div><a className="btn btn-gold" href={destination('contact')}>Contact us <ArrowRight size={18} aria-hidden="true" /></a></div></div></section>
    </main><SiteFooter /></div>;
}
