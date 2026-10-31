import { Check, X, ShieldCheck, ArrowRight } from "lucide-react";
import { destination } from "@/components/service-features";

export function ComparisonTable() {
  const rows = [
    { feature: "Rental payments", traditional: "Income comes from the residential tenant; arrears can affect receipts.", letvest: "JM LetVest pays the rent agreed in your lease, on the agreed schedule.", advantage: true },
    { feature: "Vacant periods", traditional: "An empty property can mean a break in rental income.", letvest: "Vacant-period and occupant non-payment cover are defined by your contract.", advantage: true },
    { feature: "Fees and costs", traditional: "Agent fees and any additional charges depend on the service agreed.", letvest: "Review the proposed rent, any charges and ownership costs before signing.", advantage: true },
    { feature: "Utilities and bills", traditional: "Responsibility depends on the tenancy and whether the property is occupied.", letvest: "The written account schedule confirms covered bills, limits and exclusions.", advantage: true },
    { feature: "Day-to-day management", traditional: "You manage the tenancy or instruct an agent for an agreed scope.", letvest: "JM LetVest coordinates room management and property care within the agreed scope.", advantage: true },
  ];

  return (
    <section className="section comparison-section" id="comparison" aria-labelledby="comparison-heading">
      <div className="container-wide">
        <div className="section-head">
          <span className="eyebrow">Clear Landlord Comparison</span>
          <h2 id="comparison-heading" className="display">
            A clearer choice for landlords.
            <em>See the difference side by side.</em>
          </h2>
          <p>
            Compare who pays the rent and who handles the day-to-day work. Your written agreement sets the terms for your property.
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
