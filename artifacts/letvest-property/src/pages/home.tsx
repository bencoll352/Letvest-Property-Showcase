import { type FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  CalendarCheck,
  Check,
  FileCheck2,
  Flame,
  Home as HomeIcon,
  KeyRound,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plus,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { siteConfig } from '@/site-config';

const BASE = import.meta.env.BASE_URL;
const asset = (path: string) => `${BASE}${path.replace(/^\//, '')}`;
const telHref = `tel:${siteConfig.phone.replace(/\s+/g, '')}`;

/** Adds `.is-visible` to `.reveal` elements as they scroll into view. */
function useScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#peace-of-mind', label: 'Peace of mind' },
  { href: '#local', label: 'Local knowledge' },
  { href: '#process', label: 'How it works' },
  { href: '#faq', label: 'FAQs' },
];

const reassurances = [
  {
    worry: 'The 2am boiler breakdown',
    answer: 'Tenants and guests call us, not you. Our vetted local trades are dispatched fast and you get a simple update.',
    icon: Wrench,
  },
  {
    worry: 'Empty months & late rent',
    answer: 'Thorough referencing, proactive rent chasing — or a fixed monthly rent with our rent-to-rent option.',
    icon: Wallet,
  },
  {
    worry: 'Ever-changing legislation',
    answer: 'Gas, electrical, EPC, deposits, Right to Rent and the Renters’ Rights Act — tracked, scheduled and documented.',
    icon: ShieldCheck,
  },
  {
    worry: 'Guest turnover & reviews',
    answer: 'Hotel-standard cleans, fresh linen and fast guest replies that protect your ratings and your property.',
    icon: Sparkles,
  },
];

const services = [
  {
    id: 'letting',
    tag: 'Fully managed letting',
    title: 'Hands-free, long-term letting',
    image: 'images/modern-apartment.jpg',
    fallback: 'letvest-home.jpg',
    text: 'The complete tenancy journey handled for you — from marketing and referencing to rent collection, inspections and repairs.',
    features: [
      'Professional photos, listings & viewings',
      'Full tenant referencing & Right to Rent checks',
      'Deposit registration & tenancy paperwork',
      'Rent collection & monthly statements',
      'Routine inspections & maintenance',
    ],
    bestFor: 'Owners who want a reliable, compliant tenancy with zero day-to-day effort.',
    cta: 'Get a rental valuation',
  },
  {
    id: 'rent-to-rent',
    tag: 'Rent-to-rent · Guaranteed rent',
    title: 'A fixed rent, every single month',
    image: 'letvest-home.jpg',
    fallback: 'letvest-home.jpg',
    text: 'We lease your property on a company let and pay you an agreed rent for the full term — whether it is occupied or not.',
    features: [
      'Agreed monthly rent, paid on time',
      'No void periods or letting fees',
      'Day-to-day maintenance managed by us',
      'Property returned in good condition',
      'Typical terms of 3–5 years',
    ],
    bestFor: 'Landlords who value predictable income and complete hands-off ownership.',
    cta: 'Ask about guaranteed rent',
    featured: true,
  },
  {
    id: 'airbnb',
    tag: 'Airbnb & holiday lets',
    title: 'Short lets, expertly hosted',
    image: 'images/south-downs-cottage.jpg',
    fallback: 'letvest-home.jpg',
    text: 'Maximise the potential of your coastal or countryside home with full-service short-let management across Airbnb, Booking.com and more.',
    features: [
      'Listing creation & professional styling',
      'Dynamic pricing for Goodwood & peak seasons',
      '24/7 guest communication & check-in',
      'Cleaning, linen & changeovers',
      'Owner calendar for your own stays',
    ],
    bestFor: 'Coastal, South Downs and Gatwick-area homes with strong visitor demand.',
    cta: 'Get a short-let estimate',
  },
];

