# Kathy Benich feedback — implemented upgrade and poster Q&A

Prepared for the Caregiver Compass KC UMKC student proof of concept (November 7, 2026).

## Question 1: How does the site find and integrate new trusted resources?

**What is now implemented:**

1. `maintenance/trusted-sources.json` is an explicit list of *approved official provider hub pages*. The list can grow after human review.
2. `maintenance/discover.mjs` downloads those hub pages (with a timeout), extracts potentially relevant new HTTPS links **on those approved sites**, compares them with the known catalog, and writes `maintenance/review-queue.json` plus `maintenance/latest-report.md`.
3. `.github/workflows/resource-review.yml` schedules a weekly scan on GitHub Actions and can open/update an issue for reviewers if candidates appear. **This only operates when the repository is pushed to GitHub with Actions enabled and the workflow has the required permission.** Reports are also saved as workflow artifacts. A developer can run the scan manually.
4. A reviewer opens the official pages and checks: service offered, who qualifies, location, provider contact, eligibility restrictions, current availability limitations, privacy, and the source-review date. They add *only verified records* to `maintenance/approved-resources.json`, recording `reviewedBy` and `reviewedAt`.
5. `node maintenance/publish.mjs` validates reviewed records, category tags, duplicate IDs, recent source review dates, HTTPS and the trusted provider domain. It generates `approved-resources.js`. The website loads it after the core catalog. Only **approved** records are ever visible to caregivers.

**Important distinction:** This is a functional **candidate discovery and human-curation pipeline**, *not* a live comprehensive resource crawler. It can miss new programs on pages it does not inspect; provider HTML, availability and program restrictions may change. It must never publish scraped text automatically. Newly added entries become visible after the verified update is committed and deployed. Existing entries are still periodically rechecked manually; an unmodified URL can conceal a changed program.

### Workflow in commands

From the project folder:

```bash
node maintenance/discover.mjs
# Open maintenance/latest-report.md and maintenance/review-queue.json.
# Use the source URL to verify each candidate manually.
# Add a complete, verified record to maintenance/approved-resources.json.
node maintenance/publish.mjs
node --test tests/*.test.js
# Commit the reviewed JSON and generated approved-resources.js and deploy.
```

To demonstrate *offline*, run:

```bash
node maintenance/discover.mjs --offline-fixture tests/scan-fixture.html
```

This deliberately uses a fictional link on an approved domain as a **candidate only**; it does not add a fake service to the user-facing library. To reset the example queue and report, run the live scan when internet is available, or restore the queue file.

### Example human-approved entry (ILLUSTRATION ONLY — never add without checking)

```json
{
  "id": "unique-program-slug",
  "name": "Exact official program name",
  "organization": "Exact vetted organization",
  "categories": ["transport"],
  "scope": "kc-region",
  "verified": "YYYY-MM-DD",
  "url": "https://the-organization-official-domain.example/program",
  "phone": "",
  "summary": "Carefully checked summary",
  "eligibility": "Confirmed rules and caveats",
  "action": "Concrete next step",
  "kind": "Direct service",
  "reviewedBy": "Actual human reviewer",
  "reviewedAt": "YYYY-MM-DD"
}
```

The example domain is not trusted: publication will reject it. A new legitimate organization must first be added to the reviewed trusted domain registry.

## Question 2: How does the site react to urgent symptoms or emergencies?

**What is now implemented:**

- `safety.js` scans text locally for a **small, reviewable set of clear danger phrases**. Its rules run *before* ordinary resource matching. Text is not transmitted.
- Life-threatening signals such as severe chest pain, serious breathing difficulty, unresponsiveness, or possible stroke show a prominent **call 911** message (U.S.) and pause ordinary recommendations.
- A possible fever (including 100.4°F / 38°C) or infection-related symptoms **during cancer treatment** show a **call your oncology team immediately** alert, including after-hours guidance and escalation if they cannot be reached.
- The warning can appear while typing and again when submitting the form. The persistent **Need urgent help?** button remains available even when there is no keyword match.
- Rule patterns include some denial and hypothetical-language handling to reduce obvious false alarms.

**Safety boundaries:** These alerts are *not* clinical triage, diagnosis, validated emergency detection, or a guarantee that the site will recognize a crisis. Real emergencies can occur without matching words, and keywords can produce false alarms. The site never displays “You are safe” and never tells someone to delay care. Patients and caregivers should use the team's written emergency instructions, and this feature requires an oncology clinician / patient-safety expert review before real-patient deployment.

### Demonstration scenarios (fictional)

| Input | Expected app response |
|---|---|
| “I need rides to chemotherapy and financial help.” | Standard 3-step support plan |
| “My mom is receiving chemo and has a fever of 100.4°F.” | Amber oncology-call warning; routine plan paused |
| “My dad cannot breathe.” | Red emergency / call 911 warning; routine plan paused |
| “No chest pain; we just need help paying bills.” | Standard plan (simple negation supported) |

CDC says a fever of 100.4°F (38°C) or higher during chemotherapy warrants an immediate call to a doctor: https://www.cdc.gov/cancer-preventing-infections/patients/fever.html

NCI advises contacting the care team about signs of infection during cancer treatment: https://www.cancer.gov/about-cancer/treatment/side-effects/infection

ACS outlines symptoms for which emergency services or an emergency department are appropriate: https://www.cancer.org/cancer/side-effects/shortness-of-breath.html

## Suggested poster-session answers

**Q: How will it stay up to date as new organizations start services?**

> We now separate discovery from publishing. A scheduled scan checks selected trusted providers for potentially new resources and creates a human review queue. A reviewer confirms the program, its official source and eligibility, and only approved records are published. That keeps the system expandable without allowing unverified scraped information to become medical or service advice. Scanning is not comprehensive, so we also accept new provider suggestions for review and perform manual audits.

**Q: How does it know when to tell a caregiver to contact a doctor or call 911?**

> Before the nonmedical matching engine runs, a separate rule-based safety layer looks for a small set of high-priority warning phrases. It can redirect people to 911 for possible emergencies or to the oncology team for fever and possible infection during treatment. We deliberately do not claim clinical triage: there are false positives and missed cases, and the persistent help link is available at all times. Clinical validation would be required before real-world use.

## What remains before real-world deployment

1. Obtain oncology clinician validation and a patient-safety risk assessment of the red-flag rules, wording, and escalation pathways.
2. Perform structured tests of synonyms, negations, multilingual inputs, ambiguous timelines, children, and accessibility with synthetic scenarios; track false negatives and false positives.
3. Assign a named source steward, review cadence, audit trail, removal/expiry workflow, and provider-confirmation procedure. Monitor scan failures, broken links, provider updates, and changes on existing pages.
4. Make clear that the static site is neither monitored by clinicians nor a real-time source of service availability. Do not collect patient-identifying information without appropriate privacy review.
