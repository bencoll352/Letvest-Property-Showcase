const rent=[
 ['Who leases the property?','JM LetVest becomes the owner’s contractual tenant. The company lease identifies the parties, permitted use and responsibilities; eventual occupants have their own arrangements.'],
 ['What happens when the property is empty?','The Rent to Rent offer provides agreed contractual rental income. Your proposal must explain when that obligation starts, vacant-period cover, payment dates and any exclusions.'],
 ['What if an occupant does not pay?','JM LetVest’s rent obligation to the owner is governed by the company lease. Check how occupant non-payment is treated, together with any conditions or exclusions.'],
 ['Which bills are included?','Utilities and bills are covered within the Rent to Rent offer. Request the account-by-account schedule: electricity, gas where applicable, water, council tax and any broadband provision. Limits and account transfers need confirming for your property.'],
 ['How is the rental offer calculated?','We discuss the location, condition, layout, availability and proposed use of your property. Request a written offer explaining the rent, costs and assumptions; no standard rental amount is quoted here.'],
 ['Which properties are suitable?','Tell us about your West Sussex house or flat, its bedrooms, condition and availability. Suitability depends on the home, permissions and the proposed occupant arrangement.'],
 ['Who pays for repairs?','The lease must allocate routine maintenance, major repairs and spending approvals. Bill coverage does not mean every ownership or repair cost is included.'],
 ['How does the agreement end?','Your written offer must specify the contractual period, notice and termination provisions, condition records and handover arrangements. Review these before signing.'],
];
const lettings=[
 ['What does Tenant Find include?','Discuss marketing, enquiries, viewings and referencing with us. Confirm whether tenancy preparation and handover are included in your chosen scope before instructing us.'],
 ['What does full management include?','Ongoing management can cover tenant communication and maintenance coordination. Your proposal should confirm rent collection, inspections, statements and reporting frequency.'],
 ['What are the landlord fees?','Request the written fee schedule, including the service charge, additional fees and applicable VAT. Confirm the complete cost before instructing us.'],
 ['How are tenants referenced?','Ask for the checks included for your letting and how affordability and references are assessed. A reference does not guarantee future payment.'],
 ['How are rent collection and arrears handled?','Confirm the collection schedule, statements and arrears follow-up process in the management agreement. Conventional Lettings does not include guaranteed rental income.'],
 ['How are repairs authorised?','Agree spending limits, emergency procedures and approval requirements in advance, including how you receive updates.'],
 ['How can tenants register their requirements?','Use the tenant email route on Contact us. Include preferred area, budget, bedrooms and move-in date so we can discuss suitable availability.'],
];
export function ServiceFaqs({service}:{service:'rent-to-rent'|'lettings'}){return <section className="section container-wide service-faqs"><div className="section-head"><span className="eyebrow">Before you decide</span><h2 className="display">Your questions, answered clearly.</h2></div>{(service==='rent-to-rent'?rent:lettings).map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>}
