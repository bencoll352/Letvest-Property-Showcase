import { HeartHandshake, MapPin, MessagesSquare, House, ArrowRight } from "lucide-react";
import { destination } from "@/components/service-features";

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function AboutHero() {
  return (
    <section className="hero service-hero about-hero">
      <div className="hero-media" aria-hidden="true">
        <img
          src={asset("images/about-hero-home.png")}
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
        />
      </div>
      <div className="container-wide hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            West Sussex Born &amp; Bred · Family-Run Business
          </span>
          <h1 className="display">
            A personal approach to your property.
            <em>Local roots you can rely on.</em>
          </h1>
          <p className="hero-lead">
            JM LetVest was founded by a team with a clear vision: to provide West Sussex property owners with guaranteed rental certainty, zero agency deductions, and hands-on property care delivered by people who truly care.
          </p>
          <div className="hero-metrics-grid" aria-label="Key highlights">
            <div className="metric-pill">
              <strong>Local understanding</strong>
              <span>Rooted in West Sussex</span>
            </div>
            <div className="metric-pill">
              <strong>Family-run service</strong>
              <span>A personal approach to your property</span>
            </div>
            <div className="metric-pill">
              <strong>Clear communication</strong>
              <span>Straightforward conversations</span>
            </div>
            <div className="metric-pill">
              <strong>Practical support</strong>
              <span>Property care with agreed responsibilities</span>
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
      <div className="story-layout about-story-layout">
        <div className="story-copy">
          <span className="eyebrow">Our approach</span>
          <h2 className="display">
            Local roots. Personal service.
            <em>Care for the home behind the investment.</em>
          </h2>
          <p>
            Understanding the area starts with understanding your property. From coastal neighbourhoods to inland towns, local knowledge helps us discuss the location, the home and the arrangement that may suit it.
          </p>
          <p>
            We keep conversations straightforward, with clear responsibilities and practical property support. Through our Rent to Rent service, we lease suitable properties and pay the agreed rent for a contractual period. Your written agreement sets out payment terms, utilities and the scope of property care.
          </p>
          <div style={{ marginTop: '24px' }}>
            <a className="btn btn-outline-navy" href={destination("contact")}>
              Speak with our team <ArrowRight size={17} aria-hidden="true" />
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
      title: "West Sussex local knowledge",
      detail:
        "Local understanding helps us discuss your property’s location, suitability and the needs of prospective occupants.",
    },
    {
      Icon: HeartHandshake,
      title: "Family-run, personal service",
      detail:
        "Speak with the JM LetVest team about your property, your priorities and the next steps.",
    },
    {
      Icon: MessagesSquare,
      title: "Clear communication",
      detail:
        "Understand the proposed rent, bills and responsibilities before you agree, with the details set out in writing.",
    },
    {
      Icon: House,
      title: "Hands-on property support",
      detail:
        "Property care and maintenance coordination within the agreed scope, with repair approvals and costs clearly assigned.",
    },
  ];

  return (
    <section className="section commitments-section" aria-labelledby="commitments-heading">
      <div className="section-head">
        <span className="eyebrow">Our Guiding Standards</span>
        <h2 id="commitments-heading" className="display">
          Our family team.<em>Four guiding principles.</em>
        </h2>
        <p>
          Local understanding, personal service and clear responsibilities guide how we work with landlords.
        </p>
      </div>
      <div className="standards-layout">
        <figure className="standards-image">
          <img
            src={asset("images/about-home-care.jpg")}
            alt="Hands gently protecting a small wooden home"
            width="541"
            height="460"
            loading="lazy"
          />
          <figcaption>West Sussex communities are at the heart of our service.</figcaption>
        </figure>
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
      </div>
    </section>
  );
}
