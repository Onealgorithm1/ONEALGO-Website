# Project Note — Website Contact Form → Salesforce BPO Connection

**Status:** Local hardening in progress · **NOT committed / NOT pushed / NOT deployed**
**Scope:** Website-side only. **No Salesforce metadata or production-record changes.**
**Last updated:** 2026-07-02

---

## Guardrails (in force for this task)
- ❌ Do **not** commit
- ❌ Do **not** push
- ❌ Do **not** deploy
- ❌ Do **not** modify Salesforce metadata
- ❌ Do **not** change Salesforce production records
- ❌ Do **not** submit production test data unless explicitly approved
- ❌ Do **not** assume any custom Salesforce fields exist

---

## Verified context
- Website form uses Salesforce **Web-to-Lead** (`https://webto.salesforce.com/servlet/servlet.WebToLead`).
- Current form `oid` = **`00Dbn00000plgUf`**.
- This is the 15-char form of BPO org ID **`00Dbn00000plgUfEAI`**.
- BPO org user: **`oauser@pboedition.com`** · domain **`onealgorithmllc.my.salesforce.com`**.
- **Conclusion:** the website form already points to the correct Salesforce BPO org (the org that runs the outreach/EDWOSB campaign, leads, and unsubscribe flow). **No org repoint needed.**

## Current hidden Web-to-Lead fields (inspected in `client/pages/Contact.tsx`)
| Field | Value | Notes |
|---|---|---|
| `oid` | `00Dbn00000plgUf` | Correct BPO org |
| `retURL` | `window.location.href` | Standard |
| `first_name` | parsed from `name` | first token of full name |
| `last_name` | parsed from `name` | remaining tokens |
| `email` | `formData.email` | validated client-side |
| `company` | `formData.company` | required in UI |
| `description` | `Service: <whatYouNeed>\n\n<message>` | service interest lives here (no verified custom field) |
| `lead_source` | *(absent → being added = `Website`)* | see change below |

## Website-side change (local only)
Add one hidden field so web leads are tagged and reportable:
```diff
  addHiddenField("description", `Service: ${formData.whatYouNeed}\n\n${formData.message}`);
+ addHiddenField("lead_source", "Website");
```

---

## Implementation Checklist

### 1. Web-to-Lead `oid` confirmation — ✅ VERIFIED
- `oid=00Dbn00000plgUf` = 15-char of `00Dbn00000plgUfEAI` (BPO org). Correct org; no change needed.

### 2. `LeadSource = Website` — ⏳ website done / Salesforce value pending
- Website: hidden field `lead_source = "Website"` added (see diff).
- **Salesforce-side to verify (no metadata change here):** confirm **"Website" exists as a `LeadSource` picklist value** in the BPO org. If the org's picklist only has "Web" (Salesforce default), the value will be dropped/ignored. If "Website" is not present, either (a) use the existing value, or (b) add the picklist value — **that is a metadata change and requires separate approval; not done here.**

### 3. Field mapping — ⏳ verify against a freshly generated form
- Current mapped standard fields: `first_name`, `last_name`, `email`, `company`, `description`, `lead_source`, plus `oid`, `retURL`.
- **Verify:** regenerate a Web-to-Lead form in **Setup → Web-to-Lead → Create Web-to-Lead Form** and confirm these field names still match the org (standard names are stable, but confirm no required custom fields are expected).

### 4. Service interest handling — ✅ decision recorded
- No verified custom field exists. Keep the "What do you need?" value in **`description`** (prefixed `Service: `).
- **Future (needs user input):** if a custom field exists (e.g., a "Service Interested In" picklist), provide its **API name**; then map `whatYouNeed` to it instead of the description.

### 5. Lead assignment / owner / queue — ⏳ Salesforce-side (needs org access)
- **Verify in org:** an active **Lead Assignment Rule** (or a sensible **default lead owner/queue**) routes new web leads to a person, and Web-to-Lead is configured to run the assignment rule. Without this, web leads may land on a default owner and be missed. *(Read-only verification; no change without approval.)*

