import { useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import { LandlordGuidance } from "@/components/landlord-guidance";
import { Reviews } from "@/components/reviews";
import { FamilyStory, FamilyCommitments } from "@/components/family-story";
import { EnquiryForm } from "@/components/enquiry-form";
import { Included, Payments, destination } from "@/components/service-features";
import { ServiceHero } from "@/components/service-hero";
import { TrustBadges } from "@/components/trust-badges";
import { SiteFooter } from "./home";

const titles: Record<string, string> = {
  "rent-to-rent": "Rent to Rent",
  lettings: "Lettings",
  about: "About us",
  "industry-news": "Industry News",
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
  const faqs = rentToRent
    ? [
        [
          "How is Rent to Rent different from managed letting?",
          "JM LetVest leases the property from you and arranges its agreed onward use. Under conventional managed letting, you let directly to the residential tenant and appoint us to manage the agreed tasks.",
        ],
        [
          "What happens if the property is empty?",
          "The agreed rent is payable under the contract. Check the provisions covering void periods, payment obligations, exclusions and any circumstances that allow the arrangement to end.",
        ],
        [
          "Who pays for repairs and bills?",
          "Your proposal identifies the utilities and bills covered by JM LetVest. Repairs, major works, spending approvals and exclusions are set out separately; no blanket repair cover is promised.",
        ],
        [
          "Who will live in my property?",
          "We discuss the proposed occupant profile and screening process with you. Permitted use and any occupancy restrictions must be recorded in the agreement.",
        ],
      ]
    : [
        [
          "Can I choose the level of management?",
          "We discuss the support you need and confirm the service scope in writing, including inspections, rent collection, maintenance coordination and updates.",
        ],
        [
          "Is my rent guaranteed?",
          "No. Under Fully Managed Lettings the tenant pays the rent, and arrears or empty periods can affect the income you receive. Rent to Rent is a separate contractual arrangement.",
        ],
        [
          "What will management cost?",
          "Ask for a written proposal detailing landlord fees, any additional charges and the payment schedule before you instruct us. This website does not quote a standard fee.",
        ],
        [
          "Can you help me find a home?",
          "Yes. Send your preferred area, budget and requirements to info@jmletvest.com. We can discuss suitable properties and arrange viewings where homes are available.",
        ],
      ];
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
              ? "Letting a property should fit around your life. Our Rent to Rent arrangement gives you an agreed rental payment while we take on the day-to-day management specified in your contract."
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
      {rentToRent && <Payments />}
      <Included />
      <section className="section container-wide service-questions">
        <div>
          <span className="eyebrow">Before you decide</span>
          <h2 className="display">
            Your questions,<em>answered clearly.</em>
          </h2>
          <a
            className="text-link"
            href={destination(rentToRent ? "lettings" : "rent-to-rent")}
          >
            Compare {rentToRent ? "Fully Managed Lettings" : "Rent to Rent"}{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
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
      <header className="page-header container-wide">
        <a href={import.meta.env.BASE_URL} aria-label="JM LetVest home">
          <img
            className="brand-logo"
            src={`${import.meta.env.BASE_URL}letvest-logo-sm.png`}
            alt="JM LetVest Ltd"
            width="600"
            height="400"
          />
        </a>
        <nav aria-label="Page navigation">
          {Object.entries(titles).map(([key, label]) => (
            <a
              key={key}
              aria-current={key === view ? "page" : undefined}
              href={destination(key)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main-content">
        {isService ? (
          <>
            <ServiceHero rentToRent={view === "rent-to-rent"} />
            <ServiceDetails rentToRent={view === "rent-to-rent"} />
          </>
        ) : (
          <section className="section page-intro">
            <div className="container-wide">
              <span className="eyebrow">JM LetVest · West Sussex</span>
              <h1 className="display">{title}</h1>
              <p>
                {view === "about"
                  ? "Local roots. A personal approach to property."
                  : view === "contact"
                    ? "Tell us about your property and what matters to you."
                    : "Property guidance and official updates for landlords in England."}
              </p>
            </div>
          </section>
        )}
        {view === "about" && (
          <section className="section container-wide">
            <FamilyStory />
            <FamilyCommitments />
            <h2 className="display">
              Professional standards and property care
            </h2>
            <p>
              Clear responsibilities underpin our service. We discuss property
              safety, reporting, privacy and how concerns are handled before you
              proceed.
            </p>
            <TrustBadges />
          </section>
        )}
        {view === "contact" && (
          <section className="section container-wide contact-grid">
            <div>
              <h2 className="display">Let’s start a conversation.</h2>
              <p>
                Landlord, property owner or looking for a home? Email your
                requirements and we will discuss the next step.
              </p>
              <a href="mailto:info@jmletvest.com">info@jmletvest.com</a>
              <p>West Sussex, United Kingdom</p>
            </div>
            <EnquiryForm />
          </section>
        )}
        {view === "industry-news" && <LandlordGuidance />}
        {view !== "contact" && (
          <section className="section container-wide">
            <div className="personal-cta">
              <h2 className="display">Your property. Your next step.</h2>
              <p>
                Discuss your priorities and ask for a property-specific
                proposal.
              </p>
              <a className="btn btn-gold" href={destination("contact")}>
                Contact us <ArrowRight size={18} aria-hidden="true" />
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
