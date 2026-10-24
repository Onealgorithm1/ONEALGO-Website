import * as React from "react";
import { Verify, TrailblazerEvidence } from "./EvidenceDialog";
import { badgeSrc, SF_PEOPLE_V2, type SfPerson } from "../../data/sfPeople";

/**
 * "Who leads your Salesforce work": the named people, each with the approved sentence, their title, their
 * official certification badges (alt = the credential's official name; names also listed as text inside the
 * Verify pop-up), and Verify → their Trailblazer evidence dialog. No dates. No photo until Louis supplies one.
 * Emits Person JSON-LD (jobTitle, worksFor #org, sameAs, hasCredential per badge). One per page.
 *
 *   <PersonCredentials />                       // both people, Sreenivas first
 *   <PersonCredentials people={[SREENIVAS]} />  // one
 * Place inside an <LedgerRule as="aside"> with the H3 "Who leads your Salesforce work" above it.
 */
export function PersonCredentials({ people = SF_PEOPLE_V2, providerId = "https://onealgorithm.com/#org" }: { people?: SfPerson[]; providerId?: string }) {
  const graph = people.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://onealgorithm.com/#person-${p.slug}`,
    name: p.name,
    jobTitle: p.title,
    worksFor: { "@id": providerId },
    sameAs: [p.trailhead, ...(p.linkedin ? [p.linkedin] : [])],
    hasCredential: p.badges.map((b) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: b.name,
      recognizedBy: { "@type": "Organization", name: "Salesforce", url: "https://www.salesforce.com" },
    })),
  }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
      {people.map((p) => (
        <div key={p.slug} className="sf-person">
          <p style={{ marginTop: 10 }}>
            <b className="sf-lead-in">{p.name}</b> · {p.title}
          </p>
          <p style={{ marginTop: 6 }}>{p.statement}</p>
          <p className="sf-mono" style={{ marginTop: 10, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 10px" }}>
            {p.pronoun === "she" ? "Her" : "His"} active certifications, verified {p.verifiedLabel} ·{" "}
            <Verify id={`trailblazer-${p.slug}`} />
          </p>
          <ul className={`sf-badges${p.badges.length <= 2 ? " sf-badges-2" : ""}`} aria-label={`${p.name}'s active Salesforce certifications`}>
            {p.badges.map((b) => (
              <li key={b.slug} className="sf-badge">
                <img src={badgeSrc(b)} alt={b.name} title={b.name} width={160} height={157} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
          <TrailblazerEvidence person={p} />
        </div>
      ))}
    </>
  );
}
