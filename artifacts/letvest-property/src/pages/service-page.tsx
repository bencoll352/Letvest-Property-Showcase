import { rentToRentFaqs, lettingsFaqs } from "@/components/service-faqs";
import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, MessageSquare } from "lucide-react";
import { LandlordGuidance, GuidanceHero } from "@/components/landlord-guidance";
import { Reviews } from "@/components/reviews";
import { FamilyStory, FamilyCommitments, AboutHero } from "@/components/family-story";
import { EmailEnquiries } from "@/components/email-enquiries";
import { SiteHeader } from "@/components/site-header";
import { Included, Payments, destination } from "@/components/service-features";
import { ServiceHero } from "@/components/service-hero";
import { TrustBadges } from "@/components/trust-badges";
import { SiteFooter } from "./home";

const titles: Record<string, string> = {
  "rent-to-rent": "Rent to Rent",
  lettings: "Lettings",
  about: "About us",
  "industry-news": "Landlord Guides & Updates",
  contact: "Contact us",
};
const rentSteps = [
  [
    "Tell us about your property",
    "We discuss its location, condition and current use, alongside your priorities and preferred level of involvement.",
  ],
  [
    "Review your rental proposal",
    "Your written offer brings together rent, payment dates, the lease term, permitted occupants, bills and the division of responsibilities.",
  ],
  [
    "Agree the handover",
    "Before the arrangement starts, we agree property condition, access, safety records and any work needed. Read the contract and confirm any required consents.",
  ],
  [
    "Keep the important details visible",
    "We coordinate the agreed day-to-day management and keep you informed through the reporting and approval arrangements in your contract.",
  ],
];
const lettingSteps = [
  [
    "Start with an appraisal",
    "We discuss your property, rental expectations and the local market, then set out the proposed service and landlord fees.",
  ],
  [
    "Prepare for the right tenant",
    "Agree the marketing, viewing and referencing process, together with the documents and property checks needed before occupation.",
  ],
  [
    "Make moving in straightforward",
    "Confirm tenancy terms, deposit arrangements, inventory and the handover process. Everyone should know who to contact and what happens next.",
  ],
  [
    "Stay informed throughout the tenancy",
    "Agree rent collection, inspection frequency, maintenance approvals and updates, with a clear record of costs and decisions.",
  ],
];

