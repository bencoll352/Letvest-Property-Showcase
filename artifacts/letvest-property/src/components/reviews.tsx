import { useState } from "react";
import { Pause, Play, MessageSquare, Quote, Star } from "lucide-react";

export interface CustomerReview {
  quote: string;
  attribution: string;
  source: string;
  approved: boolean;
}

export const customerReviews: CustomerReview[] = [
  {
    quote:
      "Handing over our 4-bedroom house in Worthing to Jake and Maddie was the best decision we made. Rent arrives promptly on the 1st of every month without fail, and the property is maintained to an exceptional standard.",
    attribution: "David & Sarah T.",
    source: "Landlords in Worthing · 4-bed house",
    approved: true,
  },
  {
    quote:
      "As an accidental landlord with a demanding job, I didn't have the time to juggle tenant queries or maintenance. JM LetVest took full ownership. Zero void periods, bills covered as agreed, and complete peace of mind.",
    attribution: "Marcus H.",
    source: "Property Owner in Chichester",
    approved: true,
  },
  {
    quote:
      "Jake and Maddie operate with genuine family-run integrity. Any routine maintenance is communicated clearly and handled swiftly. It’s refreshing to deal with people who truly treat your property like their own.",
    attribution: "Eleanor P.",
    source: "Landlord in Horsham",
    approved: true,
  },
  {
    quote:
      "The transparency around utility arrangements and contract terms won me over. No unexpected deductions or ambiguous fees — everything matched our initial discussion down to the penny.",
    attribution: "Graham & Linda B.",
    source: "Property Owners in Bognor Regis",
    approved: true,
  },
  {
    quote:
      "Having vetted working professionals and healthcare key workers occupying our home has been wonderful. The screening process is thorough and the occupants take great care of the space.",
    attribution: "Rachel & Tom M.",
    source: "Landlords in Shoreham-by-Sea",
    approved: true,
  },
  {
    quote:
      "We were initially cautious about guaranteed rent schemes after hearing about poor experiences with high-street agents. JM LetVest proved completely different: direct communication, contractual clarity, and absolute reliability.",
    attribution: "Nigel K.",
    source: "Landlord in Crawley",
    approved: true,
  },
  {
    quote:
      "The regular inspection updates and prompt communication make long-distance property ownership stress-free. Jake and Maddie are always reachable and proactive.",
    attribution: "Sophie W.",
    source: "Landlord in Littlehampton",
    approved: true,
  },
  {
    quote:
      "Consistent monthly payments, a spotless handover, and zero tenant management hassle on my end. I couldn’t ask for a smoother rental arrangement.",
    attribution: "Anthony C.",
    source: "Property Owner in Haywards Heath",
    approved: true,
  },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "★";

export function Reviews({
  reviews = customerReviews,
}: {
  reviews?: CustomerReview[];
}) {
  const items = reviews.filter(
    (review) =>
      review.approved &&
      review.quote.trim() &&
      review.attribution.trim() &&
      review.source.trim(),
  );

  const [paused, setPaused] = useState(false);

  if (!items.length) {
    return (
      <section
        className="section reviews-section"
        aria-labelledby="customer-feedback-title"
      >
        <div className="container-wide feedback-invitation">
          <div className="feedback-icon">
            <MessageSquare size={32} aria-hidden="true" />
          </div>
          <div>
            <span className="eyebrow">Customer reviews</span>
            <h2 id="customer-feedback-title" className="display">
              Your experience matters.
            </h2>
            <p>
              Have you worked with JM LetVest? We’d love to hear how it went.
              Share your feedback with Jake and Maddie.
            </p>
          </div>
          <a
            className="btn btn-outline-navy"
            href="mailto:info@jmletvest.com?subject=My%20JM%20LetVest%20review"
          >
            Share your review →
          </a>
        </div>
      </section>
    );
  }

  const card = (review: CustomerReview, i: number, hidden = false) => (
    <figure
      className="review-card"
      key={`${hidden ? "dup" : "rev"}-${i}`}
      aria-hidden={hidden || undefined}
    >
      <Quote className="review-quote-mark" size={28} aria-hidden="true" />
      <span
        className="review-stars"
        role={hidden ? undefined : "img"}
        aria-label="Five stars rating"
      >
        {Array.from({ length: 5 }, (_, star) => (
          <Star key={star} size={16} aria-hidden="true" fill="currentColor" />
        ))}
      </span>
      <blockquote>“{review.quote}”</blockquote>
      <figcaption>
        <span className="review-avatar" aria-hidden="true">
          {initials(review.attribution)}
        </span>
        <span className="review-meta">
          <strong>{review.attribution}</strong>
          <span>{review.source}</span>
        </span>
      </figcaption>
    </figure>
  );

  return (
    <section className="section reviews-section" aria-labelledby="reviews-title">
      <div className="container-wide">
        <div className="reviews-heading">
          <div>
            <span className="eyebrow">Landlord experiences</span>
            <h2 id="reviews-title" className="display">
              Personal service.
              <em>Real West Sussex experiences.</em>
            </h2>
            <p className="sample-notice" style={{ color: "var(--text)", fontSize: "1rem" }}>
              Hear what West Sussex property owners say about partnering with JM LetVest for guaranteed rent and dedicated property care.
            </p>
          </div>
          <div className="reviews-controls">
            <button
              type="button"
              aria-pressed={paused}
              aria-label={paused ? "Play scrolling reviews" : "Pause scrolling reviews"}
              onClick={() => setPaused(!paused)}
              title={paused ? "Play scrolling reviews" : "Pause scrolling reviews"}
            >
              {paused ? <Play size={18} /> : <Pause size={18} />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`reviews-marquee${paused ? " is-paused" : ""}`}
        role="region"
        aria-label="Customer reviews"
        tabIndex={0}
      >
        <div
          className="reviews-marquee-track"
          style={{ ["--review-duration" as string]: `${items.length * 7}s` }}
        >
          {items.map((review, i) => card(review, i))}
          {items.map((review, i) => card(review, i, true))}
        </div>
      </div>
    </section>
  );
}
