/** Publish only explicitly approved facts. Empty values never render as credentials. */
export interface OccupantGroup { name: string; description: string; approved: boolean }
export interface Responsibility { label: string; guaranteedRent: string; managedLetting: string; approved: boolean }
export interface CaseStudy { approved: boolean; title: string; propertyType: string; approximateLocation: string; challenge: string; service: string; work: string; outcome: string; photos: { src: string; alt: string }[]; testimonial?: { quote: string; attribution: string }; evidenceApproved: boolean }
export interface FamilyMember { approved: boolean; name: string; role: string; photograph: string; photographApproved: boolean; biography: string }
export interface FamilyCommitment { approved: boolean; title: string; detail: string }
export const siteConfig = {
  companyName: 'JM LetVest Ltd', shortName: 'JM LetVest',
  tagline: 'Guaranteed Rent & Fully Managed Letting across West Sussex',
  email: 'info@jmletvest.com', baseTown: 'West Sussex, United Kingdom',
  occupants: [
    { name: 'Working professionals', description: 'Homes for people working in the area.', approved: true },
    { name: 'Healthcare professionals', description: 'Homes for people working in healthcare. This does not imply an NHS or employer partnership.', approved: true },
  ] satisfies OccupantGroup[],
  screening: 'Occupants are screened before an arrangement proceeds. Ask us for the checks proposed for your property; the process depends on the letting arrangement.',
  responsibilities: [] as Responsibility[],
  family: {
    introductionApproved: true, introduction: 'JM LetVest is a family-run business owned by Jake and Maddie Mallender. They are parents to a young son.',
    storyApproved: false, relationship: '', reasonForStarting: '', westSussexConnection: '',
    members: [
      { approved: true, name: 'Jake Mallender', role: 'Owner', photograph: '', photographApproved: false, biography: 'Jake has always lived in West Sussex.' },
      { approved: true, name: 'Maddie Mallender', role: 'Owner', photograph: '', photographApproved: false, biography: 'Maddie has always lived in West Sussex.' },
    ] as FamilyMember[],
    commitments: [] as FamilyCommitment[],
  },
  complaints: {
    approved: false, handlerName: '', acknowledgementTime: '', responseTime: '', reviewProcess: '', escalation: '',
  },
  registrations: {
    companyNumber: '', registeredOffice: '', icoNumber: '', icoVerified: false, clientMoneyProtection: '',
    prs: { number: 'PRS058309', verified: true },
  },
  caseStudies: [] as CaseStudy[],
  investorsConfirmed: false,
};
export const pageHref = (view: 'professional-standards' | 'privacy' | 'complaints') => `${import.meta.env.BASE_URL}?view=${view}`;
