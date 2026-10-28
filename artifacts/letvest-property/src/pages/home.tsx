import { type FormEvent, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Building,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  Flame,
  HeartHandshake,
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
  Users,
  Wallet,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { siteConfig } from '@/site-config';
import { Chatbot } from '@/components/chatbot';

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const navLinks = [
  { href: '#guaranteed-rent', label: 'Guaranteed Rent' },
  { href: '#property-care', label: 'Property Care' },
  { href: '#about', label: 'About JM LetVest' },
  { href: '#services', label: 'Services' },
  { href: '#local', label: 'West Sussex Areas' },
  { href: '#faq', label: 'FAQs' },
];

/* Clean, reassuring landlord commitments (NO cross-through or strikethrough lines) */
const reassurances = [
  {
    badge: '24/7 Response',
    title: 'Zero Midnight Emergency Calls',
    answer:
      'Tenants and guests call our Sussex 24/7 helpline, never you. Our trusted, vetted local trades are dispatched promptly with pre-agreed repair limits.',
    icon: Wrench,
  },
  {
    badge: '100% Guaranteed',
    title: 'Zero Void Periods & No Rent Delays',
    answer:
      'With our signature Guaranteed Rent model, your money arrives on the exact same date each month, into your account, whether the home is occupied or vacant.',
    icon: Wallet,
  },
  {
    badge: 'Legal Protection',
    title: 'Total Statutory & Regulatory Compliance',
    answer:
      'Gas Safety (CP12), EICR, EPC, HMO licensing, Right to Rent, and the Renters’ Rights Act are monitored, scheduled, and renewed for you.',
    icon: ShieldCheck,
  },
  {
    badge: 'Pristine Upkeep',
    title: 'Hotel-Grade Housekeeping & Inspections',
    answer:
      'Professional cleans, crisp linens, respectful guest screening, and regular photographic inspections safeguard your property and its capital value.',
    icon: Sparkles,
  },
];

const carePillars = [
  {
    icon: FileCheck2,
    title: 'Photographic Inspections',
    text: 'Scheduled quarterly walk-throughs and changeover reports with timestamped photos sent straight to your email so you always see your property’s condition.',
  },
  {
    icon: Wrench,
    title: 'Vetted Sussex Trades',
    text: 'Longstanding relationships with trusted Gas Safe engineers, NICEIC electricians, and Sussex artisans. Minor repairs handled swiftly with zero agent markups.',
  },
  {
    icon: Sparkles,
    title: 'Spotless Housekeeping',
    text: 'Commercial-standard linen laundering, professional carpet cleaning, and meticulous sanitization before every guest check-in or tenant handover.',
  },
  {
    icon: HeartHandshake,
    title: 'Asset Value Preservation',
    text: 'We treat your property like our own. Preventive maintenance caught early ensures your home is returned at the end of the term in immaculate condition.',
  },
];

const services = [
  {
    id: 'rent-to-rent',
    tag: 'Rent-to-Rent · Core Specialty',
    title: '100% Guaranteed Rent Every Month',
    image: 'letvest-home.jpg',
    fallback: 'letvest-home.jpg',
    text: 'Our headline service: We lease your property on a corporate agreement for 3–5 years and pay your agreed rent on time every single month, with zero voids, zero tenant-chasing, and £0 letting fees.',
    features: [
      'Fixed monthly rent paid into your account',
      'Zero void periods — you get paid even when empty',
      '£0 agency fees and zero tenant-finding commission',
      'Day-to-day maintenance handled by our local team',
      'Property returned freshly maintained and clean',
    ],
    bestFor: 'Landlords who want guaranteed financial returns and total freedom from day-to-day hassles.',
    cta: 'Ask About Guaranteed Rent',
    featured: true,
  },
  {
    id: 'letting',
    tag: 'Long-Term Letting',
    title: 'Fully Managed Tenancies',
    image: 'images/modern-apartment.jpg',
    fallback: 'letvest-home.jpg',
    text: 'A traditional letting journey elevated with boutique Sussex care. We handle professional photography, tenant referencing, tenancy paperwork, rent collection, and regulatory compliance.',
    features: [
      'Comprehensive tenant vetting & Right to Rent checks',
      'Deposit protection in government-backed scheme',
      'Routine photographic property inspections',
      'Coordinated repairs with vetted Sussex trades',
      'Transparent monthly financial statements',
    ],
    bestFor: 'Owners seeking high-calibre long-term tenants with hands-off administrative care.',
    cta: 'Get a Rental Valuation',
  },
];

const comparison = [
  { label: 'Your involvement', values: ['Zero — 100% passive', 'Minimal oversight'] },
  { label: 'Monthly income', values: ['Fixed guaranteed rent on the 1st', 'Market rent less agency fees'] },
  { label: 'Void period risk', values: ['100% absorbed by JM LetVest', 'Borne by landlord'] },
  { label: 'Letting & agent fees', values: ['£0 fees / 0% commission', 'Standard agency % fee'] },
  { label: 'Agreement length', values: ['Flexible 1 to 5 years', '6–12 month AST tenancies'] },
  { label: 'Use home yourself?', values: ['No (commercial lease)', 'No (exclusive tenancy)'] },
];


const compliance = [
  { icon: Flame, title: 'Gas Safety (CP12)', text: 'Annual gas inspections scheduled, certified, and filed on time.' },
  { icon: Zap, title: 'Electrical (EICR)', text: '5-yearly electrical installation checks and certified safety.' },
  { icon: FileCheck2, title: 'EPC & MEES Standards', text: 'Energy performance monitoring against current regulations.' },
  { icon: KeyRound, title: 'Deposit Protection', text: 'Registered in a government-backed custodial scheme.' },
  { icon: BadgeCheck, title: 'Right to Rent Checks', text: 'Rigorous legal status confirmation on every adult occupier.' },
  { icon: BellRing, title: 'Smoke & CO Alarms', text: 'Tested, logged, and compliant before every single move-in.' },
  { icon: HomeIcon, title: 'HMO Licensing', text: 'Council approvals, room sizes, and amenities verified.' },
  { icon: ShieldCheck, title: 'Renters’ Rights Act', text: 'Documentation proactively aligned with updated UK legislation.' },
];

const steps = [
  {
    title: 'Free Property Appraisal',
    text: 'We visit your property or speak on the phone to provide honest Sussex rental valuation advice across both letting routes.',
  },
  {
    title: 'Clear Written Agreement',
    text: 'A straightforward, transparent contract setting out your guaranteed monthly rent, dates, and property care terms.',
  },
  {
    title: 'Compliance & Staging',
    text: 'We complete any required safety certificates, deep clean, and style the home ready for immediate occupancy.',
  },
  {
    title: 'Sit Back & Get Paid',
    text: 'Your rent arrives guaranteed on the exact agreed date each month, while our local Sussex team cares for everything.',
  },
];

const faqs = [
  {
    q: 'How does Guaranteed Rent with JM LetVest work?',
    a: 'Under our Guaranteed Rent (Rent-to-Rent) service, JM LetVest Ltd acts as your commercial tenant on a 3 to 5 year corporate lease. We pay your agreed rent directly into your bank on the same date every single month — whether the property is occupied or empty. We take 100% of the void risk, and there are £0 letting agent fees or management commissions deducted.',
  },
  {
    q: 'How do you care for and protect my property?',
    a: 'We treat your property as our own. We conduct regular photographic inspections, employ vetted local Sussex trades (plumbing, heating, electrics), perform preventive maintenance, and ensure commercial-grade cleaning. At the end of our agreement, we hand the property back to you in equal or better condition.',
  },
  {
    q: 'What is the difference between JM LetVest and a standard letting agency?',
    a: 'High-street agencies charge 12%–15% commission plus tenant-finding fees, and if the property sits empty, you get zero income. With JM LetVest Guaranteed Rent, you receive a guaranteed payment every month with no void risk, no agency fees, and direct communication with a dedicated local Sussex property manager.',
  },
  {
    q: 'Which areas of West Sussex do you cover?',
    a: 'We cover the entire county of West Sussex, including Chichester, Worthing, Arundel, Crawley, Horsham, Bognor Regis, Littlehampton, Shoreham, Midhurst, Petworth, and surrounding villages. If your property is in or near West Sussex, we would be delighted to manage it.',
  },
  {
    q: 'Are there any hidden fees or charges?',
    a: 'None whatsoever. All financial arrangements, services, and responsibilities are written clearly into your agreement before you sign. On our Guaranteed Rent model, the agreed rent is exactly what lands in your bank account.',
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
  const [sent, setSent] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.defaultPlaybackRate = 0.5;
    video.playbackRate = 0.5;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
    } else {
      void video.play().catch(() => { /* Keep the poster if autoplay is unavailable. */ });
    }
  }, []);

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

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
      `Property details / priorities:`,
      `${form.get('message') || 'None'}`,
    ].join('\n');
    const subject = `Property Enquiry for JM LetVest – ${form.get('arrangement')}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const legalLines = Object.values(siteConfig.legal).filter(Boolean);

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* STICKY HEADER */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container-wide header-inner">
          <a href="#top" aria-label={`${siteConfig.companyName} home`} className="brand">
            <img
              className="brand-logo"
              src={asset('letvest-logo-sm.png')}
              alt={`${siteConfig.companyName} – Guaranteed Rent & Fully Managed Letting`}
              width="600"
              height="400"
            />
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
              <a key={l.href} href={l.href} onClick={closeMenu}>
                {l.label}
              </a>
            ))}
            <a className="btn btn-gold nav-cta" href="#contact" onClick={closeMenu}>
              Free Appraisal <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* HERO SECTION */}
        <section id="top" className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src={asset('images/sussex-coast.jpg')} alt="" fetchPriority="high" />
            <video
              ref={heroVideoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={asset('images/sussex-coast.jpg')}
              tabIndex={-1}
            >
              <source src={asset('hero-house-fronts.mp4')} type="video/mp4" />
            </video>
          </div>
          <div className="container-wide hero-inner">
            <div className="hero-copy">
              <h1 className="display">
                Your Sussex property cared for like our own.
                <em> Your income guaranteed.</em>
              </h1>
              <p className="hero-lead">
                <strong>JM LetVest Ltd</strong> provides hands-free guaranteed rent
                and fully managed lettings across West Sussex. Enjoy total peace of mind while we protect your asset.
              </p>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="stats" aria-label="JM LetVest performance highlights">
          <div className="container-wide stats-grid">
            {siteConfig.stats.map((s) => (
              <div key={s.label} className="stat reveal">
                <span className="stat-value display">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================
            100% GUARANTEED MONTHLY RENT
            ================================================================= */}
        <section id="guaranteed-rent" className="section guaranteed-spotlight">
          <div className="container-wide spotlight-clean">
            <div className="spotlight-copy reveal">
              <h2 className="display">
                Your rent paid guaranteed <em>every single month.</em>
              </h2>
              <p className="spotlight-lead">
                With traditional agents, an empty month means zero income. With <strong>JM LetVest Ltd</strong>,
                we become your dependable commercial tenant. You receive your agreed rent on the exact same date
                every single month — whether your property is occupied or empty.
              </p>
              <div className="spotlight-benefits">
                <div className="benefit-item">
                  <Wallet size={24} />
                  <h4>100% Predictable Income</h4>
                  <p>Guaranteed bank transfer on the agreed date every single month. Never chase late rent again.</p>
                </div>
                <div className="benefit-item">
                  <ShieldCheck size={24} />
                  <h4>Zero Void Periods</h4>
                  <p>We absorb 100% of the void risk between occupants. Your income never stops.</p>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={24} />
                  <h4>£0 Letting &amp; Agency Fees</h4>
                  <p>No tenant-finding charges, no marketing fees, and zero management commission deducted.</p>
                </div>
                <div className="benefit-item">
                  <Clock size={24} />
                  <h4>1 to 5 Year Contracts</h4>
                  <p>Secure long-term certainty with flexible commercial lease terms tailored to your goals.</p>
                </div>
              </div>
              <div className="spotlight-actions">
                <a href="#contact" className="btn btn-gold btn-lg">
                  Get Your Guaranteed Rent Offer <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            YOUR PROPERTY WILL BE CARED FOR (HIGH-TRUST STEWARDSHIP)
            ================================================================= */}
        <section id="property-care" className="section care-section">
          <div className="container-wide">
            <div className="section-head center reveal">
              <span className="eyebrow">Our Uncompromising Commitment</span>
              <h2 className="display">
                Your property will be cared for. <em>Like it was our own.</em>
              </h2>
              <p>
                A rental property is not just an investment; it is a valuable asset you have worked hard to build.
                At JM LetVest, we treat every hallway, kitchen, and garden with the utmost pride and vigilance.
              </p>
            </div>

            <div className="care-grid">
              {carePillars.map((c, i) => {
                const Icon = c.icon;
                return (
                  <article key={c.title} className="care-card reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                    <div className="care-card-icon">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </article>
                );
              })}
            </div>

            <div className="care-pledge-banner reveal">
              <div>
                <span className="eyebrow">The JM LetVest Handback Guarantee</span>
                <h3 className="display">Returned in pristine condition at the end of the term.</h3>
                <p>
                  Unlike hands-off agencies that leave landlords facing hefty redecoration bills after tenancies,
                  JM LetVest continually maintains, cleans, and services your home throughout our tenure. We pledge
                  to return your property clean, intact, and ready for whatever you choose next.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <a href="#contact" className="btn btn-navy btn-lg">
                  Speak to Our Property Care Team <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            ABOUT JM LETVEST LTD (BRAND IDENTITY & LOCAL KNOWLEDGE)
            ================================================================= */}
        <section id="about" className="section about-section">
          <div className="container-wide about-grid">
            <div className="about-media reveal">
              <Img src="letvest-home.jpg" alt="Elegantly maintained living room in a West Sussex home" />
              <div className="about-badge-floating">
                <strong>JM LetVest Ltd</strong>
                <span>Independent · Local · West Sussex</span>
              </div>
            </div>

            <div className="about-copy reveal">
              <span className="eyebrow">About JM LetVest Ltd</span>
              <h2 className="display">
                Born in West Sussex. <em>Dedicated to landlords.</em>
              </h2>
              <p>
                <strong>JM LetVest Ltd</strong> was founded with a singular purpose: to give property owners across
                West Sussex genuine financial predictability and superior property management without the bloated
                fees and detached service of corporate high-street chains.
              </p>
              <p>
                We live, work, and operate right here in West Sussex. We know the rhythm of the local housing market —
                from peak summer demand in coastal Worthing and the Witterings, to the vibrant festival weeks of
                Goodwood, to steady professional commuters in Chichester, Horsham, and Crawley.
              </p>

              <div className="about-pillars">
                <div className="about-pillar">
                  <strong>Personal Accountability</strong>
                  <span>Direct founder-level access. You deal with someone who knows your property personally.</span>
                </div>
                <div className="about-pillar">
                  <strong>Unrivalled Local Mastery</strong>
                  <span>Targeted strategies tailored to your exact postcode and tenant demographic.</span>
                </div>
                <div className="about-pillar">
                  <strong>Zero Hidden Surcharges</strong>
                  <span>Transparent agreements, honest valuations, and ethical UK property standards.</span>
                </div>
                <div className="about-pillar">
                  <strong>Asset Growth &amp; Care</strong>
                  <span>We focus on maintaining and enhancing the long-term capital appeal of your property.</span>
                </div>
              </div>

              <a href="#contact" className="btn btn-navy">
                Meet the Team &amp; Get Started <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            PEACE OF MIND (CLEAN - ZERO STRIKE-THROUGH WRITING)
            ================================================================= */}
        <section id="peace-of-mind" className="section peace">
          <div className="container-wide peace-grid">
            <div className="peace-intro reveal">
              <span className="eyebrow">Peace of Mind</span>
              <h2 className="display">
                Hand over the hassle.<br />
                <em>Keep the rewards.</em>
              </h2>
              <p>
                Being a landlord shouldn’t mean late-night emergency repairs, chasing missed rent, or stressing over
                constantly changing UK legislation. With JM LetVest, you stay completely informed while we manage
                every operational detail.
              </p>
              <div className="peace-image">
                <Img
                  src="images/modern-apartment.jpg"
                  fallback="letvest-home.jpg"
                  alt="A bright, modern rental apartment maintained to hotel standards"
                />
              </div>
            </div>

            <div className="reassurance-list">
              {reassurances.map(({ badge, title, answer, icon: Icon }, i) => (
                <article key={title} className="reassurance-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="reassurance-icon">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="reassurance-title-wrap">
                      <span className="reassurance-badge">{badge}</span>
                      <h3>{title}</h3>
                    </div>
                    <p>{answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            SERVICES (THREE CONSIDERED WAYS TO LET)
            ================================================================= */}
        <section id="services" className="section services">
          <div className="container-wide">
            <div className="section-head center reveal">
              <span className="eyebrow">Tailored Letting Routes</span>
              <h2 className="display">
                Two ways to let. <em>One trusted partner.</em>
              </h2>
              <p>
                Whether you prefer guaranteed monthly certainty or conventional
                managed tenancies, we evaluate your property and advise the optimum route honestly.
              </p>
            </div>

            <div className="service-grid">
              {services.map((s, i) => (
                <article
                  key={s.id}
                  className={`service-card reveal${s.featured ? ' featured' : ''}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {s.featured && <span className="ribbon">Most Popular · Guaranteed</span>}
                  <div className="service-media">
                    <Img src={s.image} fallback={s.fallback} alt="" />
                    <span className="service-tag">{s.tag}</span>
                  </div>
                  <div className="service-body">
                    <h3 className="display">{s.title}</h3>
                    <p>{s.text}</p>
                    <ul>
                      {s.features.map((f) => (
                        <li key={f}>
                          <Check size={16} aria-hidden="true" /> {f}
                        </li>
                      ))}
                    </ul>
                    <p className="best-for">
                      <strong>Best for:</strong> {s.bestFor}
                    </p>
                    <a href="#contact" className={`btn ${s.featured ? 'btn-gold' : 'btn-navy'} btn-block`}>
                      {s.cta} <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* SIDE-BY-SIDE COMPARISON MATRIX */}
            <div id="compare" className="compare reveal">
              <h3 className="display">Side-by-side comparison</h3>
              <p className="compare-hint">Swipe across to compare both services.</p>
              <div className="compare-scroll" tabIndex={0} role="region" aria-label="Service comparison, scroll horizontally to view both services">
                <table>
                  <thead>
                    <tr>
                      <th scope="col"><span className="sr-only">Feature</span></th>
                      <th scope="col" className="hl">Guaranteed Rent (Core)</th>
                      <th scope="col">Fully Managed Letting</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        <td className="hl"><strong>{row.values[0]}</strong></td>
                        <td>{row.values[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="compare-note">
                Every commercial arrangement is backed by a transparent written agreement with zero hidden charges.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================================
            LOCAL KNOWLEDGE (WEST SUSSEX EXPERTISE)
            ================================================================= */}
        <section id="local" className="section local">
          <div className="container-wide">
            <div className="local-simple-grid reveal">
              <div className="local-simple-copy">
                <span className="eyebrow eyebrow-light">West Sussex Expertise</span>
                <h2 className="display">
                  We know West Sussex <em>street by street.</em>
                </h2>
                <p>
                  West Sussex is our home and our specialty. From the bustling commuter hubs of Worthing and Crawley
                  to the historic beauty of Chichester, Arundel, and the rolling South Downs, each neighbourhood possesses
                  its own distinct rental market and tenant demographics. Our team lives and operates right here in the county,
                  giving us genuine on-the-ground understanding of tenant demand, local neighbourhoods, and true market rental values.
                </p>
                <p>
                  Whether your property is an executive apartment close to transport links, a suburban family home, or a character
                  cottage in the South Downs, our local presence means faster turnaround times, regular in-person
                  property care, and trusted relationships with local Sussex tradesmen. We ensure your home is matched with
                  the ideal rental model to maximize returns while safeguarding its long-term condition.
                </p>
                <div className="local-simple-actions">
                  <a href="#contact" className="btn btn-gold">
                    Discuss Your Sussex Property <ArrowRight size={16} />
                  </a>
                  <a href={telHref} className="btn btn-ghost-light">
                    <Phone size={16} /> Call Our Local Office
                  </a>
                </div>
              </div>
              <div className="local-simple-media">
                <div className="local-simple-image-frame">
                  <Img
                    src="images/south-downs-cottage.jpg"
                    fallback="letvest-home.jpg"
                    alt="Charming Sussex cottage nestled in the South Downs"
                  />
                  <div className="local-simple-badge">
                    <MapPin size={16} aria-hidden="true" />
                    <span>Serving Chichester, Worthing, Arundel, Horsham, Crawley &amp; South Downs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            COMPLIANCE (AUTHORITATIVE UK LEGISLATION)
            ================================================================= */}
        <section className="section compliance">
          <div className="container-wide">
            <div className="section-head reveal">
              <span className="eyebrow">Professional Standards</span>
              <h2 className="display">
                Fully compliant. <em>Fully covered.</em>
              </h2>
              <p>
                With over 170 pieces of legislation governing residential property in England, compliance is
                paramount. JM LetVest monitors, schedules, and certifies every required safety check.
              </p>
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
            <div className="gas-safe-standard">
              <img src={asset('gas-safe-logo.png')} alt="Gas Safe Register" width="148" height="148" loading="lazy" />
              <div>
                <h3>Gas safety, handled professionally</h3>
                <p>Gas safety inspections and gas work are carried out by Gas Safe registered engineers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            HOW IT WORKS (4 SIMPLE STEPS)
            ================================================================= */}
        <section id="process" className="section process">
          <div className="container-wide">
            <div className="section-head center reveal">
              <span className="eyebrow">How It Works</span>
              <h2 className="display">
                Up and running in <em>four simple steps.</em>
              </h2>
              <p>A completely straightforward transition with zero friction.</p>
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

        {/* =================================================================
            TESTIMONIALS
            ================================================================= */}
        {siteConfig.testimonials.length > 0 && (
          <section className="section testimonials">
            <div className="container-wide">
              <div className="section-head center reveal">
                <span className="eyebrow">Landlord Feedback</span>
                <h2 className="display">
                  Trusted by property owners <em>across Sussex.</em>
                </h2>
              </div>
              <div className="testimonial-grid">
                {siteConfig.testimonials.map((t) => (
                  <figure key={t.name} className="testimonial reveal">
                    <Quote size={28} aria-hidden="true" />
                    <blockquote>“{t.quote}”</blockquote>
                    <figcaption>
                      <strong>{t.name}</strong>
                      <span>{t.detail}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =================================================================
            FAQS
            ================================================================= */}
        <section id="faq" className="section faq">
          <div className="container-wide faq-grid">
            <div className="section-head reveal">
              <span className="eyebrow">Frequently Asked Questions</span>
              <h2 className="display">
                Everything you need <em>to know.</em>
              </h2>
              <p>
                Have a specific question about your property? Call our West Sussex team on{' '}
                <a href={telHref}>{siteConfig.phone}</a> or use our live digital assistant below.
              </p>
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

        {/* =================================================================
            CONTACT / FREE APPRAISAL FORM
            ================================================================= */}
        <section id="contact" className="section contact">
          <div className="container-wide contact-grid">
            <div className="contact-copy reveal">
              <span className="eyebrow eyebrow-light">No-Obligation Property Review</span>
              <h2 className="display">
                Request your free <em>rental appraisal.</em>
              </h2>
              <p>
                Tell us about your property and we will provide an honest, accurate evaluation comparing Guaranteed
                Rent and fully managed letting options.
              </p>
              <ul className="contact-points">
                <li><Check size={18} /> Guaranteed monthly rent offer calculation</li>
                <li><Check size={18} /> Full property care plan discussion</li>
                <li><Check size={18} /> Fast response within 1 business day</li>
              </ul>
              <div className="contact-direct">
                <a href={telHref}>
                  <span className="cd-icon"><Phone size={18} /></span>
                  <span><small>Call us directly</small>{siteConfig.phone}</span>
                </a>
                <a href={`mailto:${siteConfig.email}`}>
                  <span className="cd-icon"><Mail size={18} /></span>
                  <span><small>Email our desk</small>{siteConfig.email}</span>
                </a>
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={sendEnquiry}>
              <h3 className="display">Book Your Free Appraisal</h3>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="c-name">Your Full Name</label>
                  <input id="c-name" name="name" autoComplete="name" placeholder="e.g. John Smith" required />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">Phone Number</label>
                  <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="e.g. 07123 456789" />
                </div>
                <div className="field full">
                  <label htmlFor="c-email">Email Address</label>
                  <input id="c-email" name="email" type="email" autoComplete="email" placeholder="e.g. name@example.com" required />
                </div>
                <div className="field">
                  <label htmlFor="c-location">Property Town or Postcode</label>
                  <input id="c-location" name="location" placeholder="e.g. Worthing, Chichester, BN11" />
                </div>
                <div className="field">
                  <label htmlFor="c-arrangement">Interested In</label>
                  <select id="c-arrangement" name="arrangement" defaultValue="100% Guaranteed Rent" required>
                    <option value="100% Guaranteed Rent">100% Guaranteed Rent (Recommended)</option>
                    <option value="Fully Managed Letting">Fully Managed Letting</option>
                    <option value="Not sure – please advise me">Not sure – please advise me</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="c-message">Tell Us About Your Property</label>
                  <textarea
                    id="c-message"
                    name="message"
                    placeholder="Number of bedrooms, current rental status, your goals or questions..."
                  />
                </div>
              </div>
              <button className="btn btn-gold btn-lg btn-block" type="submit">
                Request Free Appraisal <ArrowRight size={18} />
              </button>
              <p className="form-note">
                {sent ? (
                  <>
                    Your email client has opened with your inquiry ready to send. Or call us directly on{' '}
                    <a href={telHref}>{siteConfig.phone}</a>.
                  </>
                ) : (
                  'Your details are strictly confidential and used solely to prepare your property appraisal.'
                )}
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container-wide footer-grid">
          <div className="footer-brand">
            <img src={asset('letvest-logo-sm.png')} alt={siteConfig.companyName} width="600" height="400" />
            <p>
              {siteConfig.companyName} — {siteConfig.tagline}. Local expertise, guaranteed rental returns, and
              uncompromising property care across West Sussex.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#guaranteed-rent">Guaranteed Rent</a></li>
              <li><a href="#services">Fully Managed Letting</a></li>
              <li><a href="#property-care">Property Care Standards</a></li>
              <li><a href="#contact">Free Appraisal</a></li>
            </ul>
          </div>
          <div>
            <h4>Sussex Locations</h4>
            <ul>
              {['Chichester', 'Worthing', 'Arundel', 'Crawley', 'Horsham', 'Bognor Regis'].map((t) => (
                <li key={t}><a href="#local">{t}</a></li>
              ))}
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
        <div className="container-wide prs-membership">
          <img src={asset('prs-logo.jpg')} alt="Property Redress Scheme" width="4696" height="1968" loading="lazy" />
          <div>
            <strong>Property Redress Scheme</strong>
            <span>Membership number: <b>{siteConfig.prsMembershipNumber}</b></span>
          </div>
        </div>
        <div className="container-wide footer-legal">
          <span>© {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.</span>
          {legalLines.length > 0 && <span>{legalLines.join(' · ')}</span>}
        </div>
      </footer>

      {/* FLOATING CHATBOT WIDGET */}
      <Chatbot />

      {/* FLOATING MOBILE PHONE CALL BUTTON */}
      <a className="mobile-call" href={telHref} aria-label={`Call ${siteConfig.companyName}`}>
        <Phone size={20} />
      </a>
    </div>
  );
}