### 6. Campaign exclusion verification — ✅ VERIFIED via source/memory
- `OA_DripScheduler.addLeadsToCampaign()` enrolls only leads matching `LeadSource='SAM.gov'` **and** `Outreach_Cohort__c='Wave 1'` (plus not-test, not-opted-out, not-converted, has-email, not-already-member).
- Website leads (`LeadSource='Website'`, no `Outreach_Cohort__c`) **do not match** → excluded from the EDWOSB/SAM.gov outreach campaign.
- **Residual check:** confirm no *other* Flow/automation enrolls web-sourced leads. *(Read-only.)*

### 7. Controlled end-to-end test — 🔒 REQUIRES EXPLICIT APPROVAL
- Do **not** run without approval. When approved:
  - Submit one clearly-labeled test lead (e.g., Name `WEBTEST <timestamp>`, a controlled test email, Company `WEBTEST`).
  - Confirm the Lead appears in the BPO org with expected fields (Section 8).
  - Confirm it is **not** a CampaignMember of the outreach campaign.
  - Remove the test Lead afterward **only with approval** (production record change).

### 8. Expected Salesforce Lead result
A new **Lead** in `00Dbn00000plgUfEAI` with:
- `FirstName` / `LastName` from the submitted name
- `Email`, `Company` as submitted
- `Description` = `Service: <whatYouNeed>` + blank line + `<message>`
- `LeadSource` = `Website` (subject to Section 2 picklist check)
- Owner per active assignment rule (Section 5)
- **Not** a member of the EDWOSB/SAM.gov outreach campaign (Section 6)

### 9. Rollback plan
- Website change is a **single added line**; rollback = remove `addHiddenField("lead_source", "Website");` (or `git checkout -- client/pages/Contact.tsx`).
- Nothing is committed/pushed/deployed, so there is no remote/production website state to revert.
- **No Salesforce changes are made in this task**, so there is nothing to roll back on the Salesforce side.

### 10. Files changed (local, uncommitted)
- `client/pages/Contact.tsx` — +1 line (`lead_source` hidden field).
- `CONTACT_FORM_SALESFORCE_CONNECTION.md` — this note (new, untracked).

---

## Salesforce Admin Verification Steps

> For a **human Salesforce admin** in org `00Dbn00000plgUfEAI` (`oauser@pboedition.com`, `onealgorithmllc.my.salesforce.com`).
> All steps are **read-only verification**. Do **not** change metadata or records. Do **not** run the end-to-end test until approved.

### 1. Confirm Web-to-Lead is enabled
- **Setup → Quick Find → "Web-to-Lead" → Web-to-Lead Setup.**
- Verify **"Web-to-Lead Enabled"** is checked.
- Note the **Default Lead Creator** and whether a default response/auto-response is configured.

### 2. Confirm the generated Web-to-Lead form uses org ID `00Dbn00000plgUf`
- **Setup → Web-to-Lead → "Create Web-to-Lead Form"**, generate the form.
- In the generated HTML, confirm the hidden input **`oid` = `00Dbn00000plgUf`**.
- Cross-check: **Setup → Company Information → Salesforce.com Organization ID = `00Dbn00000plgUfEAI`** (its first 15 characters are `00Dbn00000plgUf`). ✅ matches the website form.

### 3. Confirm `LeadSource` contains the picklist value `Website`
- **Setup → Object Manager → Lead → Fields & Relationships → Lead Source → Values.**
- Confirm **`Website`** exists and is **Active** (exact spelling and case).
- If only `Web` (Salesforce default) exists and `Website` does not: **stop and report.** Do **not** add the value (metadata change) without approval — the website field can instead be set to the existing value.

### 4. Confirm Website leads route to the correct owner or queue
- Decide the intended **owner or queue** for website leads.
- **Setup → Web-to-Lead Setup** — note the **default lead owner**.
- **Setup → Lead Assignment Rules →** open the **active** rule → review entries. Confirm an entry (or catch-all) routes web leads (e.g., criteria `Lead Source = Website`, or a default) to that owner/queue.
- Confirm the Web-to-Lead form is configured to **"Assign using active assignment rule"** if routing depends on it.

