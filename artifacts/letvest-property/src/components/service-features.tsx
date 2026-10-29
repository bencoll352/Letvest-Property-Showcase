import {
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
export function Benefits() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="section-head">
          <span className="eyebrow">Property management, made personal</span>
          <h2 className="display">
            More looked after.<em>Still in control.</em>
          </h2>
          <p>
            A capable partner should make ownership feel simpler, with the
            important decisions and details visible to you.
          </p>
        </div>
        <div className="benefit-grid">
          {[
            {
              Icon: Clock,
              title: "More time back",
              text: "Reduce the day-to-day work involved in letting your property.",
            },
            {
              Icon: KeyRound,
              title: "Tenant finding",
              text: "Support with finding suitable occupants for the agreed arrangement.",
            },
            {
              Icon: Wrench,
              title: "Repairs coordination",
              text: "A clear point of contact for maintenance and updates.",
            },
            {
              Icon: ClipboardList,
              title: "Less administration",
              text: "Practical help with messages, paperwork and routine follow-up.",
            },
            {
              Icon: ShieldCheck,
              title: "Compliance coordination",
              text: "Agree support with safety records and property obligations.",
            },
            {
              Icon: CalendarCheck,
              title: "Ongoing oversight",
              text: "Agreed updates so you understand what is happening at your property.",
            },
            {
              Icon: FileText,
              title: "One considered plan",
              text: "Talk through your property, priorities and the service that suits you.",
            },
            {
              Icon: Building2,
              title: "Agreed income options",
              text: "Compare contractual rent with conventional managed letting.",
            },
          ].map(({ Icon, title, text }) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
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
                  : "Rent to Rent includes agreed rent and the bills specified in your contract. Lettings fees and bill responsibilities are agreed separately; managed letting does not include guaranteed rental income."}
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
export function Payments() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="section-head">
          <span className="eyebrow">Guaranteed Rent · responsibilities</span>
          <h2 className="display">
            Who pays<em>for what?</em>
          </h2>
          <p>
            A clear schedule of responsibilities is part of your rental
            proposal.
          </p>
        </div>
        <div className="agreement-grid">
          {[
            [
              "Agreed rent",
              "JM LetVest pays the agreed rent under the contract. Void-period and occupant non-payment protection are subject to its terms.",
            ],
            [
              "Utilities and bills",
              "JM LetVest covers the utilities and bills specified in the agreement. The proposal should identify each account, including any council tax arrangements.",
            ],
            [
              "Repairs and maintenance",
              "The agreement sets out routine maintenance, major repairs, approval limits and exclusions. Not every repair is automatically included.",
            ],
            [
              "Insurance and safety",
              "Confirm insurance, mortgage or lease consent, certificates and statutory responsibilities before proceeding. Contractual allocations do not remove legal duties.",
            ],
          ].map(([title, text]) => (
            <article className="care-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
