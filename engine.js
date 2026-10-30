/* Explainable local needs matching — no user text is transmitted or stored. */
(function(root){
  'use strict';
  const CATEGORIES = [
    {id:'transport',label:'Transportation',keywords:['ride','rides','drive','driving','car','bus','transport','transportation','appointment transport','gas','fuel','uber','lyft','get to treatment','get to chemo','no way to get','cannot get to']},
    {id:'money',label:'Financial assistance',keywords:['bill','bills','expense','expenses','afford','cost','costs','financial','finance','money','debt','rent','utility','utilities','prescription','insurance','copay','paying for','unemployed','lost income','budget','budgeting','financial counselor','money management','financial wellness','financial planning']},
    {id:'emotional',label:'Emotional support',keywords:['stressed','stress','alone','lonely','overwhelmed','scared','afraid','anxiety','anxious','worried','worry','depressed','emotion','mental','support group','exhausted','burnout','burned out']},
    {id:'appointments',label:'Appointments & questions',keywords:['appointment','appointments','doctor','nurse','questions','understand treatment','chemo','chemotherapy','radiation','schedule','treatment plan','medical team','test result']},
    {id:'daily',label:'Everyday responsibilities',keywords:['housework','clean','cleaning','chores','care for kids','child care','childcare','groceries','home care','care at home','household','daily tasks','help at home']},
    {id:'work',label:'Work & time',keywords:['work','job','employer','boss','shift','leave','time off','career','schedule conflicts','flexible hours','employment']},
    {id:'lodging',label:'Lodging',keywords:['stay overnight','hotel','lodging','accommodation','out of town','far from hospital','place to stay','travel for treatment','housing near hospital']},
    {id:'food',label:'Food & nutrition',keywords:['food','meals','meal','groceries','nutrition','nutritional supplement','eating','pantry','hungry']},
    {id:'supplies',label:'Donated supplies',keywords:['donated','donation of','free supplies','supply','supplies','wheelchair','walker','medical equipment','wigs','wig','scarves','comfort items','mastectomy supplies','free equipment']},
    {id:'volunteers',label:'Volunteer or community help',keywords:['volunteer','volunteers','neighbors helping','neighbors to help','someone to help','friends help','family help','helping calendar','need volunteers','help with chores','organize help','help with meals']},
    {id:'insurance',label:'Insurance and medical bills',keywords:['insurance','coverage','insurance denied','insurance denial','appeal','medicaid','medicare','co-pay','copay','deductible','premium','hospital bill','medical bill','charity care']},
    {id:'fundraising',label:'Fundraising and donations',keywords:['fundraiser','fundraising','raise money','donations','crowdfunding','gofundme','collect donations','donate to me','financial donations']},
    {id:'navigation',label:'Where to start',keywords:['where to start','dont know','don’t know','confused','resources','information','social worker','navigate','navigate the system','new diagnosis','recently diagnosed','not sure what to do','first step']}
  ];
  const SIX_COUNTIES = ['jackson-mo','cass-mo','clay-mo','platte-mo','johnson-ks','wyandotte-ks'];
  const ACTION_INTROS = {
    transport:'Plan travel before the next appointment',money:'Ask about the costs and support you may qualify for',emotional:'Find someone who understands the caregiving experience',appointments:'Get ready for the next conversation with the care team',daily:'Find help with one everyday task',work:'Make work and caregiving a little easier to balance',lodging:'Explore a place to stay for treatment',food:'Ask about meal and nutrition support',navigation:'Start with a resource navigator',supplies:'Ask about free or donated medical supplies',volunteers:'Organize help for specific everyday tasks',insurance:'Explore coverage and bill support',fundraising:'Explore options to ask your community for donations'
  };
  const norm = v => String(v||'').toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9\s'-]/g,' ').replace(/\s+/g,' ').trim();
  function hasPhrase(text, term){
    const escaped=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    return new RegExp('(^|\\W)'+escaped+'($|\\W)','i').test(text);
  }
  function classify(text,explicit=[]){
    const normalized=norm(text); const scores={}; const evidence={};
    CATEGORIES.forEach(c=>{
      const matches=c.keywords.filter(k=>hasPhrase(normalized,norm(k)));
      scores[c.id]=(explicit.includes(c.id)?8:0)+Math.min(6,matches.length*2);
      evidence[c.id]=matches.slice(0,3);
    });
    if(!normalized && !explicit.length) { scores.navigation=3; scores.emotional=1; }
    if(normalized && Object.values(scores).every(v=>v===0)){scores.navigation=3;}
    const ranked=Object.keys(scores).filter(c=>scores[c]>0).sort((a,b)=>scores[b]-scores[a]||CATEGORIES.findIndex(x=>x.id===a)-CATEGORIES.findIndex(x=>x.id===b));
    return {scores,evidence,ranked};
  }
  function availability(resource, county, region){
    if(region==='outside' && resource.scope==='kc-region') return {allowed:false,caution:'This is a Kansas City-focused service.'};
    if(resource.scope!=='six-counties') return {allowed:true,caution:''};
    if(county && county!=='unsure' && !SIX_COUNTIES.includes(county)) return {allowed:false,caution:'Outside the listed six-county eligibility area'};
    if(region==='outside') return {allowed:false,caution:'Restricted to six Kansas City counties'};
    return {allowed:true,caution:!county||county==='unsure'?'Confirm county and program eligibility.':''};
  }
  function recommend(input,resources){
    const {text='',selected=[],county='unsure',region='kc',stage='treatment'}=input;
    const analysis=classify(text,selected);
    const scored=resources.map(resource=>{
      const gate=availability(resource,county,region);
      if(!gate.allowed) return null;
      const intersect=resource.categories.filter(c=>analysis.scores[c]>0);
      let score=intersect.reduce((s,c)=>s+analysis.scores[c]*2,0);
      if(resource.scope==='kc-region' && region==='kc')score+=2;
      if(resource.scope==='six-counties' && region==='kc')score+=2;
      if(resource.stage===stage)score+=5;
      if(resource.stage && resource.stage!==stage)score-=4;
      if(resource.kind==='Direct service' && intersect.length)score+=3;
      if(!intersect.length) score-=5;
      if(resource.id==='unitedway-211' && analysis.ranked.length>2)score+=2;
      const labels=intersect.map(id=>CATEGORIES.find(c=>c.id===id)?.label||id);
      const reason=labels.length?'Relevant to '+labels.slice(0,2).join(' and ').toLowerCase() + (resource.scope==='kc-region'?' in the Kansas City area.':'.'):'A trusted place to ask for additional guidance.';
      return {...resource,score,matchCategories:intersect,reason,eligibilityWarning:gate.caution};
    }).filter(Boolean).sort((a,b)=>b.score-a.score || a.name.localeCompare(b.name));
    // Cover distinct *needs* first rather than selecting three broadly tagged services.
    // This avoids recommending only financial sites to a caregiver who also needs a ride.
    const top=[]; const seen=new Set();
    const normalizedText=norm(text);
    function fitForNeed(r,c){
      let fit=16/r.categories.length + (r.scope==='kc-region'&&region==='kc'?3:0);
      if(r.kind==='Direct service')fit+=6;
      if(r.stage===stage)fit+=6;
      if(r.id==='unitedway-211')fit-=7; // valuable fallback, but broad directory ≠ direct help
      if(c==='transport'){
        if(r.id==='acs-rides' && /(ride|drive|driving|transport)/.test(normalizedText))fit+=7;
        if(r.id==='canceraction-gas' && !/(gas|fuel)/.test(normalizedText))fit-=5;
      }
      if(c==='money'){
        if(r.id==='triage-finance' && /(budget|budgeting|wellness|debt management|financial planning)/.test(normalizedText))fit+=18;
        if(r.id==='ku-finance' && /(ku health|kansas health system)/.test(normalizedText))fit+=16;
        if(r.id==='uh-finance' && /(university health|truman medical)/.test(normalizedText))fit+=16;
        if(r.id==='cancercare-financial')fit+=8;
        if(r.id==='canceraction-rx' && !/(prescription|medication|drug|copay)/.test(normalizedText))fit-=3;
        if(r.id==='canceraction-gas' && !/(gas|fuel)/.test(normalizedText))fit-=5;
        if(r.id==='hope-lodge' && !/(hotel|lodging|stay)/.test(normalizedText))fit-=4;
      }
      if(c==='emotional' && r.id==='gildas-support')fit+=5;
      if(c==='volunteers' && r.id==='mylifeline')fit+=12;
      if(c==='supplies' && r.id==='canceraction-equipment')fit+=12;
      if(c==='insurance' && r.id==='paf-case')fit+=7;
      if(c==='fundraising' && r.id==='gofundme')fit+=12;
      if(c==='appointments' && r.id==='nci-appointments')fit+=5;
      return fit;
    }
    for(const need of analysis.ranked.slice(0,3)){
      if(top.length===3)break;
      const candidate=scored.filter(r=>r.categories.includes(need) && !seen.has(r.organization))
        .sort((a,b)=>fitForNeed(b,need)-fitForNeed(a,need)||b.score-a.score)[0];
      if(candidate){top.push(candidate);seen.add(candidate.organization);}
    }
    for(const r of scored){if(top.length===3)break;if(r.score>0&&!seen.has(r.organization)){top.push(r);seen.add(r.organization);}}
    for(const r of scored){if(top.length===3)break;if(!top.some(x=>x.id===r.id))top.push(r);}
    const needs=analysis.ranked.slice(0,3).map(id=>({id,label:CATEGORIES.find(c=>c.id===id).label,intro:ACTION_INTROS[id]}));
    return {needs,top,all:scored,analysis};
  }
  const api={CATEGORIES,SIX_COUNTIES,classify,recommend,availability};
  if(typeof module !== 'undefined' && module.exports)module.exports=api;
  if(root)root.CaregiverEngine=api;
})(typeof window!=='undefined'?window:null);
