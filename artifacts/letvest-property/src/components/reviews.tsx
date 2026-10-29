import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  MessageSquare,
  Star,
} from "lucide-react";

export interface CustomerReview {
  quote: string;
  attribution: string;
  source: string;
  approved: boolean;
}
// Populate only with genuine reviews and permission to display the attribution.
export const customerReviews: CustomerReview[] = [];
export const sampleReviews: CustomerReview[] = [
  "The proposal made the rent, bills and responsibilities easy to understand.",
  "A personal approach that took the time to understand what mattered to us.",
  "We appreciated having the management scope explained in plain English.",
  "The discussion helped us compare the two services with confidence.",
  "Knowing who to contact about maintenance made the process feel simpler.",
  "It was helpful to see the costs and exclusions set out together.",
  "The property appraisal gave us a clear starting point for our plans.",
  "We valued the focus on finding the right arrangement for our home.",
  "The emphasis on communication and agreed updates was reassuring.",
  "Having the handover details explained helped us plan ahead.",
  "The team’s local approach was exactly what we were looking for.",
  "A straightforward conversation about our property and our priorities.",
].map((quote, index) => ({
  quote,
  attribution: `Sample review ${String(index + 1).padStart(2, "0")}`,
  source: "Layout demonstration only",
  approved: true,
}));

export function Reviews({
  reviews = customerReviews.length ? customerReviews : sampleReviews,
}: {
  reviews?: CustomerReview[];
}) {
  const isSample = reviews.some(
    (review) => review.source === "Layout demonstration only",
  );
  const items = reviews
    .filter(
      (review) =>
        review.approved &&
        review.quote.trim() &&
        review.attribution.trim() &&
        review.source.trim(),
    )
    .slice(0, 12);
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!touchPaused) return;
    const timer = window.setTimeout(() => setTouchPaused(false), 8000);
    return () => clearTimeout(timer);
  }, [touchPaused]);
  const move = (direction: number) => {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 24;
    const max = Math.max(
      0,
      Math.ceil((element.scrollWidth - element.clientWidth) / step),
    );
    const current = Math.round(element.scrollLeft / step);
    const next =
      direction > 0
        ? current >= max
          ? 0
          : current + 1
        : current <= 0
          ? max
          : current - 1;
    element.scrollTo({
      left: next * step,
      behavior: reduced ? "instant" : "smooth",
    });
    setIndex(next);
  };
  useEffect(() => {
    if (paused || interacting || touchPaused || reduced || items.length < 2)
      return;
    const timer = window.setInterval(() => move(1), 4500);
    return () => clearInterval(timer);
  }, [paused, interacting, touchPaused, reduced, items.length]);
  if (!items.length)
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
  return (
    <section
      className="section reviews-section"
      aria-label="Customer reviews"
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setInteracting(false);
      }}
    >
      <div className="container-wide">
        <div className="reviews-heading">
          <div>
            <span className="eyebrow">
              {isSample ? "Reviews" : "In our customers’ words"}
            </span>
            <h2 className="display">
              {isSample ? (
                <>
                  Personal service.<em>Thoughtful property care.</em>
                </>
              ) : (
                <>
                  Personal service.<em>Real experiences.</em>
                </>
              )}
            </h2>
          </div>
          <div className="reviews-controls">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => move(-1)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label={paused ? "Play reviews" : "Pause reviews"}
              onClick={() => setPaused(!paused)}
            >
              {paused ? <Play /> : <Pause />}
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => move(1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        {isSample && (
          <p className="sample-notice">
            Example reviews shown for illustration. Customer testimonials will
            be added when available.
          </p>
        )}
        <div
          ref={track}
          className="reviews-track"
          tabIndex={0}
          aria-label="Customer review carousel"
          onTouchStart={() => setTouchPaused(true)}
          onScroll={() => {
            const el = track.current;
            const first = el?.firstElementChild as HTMLElement | null;
            if (el && first)
              setIndex(Math.round(el.scrollLeft / (first.offsetWidth + 24)));
          }}
        >
          {items.map((review, i) => (
            <figure className="review-card" key={`${review.attribution}-${i}`}>
              <span
                className="review-stars"
                role="img"
                aria-label={
                  isSample
                    ? "Five stars — illustrative sample rating"
                    : "Five stars"
                }
              >
                {Array.from({ length: 5 }, (_, star) => (
                  <Star key={star} size={20} aria-hidden="true" />
                ))}
              </span>
              {isSample && <small>Illustrative example</small>}
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <strong>{review.attribution}</strong>
                <span>{review.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="review-position" aria-live={paused ? "polite" : "off"}>
          Review {index + 1} of {items.length}
        </p>
      </div>
    </section>
  );
}
