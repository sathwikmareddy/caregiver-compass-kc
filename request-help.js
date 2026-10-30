/* Caregiver Compass KC — Step 12: Request Help Message Builder
   Generates an editable, copyable request for trusted people.
   Does NOT connect volunteers, send messages, or save entered information.
*/
(function (root) {
  'use strict';

  const HELP_TYPES = Object.freeze([
    {id:'ride', label:'A ride to an appointment', phrase:'a ride to an appointment'},
    {id:'meal', label:'A prepared meal', phrase:'a prepared meal'},
    {id:'groceries', label:'Groceries or a store run', phrase:'help with groceries or a store run'},
    {id:'errands', label:'Errands or picking something up', phrase:'help with a few errands'},
    {id:'checkin', label:'A friendly check-in', phrase:'a friendly check-in'},
    {id:'home', label:'Help with household tasks', phrase:'help with a household task'},
    {id:'other', label:'Something else', phrase:'a practical task'}
  ]);
  function clean(value, limit) {
    return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, limit);
  }
  function composeRequest(details) {
    const type = HELP_TYPES.find(x => x.id === details.type) || HELP_TYPES[0];
    const time = clean(details.when, 100);
    const extra = clean(details.details, 180);
    const mention = details.mention === true;
    const lines = [
      'Hi! I could use a little help with ' + type.phrase + '.',
      mention ? 'I am helping someone through cancer treatment, and a bit of practical support would mean a lot.' : 'A bit of practical support would mean a lot.',
      time ? 'When: ' + time : '',
      extra ? 'A little more detail: ' + extra : '',
      'Would you be able to help, or let me know if there is a time that works for you? No pressure at all. Thank you!'
    ];
    return lines.filter(Boolean).join('\n\n');
  }
  const api = {HELP_TYPES, clean, composeRequest};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (!root || !root.document) return;
  const d = root.document;
  const esc = x => String(x??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const style = d.createElement('style');
  style.textContent = `
    .request-intro{background:#eff8f3;border:1px solid #d1e5d8;padding:18px 22px;border-radius:14px;margin:22px 0;color:#244e42;line-height:1.6}
    .request-panel{background:#fff;border:1px solid #d7e4df;border-radius:16px;padding:24px;box-shadow:0 8px 28px rgba(16,61,65,.05)}
    .request-form{display:grid;gap:17px}
    .request-field{display:flex;flex-direction:column;gap:7px}
    .request-field label{font-size:.94rem;font-weight:760;color:#174540}
    .request-field select,.request-field input,.request-field textarea,.request-output textarea{font:inherit;line-height:1.5;color:#214440;background:#fff;border:1px solid #b9d1c8;border-radius:10px;padding:12px 13px;width:100%;box-sizing:border-box}
    .request-field textarea{resize:vertical;min-height:85px}
    .request-field small{color:#58716a;line-height:1.5}
    .request-check{display:flex;align-items:start;gap:11px;line-height:1.5;color:#325a50;font-size:.94rem}
    .request-check input{flex:none;margin-top:5px;accent-color:#166a54}
    .request-buttons{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
    .request-action{background:#126950;color:#fff;border:0;border-radius:10px;padding:12px 18px;font-weight:760;font:inherit;cursor:pointer;min-height:44px}
    .request-action.secondary{background:white;color:#126950;border:1px solid #a8cbc0}
    .request-action:focus-visible,.request-field :focus-visible,.request-output textarea:focus-visible{outline:3px solid #7ed1b4;outline-offset:2px}
    .request-output{margin-top:22px;padding:22px;border:1px solid #d6e5df;border-radius:14px;background:#f9fcfa}
    .request-output h2{font-size:1.2rem;color:#17423d;margin:0 0 8px}
    .request-output textarea{min-height:220px;resize:vertical;margin:8px 0 12px;background:white}
    .request-feedback{font-size:.9rem;color:#215f49;min-height:1.4em;margin:9px 0 0}
    .request-aside{margin-top:23px;padding:19px 21px;border:1px solid #d6e5df;border-radius:14px;background:#fff}
    .request-aside h2{font-size:1.15rem;color:#17423d;margin:0 0 7px}
    .request-aside p{line-height:1.55;color:#43665b;margin:0 0 12px}
    .request-aside a{color:#0a6757;font-weight:760;text-decoration:underline}
    @media(max-width:620px){.request-panel{padding:16px}.request-buttons{display:grid}.request-action{width:100%}}
  `;
  d.head.appendChild(style);

  const navList = d.querySelector('.nav-list');
  const main = d.getElementById('main-content');
  if (!navList || !main) return;
  const nav = d.createElement('button');
  nav.type='button';
  nav.className='nav-item';
  nav.dataset.view='request-help';
  nav.innerHTML='<span class="nav-ico" aria-hidden="true">✉</span> Request help';
  const financeNav = navList.querySelector('[data-view="finance"]');
  const aboutNav = navList.querySelector('[data-view="about"]');
  if (financeNav) financeNav.after(nav);
  else if (aboutNav) aboutNav.before(nav);
  else navList.appendChild(nav);

  const page = d.createElement('section');
  page.id='view-request-help';page.className='view';page.hidden=true;
  page.innerHTML=`
    <div class="page-header"><p class="overline">YOU DON'T HAVE TO DO IT ALL</p><h1>Ask for a helping hand.</h1><p>Turn a task that's weighing on you into a kind, clear message you can share with someone you trust.</p></div>
    <div class="request-intro"><strong>You're in control.</strong> We'll draft a message, but you choose whether to copy, edit, and send it. Nothing is sent or stored by this feature. Avoid sharing private medical details or someone's diagnosis without their permission.</div>
    <div class="request-panel">
      <form id="request-help-form" class="request-form">
        <div class="request-field"><label for="request-kind">What kind of help would be useful?</label>
          <select id="request-kind">${HELP_TYPES.map(x=>`<option value="${esc(x.id)}">${esc(x.label)}</option>`).join('')}</select></div>
        <div class="request-field"><label for="request-when">When do you need help? <span class="optional">(optional)</span></label>
          <input id="request-when" type="text" maxlength="100" placeholder="e.g., Next Tuesday afternoon"><small>A general day or time is enough. Share exact addresses privately if needed.</small></div>
        <div class="request-field"><label for="request-details">Any additional details? <span class="optional">(optional)</span></label>
          <textarea id="request-details" maxlength="180" rows="3" placeholder="e.g., Pick up groceries and drop them at my door"></textarea><small>Keep it practical. Please do not include names, medical records, or private patient information.</small></div>
        <label class="request-check"><input type="checkbox" id="request-disclose"> <span>Include a general mention that I'm supporting someone through cancer treatment (optional). Only check this if they consent to sharing that information.</span></label>
        <div><button type="submit" class="request-action">Create my help request →</button></div>
      </form>
      <section id="request-preview" class="request-output" aria-labelledby="request-preview-title" hidden>
        <h2 id="request-preview-title">Your editable message</h2><p>Edit anything before sharing it. You can copy this message into a text, email, or your own family group chat.</p>
        <label for="request-message" class="request-field"><span class="optional">Message</span></label>
        <textarea id="request-message" rows="9" maxlength="1200"></textarea>
        <div class="request-buttons"><button id="request-copy" class="request-action" type="button">Copy my message</button><button id="request-reset" class="request-action secondary" type="button">Start a new request</button></div>
        <p id="request-feedback" class="request-feedback" aria-live="polite"></p>
      </section>
    </div>
    <div class="request-aside"><h2>Want to organize help over several days?</h2><p>MyLifeLine, from Cancer Support Community, has a Helping Calendar for asking your own friends and family to sign up for rides, meals, and other tasks. It does not automatically assign outside volunteers.</p><a id="request-mylifeline-link" href="https://www.cancersupportcommunity.org/mylifeline-online-community" target="_blank" rel="noopener noreferrer">Learn about MyLifeLine Helping Calendar ↗</a></div>`;
  // Keep the external URL consistent with the existing vetted resource catalog.
  const link = page.querySelector('#request-mylifeline-link');
  const source=(root.CAREGIVER_RESOURCES||[]).find(x=>x.id==='mylifeline');
  if (source && /^https:\/\//.test(source.url)) link.href=source.url;
  main.appendChild(page);
  nav.addEventListener('click', () => {
    d.querySelectorAll('.view').forEach(v => {v.hidden=v!==page;});
    d.querySelectorAll('.nav-item').forEach(btn => {
      const active=btn===nav;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-current',active?'page':'false');
    });
    const crumb=d.getElementById('breadcrumb-title');
    if (crumb) crumb.textContent='Request help';
    root.scrollTo({top:0,behavior:'instant'});
  });
  const form=page.querySelector('#request-help-form');
  const preview=page.querySelector('#request-preview');
  const msg=page.querySelector('#request-message');
  const feedback=page.querySelector('#request-feedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    msg.value=composeRequest({
      type:page.querySelector('#request-kind').value,
      when:page.querySelector('#request-when').value,
      details:page.querySelector('#request-details').value,
      mention:page.querySelector('#request-disclose').checked
    });
    preview.hidden=false;
    feedback.textContent='Your message is ready. Review and edit before sharing.';
    preview.scrollIntoView({behavior:'smooth',block:'nearest'});
    msg.focus({preventScroll:true});
  });
  page.querySelector('#request-copy').addEventListener('click', async () => {
    if (!msg.value.trim()) {feedback.textContent='Please write a message before copying.';return;}
    try {
      await root.navigator.clipboard.writeText(msg.value);
      feedback.textContent='Copied! Paste it into a message or email to someone you trust.';
    } catch (_) {
      msg.focus();msg.select();
      feedback.textContent='Automatic copy is unavailable. Message selected: press Command + C to copy.';
    }
  });
  page.querySelector('#request-reset').addEventListener('click', () => {
    form.reset();msg.value='';preview.hidden=true;feedback.textContent='';
    page.querySelector('#request-kind').focus();
  });
})(typeof window!=='undefined' ? window : null);
