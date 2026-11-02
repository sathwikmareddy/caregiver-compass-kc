# Caregiver Compass KC

**A privacy-conscious, needs-aware support navigator for people caring for a loved one with cancer.**

A solo-developer, UMKC student proof of concept for the Kathy Benich cancer caregiver support initiative. Built to demonstrate how a caregiver can move from “I'm overwhelmed and don't know where to start” to three useful next steps.

## Run it in 30 seconds

1. Extract the ZIP to a folder.
2. Double-click `index.html` in Chrome, Safari, Firefox, or Edge. No install, account, internet connection for the matching engine, or API key is required.
3. Choose **Try an example scenario**, then **Find my next steps**.
4. Click **Resource library** to search by financial wellness, insurance, free supplies, volunteer help, and other needs.
5. Click **Cancer terms explained** to look up medical terms such as *CBC, ANC, biopsy, chemotherapy, palliative care,* and *copay*.
6. Click **Donate & volunteer** to explore separate ways to contribute to reputable organizations.

For development, a local server is also convenient:

```bash
cd Caregiver_Compass_KC
python3 -m http.server 8000
# Open http://localhost:8000
```

**Online connection required only to open the external organization websites and to call services.** The application itself is static and usable offline.

## What it does

- Plain-language caregiver intake plus 13 optional need categories
- Multi-label language matching with a transparent, weighted rule-based NLP engine
- Journey-stage and county-aware resource prioritization
- Three-step personal action plan with source links, contact numbers and eligibility cautions
- Searchable resource directory with **32 manually curated caregiver-support entries**
- Separate **Donate & volunteer** section with **7** official opportunities
- Access to financial counseling, co-pay grants, volunteer coordination and donated supplies
- **Cancer Terms Explained**: 61 plain-language medical, caregiving and insurance terms, searchable by word or abbreviation, filtered across 6 topics. Each card provides a simple definition, context, an example question to ask a clinician, and an official reference link. A term mentioned in the caregiver intake can also appear as a clickable explanation beside recommendations.
- Print/save-to-PDF and copy-to-clipboard action plan options
- Mobile-responsive interface, keyboard-accessible controls, no account and no health-data storage

## Technology

- HTML5, CSS3 and plain JavaScript (no dependencies, free hosting)
- `engine.js` contains the classification and recommendation logic
- `resources.js` contains the auditable, curated services catalog
- `glossary.js` contains the 61-entry educational glossary
- `app.js` manages the UI and integrates the recommendation engine
- `tests/engine.test.js` includes automated coverage for intent detection, eligibility filtering, and recommendations. `tests/glossary.test.js` checks glossary coverage, source domains, and key safety distinctions

The recommendation engine is **explainable, deterministic NLP/rule matching; it is not a machine-learned or LLM-based model**. That distinction is important in presentations. If mentor feedback calls for a language model, it can be integrated as an optional, consent-based enhancement after the reliable MVP is demonstrated.

## Test the project

```bash
node --test tests/*.test.js
```

Works with Node.js 18+. The application itself does not require Node.js.

## Deploy for free

**Netlify Drop:** Visit `https://app.netlify.com/drop` and drag the extracted folder containing `index.html`, `app.js`, `engine.js`, `resources.js`, and `styles.css` into the deployment area. Netlify should give you a preview URL; review it before sharing.

**GitHub Pages:** Push these files to a public repository and enable GitHub Pages for the root of the main branch. Links are relative and the site does not need a build command.

Do **not** upload private patient information or API secrets. The project has no database, backend, or analytics.

## Privacy and safety

- Form text is processed only in browser memory. The prototype does not submit it to any server. External links lead to organizations with their own policies.
- No accounts, cookies, persistent local storage, patient records, or third-party analytics.
- Users are asked not to enter patient names or detailed health information.
- Resources are referrals for further information, **not** guarantees of care, eligibility or appointment availability.
- This prototype does not evaluate symptoms, provide medical advice, diagnose, make treatment recommendations, or detect emergencies.
- For a medical emergency in the US: 911. For concerns about symptoms or treatments: contact the treating medical team.
- The glossary cannot interpret medical records, test results, stage, prognosis, or treatment options for an individual. Its short definitions are paraphrased from NCI, American Cancer Society, and HealthCare.gov and have not been clinically peer-reviewed. Individual terms link to public official references.

## Project limitations

1. The resource catalog is a small, manually curated sample focused on the Kansas City area and several national providers, **not a comprehensive search engine**.
2. Source checks were done October 29–30, 2026. Availability, hours, rules and funding may change; the user must verify with providers.
3. County filtering is conservative for listed Cancer Action programs and is not an eligibility determination.
4. The keyword-based NLP method can miss nuanced expressions, context, and negation. It should be tested with caregivers and improved based on real feedback.
5. There is no real-time provider status, live appointment scheduling, or human clinical review.

## Folder contents

| File | Purpose |
|---|---|
| `index.html` | App layout and semantic UI |
| `styles.css` | Responsive visual design |
| `resources.js` | 32 caregiver-support records and 7 donate/volunteer listings with links |
| `engine.js` | Intent detection, eligibility filter, resource ranking |
| `glossary.js` | 61 searchable terms with plain-English explanations and official learning links |
| `tests/glossary.test.js` | Glossary data and safety regression tests |
| `app.js` | Intake, sample demo, plan generation, library UI |
| `tests/engine.test.js` | Automated regression tests |
| `DEMO_SCRIPT.md` | Four-minute presentation script |
| `PROJECT_REPORT.md` | Ready-to-edit academic project report |
| `SOURCE_AUDIT.md` | Verification references and reminders |
| `NEXT_10_DAYS.md` | Solo-developer schedule through Nov 8 |
| `PRESENTATION_OUTLINE.md` | Suggested slide content |
| `NEW_RESOURCES.md` | October 30 enhancements and demonstration scenarios |

## Credits

Project context: Kathy Benich (project lead), Dr. Yugyung Lee (AI supervisor), Krishnasai Bharadwaj Atmakuri (AI mentor). Prototype prepared for development by Sathwik Reddy Mareddy, UMKC Computer Science. Resource information belongs to the linked providers and is reproduced as short paraphrases, not full content.

**Development status:** Fully implemented baseline prototype with automated engine tests. Complete hands-on browser and stakeholder usability testing before representing it as a validated product.
