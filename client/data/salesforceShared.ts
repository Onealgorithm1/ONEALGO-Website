/* The two Salesforce constants the SHARED chunk needs (site.tsx's ProcessSteps phone link, Layout's
 * footer city row). Kept apart from salesforceProof.ts so the main chunk, which every page loads,
 * does not carry the proof module (SF_PEOPLE, SF_PAGES, SF_DELIVERED). salesforceProof re-exports
 * both, so pages keep importing from there. */
export const SF_PHONE = { display: "(610) 890-9711", href: "tel:+16108909711" } as const;

export const SF_CITY_LINKS = [
  { to: "/services/salesforce-consultant-new-york", label: "New York" },
  { to: "/services/salesforce-consultant-washington-dc", label: "Washington, DC" },
  { to: "/services/salesforce-consultant-dallas", label: "Dallas" },
  { to: "/services/salesforce-consultant-denver", label: "Denver" },
  { to: "/services/salesforce-consultant-atlanta", label: "Atlanta" },
  { to: "/services/salesforce-consultant-boston", label: "Boston" },
  { to: "/services/salesforce-consultant-seattle", label: "Seattle" },
  { to: "/services/salesforce-consultant-san-francisco", label: "San Francisco" },
  { to: "/services/salesforce-consultant-los-angeles", label: "Los Angeles" },
  { to: "/services/salesforce-consultant-austin", label: "Austin" },
  { to: "/services/salesforce-consultant-miami", label: "Miami" },
  { to: "/services/salesforce-consultant-chicago", label: "Chicago" },
  { to: "/services/salesforce-consultant-houston", label: "Houston" },
] as const;
