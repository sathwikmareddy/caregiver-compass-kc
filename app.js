(function(){
  'use strict';
  const E=window.CaregiverEngine;
  const R=window.CAREGIVER_RESOURCES;
  const G=window.CAREGIVER_GIVE_OPTIONS||[];
  const TERMS=window.CAREGIVER_GLOSSARY||[];
  const icons={transport:'↗',money:'$',emotional:'♡',appointments:'▣',daily:'⌂',work:'◷',lodging:'⌑',food:'♧',navigation:'✳',supplies:'✚',volunteers:'♧',insurance:'▤',fundraising:'♥'};
  const selected=new Set();
  const $=id=>document.getElementById(id);
  const escapeHTML=(v)=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safePhone=(p)=>p==='211'?'211':String(p).replace(/[^0-9+]/g,'');
  const categories=E.CATEGORIES;
  const picker=$('category-picker');
  picker.innerHTML=categories.map(c=>`<button type="button" class="category-chip" data-cat="${c.id}" aria-pressed="false"><span aria-hidden="true" class="chip-icon">${icons[c.id]}</span> ${escapeHTML(c.label)}</button>`).join('');
  picker.addEventListener('click',ev=>{
    const button=ev.target.closest('button[data-cat]'); if(!button)return;
    const id=button.dataset.cat;
    selected.has(id)?selected.delete(id):selected.add(id);
    button.setAttribute('aria-pressed',String(selected.has(id)));
    $('form-error').hidden=true;
  });
  function navigate(view){
    document.querySelectorAll('.view').forEach(el=>el.hidden=el.id!=='view-'+view);
    document.querySelectorAll('.nav-item').forEach(btn=>{const active=btn.dataset.view===view;btn.classList.toggle('active',active);btn.setAttribute('aria-current',active?'page':'false');});
    $('breadcrumb-title').textContent=({home:'Find support',directory:'Resource library',glossary:'Cancer terms explained',give:'Donate & volunteer',about:'About this project'})[view];
    if(view==='directory')renderDirectory();
    if(view==='glossary')renderGlossary();
    if(view==='give')renderGiving();
    window.scrollTo({top:0,behavior:'instant'});
  }
  document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.view)));
  $('brand-home').addEventListener('click',(ev)=>{ev.preventDefault();navigate('home')});
  $('home-glossary-button').addEventListener('click',()=>navigate('glossary'));
  const helpDialog=$('help-dialog');
  $('help-button').addEventListener('click',()=>{if(typeof helpDialog.showModal==='function')helpDialog.showModal();else alert('For medical emergencies, call 911. To reach the American Cancer Society, call 1-800-227-2345. For Kansas City community resources, call 211.')});
  const exampleText="My mother is getting chemotherapy. I work full time and can't drive her to appointments. We are also struggling with treatment bills, and I feel overwhelmed.";
  $('example-button').addEventListener('click',()=>{
    $('caregiver-description').value=exampleText;
    $('care-stage').value='treatment';$('care-county').value='jackson-mo';
    selected.clear();['transport','money','emotional'].forEach(x=>selected.add(x));
    picker.querySelectorAll('[data-cat]').forEach(btn=>btn.setAttribute('aria-pressed',String(selected.has(btn.dataset.cat))));
    $('form-error').hidden=true;
    $('caregiver-description').focus();
  });
  const labelOf=id=>categories.find(c=>c.id===id)?.label||id;
  function cardHTML(r,rank=null){
    const phone=r.phone?`<a href="tel:${safePhone(r.phone)}" aria-label="Call ${escapeHTML(r.organization)} at ${escapeHTML(r.phone)}">☎ ${escapeHTML(r.phone)}</a>`:'';
    return `<article class="resource-card">
      ${rank?`<span class="resource-count">RECOMMENDATION ${rank} / 3</span>`:''}
      <div class="resource-type">${escapeHTML(r.kind)}</div>
      <h3>${escapeHTML(r.name)}</h3>
      <p class="organization">${escapeHTML(r.organization)}</p>
      <p class="summary">${escapeHTML(r.summary)}</p>
      ${rank?`<p class="reason"><strong>Why it fits:</strong> ${escapeHTML(r.reason)}</p><p class="next-step"><strong>Your next step:</strong> ${escapeHTML(r.action)}</p>`:''}
      <p class="resource-eligibility"><strong>Before you go:</strong> ${escapeHTML(r.eligibility)}</p>
      ${r.eligibilityWarning?`<p class="caution">${escapeHTML(r.eligibilityWarning)}</p>`:''}
      <div class="card-links"><a href="${escapeHTML(r.url)}" target="_blank" rel="noopener noreferrer">Official source ↗</a>${phone}</div>
    </article>`;
  }
  let lastPlan=null;
  let lastFreeText='';
  function findKnownTerms(text){
    if(!text)return [];
    return TERMS.filter(t=>[t.term,...t.aliases.split(/[,;]/).map(s=>s.trim())].some(alias=>{
      // Restrict to whole words, not substrings such as "NED" in "need" or "port" in "transport".
      if(!alias||alias.length<3)return false;
      const rx=new RegExp('(^|[^a-z0-9])'+alias.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?=$|[^a-z0-9])','i');
      return rx.test(text);
    })).slice(0,6);
  }
  function renderResults(plan){
    lastPlan=plan;
    const mentioned=findKnownTerms(lastFreeText);
    const explained=mentioned.length?`<div class="terms-in-plan"><strong>Words you mentioned:</strong> ${mentioned.map(t=>`<button type="button" class="glossary-mention" data-see-term="${escapeHTML(t.term)}">${escapeHTML(t.term)} <span aria-hidden="true">↗</span></button>`).join(' ')} <span>Tap a word for an explanation.</span></div>`:'';
    const badges=plan.needs.map(n=>`<span class="need-badge">${escapeHTML(n.label)}</span>`).join('');
    $('results').innerHTML=`<div class="results-header"><div><p class="overline">A PLAN FOR RIGHT NOW</p><h2 id="result-heading">Here are your next three steps.</h2><p>These suggestions are based on your selected concerns and our curated resources—not a diagnosis or an eligibility decision.</p></div><div class="result-actions"><button class="secondary-button" type="button" id="copy-plan">Copy plan</button><button class="secondary-button" type="button" id="print-plan">Print / save PDF</button></div></div><div class="need-strip" aria-label="Identified support needs">${badges}</div>${explained}<div class="resource-results">${plan.top.map((r,i)=>cardHTML(r,i+1)).join('')}</div><div class="results-bottom"><strong>A good next step is often a conversation.</strong> If you're unsure which program applies, tell your treatment team's social worker what you need and ask for local referrals. This demonstration does not guarantee services, determine eligibility, or provide medical advice. Source information was reviewed on October 29–30, 2026.</div>`;
    $('results').hidden=false;
    $('copy-plan').addEventListener('click',copyPlan);
    $('print-plan').addEventListener('click',()=>window.print());
    $('results').scrollIntoView({behavior:'smooth',block:'start'});
    $('result-heading').setAttribute('tabindex','-1');
    $('result-heading').focus({preventScroll:true});
  }
  async function copyPlan(){
    if(!lastPlan)return;
    const parts=['Caregiver Compass KC — My next steps','Needs: '+lastPlan.needs.map(n=>n.label).join(', '),''];
    lastPlan.top.forEach((r,i)=>parts.push(`${i+1}. ${r.name} — ${r.organization}\nNext step: ${r.action}\nPhone: ${r.phone||'See official website'}\nSource: ${r.url}\nEligibility: ${r.eligibility}\n`));
    parts.push('Verify eligibility and availability with each provider. This is a student support-navigation prototype, not medical advice.');
    const btn=$('copy-plan');
    try{await navigator.clipboard.writeText(parts.join('\n'));btn.textContent='Copied ✓';setTimeout(()=>{if(btn.isConnected)btn.textContent='Copy plan'},2300);}catch(err){btn.textContent='Copy unavailable — use Print / save PDF';}
  }
  $('assessment-form').addEventListener('submit',ev=>{
    ev.preventDefault();
    const text=$('caregiver-description').value.trim();
    if(!text&&!selected.size){$('form-error').textContent='Please describe one concern or select at least one support area.';$('form-error').hidden=false;return;}
    $('form-error').hidden=true;
    lastFreeText=text;
    const county=$('care-county').value;
    const region=county==='outside'?'outside':'kc';
    const plan=E.recommend({text,selected:[...selected],stage:$('care-stage').value,county,region},R);
    renderResults(plan);
  });
  const filterSelect=$('library-category');
  filterSelect.innerHTML+=[...categories].map(c=>`<option value="${c.id}">${escapeHTML(c.label)}</option>`).join('');
  function renderDirectory(){
    const q=$('library-search').value.trim().toLowerCase();const cat=filterSelect.value;
    const list=R.filter(r=>(cat==='all'||r.categories.includes(cat))&&(!q||(r.name+' '+r.organization+' '+r.summary+' '+r.categories.map(labelOf).join(' ')).toLowerCase().includes(q)));
    $('directory-count').textContent=`Showing ${list.length} of ${R.length} vetted resource entries`;
    $('directory-list').innerHTML=list.length?list.map(r=>cardHTML(r)).join(''):'<p>No matching resources. Try a different search or category.</p>';
  }
  $('results').addEventListener('click',ev=>{
    const btn=ev.target.closest('button[data-see-term]');
    if(btn)goGlossary(btn.dataset.seeTerm);
  });
  const glossaryCategories=[...new Set(TERMS.map(t=>t.category))];
  const glossaryFilter=$('glossary-category');
  glossaryFilter.innerHTML+=glossaryCategories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');
  const termAlphabetical=[...TERMS].sort((a,b)=>a.term.localeCompare(b.term));
  let glossaryShowAll=false;
  function renderGlossary(){
    const q=$('glossary-search').value.trim().toLowerCase();
    const cat=glossaryFilter.value;
    const match=termAlphabetical.filter(t=>(cat==='all'||t.category===cat)&&(
      !q || (t.term+' '+t.aliases+' '+t.simple+' '+t.context).toLowerCase().includes(q)
    ));
    const visible=glossaryShowAll||q?match:match.slice(0,15);
    $('glossary-count').textContent=`Showing ${visible.length} of ${match.length} matching terms · ${TERMS.length} in the glossary`;
    $('glossary-clear').hidden=(!q&&cat==='all');
    $('glossary-more').hidden=(glossaryShowAll||!!q||match.length<=15);
    $('glossary-list').innerHTML=visible.length?visible.map(t=>`<article class="term-card">
      <div class="term-card-head"><span class="term-topic">${escapeHTML(t.category)}</span><span class="term-reviewed">Official reference</span></div>
      <h2>${escapeHTML(t.term)}</h2>
      ${t.aliases?`<div class="term-aliases">Related search words: ${escapeHTML(t.aliases)}</div>`:''}
      <p class="term-simple">${escapeHTML(t.simple)}</p>
      <details class="term-details"><summary>Why you might hear it · Question to ask</summary><div class="term-details-body"><p><strong>Why it comes up</strong><span>${escapeHTML(t.context)}</span></p><p><strong>Ask your care team</strong><span>${escapeHTML(t.question)}</span></p></div></details>
      <a href="${escapeHTML(t.url)}" target="_blank" rel="noopener noreferrer" class="term-source">Read from a trusted source ↗</a>
    </article>`).join(''):`<div class="glossary-empty"><strong>We couldn't find that word in our starter glossary.</strong><p>Check the spelling or try an alternative. You can also look it up in the <a href="https://www.cancer.gov/publications/dictionaries/cancer-terms" target="_blank" rel="noopener noreferrer">official NCI cancer dictionary</a>. For the meaning of a term in a personal medical report, ask the healthcare team.</p></div>`;
  }
  function goGlossary(term){
    $('glossary-search').value=term;
    glossaryFilter.value='all';glossaryShowAll=false;
    navigate('glossary');
    $('glossary-search').focus({preventScroll:true});
  }
  $('glossary-search').addEventListener('input',()=>{glossaryShowAll=false;renderGlossary()});
  glossaryFilter.addEventListener('change',()=>{glossaryShowAll=false;renderGlossary()});
  document.querySelectorAll('[data-quick-term]').forEach(btn=>btn.addEventListener('click',()=>goGlossary(btn.dataset.quickTerm)));
  $('glossary-show-all').addEventListener('click',()=>{glossaryShowAll=true;renderGlossary();$('glossary-show-all').blur();});
  $('glossary-clear').addEventListener('click',()=>{$('glossary-search').value='';glossaryFilter.value='all';glossaryShowAll=false;renderGlossary();$('glossary-search').focus();});
  $('library-search').addEventListener('input',renderDirectory);
  filterSelect.addEventListener('change',renderDirectory);
  function renderGiving(){
    const type=$('give-filter').value;
    const list=G.filter(g=>type==='all'||g.type===type);
    $('give-count').textContent=`Showing ${list.length} of ${G.length} giving and volunteer opportunities`;
    $('give-list').innerHTML=list.map(g=>`<article class="resource-card giving-card"><div class="resource-type">${escapeHTML(g.type)}</div><h3>${escapeHTML(g.name)}</h3><p class="organization">${escapeHTML(g.organization)}</p><p class="summary">${escapeHTML(g.summary)}</p><p class="next-step"><strong>How to get started:</strong> ${escapeHTML(g.action)}</p><div class="card-links"><a href="${escapeHTML(g.url)}" target="_blank" rel="noopener noreferrer">Official organization page ↗</a></div></article>`).join('');
  }
  $('give-filter').addEventListener('change',renderGiving);
  $('go-get-help').addEventListener('click',()=>navigate('home'));
  renderDirectory();renderGiving();renderGlossary();
})();
