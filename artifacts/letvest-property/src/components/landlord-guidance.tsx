import { BookOpen, ArrowUpRight, ShieldCheck, CheckCircle2, AlertCircle, FileText, ArrowRight, HelpCircle } from "lucide-react";
import { destination } from "@/components/service-features";

const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const renterResources = [
  {
    title: "Renters’ Rights: What Has Changed?",
    topic: "Tenancy Reform",
    icon: "01",
    summary:
      "Understand the key statutory tenancy reforms, revised possession grounds, and the timetable of changes applying across England.",
    url: "https://www.gov.uk/guidance/renters-rights-act-an-overview-for-landlords",
  },
  {
    title: "The Official Landlord Information Sheet",
    topic: "Essential Document",
    icon: "02",
    summary:
      "Download the government’s statutory Information Sheet and check who must receive it, statutory delivery deadlines, and compliance requirements.",
    url: "https://www.gov.uk/government/publications/the-renters-rights-act-information-sheet-2026",
  },
  {
    title: "Private Renting: Rights & Responsibilities",
    topic: "Renting Standards",
    icon: "03",
    summary:
      "Official government starting point for understanding rights, contract obligations, and statutory landlord duty frameworks.",
    url: "https://www.gov.uk/guidance/renters-rights-act-overview-for-tenants",
  },
];

const briefings = [
  {
    title: "Renters’ Rights: Comprehensive Landlord Overview",
    source: "Ministry of Housing, Communities & Local Government · GOV.UK",
    url: "https://www.gov.uk/guidance/renters-rights-act-an-overview-for-landlords",
    topic: "Tenancy Reform",
    summary:
      "Statutory changes affect tenancy documentation, Section 21 possession notices, rent increase procedures, and pet requests. Understanding transition provisions is crucial.",
    steps: [
      "Identify which provisions apply to your existing tenancy agreements and when commencement rules apply.",
      "Update standard tenancy paperwork, notices, and tenant communication templates.",
      "Note that commercial company lets (such as JM LetVest) operate under separate commercial legal frameworks.",
    ],
  },
  {
    title: "Gas Safety: Annual Inspections & Audit Trails",
    source: "Health and Safety Executive (HSE)",
    url: "https://www.hse.gov.uk/gas/landlords/",
    topic: "Property Safety",
    summary:
      "All gas appliances and flues must undergo an annual safety check by a Gas Safe registered engineer. Existing occupants must receive the record within 28 days; new occupants must receive it before move-in.",
    steps: [
      "Schedule Gas Safe inspections ahead of expiry and verify the engineer's registration ID.",
      "Retain all gas safety CP12 certificates securely for a minimum of two years.",
      "Under JM LetVest Rent to Rent, we assist in coordinating annual Gas Safe inspections directly.",
    ],
  },
  {
    title: "Deposit Protection: Statutory Escrow & Prescribed Info",
    source: "GOV.UK · Tenancy Deposit Protection",
    url: "https://www.gov.uk/tenancy-deposit-protection",
    topic: "Financial Compliance",
    summary:
      "Where statutory deposit protection applies to an AST, the security deposit must be lodged in a government-approved scheme (DPS, TDS, or MyDeposits) within 30 days.",
    steps: [
      "Confirm whether your letting structure requires statutory scheme protection.",
      "Serve the required Prescribed Information and scheme leaflet within 30 calendar days.",
      "Maintain check-in photographic inventories to ensure fair, undisputed deposit adjudication.",
    ],
  },
  {
    title: "Electrical Safety Standards (EICR): 5-Year Inspection Cycle",
    source: "GOV.UK · Electrical Safety Standards in Private Rented Sector",
    url: "https://www.gov.uk/government/publications/electrical-safety-standards-in-the-private-rented-sector-guidance-for-landlords-tenants-and-local-authorities",
    topic: "Electrical Safety",
    summary:
      "All electrical installations in private residential tenancies must be inspected and tested by a qualified electrician at least every five years, obtaining a satisfactory EICR report.",
    steps: [
      "Check the expiry date on your latest Electrical Installation Condition Report (EICR).",
      "Ensure any Code C1, C2, or FI investigative remedial works are completed within 28 days.",
      "Provide copies of the report to all existing tenants and local authorities on request.",
    ],
  },
  {
    title: "Property Licensing: Mandatory, Additional & Selective Schemes",
    source: "GOV.UK & Local Authority Guidelines",
    url: "https://www.gov.uk/house-in-multiple-occupation-licence",
    topic: "HMO & Licensing",
    summary:
      "Mandatory HMO licensing covers properties with 5 or more occupants forming more than 1 household sharing facilities. Individual councils across Sussex can also impose Additional or Selective licensing zones.",
    steps: [
      "Check with your local council (e.g. Worthing, Arun, Chichester, Crawley) for active licensing schemes.",
      "Confirm maximum room occupancies, communal amenity standards, and fire safety provisions.",
      "Check planning permission (C4 vs C3 use class) independently from licensing rules.",
    ],
  },
  {
    title: "Energy Efficiency (EPC): Current Standards & Future Planning",
    source: "Department for Energy Security & Net Zero · GOV.UK",
    url: "https://www.gov.uk/guidance/domestic-private-rented-property-minimum-energy-efficiency-standard-landlord-guidance",
    topic: "Energy & EPC",
    summary:
      "The legal minimum EPC rating for domestic private rented property remains Band E unless a valid exemption is registered on the PRS Exemptions Register.",
    steps: [
      "Verify that your property has a valid, in-date Energy Performance Certificate (valid 10 years).",
      "Review the recommendations report for cost-effective insulation and heating upgrades.",
      "Keep track of proposed national EPC Band C standards to plan improvements strategically.",
    ],
  },
];

