/* /services/website-development: the two visible tables (U7 cost drivers, U8 builder versus custom) and the five
 * build stages (U6). No figures anywhere (claims-and-assets.md §E, §H.1): the cost table names what moves the price
 * and what we ask for, never a number. "Builder wins" is said where it is true (design-contract-webdev.md U8). */

import type { Stage } from "../components/sf";

/** U7: what sets the price. Columns: driver · what it changes · what we ask you. */
export const COST_DRIVERS: { driver: string; changes: string; ask: string }[] = [
  { driver: "Page layouts", changes: "How many genuinely different layouts the site needs, not how many pages.", ask: "Which pages share a layout, and which need their own." },
  { driver: "Content", changes: "Whether the writing and photography exist or have to be made.", ask: "What you have today: text, photos, logos, brand files." },
  { driver: "Integrations", changes: "What the site must talk to: CRM, booking, payments, inventory, email.", ask: "The systems you run, and who holds their logins." },
  { driver: "Store, booking or login", changes: "A shop, a calendar or an account area adds a system to run, not a page.", ask: "What has to be sold, booked or kept behind a login." },
  { driver: "Redesign vs new", changes: "A redesign carries a redirect list and a content audit a new site does not.", ask: "Your current address, its pages, and what already ranks." },
];

/** U8: builder versus custom, six rows. `builderWins` prints the mono chip in the builder cell. */
export const COMPARE: { row: string; builder: string; custom: string; builderWins?: boolean }[] = [
  { row: "Cost basis", builder: "Lower to start; a monthly fee for as long as the site is up.", custom: "Paid once for the build; hosting and domain at cost, in your name.", builderWins: true },
  { row: "Ownership", builder: "You rent the layout. The content is yours; the site cannot leave the platform.", custom: "Code, domain and hosting in your accounts; another developer can pick it up." },
  { row: "Integrations", builder: "The apps in its marketplace; anything else is a workaround.", custom: "Whatever you run, wired directly: CRM, booking, payments, inventory." },
  { row: "Performance ceiling", builder: "Set by the theme and the scripts it loads on every page.", custom: "Set by a budget we write down: images, scripts and fonts per page." },
  { row: "Accessibility", builder: "Depends on the template; fixes wait for the platform.", custom: "Built to WCAG 2.1 AA and tested; fixes go in the code." },
  { row: "Exit", builder: "Export the content; the design and the layout stay behind.", custom: "Move the repository and the domain; there is nothing to export." },
];

/** U6: the five stages (k = s1…s5 for the rail highlight; `short` fits the five-station drawing). */
export const WD_STAGES: Stage[] = [
  { k: "s1", num: "01", title: "Agree what the site is for", short: "What the site is for", sub: "who · what it must do · what it connects to", line: "Who it is for, what it must do, and what it connects to, agreed before anything is designed.",
    details: ["Who the site is talking to, and what it has to make them do", "The systems it connects to: CRM, booking, payments, inventory", "What exists today: domain, hosting, content, logins", "Whether a smaller site does the job; we say so if it does"] },
  { k: "s2", num: "02", title: "Scope, price and schedule in writing", short: "Scope, price, schedule", sub: "the proposal", line: "The proposal: pages, integrations, price and dates, signed before the build starts.",
    details: ["Pages and layouts, named", "Integrations and the content you supply", "The price against that list, and the dates", "What we would cut if the number is wrong for you"] },
  { k: "s3", num: "03", title: "Design in the browser", short: "Design in the browser", sub: "real content · real widths", line: "Real content at real widths, reviewed in your own browser, not a slide deck.",
    details: ["Designed at 390 pixels wide first, then opened out", "Your text and photos, not placeholders", "A link you open on your own phone", "Changes made in the browser, where you see them"] },
  { k: "s4", num: "04", title: "Build and wire it up", short: "Build and wire it up", sub: "code · forms · CRM · checks", line: "Code, forms, CRM, analytics and the accessibility checks, with the site in your repository throughout.",
    details: ["Forms to the inbox and the CRM, with a record when one fails", "Analytics, Search Console and the Business Profile connected", "WCAG 2.1 AA: automated rules, then a keyboard pass", "Source in your repository from the first commit"] },
  { k: "s5", num: "05", title: "Launch, hand over, stay on", short: "Launch, hand over, stay on", sub: "your repo · domain · hosting", line: "Your repository, domain and hosting; support under the proposal's terms.",
    details: ["DNS, HTTPS and security headers set at launch", "Repository, domain and hosting in your accounts", "Written notes another developer can follow", "Support scoped in the proposal, project by project"] },
];
