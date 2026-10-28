/**
 * Central business details for the Letvest website.
 *
 * ⚠️  CONFIRM BEFORE PUBLISHING
 * Values marked `PLACEHOLDER` are sensible defaults written for the redesign.
 * Replace them with Letvest's real details. UK consumer law (CMA / DMCC Act 2024)
 * requires every stat, accreditation and review shown on the site to be genuine.
 */
export const siteConfig = {
  companyName: 'Letvest Ltd',
  tagline: 'Letting, Rent-to-Rent & Airbnb Management across West Sussex',

  // PLACEHOLDER – replace with the real phone number and email address.
  phone: '01903 000000',
  email: 'hello@letvest.co.uk',
  // Where the business is based (shown in header / footer / schema).
  baseTown: 'West Sussex',

  // PLACEHOLDER – confirm these figures are accurate before going live.
  stats: [
    { value: '10+', label: 'Years in Sussex property' },
    { value: '24/7', label: 'Tenant & guest support line' },
    { value: '3', label: 'Flexible ways to let' },
    { value: '100%', label: 'Compliance-checked lets' },
  ],

  // PLACEHOLDER – fill in once confirmed. Empty values are hidden automatically.
  legal: {
    companyNumber: '', // e.g. 'Registered in England & Wales No. 12345678'
    redressScheme: '', // e.g. 'The Property Redress Scheme – Member PRS000000'
    clientMoneyProtection: '', // e.g. 'Client Money Protect – Member CMP000000'
    icoNumber: '', // e.g. 'ICO Reg. ZA000000'
  },

  /**
   * Genuine client reviews only. The section is hidden while this list is empty.
   * Example:
   * { quote: 'Letvest took over our Worthing flat…', name: 'Sarah P.', detail: 'Landlord, Worthing' }
   */
  testimonials: [] as { quote: string; name: string; detail: string }[],
};
