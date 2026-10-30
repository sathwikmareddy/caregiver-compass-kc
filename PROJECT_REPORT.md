# Caregiver Compass KC: A Needs-Aware Cancer Caregiver Support Navigator

**Project lead:** Kathy Benich, UMKC Alumna (1988), Cancer Nation Ambassador / Caregiver Project Lead  
**AI mentor:** Krishnasai Bharadwaj Atmakuri  
**AI supervisor:** Dr. Yugyung Lee  
**Prototype developer:** Sathwik Reddy Mareddy, UMKC Computer Science  
**Delivery target:** November 8, 2026

## Abstract

Cancer caregivers often manage practical and emotional responsibilities while navigating fragmented support programs. Caregiver Compass KC is an early-stage, privacy-conscious web prototype that gathers a caregiver's immediate concerns through optional text entry and structured selections, identifies relevant needs using explainable language matching, and presents three actionable suggestions sourced from a small curated resource catalog. The prototype focuses on the Kansas City region while including relevant national programs. It is intended for user-experience validation and future research, not for clinical decisions, automated eligibility determination, or production use.

## 1. Problem statement

Family and friends offering unpaid support to someone with cancer may not know which services exist or how to translate broad concerns into concrete actions. General web search requires sorting through multiple organizations and understanding their rules, sometimes while exhausted. Our design question is: Can a short, needs-first assessment help users reach relevant action steps with less effort?

## 2. Objectives

1. Enable a person to describe a problem or select support needs without creating an account.
2. Extract multiple support categories, such as transportation, costs, emotional support, appointments, and lodging.
3. Rank credible programs and display explainable recommendations with contact details and caveats.
4. Preserve the distinction between programs providing a **ride** and those providing a **gas card**.
5. Demonstrate a working, mobile-friendly end-to-end experience that can be tested with fictional cases.

## 3. Architecture

**UI:** static HTML/CSS/JavaScript with a responsive form, results view and searchable resource library.  
**Intent detection:** case normalization, curated keyword/synonym features, and weighted multi-label scores.  
**Ranking:** resource-category overlap, user selections, regional relevance, care stage, provider diversity, and hard exclusions for specified six-county eligibility boundaries.  
**Resource catalog:** 32 support entries plus 7 giving opportunities paraphrased from official organization pages, each with a provider, need tags, source URL, next step, and eligibility caveat.  
**Storage:** no database, cookies, user account or analytics. Text stays in page memory.  
**Deployment:** static hosting or direct local file opening.

## 4. Matching method

For a category *c*, a simple score combines explicit user choices and matched terms:

`S(c) = 8 × selected(c) + min(6, 2 × number_of_matched_terms(c))`

Each resource receives a relevance score based on its supported categories, stage, and geographic relevance. Resources restricted to specific counties are excluded when a selected county falls outside those counties. The algorithm attempts to select three providers rather than repeating the same organization. Reasons for selection are shown in plain language.

This is **rule-based natural-language processing**, not trained machine learning. It was intentionally selected to provide transparency and predictable baseline behavior within a short sprint. A future model could be evaluated against this baseline for classification accuracy, robustness and privacy.

## 5. Resource sourcing and trust

Source organizations include the American Cancer Society, Cancer Action KC, Gilda's Club Kansas City, United Way 211, CancerCare, the National Cancer Institute, and others. Resource metadata was checked using available official sources on **October 29, 2026**. Specific financial program rules, capacity, referral eligibility, and geographic scope must be reconfirmed with the provider before use. See `SOURCE_AUDIT.md`.

## 6. Evaluation plan

| Measure | Procedure | Results (complete after testing) |
|---|---|---|
| Relevance | Compare top 3 outputs with a human-reviewed answer for six fictional scenarios | Not yet measured |
| Task completion | Ask 3–5 volunteers to find a phone number and one suitable program | Not yet measured |
| Time to next step | Time participants from start to selecting a concrete action | Not yet measured |
| Source accuracy | Open every provider page and compare service/eligibility claims | Source metadata initially checked; final audit pending |
| Technical correctness | Run `node --test tests/*.test.js` | 18 automated cases passing |
| Usability | Ask users to rate clarity (1–5) and report confusion | Not yet measured |

Do not present targets as measured outcomes. Add actual data collected during the sprint.

## 7. Ethical considerations and boundaries

The prototype does not request patient names or detailed medical history, does not upload text, and explicitly warns against entering sensitive details. It does not diagnose, recommend treatments, evaluate urgent symptoms, guarantee program eligibility, or replace human clinical navigation. Service eligibility is complex and changes; program limitations are visible rather than hidden. End-user testing should use fictional cases until a mentor reviews consent and privacy requirements for real caregivers.

## 8. Known limitations and next steps

The curated database is small, text matching has linguistic limitations (especially negation and indirect language), and all provider availability is subject to change. Future directions include interviews with caregivers, independent expert review of recommendations, ongoing resource verification, clearer accessibility evaluation, language support, and a consent-based LLM classifier compared with the current transparent baseline.

## 9. Conclusion

The prototype demonstrates a practical way to turn caregiver uncertainty into manageable action steps using a limited, sourced resource catalog. The key question for future work is not whether it can produce fluent AI text, but whether caregivers consistently find the recommendations understandable, appropriate, accurate and useful.

## October 30 feature extension — practical support and community involvement

The prototype now distinguishes two user intentions: (1) caregivers seeking assistance and (2) community members wishing to donate or volunteer. The core intake has expanded to 13 need categories, including donated supplies, volunteer/community help, insurance and medical bills, and fundraising. The separate giving view has 7 outbound pathways for volunteer enrollment or charitable giving; no transactions or account creation occur inside the prototype. Financial assistance resources include screening and grants, hospital financial counselors, and financial-wellness education; the interface describes these differences clearly. MyLifeLine and CaringBridge coordinate help from an existing network and must not be presented as services that send unknown volunteers to a patient’s home.

Evaluation at this stage: 18 automated Node tests pass. Program eligibility and funding have NOT been verified for any specific caregiver. The new website UI should be checked in a regular desktop/mobile browser before a public presentation; do not represent it as a validated service.


## Added feature: Cancer Terms Explained (October 30, 2026)

The prototype also contains a searchable 61-term, six-category cancer-care glossary. A caregiver can look up medical abbreviations, diagnostic words, side effects, caregiver services and health-insurance terminology. Each entry offers a simple definition, why it may come up, a useful question to ask the clinical team, and a link to an authoritative reference. A matching word in the free-text intake can link directly to its definition. This is educational content only, not medical interpretation. Demonstrate a search for “neutropenia” and “palliative care” to show the caregiver-centered approach.
