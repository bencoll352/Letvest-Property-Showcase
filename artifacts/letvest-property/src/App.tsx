import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  ClipboardList,
  Clock3,
  FileText,
  KeyRound,
  Menu,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [feedback, setFeedback] = useState('');

  const closeMenu = () => setMenuOpen(false);
  const prepareEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      'Letvest Ltd. property enquiry',
      `Name: ${form.get('name')}`,
      `Email: ${form.get('email')}`,
      `Property location: ${form.get('location') || 'Not provided'}`,
      `Interested in: ${form.get('arrangement')}`,
      `Message: ${form.get('message') || 'Not provided'}`,
    ].join('\n');
    try {
      await navigator.clipboard.writeText(message);
      setFeedback('Your enquiry draft has been copied. It has not been sent or stored by this website.');
    } catch {
      setFeedback(`Your enquiry draft is ready. This website does not send or store submissions. Draft: ${message}`);
    }
  };

  const advantages = [
    { icon: Clock3, title: 'More time back', text: 'Reduce the day-to-day work involved in letting and hosting.' },
    { icon: KeyRound, title: 'Tenant & guest finding', text: 'Support with finding suitable tenants or managing guest enquiries, depending on the arrangement.' },
    { icon: Wrench, title: 'Repairs coordination', text: 'A clear point of contact to help coordinate maintenance and keep you informed.' },
    { icon: ClipboardList, title: 'Less administration', text: 'Practical help with the messages, bookings, paperwork and routine follow-up.' },
    { icon: ShieldCheck, title: 'Compliance reminders', text: 'Prompts and coordination to help keep important property obligations on your radar.' },
    { icon: CalendarCheck, title: 'Ongoing oversight', text: 'Know what is happening at your property with agreed updates and clear communication.' },
    { icon: FileText, title: 'One considered plan', text: 'Talk through the property, your priorities and which model may suit you.' },
    { icon: Building2, title: 'Agreed income options', text: 'Some contracts may set an agreed rent; terms, exclusions and payment conditions vary.' },
  ];

  const faqs = [
    { q: 'Do I have to choose rent-to-rent?', a: 'No. Letvest can discuss fully managed letting, rent-to-rent / guaranteed-rent arrangements, or holiday-let and Airbnb management. The right option depends on the property, your goals and the contract terms.' },
    { q: 'Does guaranteed rent mean payment is unconditional?', a: 'No income arrangement should be assumed to be unconditional. Any agreed rent, payment schedule, exclusions, conditions and circumstances affecting payment must be confirmed in the written agreement.' },
    { q: 'Who pays for repairs and maintenance?', a: 'Responsibility depends on the arrangement and the specific contract. We will set out who approves, arranges and pays for different types of work before you decide.' },
    { q: 'Can I understand the fees and exit terms first?', a: 'Yes. Fees, included services, contract length, notice requirements and exit terms should be discussed and documented before you commit.' },
  ];

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="container-wide header-inner">
          <a href="#top" aria-label="Letvest Ltd. home">
            <img className="brand-logo" src="/letvest-logo.png" alt="Letvest Ltd. — Rent to Rent and Airbnb Management" width="1024" height="683" />
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav id="main-nav" className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            <a href="#why-us" onClick={closeMenu}>Why us</a>
            <a href="#options" onClick={closeMenu}>Ways to work together</a>
            <a href="#process" onClick={closeMenu}>How it works</a>
            <a href="#faq" onClick={closeMenu}>FAQs</a>
            <a className="button-primary nav-cta" href="#contact" onClick={closeMenu}>Talk through your property <ArrowRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="hero">
          <div className="container-wide hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">Property, looked after</span>
              <h1 className="display-font">Let your property work <span>your way.</span></h1>
              <p>Thoughtful letting and hosting support for owners who want less day-to-day involvement — and a clear say in how their property is managed.</p>
              <div className="hero-actions">
                <a className="button-primary" href="#options">Explore your options <ArrowRight size={17} /></a>
                <a className="button-outline" href="#contact">Start a conversation</a>
              </div>
              <div className="hero-note">Three ways to let. One conversation to find your fit.</div>
            </div>
            <div className="hero-art">
              <img src="/letvest-home.jpg" alt="Light-filled living room in a thoughtfully prepared UK townhouse" width="1536" height="1024" fetchPriority="high" />
              <div className="art-caption">Good property care begins<br />with a clear conversation.</div>
            </div>
          </div>
        </section>

        <section className="intro-band" aria-label="Our approach">
          <div className="container-wide intro-band-inner">
            <h2 className="display-font">Your property. Your priorities. A letting model that makes sense for both.</h2>
            <p>Not every owner wants the same thing. We help you compare the practical trade-offs, understand the terms and choose an arrangement with your eyes open.</p>
          </div>
        </section>

        <section id="why-us" className="why-section section-space">
          <div className="container-wide">
            <div className="section-heading">
              <span className="eyebrow">Why Letvest</span>
              <h2 className="display-font">More looked after.<br />Still in control.</h2>
              <p>A capable partner should make ownership feel simpler, while keeping the important decisions and details visible to you.</p>
            </div>
            <div className="advantages">
              {advantages.map(({ icon: Icon, title, text }) => (
                <article className="advantage" key={title}>
                  <div className="icon-box"><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="options" className="options-section section-space">
          <div className="container-wide">
            <div className="section-heading">
              <span className="eyebrow">Three considered routes</span>
              <h2 className="display-font">Choose the kind of support that fits.</h2>
              <p>Explore each route without pressure. The services, responsibilities and commercial terms are agreed with you before anything begins.</p>
            </div>
            <div className="option-grid">
              <article className="option-card">
                <span className="option-num">01 — LET</span>
                <h3>Fully managed letting</h3>
                <p>For owners who want help with the traditional tenancy journey, from finding tenants to the ongoing administration and coordination you agree.</p>
                <a href="#contact">Discuss managed letting <ArrowRight size={16} /></a>
              </article>
              <article className="option-card featured">
                <span className="option-num">02 — RENT</span>
                <h3>Rent-to-rent arrangements</h3>
                <p>A contract-led option where an agreed rent may be paid to the owner while the operator manages occupation. Payment terms, conditions, exclusions and responsibilities must be clear in writing.</p>
                <a href="#contact">Discuss the contract terms <ArrowRight size={16} /></a>
              </article>
              <article className="option-card">
                <span className="option-num">03 — HOST</span>
                <h3>Holiday-let & Airbnb management</h3>
                <p>Support for owners considering short stays, with agreed help around guest enquiries, bookings, changeovers and property oversight.</p>
                <a href="#contact">Explore hosting support <ArrowRight size={16} /></a>
              </article>
            </div>
          </div>
        </section>

        <section id="process" className="process-section section-space">
          <div className="container-wide process-grid">
            <div className="section-heading">
              <span className="eyebrow">A straightforward start</span>
              <h2 className="display-font">Clarity before commitment.</h2>
              <p>We take the time to understand the property and the level of involvement you want. No pressure to fit a particular model.</p>
              <a className="button-outline" href="#contact">Tell us about your property <ArrowDownRight size={16} /></a>
            </div>
            <div className="steps">
              <div className="step"><span className="step-count">01 / LISTEN</span><div><h3>Start with what matters to you</h3><p>Share your property, priorities and any questions you already have.</p></div></div>
              <div className="step"><span className="step-count">02 / COMPARE</span><div><h3>Talk through the available approach</h3><p>Explore the services, responsibilities and practical trade-offs relevant to your situation.</p></div></div>
              <div className="step"><span className="step-count">03 / AGREE</span><div><h3>Read the terms in full</h3><p>Review fees, repair obligations, income conditions and exit terms in the written agreement before deciding.</p></div></div>
            </div>
          </div>
        </section>

        <section className="expectations section-space">
          <div className="container-wide expect-layout">
            <div className="section-heading">
              <span className="eyebrow">Clear terms matter</span>
              <h2 className="display-font">Know what’s included — and what isn’t.</h2>
              <p>Good management starts with shared expectations. Every arrangement is different, so the detail belongs in your agreement, not in a blanket promise.</p>
            </div>
            <div>
              <div className="expect-panel">
                <h3>Before you decide, understand:</h3>
                <ul>
                  <li><Check size={18} /> Which services are included and how fees are charged.</li>
                  <li><Check size={18} /> Who coordinates, approves and pays for repairs.</li>
                  <li><Check size={18} /> Any agreed rent, payment schedule, conditions and exclusions.</li>
                  <li><Check size={18} /> Contract length, notice requirements and exit terms.</li>
                  <li><Check size={18} /> Your responsibilities for property condition and compliance.</li>
                </ul>
              </div>
              <p className="contract-note"><strong>A note on guaranteed-rent arrangements:</strong> An agreed rent is subject to the written contract. It should not be taken as a promise of unconditional payment; exclusions and conditions vary.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section section-space">
          <div className="container-wide">
            <div className="section-heading">
              <span className="eyebrow">Good questions to ask</span>
              <h2 className="display-font">Before you make a move.</h2>
              <p>It’s sensible to understand how an arrangement works before deciding whether it works for you.</p>
            </div>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <article className="faq-item" key={item.q}>
                  <h3>
                    <button className="faq-trigger" type="button" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                      {item.q}<Plus size={19} aria-hidden="true" />
                    </button>
                  </h3>
                  {openFaq === index && <div className="faq-answer" id={`faq-answer-${index}`}>{item.a}</div>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-space">
          <div className="container-wide contact-grid">
            <div>
              <span className="eyebrow">Let’s talk property</span>
              <h2 className="display-font">Start with a conversation.</h2>
              <p className="contact-intro">Tell us a little about your property and what you’re looking for. We’ll help you consider the next questions and possible arrangements.</p>
              <div className="contact-aside"><MessageCircle size={18} aria-hidden="true" /> No pressure to commit. A useful first step is simply getting clear on what matters to you.</div>
            </div>
            <form className="contact-form" onSubmit={prepareEnquiry}>
              <div className="form-grid">
                <div className="field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required /></div>
                <div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div>
                <div className="field"><label htmlFor="contact-location">Property location</label><input id="contact-location" name="location" placeholder="Town or postcode" autoComplete="address-level2" /></div>
                <div className="field"><label htmlFor="contact-arrangement">What are you exploring?</label>
                  <select id="contact-arrangement" name="arrangement" defaultValue="" required>
                    <option value="" disabled>Select an option</option>
                    <option>Fully managed letting</option>
                    <option>Rent-to-rent / agreed-rent arrangement</option>
                    <option>Holiday-let / Airbnb management</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="field full"><label htmlFor="contact-message">A little more about your property or priorities</label><textarea id="contact-message" name="message" placeholder="Share what would make letting feel right for you." /></div>
              </div>
              <button className="button-primary form-submit" type="submit">Prepare my enquiry <ArrowRight size={17} /></button>
              <p className="form-disclaimer">This page does not send or store your details. Submitting prepares and copies an enquiry draft for you to share with Letvest.</p>
              {feedback && <div className="form-feedback" role="status" aria-live="polite"><Sparkles size={16} /> {feedback}</div>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container-wide footer-inner">
          <div className="footer-brand"><img src="/letvest-logo.png" alt="" width="1024" height="683" /><span>Property, looked after.</span></div>
          <div className="footer-links"><a href="#why-us">Why Letvest</a><a href="#options">Ways to work together</a><a href="#faq">FAQs</a><a href="#contact">Contact</a></div>
          <span>© {new Date().getFullYear()} Letvest Ltd.</span>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
