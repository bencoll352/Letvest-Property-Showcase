/** Publish only explicitly approved facts. Empty values never render as credentials. */
export interface OccupantGroup { name: string; description: string; approved: boolean }
export interface Responsibility { label: string; guaranteedRent: string; managedLetting: string; approved: boolean }
export interface CaseStudy { approved: boolean; title: string; propertyType: string; approximateLocation: string; challenge: string; service: string; work: string; outcome: string; photos: { src: string; alt: string }[]; testimonial?: { quote: string; attribution: string }; evidenceApproved: boolean }
export interface FamilyMember { approved: boolean; name: string; role: string; photograph: string; photographApproved: boolean; biography: string }
export interface FamilyCommitment { approved: boolean; title: string; detail: string }
export const siteConfig = {
  companyName: 'JM LetVest Ltd', shortName: 'JM LetVest',
  tagline: 'Guaranteed Rent & Agreed Utilities across West Sussex',
  email: 'info@jmletvest.com', baseTown: 'West Sussex, United Kingdom',
  occupants: [
    { name: 'Working professionals', description: 'Rooms for people working in the local area, subject to screening and suitability.', approved: true },
    { name: 'NHS workers / key workers', description: 'Rooms for healthcare and essential workers. No NHS or employer partnership is implied.', approved: true },
  ] satisfies OccupantGroup[],
  screening: 'Occupants are screened before an arrangement proceeds. Ask us for the checks proposed for your property; the process depends on the letting arrangement.',
  responsibilities: [] as Responsibility[],
  family: {
    introductionApproved: true, introduction: 'JM LetVest is a family-run business owned by the JM LetVest team Mallender. They are parents to a young son.',
    storyApproved: false, relationship: '', reasonForStarting: '', westSussexConnection: '',
    members: [
      { approved: true, name: 'JM LetVest', role: 'Owner', photograph: '', photographApproved: false, biography: 'Our team has local roots in West Sussex.' },
      { approved: true, name: 'JM LetVest', role: 'Owner', photograph: '', photographApproved: false, biography: 'Our team has local roots in West Sussex.' },
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