const comparison = [
  { label: 'Your involvement', values: ['Minimal', 'None', 'Minimal'] },
  { label: 'Income', values: ['Market rent, less fees', 'Fixed agreed rent', 'Variable, often highest'] },
  { label: 'Void risk', values: ['Low — minimised', 'Carried by Letvest', 'Seasonal'] },
  { label: 'Typical term', values: ['6–12 month tenancies', '3–5 year agreement', 'Flexible'] },
  { label: 'Use it yourself?', values: ['No', 'No', 'Yes — block dates'] },
];

const areas = [
  {
    name: 'Chichester & The Witterings',
    headline: 'Festival city meets the coast',
    detail:
      'Goodwood’s Festival of Speed, Revival and Glorious Goodwood, plus West Wittering beach and Chichester Harbour, drive premium short-let demand. In the city, professionals and university staff keep long lets in steady demand.',
    bestFit: 'Airbnb & holiday lets · Managed letting',
    image: 'images/south-downs-cottage.jpg',
  },
  {
    name: 'Worthing & Shoreham',
    headline: 'Coastal living, Brighton on the doorstep',
    detail:
      'Regency seafront flats and family homes attract commuters priced out of Brighton & Hove. Strong year-round tenant demand with a growing summer visitor market along the promenade.',
    bestFit: 'Managed letting · Rent-to-rent',
    image: 'images/sussex-coast.jpg',
  },
  {
    name: 'Crawley & Gatwick',
    headline: 'Airport, business and contractor demand',
    detail:
      'Gatwick, Manor Royal business district and major infrastructure projects bring a constant flow of airline crew, contractors and relocating professionals needing quality, flexible accommodation.',
    bestFit: 'Rent-to-rent · Serviced stays',
    image: 'images/modern-apartment.jpg',
  },
  {
    name: 'Horsham & Mid Sussex',
    headline: 'Family homes and London commuters',
    detail:
      'Horsham, Haywards Heath, Burgess Hill and East Grinstead offer fast rail links to London and excellent schools — ideal for long, stable tenancies with quality tenants.',
    bestFit: 'Fully managed letting',
    image: 'letvest-home.jpg',
  },
  {
    name: 'Arundel & the South Downs',
    headline: 'Castles, countryside and cottages',
    detail:
      'Arundel, Midhurst and Petworth sit within the South Downs National Park — walkers, weddings and weekend-breakers make characterful cottages highly bookable.',
    bestFit: 'Airbnb & holiday lets',
    image: 'images/south-downs-cottage.jpg',
  },
  {
    name: 'Bognor Regis & Littlehampton',
    headline: 'Seaside towns on the rise',
    detail:
      'Regeneration, sandy beaches and attractive yields make these resort towns a smart choice for both family holiday lets and well-priced long-term rentals.',
    bestFit: 'Holiday lets · Rent-to-rent',
    image: 'images/sussex-coast.jpg',
  },
];

const towns = [
  'Chichester', 'Worthing', 'Crawley', 'Horsham', 'Bognor Regis', 'Littlehampton',
  'Shoreham-by-Sea', 'Arundel', 'Haywards Heath', 'Burgess Hill', 'East Grinstead',
  'Midhurst', 'Petworth', 'Selsey', 'The Witterings', 'Steyning', 'Lancing', 'Pulborough',
];

const compliance = [
  { icon: Flame, title: 'Gas Safety', text: 'Annual CP12 certificates booked and filed.' },
  { icon: Zap, title: 'Electrical (EICR)', text: '5-yearly inspections and remedial works.' },
  { icon: FileCheck2, title: 'EPC & MEES', text: 'Energy ratings checked against minimum standards.' },
  { icon: KeyRound, title: 'Deposit protection', text: 'Registered in a government-approved scheme.' },
  { icon: BadgeCheck, title: 'Right to Rent', text: 'Every adult occupier verified and recorded.' },
  { icon: BellRing, title: 'Smoke & CO alarms', text: 'Tested at the start of every tenancy.' },
  { icon: HomeIcon, title: 'HMO & licensing', text: 'Local council licensing requirements handled.' },
  { icon: ShieldCheck, title: 'Renters’ Rights Act', text: 'Processes updated for the new tenancy rules.' },
];

