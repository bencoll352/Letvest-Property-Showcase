import { Check, X, ShieldCheck, ArrowRight } from "lucide-react";
import { destination } from "@/components/service-features";

export function ComparisonTable() {
  const rows = [
    {
      feature: "Monthly Rental Income",
      traditional: "At risk of tenant rent arrears and late payments",
      letvest: "100% Guaranteed under contract, paid on the 1st of every month",
      advantage: true,
    },
    {
      feature: "Void Periods & Vacancies",
      traditional: "Zero income while finding tenants (averages 4-6 weeks/year)",
      letvest: "Zero void periods — you get paid every single month for 1 to 5 years",
      advantage: true,
    },
    {
      feature: "Management Fees & Commission",
      traditional: "12% – 18% + VAT taken from your rent every month",
      letvest: "0% Commission — no monthly deductions or agent cuts",
      advantage: true,
    },
    {
      feature: "Tenant-Find & Setup Fees",
      traditional: "£300 – £800+ charged each time a new tenant is needed",
      letvest: "£0 Setup fees — we source, vet, and house occupants at our cost",
      advantage: true,
    },
    {
      feature: "Utility Bills & Council Tax",
      traditional: "Landlord pays between tenancies and during vacant spells",
      letvest: "Agreed utilities and council tax covered under your contract",
      advantage: true,
    },
    {
      feature: "Occupant Profile",
      traditional: "Uncertain tenant background and variable room care",
      letvest: "Strictly screened working professionals and NHS healthcare staff",
      advantage: true,
    },
    {
      feature: "Property Care & Cleaning",
      traditional: "Left entirely to tenants, often requiring deposit disputes",
      letvest: "Regular professional cleaning, inspections, and ongoing upkeep",
      advantage: true,
    },
  ];

  return (
    <section className="section comparison-section" id="comparison" aria-labelledby="comparison-heading">
      <div className="container-wide">
        <div className="section-head">
          <span className="eyebrow">Clear Landlord Comparison</span>
          <h2 id="comparison-heading" className="display">
            High-Street Agency vs JM LetVest.
            <em>See the difference side by side.</em>
          </h2>
          <p>
            Why West Sussex property owners are switching from unpredictable AST letting to contractual guaranteed rent.
          </p>
        </div>

        <div className="comparison-table-wrapper" tabIndex={0} role="region" aria-label="Letting comparison table">
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col" className="col-feature">What Matters Most</th>
                <th scope="col" className="col-traditional">Traditional High-Street Letting</th>
                <th scope="col" className="col-letvest">
                  <span className="letvest-header-badge">
                    <ShieldCheck size={18} aria-hidden="true" />
                    JM LetVest Guaranteed Rent
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <th scope="row" className="feature-cell">
                    <strong>{row.feature}</strong>
                  </th>
                  <td className="traditional-cell">
                    <div className="cell-inner">
                      <span className="cell-icon cross" aria-hidden="true">
                        <X size={16} />
                      </span>
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="letvest-cell">
                    <div className="cell-inner">
                      <span className="cell-icon check" aria-hidden="true">
                        <Check size={16} strokeWidth={2.4} />
                      </span>
                      <span>{row.letvest}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="comparison-bottom-banner">
          <div>
            <h3>Ready for guaranteed rental income without the hassle?</h3>
            <p>Request a tailored written appraisal for your property with no obligation.</p>
          </div>
          <a className="btn btn-gold" href={destination("contact")}>
            Request My Free Appraisal <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
