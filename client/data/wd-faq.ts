/* /services/website-development FAQ (unit 16): the nine questions of structure-spec.md §6, in its order. Each answer's
 * first sentence answers; <= 60 words; the owner unit is linked. Cost, builder-vs-custom, ADA and ownership are units
 * on the page, so they are not repeated here (HDG-08). Renders the accordion AND feeds FAQPage schema (verbatim).
 * No duration, no price, no "quickly" (WD-PRO-02; claims-and-assets.md §E). */

export type WdFaqItem = {
  id: string;
  q: string;
  a: string;
  links?: { to: string; label: string }[];
};

export const WD_FAQ: WdFaqItem[] = [
  {
    id: "faq-timing",
    q: "How long does it take to build a website?",
    a: "The schedule goes in writing next to the price, so you get a date instead of a guess. What sets it: how much content exists, how fast feedback comes back, and how many systems the site connects to. Your project starts when the scope is agreed.",
    links: [{ to: "#process", label: "How a custom website build runs" }],
  },
  {
    id: "faq-existing",
    q: "Can you work with the site I already have?",
    a: "Yes. A redesign keeps your domain, your content and every address search engines already know, each one redirected. Sometimes rebuilding is cheaper than fixing, and we tell you which one you are looking at rather than quoting whichever is bigger.",
    links: [{ to: "#redesign", label: "Website redesign that keeps what already works" }],
  },
  {
    id: "faq-slow",
    q: "Why is my website slow?",
    a: "Usually one of three things: images uploaded at camera size, third-party scripts fetching code before the page can finish, or a theme that loads everything on every page. Measure first: a page-speed report says which one you have, and the fix is often one image and two scripts.",
    links: [{ to: "#after-launch", label: "After launch: support, hosting and security" }],
  },
  {
    id: "faq-mobile",
    q: "Will my website work properly on a phone?",
    a: "Yes: it is built at 390 pixels wide first, then opened out to a laptop. Tap targets are sized for thumbs, text stays readable without zooming, nothing scrolls sideways, and we test it in iPhone and Android browser profiles at real widths, not only in a preview pane.",
  },
  {
    id: "faq-coding",
    q: "Does website development require coding?",
    a: "Yes for custom work: a site designed and coded for one business is written in HTML, CSS and TypeScript. No for a builder such as Squarespace or Wix, where you fill a template and pay monthly. The comparison table on this page says which suits which job.",
    links: [{ to: "#builder-or-custom", label: "Squarespace, Wix or WordPress versus custom" }],
  },
  {
    id: "faq-design-company",
    q: "What is a website design company, and what does it do?",
    a: "A website design company plans, designs and builds websites for other businesses, then hands them over to run. Ours designs the pages, writes the code, wires the forms, CRM, bookings and payments, launches the site in your own accounts and stays on for support.",
    links: [{ to: "#check", label: "A web design company you can check" }],
  },
  {
    id: "faq-location",
    q: "Where are you based, and do you work remotely?",
    a: "Our office is at 625 Swedesford Road, Unit B, Malvern, Pennsylvania. Most work runs remotely, with in-person sessions when the project calls for them, easiest across the Philadelphia region. You review the site in your own browser as it is built.",
    links: [
      { to: "/services/web-design-philadelphia", label: "Web design for Philadelphia businesses" },
      { to: "/services/web-design-chester-county", label: "Web design for Chester County businesses" },
    ],
  },
  {
    id: "faq-accounting",
    q: "Are website development costs capitalized?",
    a: "Your accountant decides how to book it. Our proposals separate design, development and running costs, so the split is clear whichever treatment applies to you.",
  },
  {
    id: "faq-animation",
    q: "Is the animation at the top real, or is it a video?",
    a: "Both. The moving background is our brand film; the lettering in front of it is a canvas particle system running in your browser, drawn from the two lines of the heading and built for this site after the published 21st.dev Magic Text Reveal pattern. Move your cursor across the words and they react.",
  },
];