const steps = [
  { title: 'Free appraisal', text: 'We visit your property and give honest local advice on rent, demand and the best model for you.' },
  { title: 'Tailored proposal', text: 'A clear written proposal — fees, rent, responsibilities and terms — with no hidden extras.' },
  { title: 'Ready to let', text: 'We handle compliance, photography, styling and listings, then find the right tenants or guests.' },
  { title: 'Relax', text: 'Monthly statements, regular updates and a local team you can reach whenever you need us.' },
];

const faqs = [
  {
    q: 'Which areas of West Sussex do you cover?',
    a: 'We manage properties right across West Sussex — from Chichester, the Witterings and Bognor Regis in the west, through Arundel, Littlehampton, Worthing and Shoreham, up to Horsham, Crawley, Haywards Heath and East Grinstead. If you are just over the border, ask anyway.',
  },
  {
    q: 'How does guaranteed rent (rent-to-rent) work?',
    a: 'Letvest leases your property on a company let agreement and pays you a fixed monthly rent for the agreed term, regardless of occupancy. We then manage and let the property ourselves. All payment terms, responsibilities and conditions are set out clearly in your written agreement before you sign.',
  },
  {
    q: 'Is my property suitable for Airbnb?',
    a: 'Coastal, South Downs and Gatwick-area homes often perform very well, but it depends on location, layout, mortgage and lease terms, and local planning. We will give you an honest short-let estimate — and tell you if a long let would serve you better.',
  },
  {
    q: 'Who handles repairs and maintenance?',
    a: 'We do. We use a trusted network of local, insured tradespeople and agree a spending limit with you, so small jobs are fixed quickly and larger works always come to you first.',
  },
  {
    q: 'What does it cost?',
    a: 'Fees depend on the service and your property. Every proposal sets out exactly what is included, what it costs, the contract length and the notice terms — no surprises, ever.',
  },
  {
    q: 'Can I switch from a long let to Airbnb, or vice versa?',
    a: 'Yes. Because we offer all three models, we can recommend a change when the market shifts and manage the transition for you.',
  },
];