### 5. Confirm no assignment rule sends Website leads into the SAM.gov / EDWOSB outreach flow
- **Setup → Lead Assignment Rules →** active rule → inspect **every** rule entry.
- Confirm **no** entry that matches `Lead Source = Website` (or matches all) does any of:
  - sets `Outreach_Cohort__c = 'Wave 1'`, or
  - overwrites `Lead Source` to `SAM.gov`, or
  - assigns the lead to the outreach owner/queue used for the EDWOSB program.

### 6. Confirm no Flow, Apex, Campaign automation, or scheduler auto-adds Website leads to the EDWOSB campaign
- **Flows — Setup → Flows:** review Lead **record-triggered** flows. Confirm none, for a `Lead Source = Website` lead, set `Outreach_Cohort__c='Wave 1'` / `Lead Source='SAM.gov'` or create a `CampaignMember`. *(Note: `OA_EDWOSB_Outreach_Sequence` is CampaignMember-triggered, not Lead-triggered — it only fires after a CampaignMember already exists.)*
- **Apex triggers — Setup → Object Manager → Lead → Triggers:** confirm no Lead trigger enrolls website leads.
- **Scheduler — Setup → Scheduled Jobs:** locate `OA_DripScheduler_Wave1`. Its enrollment SOQL requires **`LeadSource = 'SAM.gov'` AND `Outreach_Cohort__c = 'Wave 1'`** (plus `Is_Test_Lead__c=false`, `HasOptedOutOfEmail=false`, `IsConverted=false`, `Email != null`). A `LeadSource = 'Website'` lead with no `Outreach_Cohort__c` **does not match** → excluded. ✅
- **Legacy — Setup → Workflow Rules / Process Builder** on Lead: confirm none add website leads to the campaign.

### 7. Controlled end-to-end test plan (exists — do NOT execute without approval)
- A test plan is defined below and in **Section 7** of the Implementation Checklist.
- **Do not submit** the test until explicitly approved. After approval, submit once, verify the Expected Salesforce Result, then remove the test Lead **only with approval** (production record change).

---

### Expected test values
| Field | Value |
|---|---|
| First Name | `Website` |
| Last Name | `Test` |
| Company | `One Algorithm Test` |
| Email | *a controlled test email (admin-provided)* |
| LeadSource | `Website` |

### Expected Salesforce result
- ✅ **Lead created** in org `00Dbn00000plgUfEAI`.
- ✅ **`LeadSource = Website`**.
- ✅ **Description populated** (`Service: <whatYouNeed>` + blank line + `<message>`).
- ✅ **Service interest captured in Description** — unless a **verified custom field** exists and is mapped.
- ✅ **Correct owner or queue assigned** (per Step 4).
- ❌ **No `CampaignMember`** created for **"EDWOSB Teaming Outreach – Prime Subcontract"**.
- ❌ **No unsubscribe token** created — unless an automation is expected to create one.
- ❌ **No incorrect outreach email** sent (no Day-1/drip email to a website lead).

---

## Open items needing the user / Salesforce access
- [ ] Confirm `Website` is a valid `LeadSource` picklist value (Section 2).
- [ ] Provide custom "Service Interested In" field API name, if one exists (Section 4).
- [ ] Verify lead assignment rule / owner / queue (Section 5).
- [ ] Approve the controlled end-to-end test before any submission (Section 7).

---

## Automated Verification Results (2026-07-02, via PowerShell + Salesforce CLI, read-only)

