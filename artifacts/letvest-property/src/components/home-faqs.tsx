import { useState } from "react";
import { ChevronDown, MessageSquare, ArrowRight } from "lucide-react";
import { destination } from "@/components/service-features";
import { siteConfig } from "@/site-config";

export function HomeFaqs() {
  const faqs = [
    {
      q: "How does Rent to Rent actually work?",
      a: "Under our Rent to Rent agreement, JM LetVest leases your property directly from you under a formal commercial company contract. We become your sole tenant, paying you an agreed fixed rent every month. We then manage the rooms for vetted working professionals and NHS key workers. You don't deal with individual occupants, maintenance calls, or tenant disputes.",
    },
    {
      q: "What happens if a room becomes empty or an occupant fails to pay?",
      a: "You continue to receive 100% of your agreed monthly rent. Because JM LetVest is your contractual tenant, we absorb the risk of void periods and non-payment. Your payments arrive on the 1st of every month without interruption.",
    },
    {
      q: "Which utility bills and council tax are covered?",
      a: "Your written proposal confirms the full account schedule. Typically, gas, electricity, water rates, and council tax are managed and paid by JM LetVest for the duration of the agreement. This means no surprise bills or utility changeover headaches for you.",
    },
    {
      q: "How long is the agreement, and can I inspect my property?",
      a: "Contracts typically range from 1 to 5 years, giving you long-term stability and security. You retain complete ownership, and we carry out regular inspections with photographic updates. Landlords are always welcome to inspect the property with agreed prior notice.",
    },
    {
      q: "Who will be living in my property, and how are they vetted?",
      a: "We cater exclusively to working professionals and healthcare/NHS workers who need quality accommodation in West Sussex. Every occupant undergoes strict identity verification, right-to-rent checks, employment referencing, and affordability screening before being admitted.",
    },
    {
      q: "Are there any hidden fees or agency commission?",
      a: "No. Unlike traditional high-street letting agents who deduct 12% to 18% + VAT each month plus tenant-find fees, JM LetVest charges zero commission. The rent agreed in your proposal is the exact amount you receive into your account.",
    },
    {
      q: "Who handles maintenance and repairs?",
      a: "We coordinate routine day-to-day property maintenance and minor repairs up to an agreed threshold at our expense, keeping the house in excellent order. For major structural repairs or capital replacements, we consult you for written approval beforehand.",
    },
    {
      q: "How quickly can you take on my property?",
      a: "Following an initial conversation and property assessment, we can present a written guaranteed offer within 24–48 hours. Once contracts are signed and standard safety certificates are in place, the arrangement can start in as little as 7–14 days.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section home-faqs-section" id="faq" aria-labelledby="home-faq-heading">
      <div className="container-wide">
        <div className="section-head">
          <span className="eyebrow">Frequently Asked Questions</span>
          <h2 id="home-faq-heading" className="display">
            Common questions from landlords.
            <em>Everything explained upfront.</em>
          </h2>
          <p>
            Have a question about how Rent to Rent works for your West Sussex home? Here are the facts landlords ask us most.
          </p>
        </div>

        <div className="faq-accordion-list" role="region" aria-label="Landlord FAQ Accordion">
          {faqs.map(({ q, a }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                className={`faq-accordion-item${isOpen ? " is-open" : ""}`}
                key={index}
              >
                <button
                  type="button"
                  className="faq-accordion-trigger"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  <span className="faq-question-text">{q}</span>
                  <span className="faq-chevron-wrap" aria-hidden="true">
                    <ChevronDown size={20} className={isOpen ? "rotate-180" : ""} />
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-accordion-content">
                    <p>{a}</p>
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
              <h3>Have a specific question about your property?</h3>
              <p>Jake and Maddie are always happy to discuss your home and explain how the numbers work.</p>
            </div>
          </div>
          <a className="btn btn-outline-navy" href={`mailto:${siteConfig.email}?subject=Question%20about%20my%20property`}>
            Ask A Question <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
