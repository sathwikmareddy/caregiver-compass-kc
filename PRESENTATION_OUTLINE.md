# Suggested seven-slide presentation (5–7 minutes)

**Slide 1 — Caregiver Compass KC**
- Clear next steps for cancer caregivers
- UMKC student proof of concept, November 8, 2026
- Developer: Sathwik Reddy Mareddy

**Slide 2 — The problem**
- Caregivers juggle appointments, transport, finance, employment and stress
- Many resources exist but are fragmented
- Overwhelmed people need prioritization, not a list of 100 links

**Slide 3 — The solution and user journey**
- Describe concern or select needs → match intent and region → top 3 next steps → provider contact
- Put a screenshot of the home screen here

**Slide 4 — System design**
- Web UI → normalization / multi-label keyword extraction → explicit category weights → county filter → relevance ranking → resource cards
- 40 caregiver-support entries, 13 supported need categories, plus 7 giving and volunteer opportunities
- Explainable local-first NLP; no patient data sent to a server

**Slide 5 — Demonstration**
- Fictional case: chemotherapy rides + bills + caregiver stress
- Demonstrate the recommendations and eligibility cautions
- Open the separate Donate & volunteer tab to show volunteer opportunities and official donation pathways
- Put a screenshot of the results screen here

**Slide 6 — Testing, impact and limitations**
- Report genuine test counts and outcomes (do not fabricate)
- 25 development tests for safety keyword cases, matching smoke checks and resource review workflow
- No live availability or medical advice; manual catalog upkeep; language ambiguity

**Slide 7 — Conclusion and future work**
- Shows an end-to-end path from confusion to an action plan
- Next: caregiver feedback, local source expansion, measured usability, opt-in AI enhancement
- Close with: “The goal is not more information. It's a clearer next step.”


## Added feature: Cancer Terms Explained (October 30, 2026)

The prototype also contains a searchable 61-term, six-category cancer-care glossary. A caregiver can look up medical abbreviations, diagnostic words, side effects, caregiver services and health-insurance terminology. Each entry offers a simple definition, why it may come up, a useful question to ask the clinical team, and a link to an authoritative reference. A matching word in the free-text intake can link directly to its definition. This is educational content only, not medical interpretation. Demonstrate a search for “neutropenia” and “palliative care” to show the caregiver-centered approach.

## Add one supervisor-feedback slide (recommended)

**How Caregiver Compass KC scales safely**
- Weekly official-site scan → candidate-only queue → human source verification → reviewed records published into resource library. No automatic trust in scraped text.
- Separate local keyword safety signposts detect a few example red flags before routine resource ranking. Emergency: 911. Possible fever/infection during treatment: oncology team immediately.
- Boundaries: limited discovery, non-clinical pattern matching, possible missed/false alerts, no live provider availability. Human review and clinical validation required.
