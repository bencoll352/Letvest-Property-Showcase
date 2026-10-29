import { BookOpen, ArrowUpRight } from "lucide-react";
const renterResources = [
  {
    title: "Renters’ Rights: what has changed?",
    topic: "Landlords",
    icon: "01",
    summary:
      "Understand the tenancy reforms and check the rules that apply to your property.",
    url: "https://www.gov.uk/guidance/renters-rights-act-an-overview-for-landlords",
  },
  {
    title: "The official Information Sheet",
    topic: "Essential document",
    icon: "02",
    summary:
      "Download the government’s Information Sheet and check who must receive it, when and how.",
    url: "https://www.gov.uk/government/publications/the-renters-rights-act-information-sheet-2026",
  },
  {
    title: "Renting a home: know your rights",
    topic: "Renters",
    icon: "03",
    summary:
      "A starting point for tenants, covering the changes to private renting and where to find official guidance.",
    url: "https://www.gov.uk/guidance/renters-rights-act-overview-for-tenants",
  },
];
const briefings = [
  {
    title: "Renters’ Rights: the landlord overview",
    source: "Ministry of Housing, Communities & Local Government · GOV.UK",
    url: "https://www.gov.uk/guidance/renters-rights-act-an-overview-for-landlords",
    topic: "Tenancy reform",
    summary:
      "A change in legislation can affect tenancy documents, possession routes, notices and operating procedures. Commencement and transition provisions matter as much as the headline announcement.",
    steps: [
      "Check which provisions apply to your tenancy and when they take effect.",
      "Review tenancy paperwork, notices and processes against the official guidance.",
      "Do not assume a commercial lease removes obligations relating to residential occupants.",
    ],
  },
  {
    title: "Gas safety: annual checks and a clear paper trail",
    source: "Health and Safety Executive (HSE)",
    url: "https://www.hse.gov.uk/gas/landlords/",
    topic: "Property safety",
    summary:
      "Where the landlord gas safety duties apply, relevant appliances and flues need an annual safety check by a suitably qualified Gas Safe registered engineer. Existing tenants generally receive the record within 28 days; new tenants receive it before moving in.",
    steps: [
      "Arrange checks before the due date and verify the engineer’s qualifications.",
      "Keep gas safety records for at least two years.",
      "Agree access, remedial work and record delivery responsibilities.",
    ],
  },
  {
    title: "Deposits: protect the money and provide the information",
    source: "GOV.UK · Tenancy deposit protection",
    url: "https://www.gov.uk/tenancy-deposit-protection",
    topic: "Tenancy administration",
    summary:
      "For tenancies covered by the statutory protection rules, the deposit must be protected in an approved scheme and the required information provided within 30 days of receipt. Check applicability to the actual tenancy.",
    steps: [
      "Identify who receives the deposit and who completes the protection process.",
      "Keep proof of protection and delivery of prescribed information.",
      "Use an inventory and condition record to support fair end-of-tenancy decisions.",
    ],
  },
  {
    title: "Electrical safety: inspections and action on findings",
    source: "GOV.UK · Electrical safety standards guidance",
    url: "https://www.gov.uk/government/publications/electrical-safety-standards-in-the-private-rented-sector-guidance-for-landlords-tenants-and-local-authorities",
    topic: "Property safety",
    summary:
      "For private rented properties covered by the regulations, electrical installations must be inspected and tested by a qualified person at intervals of no more than five years, or sooner if the report requires it.",
    steps: [
      "Check the next inspection date and any shorter interval specified.",
      "Provide the report to tenants within the required timeframe.",
      "Complete required remedial work within the applicable deadline and retain confirmation.",
    ],
  },
  {
    title: "Property licensing: check the address, not just the property type",
    source: "GOV.UK and the property’s local authority",
    url: "https://www.gov.uk/house-in-multiple-occupation-licence",
    topic: "Licensing & occupancy",
    summary:
      "Mandatory HMO licensing generally covers properties occupied by five or more people forming more than one household and sharing facilities. Additional and selective licensing can apply more widely, depending on the council’s schemes.",
    steps: [
      "Check the local council’s current schemes for the exact address.",
      "Confirm household numbers, occupancy limits and permitted use.",
      "Check planning requirements separately from licensing requirements.",
    ],
  },
  {
    title: "Energy performance: understand the existing minimum standard",
    source: "Department for Energy Security & Net Zero · GOV.UK",
    url: "https://www.gov.uk/guidance/domestic-private-rented-property-minimum-energy-efficiency-standard-landlord-guidance",
    topic: "Energy & property planning",
    summary:
      "For domestic private rented properties within scope, the established minimum is EPC band E unless a valid exemption applies. Proposed future standards should be distinguished from requirements already in force.",
    steps: [
      "Check whether the property and tenancy fall within scope.",
      "Review the EPC and any registered exemption before letting.",
      "Confirm current requirements before budgeting for improvement works.",
    ],
  },
];
export function LandlordGuidance() {
  return (
    <section className="section container-wide">
      <div className="news-introduction">
        <BookOpen aria-hidden="true" />
        <div>
          <span className="eyebrow">Information for landlords & renters</span>
          <h2 className="display">A clearer view of renting.</h2>
          <p>
            Useful starting points, practical property guidance and direct links
            to official sources.
          </p>
        </div>
      </div>
      <section className="renter-resources" aria-labelledby="renter-title">
        <h2 id="renter-title">Start here: Renters’ Rights resources</h2>
        <p>
          Understand the changes, find the official Information Sheet and check
          what they mean for your tenancy in England.
        </p>
        <div className="resource-grid">
          {renterResources.map((item) => (
            <article className="resource-card" key={item.title}>
              <div className="resource-top">
                <span className="resource-number" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="eyebrow">{item.topic}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <a href={item.url} target="_blank" rel="noreferrer">
                Read on GOV.UK <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
      <h2 className="guidance-title">Practical guides for your property</h2>
      <p className="news-source-note">
        General guidance for England. Check the linked official source for the
        current rules and how they apply to your tenancy.
      </p>
      <div className="news-briefings">
        {briefings.map((item) => (
          <article className="news-briefing" key={item.title}>
            <span className="eyebrow">{item.topic}</span>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <details>
              <summary>What to check</summary>
              <ul>
                {item.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </details>
            <div className="news-source">
              <strong>Source: {item.source}</strong>
              <a href={item.url} target="_blank" rel="noreferrer">
                Read the official guidance{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