function ServiceDetails({ rentToRent }: { rentToRent: boolean }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const points = rentToRent
    ? [
        "Agreed rent for the contractual period",
        "Day-to-day management within the agreed scope",
        "Utilities and bills specified in your proposal",
      ]
    : [
        "Support with marketing, viewings and referencing",
        "Agreed rent collection and property oversight",
        "Maintenance coordination and clear updates",
      ];
  const faqs = rentToRent ? rentToRentFaqs : lettingsFaqs;
  return (
    <>
      <section
        id="service-detail"
        className="section container-wide service-overview"
      >
        <div>
          <span className="eyebrow">
            {rentToRent ? "A different way to let" : "Support at every stage"}
          </span>
          <h2 className="display">
            {rentToRent ? "Less to manage." : "A well-managed home."}
            <em>
              {rentToRent ? "More room to plan." : "A clearer experience."}
            </em>
          </h2>
        </div>
        <div>
          <p className="service-intro-text">
            {rentToRent
              ? "JM LetVest becomes your company tenant under a property-specific lease. Our Rent to Rent arrangement gives you an agreed rental payment while we take on the day-to-day management specified in your contract."
              : "Good management starts before a tenant moves in. We help landlords plan the letting, find suitable tenants and keep the practical details organised throughout the tenancy."}
          </p>
          <p>
            {rentToRent
              ? "Every property is different. We assess suitability with you and put the rent, lease period, permitted use and responsibilities in writing, so you can make an informed decision."
              : "You remain the landlord. We agree the work you want us to handle, the decisions that need your approval and how you would like to be kept informed."}
          </p>
          <ul className="service-checklist">
            {points.map((point) => (
              <li key={point}>
                <Check size={19} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section service-process">
        <div className="container-wide">
          <div className="section-head">
            <span className="eyebrow">
              From first conversation to ongoing care
            </span>
            <h2 className="display">How it works.</h2>
            <p>
              A clear process, with the important decisions agreed at each
              stage.
            </p>
          </div>
          <ol className="service-step-grid">
            {(rentToRent ? rentSteps : lettingSteps).map(
              ([title, detail], index) => (
                <li key={title}>
                  <span className="step-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </li>
              ),
            )}
          </ol>
        </div>
      </section>
      {!rentToRent && (
        <section className="section container-wide">
          <div className="agreement-grid">
            <article className="care-card">
              <h2>Tenant Find</h2>
              <p>
                Agree marketing, enquiries, viewings, referencing and move-in
                administration. Your proposal confirms the tasks included and
                landlord fees, including VAT treatment.
              </p>
            </article>
            <article className="care-card">
              <h2>Fully Managed Lettings</h2>
              <p>
                Add agreed rent collection, inspections, maintenance coordination
                and tenant communication. The proposal confirms fees, repair
                approval limits and exclusions. Rental income is not guaranteed.
              </p>
            </article>
          </div>
          <a
            className="text-link"
            href={destination("contact") + "#tenant"}
          >
            Looking for a home? Contact our team →
          </a>
        </section>
      )}
      {rentToRent && <Payments />}
      <Included service={rentToRent ? "rent-to-rent" : "lettings"} />

      {/* Styled accordion matching homepage layout and spacing */}
      <section
        className="section home-faqs-section service-faqs-section"
        id="service-faqs"
        aria-labelledby="service-faq-heading"
      >
        <div className="container-wide">
          <div className="section-head">
            <span className="eyebrow">Before you decide</span>
            <h2 id="service-faq-heading" className="display">
              Your questions,<em>answered clearly.</em>
            </h2>
            <p>
              Clear answers to the practical, financial, and legal questions
              landlords ask most before entering an agreement.
            </p>
          </div>

          <div
            className="faq-accordion-list"
            role="region"
            aria-label="Service FAQs"
          >
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  className={`faq-accordion-item${isOpen ? " is-open" : ""}`}
                  key={question}
                >
                  <button
                    type="button"
                    className="faq-accordion-trigger"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="faq-question-text">{question}</span>
                    <span className="faq-chevron-wrap" aria-hidden="true">
                      <ChevronDown
                        size={20}
                        className={isOpen ? "rotate-180" : ""}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-accordion-content">
                      <p>{answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="faq-support-panel">
            <div className="faq-support-copy">
              <span className="faq-support-icon" aria-hidden="true">
                <MessageSquare size={24} />
              </span>
              <div>
                <h3>Need specific details for your property?</h3>
                <p>
                  Jake &amp; Maddie are always on hand to discuss your property
                  and explain how the contract details and payments work.
                </p>
              </div>
            </div>
            <a className="btn btn-outline-navy" href={destination("contact")}>
              Discuss Your Property <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ServicePage({ view }: { view: string }) {
  const title = titles[view];
  const isService = view === "rent-to-rent" || view === "lettings";
  useEffect(() => {
    document.title = `${title} | JM LetVest Ltd`;
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical)
      canonical.href = new URL(destination(view), window.location.origin).href;
  }, [title, view]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        {isService && (
          <>
            <ServiceHero rentToRent={view === "rent-to-rent"} />
            <ServiceDetails rentToRent={view === "rent-to-rent"} />
          </>
        )}

        {view === "about" && (
          <>
            <AboutHero />
            <div className="container-wide about-page-wrap">
              <FamilyStory />
              <FamilyCommitments />
              <div className="standards-section-block">
                <div className="section-head">
                  <span className="eyebrow">Verified Compliance</span>
                  <h2 className="display">
                    Professional standards<em>and property care.</em>
                  </h2>
                  <p>
                    Clear responsibilities underpin our service. We adhere to
                    statutory data protection, verified redress schemes, and
                    recognized client money protection standards.
                  </p>
                </div>
                <TrustBadges />
              </div>
            </div>
          </>
        )}

        {view === "industry-news" && (
          <>
            <GuidanceHero />
            <LandlordGuidance />
          </>
        )}

        {view === "contact" && (
          <>
            <section className="section page-intro page-intro-compact">
              <div className="container-wide">
                <span className="eyebrow">JM LetVest · West Sussex</span>
                <h1 className="display">{title}</h1>
                <p>Tell us about your property and what matters to you.</p>
              </div>
            </section>
            <section className="section container-wide contact-page">
              <div className="contact-introduction">
                <span className="eyebrow">Property enquiries · West Sussex</span>
                <h2 className="display">Let’s find your next step.</h2>
                <p className="contact-opening">
                  Whether you own a property or you’re looking for a home, tell us
                  what you need. We’ll help you explore the options and explain
                  how we can help.
                </p>
                <div className="contact-email-card">
                  <span>Email our team</span>
                  <a href="mailto:info@jmletvest.com">
                    info@jmletvest.com <ArrowRight size={20} aria-hidden="true" />
                  </a>
                  <p>Serving landlords and tenants across West Sussex.</p>
                </div>
              </div>
              <EmailEnquiries />
            </section>
          </>
        )}

        {view !== "contact" && (
          <section className="section container-wide">
            <div className="personal-cta">
              <h2 className="display">Your property. Your next step.</h2>
              <p>
                Discuss your priorities and ask for a property-specific proposal
                with guaranteed monthly rent.
              </p>
              <a className="btn btn-gold" href={destination("contact")}>
                Request Free Property Appraisal{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </section>
        )}

        {isService && <Reviews />}
      </main>
      <SiteFooter />
    </div>
  );
}