function Img({ src, fallback, alt, className }: { src: string; fallback?: string; alt: string; className?: string }) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        if (fallback && !e.currentTarget.dataset.fallback) {
          e.currentTarget.dataset.fallback = '1';
          e.currentTarget.src = asset(fallback);
        }
      }}
    />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeArea, setActiveArea] = useState(0);
  const [sent, setSent] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const sendEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [
      `Name: ${form.get('name')}`,
      `Email: ${form.get('email')}`,
      `Phone: ${form.get('phone') || 'Not provided'}`,
      `Property location: ${form.get('location') || 'Not provided'}`,
      `Interested in: ${form.get('arrangement')}`,
      '',
      `${form.get('message') || ''}`,
    ].join('\n');
    const subject = `Property enquiry – ${form.get('arrangement')}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const legalLines = Object.values(siteConfig.legal).filter(Boolean);
  const area = areas[activeArea];

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>

      <div className="top-bar">
        <div className="container-wide top-bar-inner">
          <span><MapPin size={14} aria-hidden="true" /> Local property experts across West Sussex</span>
          <div className="top-bar-links">
            <a href={telHref}><Phone size={14} aria-hidden="true" /> {siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}><Mail size={14} aria-hidden="true" /> {siteConfig.email}</a>
          </div>
        </div>
      </div>

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container-wide header-inner">
          <a href="#top" aria-label={`${siteConfig.companyName} home`} className="brand">
            <img className="brand-logo" src={asset('letvest-logo-sm.png')} alt={`${siteConfig.companyName} – Rent to Rent and Airbnb Management`} width="600" height="400" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav id="main-nav" className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
            ))}
            <a className="btn btn-gold nav-cta" href="#contact" onClick={closeMenu}>
              Free appraisal <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* HERO */}
        <section id="top" className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src={asset('images/sussex-coast.jpg')} alt="" fetchPriority="high" />
          </div>
          <div className="container-wide hero-inner">
            <div className="hero-copy">
              <span className="eyebrow eyebrow-light">West Sussex Letting &amp; Property Management</span>
              <h1 className="display">
                Your property in expert local hands.
                <em> Your mind at rest.</em>
              </h1>
              <p className="hero-lead">
                Fully managed letting, guaranteed-rent and Airbnb management from a team that lives and works
                in West Sussex — so your investment performs while you get on with life.
              </p>
              <div className="hero-actions">
                <a className="btn btn-gold btn-lg" href="#contact">Book a free appraisal <ArrowRight size={18} /></a>
                <a className="btn btn-ghost btn-lg" href="#services">Explore our services</a>
              </div>
              <ul className="hero-ticks">
                <li><Check size={16} /> Fully compliant</li>
                <li><Check size={16} /> No hidden fees</li>
                <li><Check size={16} /> Local, responsive team</li>
              </ul>
            </div>

            <aside className="hero-card" aria-label="Why landlords choose Letvest">
              <div className="hero-card-stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="hero-card-title">Peace of mind, built in</p>
              <ul>
                <li><ShieldCheck size={18} /> Every certificate tracked &amp; renewed</li>
                <li><Wrench size={18} /> Trusted local tradespeople on call</li>
                <li><CalendarCheck size={18} /> Monthly statements &amp; clear updates</li>
              </ul>
              <a href={telHref} className="hero-card-call"><Phone size={16} /> Speak to a local expert</a>
            </aside>
          </div>
        </section>

        {/* STATS */}
        <section className="stats" aria-label="Letvest at a glance">
          <div className="container-wide stats-grid">
            {siteConfig.stats.map((s) => (
              <div key={s.label} className="stat reveal">
                <span className="stat-value display">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PEACE OF MIND */}
        <section id="peace-of-mind" className="section peace">
          <div className="container-wide peace-grid">
            <div className="peace-intro reveal">
              <span className="eyebrow">Peace of mind</span>
              <h2 className="display">Hand over the hassle.<br /><em>Keep the rewards.</em></h2>
              <p>
                Being a landlord shouldn’t mean late-night calls, chasing rent or worrying about the latest
                regulations. With Letvest, experienced local professionals take care of every detail — and
                you stay informed without being involved.
              </p>
              <div className="peace-image">
                <Img src="letvest-home.jpg" alt="An elegant, well-maintained living room in a managed Sussex home" />
              </div>
            </div>
            <div className="worry-list">
              {reassurances.map(({ worry, answer, icon: Icon }, i) => (
                <article key={worry} className="worry reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="worry-icon"><Icon size={22} aria-hidden="true" /></div>
                  <div>
                    <h3><span className="strike">{worry}</span></h3>
                    <p>{answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section services">
          <div className="container-wide">
            <div className="section-head center reveal">
              <span className="eyebrow">Our services</span>
              <h2 className="display">Three ways to let. <em>One trusted partner.</em></h2>
              <p>Whether you want steady long-term tenants, a fixed monthly income or the higher returns of short lets, we’ll recommend the right route for your property — honestly.</p>
            </div>
            <div className="service-grid">
              {services.map((s, i) => (
                <article key={s.id} className={`service-card reveal${s.featured ? ' featured' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  {s.featured && <span className="ribbon">Most popular</span>}
                  <div className="service-media">
                    <Img src={s.image} fallback={s.fallback} alt="" />
                    <span className="service-tag">{s.tag}</span>
                  </div>
                  <div className="service-body">
                    <h3 className="display">{s.title}</h3>
                    <p>{s.text}</p>
                    <ul>
                      {s.features.map((f) => <li key={f}><Check size={16} aria-hidden="true" /> {f}</li>)}
                    </ul>
                    <p className="best-for"><strong>Best for:</strong> {s.bestFor}</p>
                    <a href="#contact" className={`btn ${s.featured ? 'btn-gold' : 'btn-navy'} btn-block`}>{s.cta} <ArrowRight size={16} /></a>
                  </div>
                </article>
              ))}
            </div>

            <div className="compare reveal">
              <h3 className="display">Not sure which suits you?</h3>
              <div className="compare-scroll">
                <table>
                  <thead>
                    <tr>
                      <th scope="col"><span className="sr-only">Feature</span></th>
                      <th scope="col">Managed letting</th>
                      <th scope="col" className="hl">Guaranteed rent</th>
                      <th scope="col">Airbnb &amp; holiday lets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        {row.values.map((v, i) => <td key={i} className={i === 1 ? 'hl' : undefined}>{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="compare-note">Every arrangement is confirmed in a clear written agreement — rent, fees, responsibilities and exit terms included.</p>
            </div>
          </div>
        </section>

        {/* LOCAL KNOWLEDGE */}
        <section id="local" className="section local">
          <div className="container-wide">
            <div className="local-head reveal">
              <div>
                <span className="eyebrow eyebrow-light">Local knowledge</span>
                <h2 className="display">We know West Sussex <em>street by street.</em></h2>
              </div>
              <p>
                From Goodwood weekends to Gatwick contractors and Horsham commuters, demand varies town to town.
                Our local insight means accurate pricing, faster lets and the right strategy for your postcode.
              </p>
            </div>

            <div className="local-panel reveal">
              <div className="area-tabs" role="tablist" aria-label="West Sussex areas">
                {areas.map((a, i) => (
                  <button
                    key={a.name}
                    role="tab"
                    id={`area-tab-${i}`}
                    aria-selected={activeArea === i}
                    aria-controls="area-panel"
                    className="area-tab"
                    onClick={() => setActiveArea(i)}
                  >
                    <MapPin size={16} aria-hidden="true" /> {a.name}
                  </button>
                ))}
              </div>
              <div className="area-detail" id="area-panel" role="tabpanel" aria-labelledby={`area-tab-${activeArea}`} key={area.name}>
                <div className="area-image">
                  <Img src={area.image} fallback="letvest-home.jpg" alt="" />
                </div>
                <div className="area-copy">
                  <span className="area-kicker">{area.name}</span>
                  <h3 className="display">{area.headline}</h3>
                  <p>{area.detail}</p>
                  <div className="area-fit"><Sparkles size={16} aria-hidden="true" /> <span><strong>Best fit:</strong> {area.bestFit}</span></div>
                </div>
              </div>
            </div>

            <div className="towns reveal">
              <span className="towns-label">Areas we cover</span>
              <ul>
                {towns.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* COMPLIANCE / EXPERIENCE */}
        <section className="section compliance">
          <div className="container-wide">
            <div className="section-head reveal">
              <span className="eyebrow">Experience you can rely on</span>
              <h2 className="display">Fully compliant. <em>Fully covered.</em></h2>
              <p>There are more than 170 laws and regulations affecting landlords in England. We keep track of every one that applies to your property, so you never have to.</p>
            </div>
            <div className="compliance-grid">
              {compliance.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="comp-item reveal" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
                  <Icon size={22} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section process">
          <div className="container-wide">
            <div className="section-head center reveal">
              <span className="eyebrow">How it works</span>
              <h2 className="display">Up and running in <em>four simple steps.</em></h2>
            </div>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title} className="step reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="step-num display">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TESTIMONIALS – only rendered once genuine reviews are added in site-config.ts */}
        {siteConfig.testimonials.length > 0 && (
          <section className="section testimonials">
            <div className="container-wide">
              <div className="section-head center reveal">
                <span className="eyebrow">What our landlords say</span>
                <h2 className="display">Trusted by owners <em>across Sussex.</em></h2>
              </div>
              <div className="testimonial-grid">
                {siteConfig.testimonials.map((t) => (
                  <figure key={t.name} className="testimonial reveal">
                    <Quote size={28} aria-hidden="true" />
                    <blockquote>{t.quote}</blockquote>
                    <figcaption><strong>{t.name}</strong><span>{t.detail}</span></figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="section faq">
          <div className="container-wide faq-grid">
            <div className="section-head reveal">
              <span className="eyebrow">FAQs</span>
              <h2 className="display">Questions landlords <em>ask us.</em></h2>
              <p>Can’t see your question? Call us on <a href={telHref}>{siteConfig.phone}</a> — you’ll speak to someone who knows your area.</p>
            </div>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <div className={`faq-item${openFaq === index ? ' open' : ''}`} key={item.q}>
                  <h3>
                    <button
                      className="faq-trigger"
                      type="button"
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      {item.q}
                      <Plus size={20} aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="faq-answer" id={`faq-answer-${index}`} hidden={openFaq !== index}>
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact">
          <div className="container-wide contact-grid">
            <div className="contact-copy reveal">
              <span className="eyebrow eyebrow-light">Free, no-obligation appraisal</span>
              <h2 className="display">Let’s talk about <em>your property.</em></h2>
              <p>
                Tell us a little about your property and we’ll come back with honest local advice on rental value,
                demand and the best way to let — usually within one working day.
              </p>
              <ul className="contact-points">
                <li><Check size={18} /> Accurate, local rental valuation</li>
                <li><Check size={18} /> Side-by-side comparison of all three options</li>
                <li><Check size={18} /> No pressure, no obligation</li>
              </ul>
              <div className="contact-direct">
                <a href={telHref}><span className="cd-icon"><Phone size={18} /></span><span><small>Call us</small>{siteConfig.phone}</span></a>
                <a href={`mailto:${siteConfig.email}`}><span className="cd-icon"><Mail size={18} /></span><span><small>Email us</small>{siteConfig.email}</span></a>
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={sendEnquiry}>
              <h3 className="display">Request your free appraisal</h3>
              <div className="form-grid">
                <div className="field"><label htmlFor="c-name">Your name</label><input id="c-name" name="name" autoComplete="name" required /></div>
                <div className="field"><label htmlFor="c-phone">Phone</label><input id="c-phone" name="phone" type="tel" autoComplete="tel" /></div>
                <div className="field full"><label htmlFor="c-email">Email address</label><input id="c-email" name="email" type="email" autoComplete="email" required /></div>
                <div className="field"><label htmlFor="c-location">Property town or postcode</label><input id="c-location" name="location" placeholder="e.g. Worthing, BN11" /></div>
                <div className="field">
                  <label htmlFor="c-arrangement">I’m interested in</label>
                  <select id="c-arrangement" name="arrangement" defaultValue="" required>
                    <option value="" disabled>Select an option</option>
                    <option>Fully managed letting</option>
                    <option>Guaranteed rent / rent-to-rent</option>
                    <option>Airbnb / holiday-let management</option>
                    <option>Not sure – advise me</option>
                  </select>
                </div>
                <div className="field full"><label htmlFor="c-message">About your property</label><textarea id="c-message" name="message" placeholder="Bedrooms, current situation, anything you’d like us to know…" /></div>
              </div>
              <button className="btn btn-gold btn-lg btn-block" type="submit">Send my enquiry <ArrowRight size={18} /></button>
              <p className="form-note">
                {sent
                  ? <>Your email app should now open with your enquiry ready to send. Nothing happened? Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or call <a href={telHref}>{siteConfig.phone}</a>.</>
                  : 'Your details are only used to respond to your enquiry.'}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container-wide footer-grid">
          <div className="footer-brand">
            <img src={asset('letvest-logo-sm.png')} alt={siteConfig.companyName} width="600" height="400" />
            <p>{siteConfig.tagline}. Experienced, local and fully compliant property management you can trust.</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Fully managed letting</a></li>
              <li><a href="#services">Guaranteed rent</a></li>
              <li><a href="#services">Airbnb management</a></li>
              <li><a href="#contact">Free appraisal</a></li>
            </ul>
          </div>
          <div>
            <h4>Areas</h4>
            <ul>
              {['Chichester', 'Worthing', 'Crawley', 'Horsham', 'Bognor Regis', 'Arundel'].map((t) => <li key={t}><a href="#local">{t}</a></li>)}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={telHref}>{siteConfig.phone}</a></li>
              <li><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
              <li>{siteConfig.baseTown}</li>
            </ul>
          </div>
        </div>
        <div className="container-wide footer-legal">
          <span>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</span>
          {legalLines.length > 0 && <span>{legalLines.join(' · ')}</span>}
        </div>
      </footer>

      <a className="mobile-call" href={telHref} aria-label={`Call ${siteConfig.companyName}`}><Phone size={20} /></a>
    </div>
  );
}
