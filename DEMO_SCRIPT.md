# Four-minute live demo script

## 0:00–0:35 — Problem

“Family and friends caring for someone with cancer may be struggling with transport, costs, work, emotional stress, and other responsibilities all at once. Existing information is often fragmented across organizations. The goal of Caregiver Compass KC is to turn a broad problem into just a few actionable next steps.”

## 0:35–1:05 — Prototype

Open `index.html`. Highlight that no account is needed. Click **Try an example scenario**. The fictional case includes chemotherapy appointments, no transportation, expenses, work conflicts, and caregiver overwhelm.

## 1:05–2:15 — Core feature

Click **Find my next steps**. Show recognized needs and three recommended resource cards. Point out:

1. A concrete next step instead of a long answer.
2. An official source link and phone number.
3. A clear eligibility note. Explain that Cancer Action's gas-card program **is not a ride provider**.

## 2:15–2:45 — Technical design

“JavaScript analyzes the plain-language text and selected concerns, gives each category a relevance score, filters location-restricted programs, and ranks the curated resources. It's a deterministic, explainable NLP prototype rather than a free-form AI medical chatbot. This makes it auditable and safe to demo.”

## 2:45–3:10 — Resource library

Click **Resource library**. Filter to **Donated supplies** or **Insurance and medical bills**. Mention the new financial-wellness tools, hospital counseling and Helping Calendar. Explain that the records include the provider, assistance type, caveats, official source, and the date last checked.

## 3:10–3:35 — Donation and volunteer pathway

Click **Donate & volunteer**. Filter to **Volunteer your time**. Explain that helping caregivers and making donations are separate from receiving services. Show Cancer Action, American Cancer Society and Gilda’s Club opportunities. No money or applications are processed here.

## 3:35–4:00 — Evaluation and next phase

“The prototype demonstrates that support can be organized around the caregiver's immediate concerns. Next, we need user testing to measure whether recommendations are understandable and actionable, and we need ongoing verification because services change. An optional consent-based AI layer could improve nuanced language recognition without allowing the model to invent resources.”

## Backup if live internet fails

The main site works without internet: load `index.html`, click example, and show results. External links need internet access. You can also click **Print / save PDF** to prepare an offline action-plan handout before presenting.

## Three important caveats to state honestly

- The project does not determine eligibility or service availability.
- The matching algorithm is a prototype, **not a trained AI model**.
- This is not a medical advice tool or a comprehensive resource system.


## Added feature: Cancer Terms Explained (October 30, 2026)

The prototype also contains a searchable 61-term, six-category cancer-care glossary. A caregiver can look up medical abbreviations, diagnostic words, side effects, caregiver services and health-insurance terminology. Each entry offers a simple definition, why it may come up, a useful question to ask the clinical team, and a link to an authoritative reference. A matching word in the free-text intake can link directly to its definition. This is educational content only, not medical interpretation. Demonstrate a search for “neutropenia” and “palliative care” to show the caregiver-centered approach.
