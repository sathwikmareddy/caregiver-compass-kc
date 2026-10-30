/* Caregiver Compass KC — Step 11: Financial Help Finder.
 * This does NOT determine eligibility or give financial/medical advice.
 * Works entirely in the browser with the existing curated resources.js.
 * No entered answers are saved, transmitted, or tracked.
 */
(function(root){
'use strict';

const COUNTY_NAMES = [
  ['unsure','Kansas City area / not sure'],
  ['jackson-mo','Jackson County, Missouri'],
  ['clay-mo','Clay County, Missouri'],
  ['cass-mo','Cass County, Missouri'],
  ['platte-mo','Platte County, Missouri'],
  ['johnson-ks','Johnson County, Kansas'],
  ['wyandotte-ks','Wyandotte County, Kansas'],
  ['other-kc','Another Kansas City-area county'],
  ['outside','Outside the Kansas City region']
];
const SIX = new Set(['jackson-mo','clay-mo','cass-mo','platte-mo','johnson-ks','wyandotte-ks']);
const TOPICS = [
  {id:'medicines',label:'Medication costs and copays',resourceIds:['canceraction-rx','cancercare-copay','healthwell','totalassist','cancercare-financial','paf-resources','triage-finance']},
  {id:'bills',label:'Hospital bills and treatment expenses',resourceIds:['ku-finance','uh-finance','cancercare-financial','triage-finance','paf-resources','unitedway-211','healthwell','totalassist']},
  {id:'insurance',label:'Insurance questions and denied claims',resourceIds:['paf-resources','triage-finance','ku-finance','uh-finance','triage-caregivers','cancercare-financial']},
  {id:'transport',label:'Transportation and fuel costs',resourceIds:['canceraction-gas','acs-rides','cancercare-financial','unitedway-211']},
  {id:'lodging',label:'Temporary lodging for treatment',resourceIds:['hope-lodge','ku-lodging','unitedway-211']},
  {id:'food',label:'Food or nutritional support',resourceIds:['canceraction-nutrition','unitedway-211']},
  {id:'supplies',label:'Free equipment or wigs',resourceIds:['canceraction-equipment','canceraction-wigs','hnc-living']},
  {id:'budget',label:'Budgeting and financial wellness',resourceIds:['triage-finance','triage-caregivers','ku-finance','uh-finance','unitedway-211']},
  {id:'fundraising',label:'Fundraising from friends or community',resourceIds:['gofundme','caringbridge','triage-finance']}
];

function areaAssessment(resource,county){
  const scope=resource.scope;
  if(scope==='six-counties'){
    if(SIX.has(county))return {group:'listed',label:'County is in the listed service area',message:'This does not establish eligibility. Confirm diagnosis, treatment, income, program rules, and available funding directly.'};
    if(county==='unsure')return {group:'check',label:'County must be confirmed',message:'This program lists six Kansas City-area counties. Ask whether the patient lives in one of them.'};
    return {group:'outside',label:'Outside the listed six-county service area',message:'Do not assume this local program can serve this county. Contact the organization for clarification.'};
  }
  if(scope==='kc-region'){
    if(county==='outside')return {group:'outside',label:'Kansas City-focused resource',message:'This resource focuses on Kansas City. Ask for programs serving your area instead.'};
    return {group:'check',label:'Kansas City-focused — requirements vary',message:'Confirm geographic availability, hospital affiliation or referral rules if applicable.'};
  }
  return {group:'check',label:'National resource — program rules vary',message:'National reach does not mean every person or every expense qualifies. Ask about current criteria and funding.'};
}
function getMatches(resources,county,topic){
  const selected=TOPICS.find(t=>t.id===topic);
  if(!selected)return [];
  const byId=new Map(resources.map(r=>[r.id,r]));
  return selected.resourceIds.map(id=>byId.get(id)).filter(Boolean)
    .map(r=>({...r,area:areaAssessment(r,county)}));
}
const api={TOPICS,COUNTY_NAMES,areaAssessment,getMatches};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(!root||!root.document)return;
const doc=root.document;
const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=v=>/^https:\/\//i.test(String(v||''))?String(v):'';
const safePhone=v=>String(v||'').replace(/[^0-9+]/g,'');

const css=`
  .finance-intro{background:#f1f8f4;border:1px solid #d3e8db;border-radius:15px;padding:20px;margin:20px 0;color:#244b43;line-height:1.55}
  .finance-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:20px 0}
  .finance-field{display:flex;flex-direction:column;gap:7px}
  .finance-field label{font-size:.91rem;font-weight:750;color:#153e40}
  .finance-field select{width:100%;background:#fff;border:1px solid #b8d0ca;border-radius:10px;padding:13px 10px;min-height:48px;font:inherit;color:#153e40}
  .finance-submit{cursor:pointer;background:#146c5a;color:white;border:0;border-radius:11px;padding:12px 18px;font-weight:800;font:inherit;min-height:46px}
  .finance-note{font-size:.85rem;color:#506968;line-height:1.55;margin-top:11px}
  .finance-summary{font-size:1rem;margin:20px 0 12px;color:#234d48}
  .finance-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}
  .finance-card{border:1px solid #d7e3df;background:#fff;border-radius:14px;padding:18px;box-shadow:0 7px 24px rgba(16,61,65,.045)}
  .finance-card h3{margin:8px 0 3px;font-size:1.13rem;color:#173e40}
  .finance-card p{margin:8px 0;font-size:.89rem;line-height:1.5;color:#3c5a58}
  .finance-org{color:#5e7774!important;margin:0 0 10px!important}
  .finance-status{display:inline-block;border-radius:100px;background:#edf2ef;color:#355f51;padding:6px 10px;font-size:.78rem;font-weight:800}
  .finance-status.listed{background:#e9f8ed;color:#17613e}
  .finance-status.outside{background:#fff3e9;color:#935120}
  .finance-links{display:flex;gap:15px;flex-wrap:wrap;margin-top:14px}
  .finance-links a{color:#136f61;font-weight:800;font-size:.9rem;text-decoration:underline}
  .finance-outside{margin-top:22px;border-top:1px solid #dae7e1;padding-top:16px}
  .finance-outside summary{font-weight:750;color:#365852;cursor:pointer}
  .finance-empty{padding:18px;border-radius:11px;background:#fff7e9}
  @media(max-width:780px){.finance-grid,.finance-list{grid-template-columns:1fr}}
  @media print{.finance-submit{display:none}}
`;
const style=doc.createElement('style');style.textContent=css;doc.head.appendChild(style);

const nav=doc.createElement('button');
nav.type='button';nav.className='nav-item';nav.dataset.view='finance';
nav.innerHTML='<span class="nav-ico" aria-hidden="true">$</span> Financial help checker';
const aboutNav=doc.querySelector('.nav-item[data-view="about"]');
if(aboutNav)aboutNav.before(nav);
const page=doc.createElement('section');
page.id='view-finance';page.className='view';page.hidden=true;
page.innerHTML=`
<div class="page-header"><p class="overline">FIND A STARTING POINT</p><h1>Financial and practical help checker.</h1><p>Select the kind of support you need and the county where the patient lives. The results explain which programs may be worth contacting.</p></div>
<div class="finance-intro"><strong>Service-area guidance, not an eligibility decision.</strong> We cannot determine approval, application status, funding availability, or insurance coverage. Confirm all details with the listed organizations. No income, identity, or medical records are requested.</div>
<form id="finance-form">
  <div class="finance-grid">
    <div class="finance-field"><label for="finance-topic">What kind of help do you need?</label><select id="finance-topic">${TOPICS.map(t=>`<option value="${escape(t.id)}">${escape(t.label)}</option>`).join('')}</select></div>
    <div class="finance-field"><label for="finance-county">Where does the patient live?</label><select id="finance-county">${COUNTY_NAMES.map(([v,l])=>`<option value="${escape(v)}">${escape(l)}</option>`).join('')}</select></div>
  </div><button class="finance-submit" type="submit">Show possible support programs →</button>
  <p class="finance-note">For more accurate guidance, contact the hospital's financial counselor or social worker. No answers are saved to a database.</p>
</form>
<div id="finance-results" aria-live="polite"></div>`;
const after=doc.getElementById('view-directory');
if(after)after.after(page);

nav.addEventListener('click',()=>{
  doc.querySelectorAll('.view').forEach(v=>v.hidden=v!==page);
  doc.querySelectorAll('.nav-item').forEach(n=>{
    const active=n===nav;n.classList.toggle('active',active);n.setAttribute('aria-current',active?'page':'false');
  });
  const bc=doc.getElementById('breadcrumb-title');if(bc)bc.textContent='Financial help checker';
  root.scrollTo({top:0,behavior:'instant'});
});

function cardHTML(r){
  const a=r.area;
  return `<article class="finance-card">
  <span class="finance-status ${escape(a.group)}">${escape(a.label)}</span>
  <h3>${escape(r.name)}</h3><p class="finance-org">${escape(r.organization)} · ${escape(r.kind)}</p>
  <p>${escape(r.summary)}</p><p><strong>What to confirm:</strong> ${escape(r.eligibility)}</p>
  <p><strong>Service-area note:</strong> ${escape(a.message)}</p>
  <p><strong>Suggested next step:</strong> ${escape(r.action)}</p>
  <div class="finance-links">${safeUrl(r.url)?`<a href="${escape(safeUrl(r.url))}" target="_blank" rel="noopener noreferrer">Official source ↗</a>`:''}${r.phone?`<a href="tel:${safePhone(r.phone)}">☎ ${escape(r.phone)}</a>`:''}</div>
  </article>`;
}
function render(){
  const county=doc.getElementById('finance-county').value;
  const topic=doc.getElementById('finance-topic').value;
  const matches=getMatches(root.CAREGIVER_RESOURCES||[],county,topic);
  const relevant=matches.filter(r=>r.area.group!=='outside');
  const outside=matches.filter(r=>r.area.group==='outside');
  const out=doc.getElementById('finance-results');
  out.innerHTML=`<p class="finance-summary"><strong>${relevant.length} possible starting points</strong> for ${escape(TOPICS.find(t=>t.id===topic)?.label||'support')}. Program-specific requirements still need verification.</p>
    ${relevant.length?`<div class="finance-list">${relevant.map(cardHTML).join('')}</div>`:`<p class="finance-empty">No listed program currently matches this geographic screen. Please ask your oncology social worker or call 211 for alternatives.</p>`}
    ${outside.length?`<details class="finance-outside"><summary>${outside.length} organization${outside.length===1?'':'s'} outside the listed service area (show details)</summary><div class="finance-list">${outside.map(cardHTML).join('')}</div></details>`:''}
    <p class="finance-note">This is a student demonstration using a static resource catalog. Grants may be closed or limited, and organizations change eligibility criteria. Always verify current requirements and service availability on their official sites.</p>`;
}
doc.getElementById('finance-form').addEventListener('submit',e=>{e.preventDefault();render();});
})(typeof window!=='undefined'?window:null);