export function GuidanceHero() {
  return (
    <section className="hero service-hero guidance-hero">
      <div className="hero-media" aria-hidden="true">
        <img
          src={asset("images/semi-detached-rent.jpg")}
          alt="Traditional English semi-detached homes representing West Sussex residential properties"
          fetchPriority="high"
        />
      </div>
      <div className="container-wide hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            Regulatory Intelligence · England &amp; West Sussex
          </span>
          <h1 className="display">
            Landlord Guides &amp; Updates.
            <em>Navigating property regulations with confidence.</em>
          </h1>
          <p className="hero-lead">
            Clear, factual briefings on the Renters’ Rights Bill, mandatory safety compliance, HMO licensing, and statutory energy standards. Grounded directly in official GOV.UK, HSE, and MHCLG publications.
          </p>
          <div className="guidance-hero-tags" aria-label="Topics covered">
            <span>Tenancy Reform</span>
            <span>Gas &amp; Fire Safety</span>
            <span>Electrical EICR</span>
            <span>HMO Licensing</span>
            <span>EPC Efficiency</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandlordGuidance() {
  return (
    <div className="guidance-page-wrap">
      <section className="section container-wide guidance-intro-section">
        <div className="news-introduction">
          <div className="news-intro-icon" aria-hidden="true">
            <BookOpen size={32} />
          </div>
          <div>
            <span className="eyebrow">Information for landlords &amp; property owners</span>
            <h2 className="display">
              A clearer view of landlord regulations.
            </h2>
            <p>
              Up-to-date starting points, practical checklists, and verified direct links to official UK Government sources.
            </p>
          </div>
        </div>

        <div className="renter-resources" aria-labelledby="renter-title">
          <div className="section-head" style={{ marginBottom: '24px' }}>
            <span className="eyebrow">Priority Briefings</span>
            <h2 id="renter-title" className="display">
              Start here: Renters’ Rights resources
            </h2>
            <p>
              Understand the changes, find the official Information Sheet and check what they mean for your property in England.
            </p>
          </div>

          <div className="resource-grid">
            {renterResources.map((item) => (
              <article className="resource-card" key={item.title}>
                <div className="resource-top">
                  <span className="resource-number" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="resource-topic-tag">{item.topic}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a href={item.url} target="_blank" rel="noreferrer" className="resource-gov-link">
                  <span>Read on GOV.UK</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="guidance-main-section">
          <div className="section-head" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Practical Compliance</span>
            <h2 className="display">
              Essential property briefings &amp; checklists
            </h2>
            <p className="news-source-note">
              Curated for JM LetVest landlords · Current for 2026 tenancy regulations in England. Always verify specific property details with the linked official government statutory guidance.
            </p>
          </div>

          <div className="news-briefings">
            {briefings.map((item) => (
              <article className="news-briefing-card" key={item.title}>
                <div className="briefing-card-top">
                  <span className="briefing-topic-tag">{item.topic}</span>
                  <span className="briefing-verified-badge">
                    <ShieldCheck size={14} aria-hidden="true" /> Official Source
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p className="briefing-summary">{item.summary}</p>

                <div className="briefing-checklist">
                  <div className="checklist-heading">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <strong>What landlords must check:</strong>
                  </div>
                  <ul>
                    {item.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="news-source">
                  <span className="source-label">Source: {item.source}</span>
                  <a href={item.url} target="_blank" rel="noreferrer" className="source-link">
                    Read official statutory text <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="guidance-consultation-banner">
          <div className="consultation-copy">
            <span className="consultation-icon" aria-hidden="true">
              <HelpCircle size={28} />
            </span>
            <div>
              <h3>Have questions about licensing or compliance for your home?</h3>
              <p>
                the JM LetVest team offer informal, confidential conversations to help you assess your property's readiness under current regulations.
              </p>
            </div>
          </div>
          <a className="btn btn-gold" href={destination("contact")}>
            Speak with our team <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
