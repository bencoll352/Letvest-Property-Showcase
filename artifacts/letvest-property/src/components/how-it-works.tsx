import { ClipboardCheck, FileText, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { destination } from "@/components/service-features";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: ClipboardCheck,
      title: "Free Property Appraisal",
      desc: "We discuss your West Sussex property, review its layout and condition, and verify suitability for corporate and healthcare room accommodation.",
    },
    {
      num: "02",
      icon: FileText,
      title: "Guaranteed Offer in 48h",
      desc: "You receive a clear, formal written proposal with your agreed monthly guaranteed rent, utility schedule, and contract duration (1 to 5 years).",
    },
    {
      num: "03",
      icon: Sparkles,
      title: "Complimentary Staging & Setup",
      desc: "Once agreed, we dress, furnish, and deep-clean the property to hotel-standard living spaces at zero cost to you.",
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "Hands-Off Guaranteed Income",
      desc: "Sit back and receive your rent promptly on the 1st of every month without fail. We manage the occupants, cleaning, and day-to-day upkeep.",
    },
  ];

  return (
    <section className="section how-it-works-section" id="how-it-works" aria-labelledby="how-it-works-heading">
      <div className="container-wide">
        <div className="section-head">
          <span className="eyebrow">A Simple 4-Step Process</span>
          <h2 id="how-it-works-heading" className="display">
            From enquiry to guaranteed rent.
            <em>How it works for landlords.</em>
          </h2>
          <p>
            No complex agency jargon, no stressful tenant negotiations. A straightforward, transparent route to hands-off rental income.
          </p>
        </div>

        <div className="step-timeline-grid">
          {steps.map(({ num, icon: Icon, title, desc }) => (
            <article className="step-timeline-card" key={num}>
              <div className="step-timeline-header">
                <span className="step-number" aria-hidden="true">{num}</span>
                <span className="step-icon-wrap" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>

        <div className="how-it-works-cta">
          <a className="btn btn-gold" href={destination("contact")}>
            Start With A Free Appraisal <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
