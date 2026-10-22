/* Hand-written per-city copy for the Salesforce city pages. Every claim here is either
 * (a) a number from SALESFORCE_CITIES (rendered from data, not typed here), or
 * (b) a true statement about OneAlgorithm from the OA workspace notes.
 * ⛔ No local client claims. No "offices in <city>" — we are in Malvern, PA.
 * ⛔ No question is repeated across cities or with the Philadelphia / Chester County /
 *    Pennsylvania pages. Check before adding one.
 * Angle sources: run 2026-10-21_sf-nationwide (facts/sheets/<city>.md, decision-log.md). */

export type CityCopy = {
  angleTitle: string;
  angle: string[];
  faqs: { q: string; a: string }[];
};

export const CITY_COPY: Record<string, CityCopy> = {
  "new-york": {
    angleTitle: "The biggest Salesforce job market we measured",
    angle: [
      "Of the 20 metro areas we checked, New York had the most open Salesforce roles and the largest base of companies with 500 or more employees. When that many firms are hiring for the same skill at once, the people who know how a particular org was built tend to leave mid-project.",
      "That is the gap we usually fill: a fixed piece of work — a migration, an integration, an org that has drifted — delivered by the people who scope it, with a written handover so the next hire can run it.",
      "Finance and insurance is New York's third-largest employer group, and it is where we have current, weekly Salesforce experience: automation, permissions and compliance data work for a lending company.",
    ],
    faqs: [
      { q: "Can a firm outside New York run our Salesforce project?", a: "Yes. Salesforce work happens inside the org, not in a room, so most of it runs remotely from Malvern, Pennsylvania. Discovery calls, reviews and handover happen on video, and we will come in person for the meetings that genuinely need it." },
      { q: "We have an internal Salesforce team. Why bring in a partner?", a: "Usually for a specialism the team was not hired for, or for capacity on a deadline: a data migration, an ERP integration, or Marketing Cloud. We work alongside the admins you have, and the end of every engagement is a handover your own people can run." },
      { q: "Can you work within a regulated firm's change controls?", a: "Yes. We work through your change process rather than around it: changes built in a sandbox, documented, tested against real user profiles and released on your schedule, with a written record of what changed and why." },
    ],
  },
  "washington-dc": {
    angleTitle: "Salesforce is a federal platform here",
    angle: [
      "Federal agencies recorded 306 contract awards mentioning Salesforce with work performed in Washington, DC over fiscal years 2022 to 2026, led by the Treasury, Defense and State departments. Alongside the agencies sit the contractors, associations and nonprofits that work with them.",
      "OneAlgorithm is SBA-certified as an Economically Disadvantaged Woman-Owned Small Business (EDWOSB) and Woman-Owned Small Business (WOSB), registered in SAM.gov, and certified SWaM in Virginia. Those certifications make us eligible for set-aside work; they are not a record of federal Salesforce contracts, and we do not claim one.",
      "Professional, scientific and technical services is the DC metro's largest employer group by our Census pull, with more than 34,000 establishments. That group includes the contractors and consultancies that work alongside the agencies above.",
    ],
    faqs: [
      { q: "Is OneAlgorithm able to subcontract on federal Salesforce work?", a: "We are registered in SAM.gov and hold SBA EDWOSB and WOSB certifications, which is what most primes check first when they need a small-business partner. We have not yet been awarded a federal contract, and we say so plainly." },
      { q: "Do you work with associations and nonprofits in the DC area?", a: "Yes. Nonprofit and membership organizations are one of the largest groups of employers in the DC metro, and much of their Salesforce work — member data, migrations off older databases, integrations — is the same work we deliver for companies." },
      { q: "Can Salesforce track federal opportunities and teaming partners?", a: "Yes. Contractors can use it to track opportunities from SAM.gov, teaming partners, proposal stages and contract vehicles. We build the objects and reports around how your capture team already works." },
    ],
  },
  dallas: {
    angleTitle: "A large Texas market with a busy Salesforce community",
    angle: [
      "Dallas–Fort Worth has seven Salesforce Trailblazer Community Groups, the most of any metro we checked, plus a Salesforce office on North Field Street. Health care, professional services, manufacturing and finance are its largest employer groups.",
      "Manufacturing and distribution firms are where Salesforce most often has to talk to an ERP. Getting orders, accounts and inventory to agree between the two systems is work we have delivered, including an SAP-to-Salesforce sync.",
      "Dallas–Fort Worth also has one of the larger software developer workforces of the metros we measured, so many companies here can staff routine admin work and bring in a partner only for integration and migration projects.",
    ],
    faqs: [
      { q: "Can Salesforce sync with our ERP?", a: "Usually, yes. The real questions are which system owns each record, how often it syncs and what happens when the two disagree. We have built an SAP-to-Salesforce sync; the same approach applies to other ERPs, and we agree the rules with your finance and operations people before writing any code." },
      { q: "Do you only work with large Dallas companies?", a: "No. We work with mid-size firms as well as large ones. The free one-week org review works the same for a 20-person team as for a 500-person one." },
      { q: "How long does a Salesforce-to-ERP integration take?", a: "It depends on how many objects sync and how clean the data is, so we scope it before giving any timeline. The free one-week org review is often the first step, because it shows the state of the data the integration will depend on." },
    ],
  },
  denver: {
    angleTitle: "A Colorado market with federal and private demand",
    angle: [
      "Colorado recorded 57 federal contract awards mentioning Salesforce over fiscal years 2022 to 2026, led by Veterans Affairs, and Denver has six Trailblazer Community Groups and a Salesforce office downtown.",
      "Health care and professional services are Denver's two largest employer groups in our Census pull, followed by finance and information businesses.",
      "Denver has the second-smallest business base of the 13 cities on our Salesforce pages, yet six Trailblazer Community Groups, and it hosts Mile High Dreamin', a community-run Salesforce conference scheduled for August 25–26, 2027.",
    ],
    faqs: [
      { q: "Our Salesforce org was set up fast and has grown messy. Where do we start?", a: "With a look at what is actually there: licences against real use, fields nobody fills, automation that overlaps, and integrations that fail quietly. That is exactly what our free one-week org review produces, as a ranked written list." },
      { q: "Can you support our Salesforce org month to month?", a: "Yes. We run ongoing Salesforce administration and development for a client on a weekly basis: flows, permissions, data jobs and user support, with hours reported every week." },
      { q: "Do you work with Colorado government contractors?", a: "We are registered in SAM.gov and certified by the SBA as an EDWOSB and WOSB, which makes us eligible to team on set-aside work. We have not yet been awarded a federal contract and do not claim one." },
    ],
  },
  atlanta: {
    angleTitle: "Health care, logistics and a deep Salesforce bench",
    angle: [
      "Atlanta's largest employer groups include health care, professional services, manufacturing and wholesale trade, and the metro has four Trailblazer Community Groups and a Salesforce office in Buckhead. Federal agencies also recorded 11 Salesforce-related contract awards with work performed in Atlanta over fiscal years 2022 to 2026.",
      "Wholesale and logistics businesses tend to need Salesforce to handle volume: thousands of accounts, bulk data loads and clean de-duplication. We run bulk data jobs as routine work, including backfills of thousands of leads and moves of thousands of records.",
      "Atlanta's Salesforce hiring is broad: the LinkedIn search we ran found open roles for administrators, developers, consultants and architects in the hundreds each.",
    ],
    faqs: [
      { q: "How do you handle a large data load into Salesforce?", a: "In batches, with a test load first, a field map agreed in writing, duplicate rules switched on, and a count check after every batch. Large loads fail on the edge cases, so we find them on a small sample before the full run." },
      { q: "Can you clean up duplicate accounts and contacts?", a: "Yes. We agree the matching rules with you first — which record wins and which fields carry over — then merge in batches you can review, so nothing important disappears." },
      { q: "Do you work with health care organizations on Salesforce?", a: "Yes, on the platform side: data models, access rules, automation and integrations. Health care is the largest employer group in the Atlanta metro, and those projects tend to need careful handling of who sees which records." },
    ],
  },
  boston: {
    angleTitle: "Health care, research and professional services",
    angle: [
      "Health care and professional services are Boston's two largest employer groups, and the metro has six Trailblazer Community Groups and a Salesforce office on Boylston Street, with another in Burlington.",
      "Organizations like these tend to have strict rules about who can see which records. Getting profiles, permission sets and sharing right is quiet, careful Salesforce work, and it is a regular part of what we do.",
      "Boston's Census figures show more than 480 establishments with 500 or more employees.",
    ],
    faqs: [
      { q: "Can you tighten who sees what in our Salesforce?", a: "Yes. We map who needs which records, then rebuild access with permission sets and sharing rules instead of stacking more profiles. Every change is tested against real user logins before it goes live." },
      { q: "Do you work on Salesforce for research or nonprofit organizations?", a: "Yes. The platform work is the same — data models, access, automation and integrations — and we keep the build simple enough for a small internal team to run after we hand over." },
      { q: "Can you connect Salesforce to our other systems?", a: "Yes. We have built an SAP-to-Salesforce sync and connect Salesforce to finance, ERP and marketing tools. We agree which system owns each record before building anything." },
    ],
  },
  seattle: {
    angleTitle: "A technical market that builds on Salesforce",
    angle: [
      "Seattle has a Salesforce office in Fremont and another in Bellevue, two Trailblazer Community Groups, and one of the largest software developer workforces of the metros we checked.",
      "Teams with strong engineers often build integrations themselves and bring in a Salesforce specialist for the platform side: limits, Flow versus code, and how the data model will hold up as volume grows.",
      "Seattle's open Salesforce roles in our LinkedIn search included more architect positions than developer ones, a sign that local teams are designing larger Salesforce estates and need platform-level judgment.",
    ],
    faqs: [
      { q: "Our engineers can build the integration. What would a Salesforce partner add?", a: "Platform knowledge they may not have yet: governor limits, which API to use for which volume, when Flow is the right tool and when code is, and how to keep the org maintainable. We often pair with an internal team rather than replacing it." },
      { q: "Should we use Flow or Apex?", a: "Flow for most business automation, because admins can maintain it. Apex where volume, complexity or performance need it. We decide case by case and write down why, so the next person understands the choice." },
      { q: "Can you review our Salesforce architecture?", a: "Yes. Our free one-week org review covers the data model, automation, access and integrations, and ends with a ranked written list of what to fix first. Many of our people hold Salesforce Platform certifications." },
    ],
  },
  "san-francisco": {
    angleTitle: "Salesforce's home market",
    angle: [
      "Salesforce is headquartered at 50 Fremont Street, and the Bay Area has more Salesforce offices than any other metro we checked. Health care, professional services and information businesses are among its largest employer groups.",
      "In a market this close to the platform, buyers usually know what Salesforce can do. What they need is a partner who will deliver a defined piece of work and leave behind an org their own team can run.",
      "The Bay Area also has one of the larger pools of open Salesforce roles we measured, and information businesses are among its largest employer groups.",
    ],
    faqs: [
      { q: "Why hire a smaller Salesforce partner instead of a large firm?", a: "You deal directly with the people doing the work, and the scope stays fixed to what you actually need. We are a listed AppExchange Consulting Partner with 16 Salesforce-certified people." },
      { q: "Do you take on short, fixed-scope Salesforce projects?", a: "Yes. A defined migration, integration, org review or clean-up is often the best way to start. You get a written scope first, then the work, then a handover." },
      { q: "Do you work with software companies that sell on Salesforce?", a: "Yes. Software companies often need Salesforce to keep sales, billing and product usage data in step. That integration and data work is the core of what we deliver." },
    ],
  },
  "los-angeles": {
    angleTitle: "A large, mixed business market",
    angle: [
      "Los Angeles has one of the largest business bases of the metros we checked, led by health care, professional services, manufacturing and wholesale trade. Salesforce's nearest office is in Irvine, and the metro has one Trailblazer Community Group.",
      "Where a team runs Salesforce with a small internal staff, a partner adds the most: specialist work on demand without a full-time hire.",
      "Los Angeles also has a large manufacturing and wholesale base in our Census pull. Those businesses often need Salesforce to agree with an ERP on orders, accounts and pricing.",
    ],
    faqs: [
      { q: "We have one Salesforce admin. Is that enough?", a: "For day-to-day running, often yes. The gaps tend to be deeper work — integrations, data migrations, Marketing Cloud — that one person was never hired for. We cover those pieces and leave the day-to-day with your admin." },
      { q: "Can Salesforce work with our marketing tools?", a: "Yes. We have supported Salesforce Marketing Cloud for about 18 months on a single engagement, and we connect Salesforce to the tools marketing teams already use." },
      { q: "Can Salesforce share data with our ERP?", a: "Usually, yes. We have built an SAP-to-Salesforce sync, and the same approach applies to other ERPs: agree which system owns each record, how often it syncs, and what happens when they disagree." },
    ],
  },
  austin: {
    angleTitle: "A fast-growing technology market",
    angle: [
      "Austin's largest employer groups are professional services, health care and information, and it has a Salesforce office on Congress Avenue and four Trailblazer Community Groups. In an SEC full-text search of annual reports (10-Ks) mentioning Salesforce, Austin addresses appeared in 26 of the 78 Texas results, more than the city of Dallas (12) or Houston (10).",
      "Fast-growing companies often outgrow how their Salesforce was first set up within a year or two. The common fixes are a cleaner data model, automation that replaces manual steps, and integrations that keep sales and finance in step.",
      "Austin has the smallest business base of the 13 cities on our Salesforce pages, but more than 1,000 open Salesforce roles in our LinkedIn search.",
    ],
    faqs: [
      { q: "We set up Salesforce ourselves. When should we bring in help?", a: "When reports stop matching what people see, when manual steps keep growing, or before a big migration or integration. Our free one-week org review tells you which of those applies and what to fix first." },
      { q: "Can you automate steps our team does by hand in Salesforce?", a: "Usually, with Flow. We list the manual steps first, automate the ones that save real time, and leave the rest alone so the org stays easy to maintain." },
      { q: "Can you support a small team that relies heavily on Salesforce?", a: "Yes. We run ongoing administration and development for a client on a weekly basis, which gives a small team specialist cover without a full-time hire." },
    ],
  },
  miami: {
    angleTitle: "A regional hub with fewer local Salesforce resources",
    angle: [
      "Miami has a large business base led by health care, professional services, wholesale trade and finance. We found no Salesforce office and no Trailblazer Community Group listed in the metro, with Florida Dreamin' as the region's community event.",
      "Fewer local Salesforce resources usually means teams lean on remote partners. That is how we work everywhere: remotely from Malvern, Pennsylvania, with video calls for discovery, reviews and handover.",
      "Miami's Census figures show finance and insurance among its four largest employer groups, alongside health care, professional services and wholesale trade.",
    ],
    faqs: [
      { q: "Is remote Salesforce consulting as effective as on-site?", a: "For Salesforce, usually yes, because the work happens inside the org. What matters is clear scoping, regular reviews and a proper handover, all of which work well on video." },
      { q: "Can you help with Salesforce for a finance or lending business?", a: "Yes. We currently run ongoing Salesforce development for a lending company, covering automation, permissions, bulk data jobs and compliance work such as do-not-call scrubbing." },
      { q: "Can you work with a business that operates in Latin America as well?", a: "Our team delivered a LATAM Salesforce work package on a previous engagement, and the platform supports multiple currencies and languages. We scope the regional requirements before building." },
    ],
  },
  chicago: {
    angleTitle: "A Midwest hub with heavy Salesforce hiring",
    angle: [
      "Chicago had the fifth-highest number of open Salesforce roles of the 20 metros we measured, and has a Salesforce office at Wolf Point Plaza and five Trailblazer Community Groups. Health care, professional services, manufacturing and finance are its largest employer groups.",
      "Hiring demand that high means experienced Salesforce people are hard to keep. A partner gives you specialist capacity for a defined project without competing in that hiring market.",
      "Manufacturing is one of Chicago's four largest employer groups in our Census pull. Manufacturers often need Salesforce to share accounts, orders and pricing with an ERP, which is integration work we have delivered.",
    ],
    faqs: [
      { q: "We can't hire a Salesforce developer fast enough. What are the options?", a: "Bring in a partner for defined pieces of work while you hire, or keep a partner on a monthly basis for ongoing development. We do both, with hours and progress reported every week." },
      { q: "Can you take over an org another consultant built?", a: "Yes. We start by documenting what is there and what it costs you, without criticising the last firm, then agree what to keep and what to fix." },
      { q: "Do you work with manufacturers on Salesforce?", a: "Yes, especially on the integration side: keeping accounts, orders and pricing consistent between Salesforce and the ERP, and cleaning up data so reports match what operations sees." },
    ],
  },
};
