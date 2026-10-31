import { useState } from "react";
import { ChevronDown, MessageSquare, ArrowRight } from "lucide-react";
import { destination } from "@/components/service-features";
import { siteConfig } from "@/site-config";

export function HomeFaqs() {
  const faqs = [
    { q: "Is Rent to Rent suitable for my property?", a: "We assess location, condition, layout and the proposed room use before making an offer. Permissions and any safety, licensing or planning requirements must be considered for the individual property." },
    { q: "Who would live in the property?", a: "We arrange rooms for working professionals and NHS/key workers, subject to screening and suitability. We do not provide family accommodation or claim an NHS partnership." },
    { q: "What does the agreement cover?", a: "Your proposal sets out rent, payment dates, the contractual period, specified bills and property-care responsibilities. The Rent to Rent page explains what to review before proceeding." },
    { q: "How do I get started?", a: "Contact us with the property location, type, bedrooms, condition and availability. We will discuss suitability and the next steps; the offer and start date depend on the property." },
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
              <p>the JM LetVest team are always happy to discuss your home and explain how the numbers work.</p>
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
