import {
  MessagesSquare,
  Clock,
  KeyRound,
  Wrench,
  ClipboardList,
  ShieldCheck,
  CalendarCheck,
  FileText,
  Building2,
  Check,
  ArrowRight,
} from "lucide-react";
export const destination = (page: string) =>
  `${import.meta.env.BASE_URL}?view=${page}`;
export function Benefits(){return <section className="section benefits-section"><div className="container-wide"><div className="section-head"><span className="eyebrow">A personal approach</span><h2 className="display">Less to manage.<em>More room to plan.</em></h2></div><div className="benefit-grid">{[{Icon:FileText,title:'Rental options explained clearly',text:'Understand the agreed rent, payment schedule and contract terms.'},{Icon:KeyRound,title:'Room occupant management',text:'Agree the right level of support for your property and priorities.'},{Icon:Wrench,title:'Care and maintenance coordination',text:'Clear responsibilities, reporting and approval arrangements.'},{Icon:MessagesSquare,title:'Personal communication',text:'A family-run business with straightforward conversations at its heart.'}].map(({Icon,title,text})=><article key={title}><Icon aria-hidden="true"/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>}
export function Included({
  service,
}: {
  service?: "rent-to-rent" | "lettings";
}) {
  return (
    <section className="section care-inclusions" id="property-care">
      <div className="container-wide">
        <div className="care-intro">
          <div>
            <span className="eyebrow">Responsible property care</span>
            <h2 className="display">
              Clarity for the owner.<em>Care for the home.</em>
            </h2>
          </div>
          <p>
            Know what’s included — and what isn’t. One clear proposal brings
            together property care, costs and the decisions that stay with you.
          </p>
        </div>
        <div className="care-detail-grid">
          {[
            {
              Icon: CalendarCheck,
              title: "Inspections & updates",
              detail:
                "Agree visit frequency, access arrangements and how findings are reported.",
              boundary:
                "Included scope: the inspection and reporting schedule in your proposal.",
            },
            {
              Icon: Wrench,
              title: "Maintenance & approvals",
              detail:
                "A clear route for reporting issues and coordinating agreed work.",
              boundary:
                "Your decision: spending limits, major works and repair exclusions.",
            },
            {
              Icon: ShieldCheck,
              title: "Safety & records",
              detail:
                "Confirm who arranges relevant checks and keeps the property records.",
              boundary:
                "Your responsibility: legal duties and any consents remain applicable.",
            },
            {
              Icon: KeyRound,
              title: "Handover & exit",
              detail:
                "Record condition, inventories and the agreed handover process.",
              boundary:
                "Check the terms: contract length, notice, exit and end-of-term costs.",
            },
          ].map(({ Icon, title, detail, boundary }) => (
            <article className="care-detail" key={title}>
              <span className="care-icon">
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{detail}</p>
              <div className="care-boundary">{boundary}</div>
            </article>
          ))}
        </div>
        <div className="care-summary">
          <span className="care-summary-icon">
            <FileText size={28} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <div className="care-summary-copy">
            <h3>
              {service === "rent-to-rent"
                ? "Your rental agreement, clearly set out."
                : service === "lettings"
                  ? "Your management service, clearly agreed."
                  : "Rent, bills and fees — in writing."}
            </h3>
            <p>
              {service === "rent-to-rent"
                ? "Your written proposal confirms the agreed rent, payment schedule and bills covered, alongside maintenance responsibilities and any exclusions."
                : service === "lettings"
                  ? "Your proposal sets out the management scope, landlord fees, rent collection and responsibilities for bills and repairs. Rental income is paid by the tenant and is not guaranteed."
                  : "Rent to Rent includes agreed rent and the bills specified in your contract. Check payment terms, maintenance responsibilities, limits and exclusions before signing."}
            </p>
          </div>
          <a href={destination("contact")} className="btn care-summary-button">
            Discuss your proposal <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
export function Payments(){return <section className="section container-wide"><div className="section-head"><span className="eyebrow">Rent to Rent · costs</span><h2 className="display">Who pays for what?</h2><p>Utilities and bills are covered within the Rent to Rent offer. The written schedule identifies the individual accounts and any limits before you sign.</p></div><div className="compare-scroll" tabIndex={0} role="region" aria-label="Rent to Rent bill responsibilities"><table className="responsibility-table"><caption>Bill coverage and ownership costs</caption><thead><tr><th scope="col">Cost</th><th scope="col">What your proposal must confirm</th></tr></thead><tbody>{[['Utilities and bills','Covered within the offer; request the full account schedule and any limits.'],['Electricity, gas and water','Identify the accounts, gas where applicable, transfer arrangements and any caps.'],['Council tax and broadband','Confirm applicability and inclusion for each property. Broadband inclusion has not been confirmed.'],['Mortgage, buildings insurance and service charges','Separate ownership expenses; do not assume these are covered by the bills offer.'],['Routine maintenance and major repairs','Confirm the split of responsibility, spending approvals and exclusions.']].map(([cost,detail])=><tr key={cost}><th scope="row">{cost}</th><td>{detail}</td></tr>)}</tbody></table></div><div className="offer-process"><h2 className="display">From property enquiry to a written offer.</h2><ol>{[['Discuss the home','Share location, bedrooms, condition and availability. We discuss suitable use and any permissions needed.'],['Review the offer','Check the proposed rent and its assumptions, commencement date, payment frequency, contractual period and vacant-period cover.'],['Agree the practical details','Record permitted occupants, inspections, repairs, reporting, notice and handover arrangements before signing.']].map(([title,text])=><li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>}
