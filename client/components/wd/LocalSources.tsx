import * as React from "react";
import { EvidenceDialog } from "../sf";
import type { LocalPlace } from "../../data/wd-local/types";

/*
 * The two source pop-ups of a place page (in-site <dialog>s; nothing here is a link, so no visitor is sent to a data
 * endpoint: owner rule 2026-10-23, owner-decisions.md:47):
 *   - CensusSourcesDialog (id "figures-src"): every Census row the readouts and copy use, with its value, year and the
 *     exact public query it came from, printed as text (api.census.gov, no key). Derived rows name their formula.
 *   - SearchSourcesDialog (id "search-src"): the Semrush rows (volume, cost per click, difficulty), the pull date and
 *     the autocomplete phrasings quoted on the page.
 * ponytail: SHOW_QUERIES prints the query URLs as text, as the 2026-10-24 bar asks ("the API URL (no key) and the year in
 * an in-site pop-up"); set it to false to show source names + years only, as the Salesforce city pages do.
 */
const SHOW_QUERIES = true;
const fmtDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const fmtVal = (v: number) => v.toLocaleString("en-US");

export function CensusSourcesDialog({ place }: { place: LocalPlace }) {
  const f = place.facts;
  return (
    <EvidenceDialog
      id="figures-src"
      title="Where these figures come from"
      intro={`Every Census figure on this page covers the ${f.geoName}. County Business Patterns (CBP) counts employer establishments; the American Community Survey (ACS, 1-year) gives population. A person at OneAlgorithm read them on ${fmtDate(f.pulled)}. The query each one came from is printed as text, not linked.`}
    >
      <table className="wd-src-table">
        <thead><tr><th scope="col">Figure</th><th scope="col">Value</th><th scope="col">Year</th></tr></thead>
        <tbody>
          {f.rows.map((r, i) => (
            <React.Fragment key={i}>
              <tr>
                <th scope="row">{r.label}{r.derived && <span className="sf-mono wd-src-q"> · computed: {r.derived}</span>}</th>
                <td>{fmtVal(r.value)}</td>
                <td>{r.period}</td>
              </tr>
              {SHOW_QUERIES && r.query && (
                <tr className="wd-src-qrow"><td colSpan={3}><span className="sf-mono wd-src-q">{r.query.map((q) => q.replace(/^https?:\/\//, "")).join("  ·  ")}</span></td></tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <p className="sf-mono">U.S. Census Bureau · census.gov/programs-surveys/cbp.html · census.gov/programs-surveys/acs</p>
    </EvidenceDialog>
  );
}

export function SearchSourcesDialog({ place }: { place: LocalPlace }) {
  const s = place.search!;
  return (
    <EvidenceDialog
      id="search-src"
      title="Where the search figures come from"
      intro={`Monthly US searches, cost per click and keyword difficulty from Semrush Keyword Overview (Bulk Analysis, US database, exact match), pulled ${s.pulled}. A phrase Semrush has no data for counts as zero. Every place we considered is ranked by the same sum: ${place.name} is ${s.rank} of ${s.of}.`}
    >
      <table className="wd-src-table">
        <thead><tr><th scope="col">Phrase</th><th scope="col">Searches a month</th><th scope="col">Cost per click</th><th scope="col">Difficulty</th></tr></thead>
        <tbody>
          {s.rows.map((r) => (
            <tr key={r.phrase}><th scope="row">{r.phrase}</th><td>{fmtVal(r.volume)}</td><td>{r.cpc != null ? `$${r.cpc.toFixed(2)}` : "no bid data"}</td><td>{r.kd ?? "no data"}</td></tr>
          ))}
        </tbody>
      </table>
      {s.autocomplete.length > 0 && (
        <p>Google and Bing autocomplete, read {s.autocompleteRead}, also completed: {s.autocomplete.map((a) => `“${a}”`).join(", ")}. Autocomplete shows phrasings people type, not volumes.</p>
      )}
      <p className="sf-mono">Semrush · semrush.com/analytics/keywordoverview · Google and Bing autocomplete</p>
    </EvidenceDialog>
  );
}
