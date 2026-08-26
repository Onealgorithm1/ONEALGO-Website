/**
 * Registry identifier self-check.
 *
 * These four numbers are the ones a contracting officer, a prime's compliance
 * desk or a bank types into someone else's system. A wrong one is not a typo,
 * it is a responsibility-determination problem — and we have already had one:
 * the site published D-U-N-S 117847561 for months because the marketing
 * capability statement said so. The real number, read from the company's own
 * D&B D-U-N-S Profile Manager on 2026-08-26, is 118835343.
 *
 * So this file pins each value to the record it came from, and asserts the
 * shape rules the issuing registry actually enforces. It fails loudly if a
 * future edit drifts any of them.
 *
 * Sources, all re-checkable:
 *   UEI + CAGE   SAM.gov entity for ONE ALGORITHM LLC (active, expires
 *                2027-04-17). api.sam.gov/entity-information/v3/entities
 *   D-U-N-S      smallbusiness.dnb.com/duns-manager/company-profile, signed in
 *                as the company, 2026-08-26: "D-U-N-S Number: 11-883-5343".
 *   E-Verify     everify.uscis.gov/account/company/profile, exported
 *                2026-05-13, held at 06_Compliance/Employment_and_HR/E-Verify.
 *                Company ID 2375403, enrolled 2024-02-04.
 *
 * Run: node scripts/identifiers-check.mjs
 */

import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

/** Every file under `dir` matching `match`. Missing directories are fine — not
 *  every checkout has a server/ — but a typo'd one would silently scan nothing,
 *  so the caller gets an empty list only when the directory genuinely absent. */
