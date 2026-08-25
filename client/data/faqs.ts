/**
 * ⛔ THIS LIST IS ORDERED BY MEASURED SEARCH DEMAND, NOT BY WHAT WE FELT LIKE
 * ANSWERING. Pulled 2026-08-25 from the Microsoft Advertising keyword API —
 * 1,985 unique US terms with volume across two seed passes — and cross-checked
 * against Bing Webmaster GetKeywordStats. Monthly US volumes for the questions
 * that shaped this list:
 *
 *   why web pages load slowly ............................... 800
 *   what is ada compliant 320 · what constitutes an ada 160 ·
 *     what does ada compliant mean 70 · what is web accessibility 50 ... ~660
 *   squarespace vs wix 270 · shopify vs squarespace 220 ·
 *     shopify vs wix 170 · wix vs wordpress 90 ·
 *     squarespace vs wordpress 60 · webflow vs wordpress 40 ......... ~850
 *   how much does a website cost 120 · cost to build a website 90 ·
 *     web design cost 80 ............................................ 290
 *   who owns website 90 · who owns this website 70 · who owns url 60 ·
 *     who hosts this website 60 ..................................... 280
 *
 * THE FINDING THAT MATTERS, and it is uncomfortable: almost nobody searches
 * "custom website design" — 5 impressions a week on Bing against 29,530 a month
 * for "website design" and 135,200 for "wix". The buyer is comparing DIY
 * builders and worrying about ADA letters. So those are the questions answered
 * here, honestly enough to be worth reading even when the honest answer is "use
 * the builder". Do not reorder this by preference.
 *
 * Adding one: check it against real volume first, or it is decoration.
 * The list feeds both the visible FAQ and the FAQPage schema.
 */
export type Faq = { id: string; q: string; a: string };

export const FAQS: Faq[] = [
  {
    id: "faq-cost",
    q: "How much does a website cost?",
    a: "Three things move the number more than anything else: how many genuinely different page layouts there are, how much of the writing and photography already exists, and whether it has to talk to something you already run — a booking system, a CRM, an inventory. A brochure site where the content is written and nothing needs to integrate sits at one end. A site with custom functionality, a real content system and two integrations sits a long way from it. We will not print a figure here and then discover your project is nothing like it, so tell us the scope and you get the price in writing before anyone starts building.",
  },
  {
    id: "faq-builders",
    q: "Should I use Squarespace or Wix instead of hiring someone?",
    a: "Sometimes, yes — and we would rather say so than sell you something you do not need. If you need a handful of pages, you are happy to lay them out yourself, and nothing has to connect to another system, a builder will get you online this week for a monthly fee and that is a sensible answer. Where it stops working: when you want something the template cannot do, when the site has to integrate with software you already run, when performance starts costing you visitors, or when you notice the monthly fee never ends and the site cannot move off that platform. A built site costs more once and then it is yours. A builder costs less every month, forever, and you are renting.",
  },
  {
    id: "faq-ada",
    q: "What does ADA compliant mean for a website?",
    a: "The ADA itself does not name a technical standard for websites — the law predates most of the web. What courts and the Department of Justice have consistently pointed at is WCAG, the Web Content Accessibility Guidelines, and in practice level AA is the bar people mean. Nobody can sell you a certificate, because none exists; a company offering one is selling you a PDF. What can actually be done is the work: semantic markup so a screen reader can navigate the page, every control reachable and visible by keyboard, text contrast measured rather than eyeballed, real alternative text, and forms whose errors are announced rather than shown in red. We build against those criteria and test with the same automated rules an auditor runs, then check by keyboard what no automated rule can catch. An accessibility overlay widget is not a fix and has attracted lawsuits of its own.",
  },
  {
    id: "faq-slow",
    q: "Why is my website slow?",
    a: "Usually one of four things. Images uploaded straight off a camera and never resized. Third-party scripts — chat widgets, tracking, popups, review badges — each one fetching more code from someone else's server before your page can finish. A theme or page builder that loads its entire feature set on every page whether that page uses it or not. Or hosting that is simply slow to respond. The fix starts with measuring rather than guessing: a real page-speed report tells you which of the four you have, and the answer is often one image and two scripts rather than a rebuild.",
  },
  {
    id: "faq-ownership",
    q: "Who owns the website and the code when it is finished?",
    a: "You do — the source code, the domain, the hosting account and the content. It goes into your repository and your accounts, in your name. There is no proprietary builder you would have to keep paying to stay online, and another developer can pick the work up without us. You also have access to the code from the first day of the build, not only at handover.",
  },
  {
    id: "faq-timing",
    q: "How long does it take to build a website?",
    a: "It depends on the size of the site and, more than anything, on how fast content and feedback come back — across the industry those two things cause more delay than the build itself. We work quickly and we do not sit on a queue: your project starts when we agree the scope, not weeks later. You get the schedule in writing along with the scope, so you have a date rather than a guess, and you can watch the site take shape in a browser the whole way through rather than waiting for a reveal.",
  },
  {
    id: "faq-mobile",
    q: "Will my website work properly on a phone?",
    a: "It is built on a phone first. Every layout is designed at 390 pixels wide before it is opened out to a laptop, because that is the hardest case and most of your visitors will arrive on it. Tap targets are sized for thumbs, text stays readable without zooming, and nothing scrolls sideways. We test at real widths rather than trusting a preview pane.",
  },
  {
    id: "faq-existing",
    q: "Can you work with the site I already have?",
    a: "Often, yes. Sometimes the honest answer is that rebuilding is cheaper than fixing, and we will tell you which one you are looking at rather than quoting whichever is bigger.",
  },
  {
    id: "faq-location",
    q: "Where are you based, and do you work remotely?",
    a: "Our office is at 625 Swedesford Road in Malvern, Pennsylvania, but we take work anywhere in the United States and most of it runs remotely. You review the site in your own browser as it is built, so where we sit makes no practical difference to how a project runs.",
  },
  {
    id: "faq-animation",
    q: "Is the animation at the top real, or is it a video?",
    a: "Both, and you can tell them apart. The moving background is our own brand film. The lettering in front of it is not video at all — it is a canvas particle system running in your browser: the two lines of text are drawn to an offscreen buffer, sampled pixel by pixel, and every opaque pixel becomes a particle that springs back to its home position and scatters when your cursor gets close. Move your cursor across the words and watch them react, which is the part a video cannot do.",
  },
];