| # | Check | Result |
|---|-------|--------|
| 1 | Repo state | ✅ branch `review-fixes`; `lead_source="Website"` at Contact.tsx:120; note file present; not committed |
| 2 | Org connection | ✅ Connected · `oauser@pboedition.com` · orgId `00Dbn00000plgUfEAI` · `onealgorithmllc.my.salesforce.com` · API 67.0 |
| 3 | oid alignment | ✅ website `oid` `00Dbn00000plgUf` = first 15 chars of org ID (exact match) |
| 4 | LeadSource = Website | ⛔ **BLOCKED — LeadSource Website value missing.** Active values: Advertisement, Employee Referral, External Referral, Partner, Public Relations, Seminar-Internal, Seminar-Partner, Trade Show, **Web**, Word of mouth, Other. `Website` absent. Field is **unrestricted** (restrictedPicklist=False) + createable, so `Website` would still be *stored* via Web-to-Lead, but it is not a defined value. |
| 5 | Service-interest field | ✅ none of the candidate custom fields exist; no Lead custom field matches service/interest/need/inquiry → keep in Description |
| 6 | Routing / owner / queue | ✅ **0 Lead assignment rules**, **0 Lead queues** → leads go to the Web-to-Lead **default owner**. Nothing can divert web leads to SAM.gov/EDWOSB. *(CLI limit: the default-owner value is a Web-to-Lead Setting, not exposed via SOQL — see fallback.)* |
| 7 | Campaign safety | ✅ `OA_DripScheduler.cls:28-29` filter = `LeadSource='SAM.gov' AND Outreach_Cohort__c='Wave 1'` → website leads excluded. Jobs `OA_DripScheduler_Wave1` + `OA EDWOSB Follow-Up Daily` = WAITING (not modified). |
| 8 | Flow / Apex risk | ✅ Lead trigger `updatePackages` = minimal body, no LeadSource/Campaign/Outreach refs. 18 active flows; Lead-related ones (`OA_PostMeeting_Nurture`, `OA_Reply_Detection`) gate on `Relationship_Status__c` changes + act on *existing* CampaignMembers; `OA_EDWOSB_Outreach_Sequence` is CampaignMember-triggered; `lead_by_ramesh` inactive. **No flow sets LeadSource=SAM.gov, sets Outreach_Cohort='Wave 1', or creates a CampaignMember for a web lead.** |

**Resolution for the #4 blocker (pick one — requires your approval, neither done here):**
- **Option A (recommended, website-only, no Salesforce change):** change the form value from `Website` → **`Web`** (an existing active value). Clean reporting; 1-line local edit.
- **Option B (Salesforce metadata change, needs admin approval):** add `Website` as a LeadSource picklist value.

**CLI limitation (Check 6 fallback):** the Web-to-Lead **default lead owner/creator** is a Setup setting not returned by SOQL. Fallback: retrieve `Settings`/Web-to-Lead metadata, or one-time glance at Setup → Web-to-Lead Setup. Not blocking (no rules/queues exist to override it).

## Controlled Test — PREPARED, NOT EXECUTED (gated on approval)

**Exact PowerShell that WOULD submit it (do NOT run until approved):**
```powershell
$body = @{
  oid         = '00Dbn00000plgUf'
  retURL      = 'https://onealgorithm.com/contact'
  first_name  = 'Website'
  last_name   = 'Test'
  company     = 'One Algorithm Test'
  email       = '<CONTROLLED_TEST_EMAIL>'
  lead_source = 'Web'   # use 'Web' (or 'Website' only after Option B)
  description = 'CONTROLLED WEBSITE FORM TEST — please delete. Service: <selection>'
}
Invoke-WebRequest -Uri 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8' `
  -Method Post -Body $body -ContentType 'application/x-www-form-urlencoded'
```

**Post-test verification SOQL (read-only):**
```powershell
sf data query --target-org oauser@pboedition.com --query "SELECT Id, Name, Company, Email, LeadSource, Description, Owner.Name, CreatedDate FROM Lead WHERE Company='One Algorithm Test' AND LastName='Test' ORDER BY CreatedDate DESC LIMIT 5"
sf data query --target-org oauser@pboedition.com --query "SELECT Id, Campaign.Name FROM CampaignMember WHERE Lead.Company='One Algorithm Test'"   # expect 0 rows
```

**Rollback / cleanup:** after verifying, delete the test Lead (production record change — needs approval):
`sf data delete record --sobject Lead --record-id <Id> --target-org oauser@pboedition.com`

**Risks:** creates a REAL production Lead; may trigger any auto-response email to the test address and any new-lead notification to a real user. That is why it stays gated.
