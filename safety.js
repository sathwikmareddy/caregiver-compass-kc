/* Caregiver Compass KC: conservative, auditable SIGNPOSTS, not symptom triage.
   Never labels an input as safe; may miss, misread, or over-flag symptoms.
   No text is saved or transmitted. Reviewed by a clinician before public use.
   CDC: https://www.cdc.gov/cancer-preventing-infections/patients/fever.html
   ACS: https://www.cancer.org/cancer/side-effects/shortness-of-breath.html
*/
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.CaregiverSafety = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  const EMERGENCY = [
    {re:/\b(?:(?:severe|crushing|sudden|intense|new)\s+)?chest\s+(?:pain|pressure|tightness)\b/i,label:'possible serious chest symptoms'},
    {re:/\b(?:cannot|can't|cant|unable to|struggling to|trouble|difficulty|hard time)\s+(?:breathe|breathing|catch (?:my|their|his|her) breath)\b/i,label:'difficulty breathing'},
    {re:/\b(?:severe|sudden)\s+(?:shortness of breath|breathing difficulty)\b/i,label:'severe breathing symptoms'},
    {re:/\b(?:unconscious|unresponsive|not responding|passed out|is fainting|collapsed|stopped breathing|not breathing|isn'?t breathing)\b/i,label:'loss of consciousness, breathing, or responsiveness'},
    {re:/\b(?:face (?:droop|drooping)|slurred speech|sudden (?:one-sided|one sided) (?:weakness|numbness)|having a stroke)\b/i,label:'possible stroke symptoms'},
    {re:/\b(?:bleeding (?:won'?t|will not) stop|severe bleeding|bleeding heavily|uncontrolled bleeding)\b/i,label:'serious bleeding'},
    {re:/\b(?:having a seizure|is seizing|severe allergic reaction|throat is swelling|throat swelling)\b/i,label:'potentially life-threatening symptoms'},
    {re:/\b(?:suddenly confused|new confusion|sudden confusion)\b/i,label:'new confusion'}
  ];
  const URGENT = [
    {re:/\b(?:fever|febrile|high temperature|temperature of\s*(?:100\.4|10[1-9](?:\.\d+)?|38(?:\.\d+)?)(?:\s*°?\s*[fc])?|temp(?:erature)?\s*(?:is|of|at|=)?\s*(?:100\.4|10[1-9](?:\.\d+)?|38(?:\.\d+)?)\b)/i,label:'fever during cancer treatment'},
    {re:/\b(?:shaking chills|rigors|possible infection|signs of infection|infected port|redness (?:near|around) (?:the |a )?(?:port|catheter))\b/i,label:'possible infection during treatment'},
    {re:/\b(?:cannot keep fluids down|can'?t keep fluids down|repeated vomiting|vomiting repeatedly|severe diarrhea|new cough|pain when urinating|burning when urinating)\b/i,label:'new or worsening symptoms during treatment'}
  ];
  function negated(s, pos) {
    // Skip simple denial/hypotheticals in the clause before a matched phrase.
    const prefix = s.slice(Math.max(0, pos - 90), pos).split(/[.!?;\n]/).pop().trim();
    if (/\b(?:what if|if someone|if (?:he|she|they|the patient)|what does|information about|definition of|how to recognize|worried about getting)\b/i.test(prefix)) return true;
    if (/\b(?:no|not|never|without|denies|doesn'?t have|do not have|don'?t have|hasn'?t had|isn'?t having|not experiencing)(?:\s+(?:any|a|the|severe|new|sudden)){0,3}\s*$/i.test(prefix)) return true;
    if (/\b(?:last year|years ago|a year ago)\s*$/i.test(prefix)) return true;
    return false;
  }
  function matchRules(input, rules) {
    const found=[];
    for (const rule of rules) {
      const re=new RegExp(rule.re.source,rule.re.flags.replace('g','')+'g');
      for (const m of input.matchAll(re)) {
        if (!negated(input,m.index)) {found.push(rule.label);break;}
      }
    }
    return [...new Set(found)];
  }
  function assess(text, options={}) {
    const s=String(text||'').replace(/[’‘]/g,"'").slice(0,1500);
    const em=matchRules(s,EMERGENCY);
    if(em.length)return {level:'emergency',reasons:em,source:'https://www.cancer.org/cancer/side-effects/shortness-of-breath.html'};
    const treatmentContext=options.stage==='treatment' || /\b(?:cancer treatment|chemo|chemotherapy|radiation|neutropeni|oncolog|immunocompromised)\b/i.test(s);
    const urgent=treatmentContext?matchRules(s,URGENT):[];
    if(urgent.length)return {level:'urgent',reasons:urgent,source:'https://www.cdc.gov/cancer-preventing-infections/patients/fever.html'};
    return {level:'none',reasons:[],source:null}; // NOT an assessment of safety.
  }
  return {assess};
});
