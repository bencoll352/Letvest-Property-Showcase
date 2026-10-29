import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { destination } from "./service-features";

export function ServiceHero({ rentToRent }: { rentToRent: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultPlaybackRate = 0.5;
    video.playbackRate = 0.5;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => {});
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return (
    <section className="hero service-hero">
      <div className="hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${import.meta.env.BASE_URL}images/home-hero-poster.jpg`}
          tabIndex={-1}
        >
          <source
            src={`${import.meta.env.BASE_URL}hero-house-fronts.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
      <div className="container-wide hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            {rentToRent ? "Rent to Rent" : "Fully Managed Lettings"} · West
            Sussex
          </span>
          <h1 className="display">
            {rentToRent ? "Your property." : "Your letting."}
            <em>
              {rentToRent ? "A more predictable income." : "In capable hands."}
            </em>
          </h1>
          <p className="hero-lead">
            {rentToRent
              ? "Agreed rent. Bills covered as agreed. A personal approach that takes the day-to-day work off your hands."
              : "From finding a tenant to looking after the details, we help you manage your property with confidence."}
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold" href={destination("contact")}>
              {rentToRent
                ? "Request your rental offer"
                : "Book a free appraisal"}{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="btn btn-outline-navy" href="#service-detail">
              Explore the service
            </a>
          </div>
          <p className="service-hero-note">
            {rentToRent
              ? "Rental income and bill cover are subject to your property-specific contract."
              : "Landlord fees apply. Rental income is received from the tenant and is not guaranteed."}
          </p>
        </div>
      </div>
    </section>
  );
}