function sourceFiles(dir, out = [], match = /\.(tsx?|jsx?|html|json|txt|xml)$/) {
  let entries;
  try {
    entries = readdirSync(join(root, dir), { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue;
      sourceFiles(path, out, match);
    } else if (match.test(entry.name)) out.push(path);
  }
  return out;
}

/** Values verified against the primary records named in the header. */
const EXPECTED = {
  uei: "W8DYK38MEKP3",
  cage: "14G18",
  duns: "118835343",
  everify: "2375403",
  everifyEnrolledDate: "2024-02-04",
};

/** The number the site used to publish. It must never come back. */
const RETIRED_DUNS = "117847561";

const failures = [];
const fail = (msg) => failures.push(msg);

// ---------------------------------------------------------------- shape rules

/** SAM.gov UEI: 12 alphanumeric characters, no I and no O so it cannot be
 *  confused with 1 and 0, and it never starts with a zero. */
if (!/^[A-HJ-NP-Z1-9][A-HJ-NP-Z0-9]{11}$/.test(EXPECTED.uei)) {
  fail(`UEI ${EXPECTED.uei} is not a valid SAM.gov UEI`);
}

/** CAGE: five characters. For a US-assigned code the first and fifth are
 *  NUMERIC and the middle three are alphanumeric excluding I and O. An earlier
 *  version of this rule was `[A-HJ-NP-Z0-9]{5}`, which passes "ABCDE" — it
 *  claimed to encode what the registry enforces and did not. */
if (!/^\d[A-HJ-NP-Z0-9]{3}\d$/.test(EXPECTED.cage)) {
  fail(`CAGE ${EXPECTED.cage} is not a valid US CAGE code`);
}

/** D-U-N-S: exactly nine digits. */
if (!/^\d{9}$/.test(EXPECTED.duns)) {
  fail(`D-U-N-S ${EXPECTED.duns} is not nine digits`);
}

/** E-Verify company ID: four to seven digits (E-Verify glossary). */
if (!/^\d{4,7}$/.test(EXPECTED.everify)) {
  fail(`E-Verify ID ${EXPECTED.everify} is not four to seven digits`);
}

/** Enrollment date must be a real ISO date, and not in the future. */
const enrolled = new Date(`${EXPECTED.everifyEnrolledDate}T12:00:00Z`);
if (Number.isNaN(enrolled.getTime())) {
  fail(`E-Verify enrollment date ${EXPECTED.everifyEnrolledDate} is not a date`);
} else if (enrolled > new Date()) {
  fail(`E-Verify enrollment date ${EXPECTED.everifyEnrolledDate} is in the future`);
}

// ------------------------------------------------- the published values agree

const profile = read("shared/companyProfile.ts");

for (const [key, value] of Object.entries(EXPECTED)) {
  // Matches `uei: "W8DYK38MEKP3",` regardless of surrounding comments.
  const found = new RegExp(`\\b${key}:\\s*"([^"]+)"`).exec(profile);
  if (!found) {
    fail(`shared/companyProfile.ts has no ${key} field`);
  } else if (found[1] !== value) {
    fail(
      `shared/companyProfile.ts ${key} is "${found[1]}", expected "${value}"`,
    );
  }
}

// ------------------------------------------ the retired number stays retired

/*
 * The failure mode is someone hardcoding the number into a page instead of
 * reading siteConfig — which is exactly how it spread last time, via a
 * capability statement that printed it as LABELLED TEXT.
 *
 * So this is a plain substring test, not a pattern. A previous version looked
 * for the number in quotes, `["'>]\s*117847561\s*["'<]`, and that missed every
 * realistic case: `<dd>D-U-N-S 117847561</dd>`, `"D-U-N-S: 117847561"`, a
 * template literal, a JSX numeric prop. It printed "passed" while guarding
 * almost nothing. If the digits appear anywhere in a shipped file, that is the
 * finding — there is no innocent reason for them to.
 *
 * The one exemption is this file and companyProfile.ts, which both explain the
 * correction in prose and have to name the number to do it. In companyProfile
 * the exemption is narrow: prose is fine, a value is not.
 */
const EXPLAINS_THE_CORRECTION = "shared/companyProfile.ts";

const retiredScan = [
  ...sourceFiles("client"),
  ...sourceFiles("shared"),
  ...sourceFiles("server"),
  ...sourceFiles("public"),
  "index.html",
];

for (const file of retiredScan) {
  const body = read(file);
  if (file === EXPLAINS_THE_CORRECTION) {
    // A quoted string, a JSON value or a bare numeric assignment = published.
    if (new RegExp(`(["'>]\\s*|:\\s*)${RETIRED_DUNS}\\s*(["'<]|,|$)`, "m").test(body)) {
      fail(`${file} assigns the retired D-U-N-S ${RETIRED_DUNS} as a value`);
    }
  } else if (body.includes(RETIRED_DUNS)) {
    fail(`${file} contains the retired D-U-N-S ${RETIRED_DUNS}`);
  }
}

/* The capability statement is a published artefact too, and it is hand-made,
   so nothing else in this repo would catch it. Read as latin1 so the substring
   test works on the raw bytes of an uncompressed PDF text stream. */
for (const pdf of sourceFiles("public", [], /\.pdf$/i)) {
  const bytes = readFileSync(join(root, pdf), "latin1");
  if (bytes.includes(RETIRED_DUNS)) {
    fail(`${pdf} contains the retired D-U-N-S ${RETIRED_DUNS}`);
  }
}

// -------------------------------------- structured data carries the same ones

const html = read("index.html");
for (const [name, value] of [
  ["D-U-N-S", EXPECTED.duns],
  ["E-Verify Company ID", EXPECTED.everify],
  ["CAGE", EXPECTED.cage],
  ["UEI", EXPECTED.uei],
]) {
  if (!html.includes(`"value": "${value}"`)) {
    fail(`index.html JSON-LD is missing ${name} ${value}`);
  }
}

// --------------------------------------------------------------------- report

const pdfs = sourceFiles("public", [], /\.pdf$/);
const checks =
  5 + Object.keys(EXPECTED).length + retiredScan.length + pdfs.length + 4;
if (failures.length) {
  console.error(`identifiers-check: ${failures.length} of ${checks} FAILED\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`identifiers-check: ${checks} checks passed`);
console.log(
  `  UEI ${EXPECTED.uei} · CAGE ${EXPECTED.cage} · D-U-N-S ${EXPECTED.duns} · E-Verify ${EXPECTED.everify}`,
);
