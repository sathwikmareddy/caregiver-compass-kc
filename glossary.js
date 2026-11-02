/* Plain-language caregiver glossary. Educational only; no diagnosis or treatment advice.
 * Definitions paraphrased for accessibility using official cancer / insurance glossaries.
 * Each entry links to an authoritative source rather than claiming clinical review.
 */
(function(root,factory){const terms=factory();if(typeof module==='object'&&module.exports)module.exports=terms;if(root)root.CAREGIVER_GLOSSARY=terms;})(typeof window!=='undefined'?window:null,function(){
  'use strict';
  const NCI='https://www.cancer.gov/publications/dictionaries/cancer-terms';
  const ACS='https://www.cancer.org/cancer/understanding-cancer/glossary.html';
  const NCI_STAGING='https://www.cancer.gov/about-cancer/diagnosis-staging/staging';
  const SIDE='https://www.cancer.gov/about-cancer/treatment/side-effects';
  const HEALTH='https://www.healthcare.gov/glossary/';
  const items=[
    // term, category, explanation, why heard, question to ask, alternate search words, source
    ['Biopsy','Diagnosis','A procedure that removes a small sample of cells or tissue so a specialist can examine it.','A doctor may use biopsy results to confirm what a suspicious area is.','When will the biopsy results be ready, and who will explain them?','tissue sample',NCI+'/def/biopsy'],
    ['Pathology report','Diagnosis','A written report from a specialist describing findings from examined cells or tissue.','It often contains detailed language used to guide the care plan.','Can you explain the main findings in the report in everyday language?','pathologist pathology', 'https://www.cancer.org/cancer/diagnosis-staging/tests/pathology-reports.html'],
    ['Tumor','Diagnosis','An unusual mass of tissue. A tumor can be cancerous or noncancerous.','A scan or examination might describe a growth as a tumor.','Do we know whether this tumor is cancerous?','mass lump',NCI],
    ['Benign','Diagnosis','Not cancer. Benign tumors do not invade nearby tissues or spread to distant organs.','Imaging or pathology reports may describe a growth this way.','Does this benign finding require any follow-up?', 'noncancerous',NCI],
    ['Malignant','Diagnosis','Cancerous; a growth with the ability to invade nearby tissue or spread.','A pathology report may use this word instead of cancerous.','What type of malignancy is it?','cancerous malignancy',NCI],
    ['Oncologist','Diagnosis','A doctor who specializes in diagnosing or treating cancer.','This doctor may lead or coordinate cancer treatment.','Who is the main oncology contact for questions between visits?','oncology cancer doctor',ACS],
    ['Stage','Diagnosis','A description of how much cancer is present and where it has spread.','Staging helps the team plan treatment; systems vary by cancer type.','What does this stage mean for this specific cancer?','staging stage 1 stage 2 stage 3 stage 4',NCI_STAGING],
    ['Grade','Diagnosis','A description of how abnormal cancer cells look under a microscope. It is different from stage.','A pathology report may describe a low- or high-grade tumor.','How does the grade affect the treatment plan?','tumor grade',NCI+'/def/grade'],
    ['TNM','Diagnosis','A staging system: T describes the tumor, N nearby lymph nodes, and M spread to distant sites.','A report may include codes such as T2 or N1.','Can you explain the T, N and M findings for this cancer?','tnm staging t n m',NCI_STAGING],
    ['Metastasis','Diagnosis','The spread of cancer from its original location to another part of the body.','A care team may discuss whether cancer has spread.','Where has the cancer spread, if anywhere, and how was that determined?','metastatic mets spread',NCI+'/def/metastasis'],
    ['Lymph nodes','Diagnosis','Small structures in the immune system that help filter fluid and are sometimes checked for cancer spread.','Scans or surgery reports may mention lymph node involvement.','Were any lymph nodes involved, and what does that mean?','nodes lymph node',NCI],
    ['Biomarker','Diagnosis','A measurable biological feature that can help doctors learn about a cancer or treatment options.','Special testing may look for specific markers in a tumor.','Are there biomarker results we should understand?','molecular marker',NCI],
    ['Genetic testing','Diagnosis','Testing for changes in genes; tests may examine inherited changes or changes in a tumor.','The team may discuss whether results affect treatment or family risk.','Is this test looking for inherited risk or changes in the tumor?','germline genetics',NCI],
    ['Prognosis','Diagnosis','An estimate of how a disease may develop or respond to treatment; it is not a certainty.','Clinicians may use it when discussing likely outcomes.','What factors affect this estimate, and how uncertain is it?','outlook',NCI],
    ['Remission','Diagnosis','A decrease in or disappearance of signs and symptoms of cancer. Complete remission does not always mean cancer is cured.','A follow-up visit may discuss partial or complete remission.','What does remission mean in this case, and what follow-up is planned?','partial remission complete remission',NCI+'/def/remission'],
    ['Recurrence','Diagnosis','Cancer that comes back after a time when it could not be detected.','The team may discuss monitoring after treatment.','What follow-up visits or tests are recommended?','relapse cancer returns',NCI],
    ['NED','Diagnosis','An abbreviation for “no evidence of disease”: tests currently do not detect cancer. It is not the same as a guarantee that cancer cannot return.','You may see NED in follow-up conversations or notes.','What does NED mean for monitoring and future appointments?','no evidence of disease',ACS],
    ['Chemotherapy','Treatment','Medicine used to kill cancer cells or slow their growth, often called chemo.','It may be given in cycles, by infusion, injection, or pills.','What is the purpose and schedule of this treatment?','chemo',NCI],
    ['Radiation therapy','Treatment','Treatment that uses high-energy radiation to damage cancer cells.','It may be used alone or along with other treatments.','How many sessions are planned and what side effects should we discuss?','radiotherapy radiation',NCI],
    ['Immunotherapy','Treatment','Treatment that works with or changes the immune system to fight cancer.','Some cancer plans include immunotherapy instead of or alongside other treatments.','Which type is being used and how will its effects be monitored?','immune therapy checkpoint inhibitors',NCI+'/def/immunotherapy'],
    ['Targeted therapy','Treatment','Medicines aimed at specific features or changes that help some cancer cells grow.','A biomarker result may help determine whether a targeted drug could work.','What test result led to considering this treatment?','targeted treatment',NCI],
    ['Hormone therapy','Treatment','Treatment that blocks or changes hormones that help certain cancers grow.','It is used for some breast, prostate, and other cancers.','What is this treatment intended to do and for how long?','endocrine therapy',NCI],
    ['Infusion','Treatment','A way to give fluids or medicines into a vein, sometimes through a port.','Cancer treatments are often administered at an infusion center.','How long will the visit take and what should we bring?','iv drip intravenous',ACS],
    ['Treatment cycle','Treatment','A scheduled treatment period followed by a rest or recovery period, sometimes repeated.','The calendar may list several cycles rather than one continuous course.','What is the plan for each cycle and the breaks between them?','cycle cycles of chemo',NCI],
    ['Port','Treatment','A small implanted access device that may make repeated IV treatments or blood draws easier.','The team may suggest it for ongoing infusions.','Who manages the port and what care instructions apply?','port-a-cath portacath implanted port',NCI],
    ['Adjuvant therapy','Treatment','Treatment given after a main treatment, such as surgery, to lower the chance cancer returns.','A team may recommend additional therapy even after visible cancer is removed.','What is the expected benefit of treatment after surgery?','adjuvant',NCI],
    ['Neoadjuvant therapy','Treatment','Treatment given before a main treatment, often to shrink a tumor.','Chemotherapy or other therapy may be scheduled before surgery.','What is the goal before the next treatment step?','neoadjuvant',NCI],
    ['Clinical trial','Treatment','A research study involving people that tests health or cancer-care approaches.','Some patients may be offered a trial to consider.','What are the benefits, risks, costs, and alternatives to this trial?','clinical study',NCI+'/def/clinical-trial'],
    ['Maintenance therapy','Treatment','Treatment intended to help keep cancer controlled after an initial course of treatment.','The team may discuss an ongoing medication or visit schedule.','How long would maintenance treatment last and how is it monitored?','maintenance treatment',NCI],
    ['CBC','Tests and scans','Complete blood count: a blood test measuring red cells, white cells, and platelets.','The team may check CBC results during treatment.','Which blood-count results matter for the current plan?','complete blood count blood counts',NCI],
    ['ANC','Tests and scans','Absolute neutrophil count: a measure of neutrophils, white blood cells that help fight infections.','A low ANC can affect infection precautions or treatment timing.','What ANC range is important, and when should we contact the team?','absolute neutrophil count',NCI],
    ['CT scan','Tests and scans','Computed tomography: an imaging test that makes detailed cross-sectional pictures of the body.','It may help locate or monitor tumors.','What is this scan intended to show?','computed tomography cat scan ct',NCI],
    ['PET scan','Tests and scans','Positron emission tomography: imaging that shows activity in tissues, sometimes combined with CT.','It may be used to evaluate the extent of some cancers or response to treatment.','Why is this scan being recommended, and what can it tell us?','positron emission tomography pet-ct pet ct',NCI],
    ['MRI','Tests and scans','Magnetic resonance imaging: a scan that uses magnets and radio waves to create detailed pictures.','It may be ordered to look more closely at certain body areas.','What is the MRI meant to evaluate?','magnetic resonance imaging',NCI],
    ['Tumor marker','Tests and scans','A substance in tissue or body fluid that can sometimes help monitor a cancer; interpretation depends on cancer type.','A doctor may track a marker over multiple visits.','What can this marker tell us, and what are its limitations?','cancer marker',NCI],
    ['Fatigue','Side effects','Unusual or intense tiredness that may not fully improve with rest.','Cancer and cancer treatment can cause difficult-to-manage tiredness.','What could be causing this fatigue and what help is available?','exhaustion cancer-related fatigue','https://www.cancer.gov/about-cancer/treatment/side-effects/fatigue'],
    ['Nausea','Side effects','Feeling sick to the stomach or as though you might vomit.','Some cancers, medicines, or treatments can cause nausea.','How should we report nausea and ask about relief?','feeling sick queasy',SIDE],
    ['Neutropenia','Side effects','A lower-than-normal level of neutrophils, a kind of white blood cell.','It can make infection prevention especially important during some treatments.','What symptoms require an immediate call, and which number do we use?','low neutrophils neutropenic',NCI+'/def/neutropenia'],
    ['Anemia','Side effects','Too few healthy red blood cells or too little hemoglobin to carry enough oxygen.','It can contribute to weakness or fatigue.','Do the blood results show anemia, and what is the care plan?','low hemoglobin low red blood cells',SIDE],
    ['Thrombocytopenia','Side effects','A lower-than-normal platelet count, which can increase bruising or bleeding risk.','A low platelet count may appear in lab reports during treatment.','What bleeding or bruising should prompt a call?','low platelets platelet count',SIDE],
    ['Neuropathy','Side effects','Problems affecting nerves that may cause numbness, tingling, pain, or weakness.','Some cancer medicines can cause peripheral neuropathy.','What changes in hands or feet should we report?','peripheral neuropathy tingling numbness',SIDE],
    ['Mucositis','Side effects','Inflammation or sores in the lining of the mouth or digestive tract.','It can happen during certain treatments and make eating difficult.','What mouth symptoms should we report?','mouth sores oral mucositis',SIDE],
    ['Lymphedema','Side effects','Swelling caused by a buildup of lymph fluid, sometimes after cancer treatment.','It can affect an arm, leg, or other body area.','Who should assess new or worsening swelling?','lymph swelling',SIDE],
    ['Alopecia','Side effects','The medical word for hair loss.','Hair changes can occur with certain cancer treatments.','Could this treatment affect hair and what support is available?','hair loss',SIDE],
    ['Cachexia','Side effects','A complex condition that can cause major loss of body weight and muscle during serious illness.','A care team may use the word when discussing unexpected weight or muscle loss.','Can a dietitian or care specialist help us understand this change?','wasting weight loss',SIDE],
    ['Palliative care','Care and support','Care that focuses on comfort, symptoms, quality of life, and support for patients and families. It can happen alongside cancer treatment.','It can help with symptoms and emotional or practical concerns at any stage.','Could palliative care help now while treatment continues?','supportive care pain relief','https://www.cancer.gov/about-cancer/advanced-cancer/care-choices/palliative-care-fact-sheet'],
    ['Hospice care','Care and support','Care focused on comfort and quality of life when the goal is no longer to cure the illness.','The care team may discuss it when treatment goals change.','What services would hospice provide for the patient and caregivers?','end of life comfort care','https://www.cancer.gov/about-cancer/advanced-cancer/care-choices/palliative-care-fact-sheet'],
    ['Patient navigator','Care and support','A person who helps patients understand steps in their care and connect with needed services.','Navigation services may help coordinate visits or overcome access barriers.','Is there a patient navigator we can contact?','nurse navigator care navigator',NCI],
    ['Oncology social worker','Care and support','A professional who helps people manage emotional, practical, and sometimes financial challenges during cancer care.','They may help connect families with transportation or assistance programs.','How do we request a social-work appointment?','social worker',ACS],
    ['Respite care','Care and support','Temporary help or relief that gives an unpaid caregiver time to rest or attend to other needs.','A caregiver may need short breaks while someone else helps.','Are any safe respite-care options available locally?','caregiver break',NCI],
    ['Survivorship care plan','Care and support','A summary of cancer treatments and recommended follow-up care after treatment.','It can help coordinate follow-up visits and possible late effects.','Will we receive a written follow-up and survivorship plan?','follow up plan',NCI],
    ['Advance directive','Care and support','A legal document recording wishes about future medical care or naming someone to decide if needed.','Families may be asked about preferences and decision-makers.','Who can explain the options and local rules for these documents?','living will health care proxy',ACS],
    ['Informed consent','Care and support','A process of learning about a proposed procedure or treatment, including benefits, risks, and choices, before agreeing.','You may encounter consent conversations before procedures or research.','What choices and alternatives should we understand before deciding?','consent form',NCI],
    ['Copayment','Money and insurance','A fixed amount you pay for a covered healthcare service under your plan.','A medical visit or prescription may have a copay.','What copay applies to this service under our plan?','copay co-pay',HEALTH+'co-payment/'],
    ['Deductible','Money and insurance','The amount you must pay for certain covered care before your plan starts paying its share.','Bills may be higher early in a plan year until the deductible is met.','How much of our deductible remains?','health insurance deductible',HEALTH+'deductible/'],
    ['Coinsurance','Money and insurance','The percentage of the allowed cost for a covered service that you pay under your plan.','A bill may list 20% coinsurance instead of a fixed copay.','What percentage is ours and which amount is it based on?','co-insurance',HEALTH+'co-insurance/'],
    ['Out-of-pocket maximum','Money and insurance','The yearly limit on what you pay for covered in-network benefits under your plan; exclusions can apply.','It can help families estimate covered-cost exposure.','Which expenses count toward this limit?','out of pocket max oop maximum',HEALTH+'out-of-pocket-maximum-limit/'],
    ['Prior authorization','Money and insurance','Approval a health plan may require before paying for certain care, treatments, or medicines.','You may see delays while a provider seeks plan approval.','Is approval required and who is handling the request?','preauthorization pre-approval',HEALTH+'prior-authorization/'],
    ['Financial toxicity','Money and insurance','Financial stress or hardship caused by the costs of cancer care and related expenses.','It can affect work, bills, travel, and access to care.','Can we meet a financial counselor or social worker about costs?','financial distress financial burden',NCI+'/def/financial-toxicity'],
    ['Charity care','Money and insurance','A hospital financial-assistance program that may reduce bills for eligible patients.','Families may be able to apply depending on hospital rules and income.','Does this hospital offer financial assistance and how do we apply?','hospital financial assistance',HEALTH],
    ['Explanation of benefits','Money and insurance','An insurer statement showing how it handled a claim; it is generally not a bill.','It may arrive before or separately from a provider bill.','Can someone help compare the EOB with the provider bill?','EOB insurance statement',HEALTH]
  ];
  const cats=['Diagnosis','Treatment','Tests and scans','Side effects','Care and support','Money and insurance'];
  // Verified term-specific NCI definitions; do not fabricate or derive unverified slugs.
  const specificNciLinks={
  "Tumor": "tumor",
  "Benign": "benign",
  "Malignant": "malignant",
  "Oncologist": "oncologist",
  "Stage": "stage",
  "Lymph nodes": "lymph-node",
  "Biomarker": "biomarker",
  "Genetic testing": "genetic-testing",
  "Prognosis": "prognosis",
  "Recurrence": "recurrence",
  "Chemotherapy": "chemotherapy",
  "Radiation therapy": "radiation-therapy",
  "Targeted therapy": "targeted-therapy",
  "Hormone therapy": "hormone-therapy",
  "Treatment cycle": "treatment-cycle",
  "Port": "port",
  "Adjuvant therapy": "adjuvant-therapy",
  "Neoadjuvant therapy": "neoadjuvant-therapy",
  "Maintenance therapy": "maintenance-therapy",
  "CBC": "complete-blood-count",
  "ANC": "absolute-neutrophil-count",
  "CT scan": "ct-scan",
  "PET scan": "pet-scan",
  "MRI": "mri",
  "Tumor marker": "tumor-marker",
  "Nausea": "nausea",
  "Anemia": "anemia",
  "Thrombocytopenia": "thrombocytopenia",
  "Neuropathy": "peripheral-neuropathy",
  "Mucositis": "mucositis",
  "Lymphedema": "lymphedema",
  "Alopecia": "alopecia",
  "Cachexia": "cachexia",
  "Palliative care": "palliative-care",
  "Patient navigator": "patient-navigator",
  "Respite care": "respite-care",
  "Survivorship care plan": "survivorship-care-plan",
  "Advance directive": "advance-directive",
  "Informed consent": "informed-consent"
};
  for (const item of items) {
    if (Object.prototype.hasOwnProperty.call(specificNciLinks,item[0])) {
      item[6] = NCI + "/def/" + specificNciLinks[item[0]];
    }
  }
  const result=items.map((a,i)=>({id:'term-'+i,term:a[0],category:a[1],simple:a[2],context:a[3],question:a[4],aliases:a[5]||'',url:a[6],verified:'2026-11-01'}));
  if(result.some(t=>!cats.includes(t.category)||!t.url.startsWith('https://')||!t.question))throw Error('Glossary data invalid');
  return Object.freeze(result);
});
