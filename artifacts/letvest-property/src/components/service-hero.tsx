export function ServiceHero({ rentToRent }: { rentToRent: boolean }) {
  return (
    <section className="hero service-hero">
      <div className="hero-media" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}images/english-family-home.jpg`}
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
