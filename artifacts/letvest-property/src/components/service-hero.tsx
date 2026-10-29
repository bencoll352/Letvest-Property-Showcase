import { ArrowRight } from "lucide-react";
import { destination } from "./service-features";

export function ServiceHero({ rentToRent }: { rentToRent: boolean }) {
  return (
    <section className="hero service-hero">
      <div className="hero-media" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}images/${rentToRent ? "english-brick-homes.jpg" : "english-family-home.jpg"}`}
          alt=""
          fetchPriority="high"
        />
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
