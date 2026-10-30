import { HeartHandshake, MapPin, MessagesSquare, House, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { destination } from "@/components/service-features";

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function AboutHero() {
  return (
    <section className="hero service-hero about-hero">
      <div className="hero-media" aria-hidden="true">
        <img
          src={asset("images/sussex-coast.jpg")}
          alt="Scenic West Sussex coastline and South Downs landscape"
          fetchPriority="high"
        />
      </div>
      <div className="container-wide hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            West Sussex Born &amp; Bred · Family-Run Business
          </span>
          <h1 className="display">
            A personal approach.
            <em>Local roots you can rely on.</em>
          </h1>
          <p className="hero-lead">
            JM LetVest was founded by the JM LetVest team with a clear vision: to provide West Sussex property owners with guaranteed rental certainty, zero agency deductions, and hands-on property care delivered by people who truly care.
          </p>
          <div className="hero-metrics-grid" aria-label="Key highlights">
            <div className="metric-pill">
              <strong>100% Guaranteed</strong>
              <span>Rent on the 1st of every month</span>
            </div>
            <div className="metric-pill">
              <strong>0% Commission</strong>
              <span>No monthly cuts or setup fees</span>
            </div>
            <div className="metric-pill">
              <strong>West Sussex Local</strong>
              <span>Active across coastal &amp; market towns</span>
            </div>
            <div className="metric-pill">
              <strong>Direct Accountability</strong>
              <span>Personal contact with the JM LetVest team</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FamilyStory() {
  return (
    <div className="about-editorial-wrap">
      <div className="story-layout">
        <figure className="story-image">
          <img
            src={asset("images/south-downs-cottage.jpg")}
            alt="Idyllic West Sussex countryside cottage near the South Downs"
            width="960"
            height="720"
            loading="lazy"
          />
          <figcaption>West Sussex communities are at the heart of our service.</figcaption>
        </figure>
        <div className="story-copy">
          <span className="eyebrow">Our Story &amp; Ethos</span>
          <h2 className="display">
            Why we started JM LetVest.
            <em>A different way to treat property.</em>
          </h2>
          <p>
            Having lived and worked across West Sussex our entire lives, we saw first-hand the frustrations landlords face with traditional high-street letting agents: rising void periods, opaque commission deductions, impersonal call centres, and tenancies that left properties neglected.
          </p>
          <p>
            We created JM LetVest to offer something genuine. A contractual partnership where we lease your home, guarantee your rental income every single month without fail, and treat your property with the same care and respect we give our own.
          </p>
          <div className="story-quote-card">
            <blockquote>
              “We don’t view properties as mere transactions. Every home we manage represents years of hard work by its owner. Our promise is personal accountability: whenever you call, you speak directly with us.”
            </blockquote>
            <cite>— the JM LetVest team, Co-Founders of JM LetVest</cite>
          </div>
          <div style={{ marginTop: '24px' }}>
            <a className="btn btn-outline-navy" href={destination("contact")}>
              Speak Directly with the JM LetVest team <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FamilyCommitments() {
  const items = [
    {
      Icon: MapPin,
      title: "Genuine Local Knowledge",
      detail:
        "Deep understanding of West Sussex property values, community dynamics, and transport links from Chichester to Shoreham.",
    },
    {
      Icon: HeartHandshake,
      title: "Direct Founder Accountability",
      detail:
        "No call-centres or junior negotiators. You have the team’s personal contact details throughout your entire agreement.",
    },
    {
      Icon: ShieldCheck,
      title: "Complete Financial Transparency",
      detail:
        "Fixed contractual rent paid on the 1st of the month, agreed utility cover, zero commission, and £0 surprise tenant-find fees.",
    },
    {
      Icon: House,
      title: "Meticulous Property Upkeep",
      detail:
        "Regular professional cleaning, thorough photographic inspections, and rapid minor repairs handled at our expense.",
    },
  ];

  return (
    <section className="section commitments-section" aria-labelledby="commitments-heading">
      <div className="section-head">
        <span className="eyebrow">Our Guiding Standards</span>
        <h2 id="commitments-heading" className="display">
          What you can always expect<em>from our family team.</em>
        </h2>
        <p>
          Four core principles shape every agreement, conversation, and property inspection we conduct.
        </p>
      </div>
      <div className="commitment-grid">
        {items.map(({ Icon, title, detail }) => (
          <article className="commitment-card" key={title}>
            <div className="commitment-icon-wrap" aria-hidden="true">
              <Icon size={24} />
            </div>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
