/* Caregiver Compass KC — demo-only action tracker.
 * No patient descriptions are saved or transmitted. Only a fingerprint of the
 * recommended resource names and checkbox states is stored for this browser tab.
 */
(function () {
  'use strict';
  const STORAGE_KEY = 'cckc-dashboard-v1';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const styles = `
    .dashboard-panel{margin:24px 0;padding:24px;background:#fff;border:1px solid #d5e5df;border-radius:18px;box-shadow:0 8px 28px rgba(16,61,65,.07)}
    .dashboard-panel h3{margin:4px 0 6px;color:#103d41;font-size:1.35rem}
    .dashboard-panel .dash-eyebrow{font-size:.71rem;letter-spacing:.12em;text-transform:uppercase;color:#387567;font-weight:800}
    .dashboard-panel .dash-subtitle{margin:0 0 18px;color:#456467;font-size:.94rem;line-height:1.5}
    .dash-progress-row{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:8px;font-weight:700;color:#184c4a}
    .dash-track{height:9px;background:#e7efec;border-radius:99px;overflow:hidden;margin-bottom:16px}
    .dash-fill{height:100%;width:0;background:#2c9770;border-radius:99px;transition:width .2s ease}
    .dash-tasks{display:grid;gap:10px}
    .dash-task{display:flex;align-items:flex-start;gap:12px;padding:14px;border:1px solid #dcebe6;border-radius:12px;background:#fafdfb;cursor:pointer}
    .dash-task input{width:19px;height:19px;flex:none;margin-top:2px;accent-color:#1d8663;cursor:pointer}
    .dash-task-title{display:block;font-weight:750;color:#133f40;margin-bottom:4px}
    .dash-task-detail{display:block;font-size:.89rem;color:#426261;line-height:1.45}
    .dash-task:has(input:checked){background:#eef8f3}
    .dash-task:has(input:checked) .dash-task-title{text-decoration:line-through;color:#547e6f}
    .dash-footer{display:flex;gap:9px;flex-wrap:wrap;margin-top:15px;align-items:center}
    .dash-button{background:#fff;border:1px solid #b7d3c8;border-radius:9px;padding:9px 13px;color:#185a4a;font-weight:700;cursor:pointer;font-size:.88rem}
    .dash-button:hover{background:#eaf5ef}
    .dash-privacy{margin:12px 0 0;font-size:.78rem;color:#5c7570;line-height:1.45}
    @media(max-width:600px){.dashboard-panel{padding:16px}.dash-progress-row{font-size:.9rem}}
    @media print{.dashboard-panel{break-inside:avoid}.dash-footer{display:none}}
  `;
  const style = document.createElement('style');
  style.textContent = styles;
  document.head.appendChild(style);

  function fingerprint(values) {
    let hash = 2166136261;
    for (const c of values.join('|')) {
      hash ^= c.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return String(hash >>> 0);
  }

  function restore(key, length) {
    try {
      const data = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      if (data && data.key === key && Array.isArray(data.done) && data.done.length === length) {
        return data.done.map(Boolean);
      }
    } catch (_) { /* Tracking still works when storage is unavailable. */ }
    return Array(length).fill(false);
  }

  function save(key, done) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ key, done })); }
    catch (_) { /* Tracking continues for the current view. */ }
  }

  function renderDashboard() {
    const results = document.getElementById('results');
    if (!results || results.hidden) return;
    const cards = [...results.querySelectorAll('.resource-results .resource-card')];
    if (!cards.length) return;
    document.getElementById('caregiver-dashboard')?.remove();
    const tasks = cards.map(card => ({
      title: card.querySelector('h3')?.textContent?.trim() || 'Contact a support organization',
      action: (card.querySelector('.next-step')?.textContent || 'Review this resource')
        .replace(/^Your next step:\s*/i, '').trim()
    }));
    const key = fingerprint(tasks.map(t => t.title));
    const done = restore(key, tasks.length);
    const panel = document.createElement('section');
    panel.id = 'caregiver-dashboard';
    panel.className = 'dashboard-panel';
    panel.setAttribute('aria-labelledby', 'dashboard-title');
    panel.innerHTML = `
      <p class="dash-eyebrow">Your personal action tracker</p>
      <h3 id="dashboard-title">One step at a time</h3>
      <p class="dash-subtitle">Mark each recommended action as you work through it. You don't need to finish everything today.</p>
      <div class="dash-progress-row"><span>Progress</span><span id="dash-count" aria-live="polite">0 of ${tasks.length} completed</span></div>
      <div class="dash-track" role="progressbar" id="dash-bar" aria-label="Action completion" aria-valuemin="0" aria-valuemax="${tasks.length}" aria-valuenow="0"><div class="dash-fill" id="dash-fill"></div></div>
      <div class="dash-tasks">${tasks.map((t,i)=>`<label class="dash-task"><input type="checkbox" data-dash-task="${i}" ${done[i] ? 'checked' : ''} /><span><span class="dash-task-title">${i+1}. ${escape(t.title)}</span><span class="dash-task-detail">${escape(t.action)}</span></span></label>`).join('')}</div>
      <div class="dash-footer"><button type="button" class="dash-button" id="dash-reset">Reset checklist</button><button type="button" class="dash-button" id="dash-copy">Copy checklist</button></div>
      <p class="dash-privacy">Demo feature: completion checks are saved only for this browser tab session, not on a server. Don't enter private medical details; provider eligibility and availability must be confirmed.</p>`;
    results.querySelector('.resource-results').before(panel);
    const inputs = [...panel.querySelectorAll('[data-dash-task]')];
    const update = () => {
      const count = done.filter(Boolean).length;
      panel.querySelector('#dash-count').textContent = `${count} of ${tasks.length} completed`;
      panel.querySelector('#dash-bar').setAttribute('aria-valuenow', String(count));
      panel.querySelector('#dash-fill').style.width = `${count / tasks.length * 100}%`;
      save(key, done);
    };
    inputs.forEach((input, i) => input.addEventListener('change', () => {
      done[i] = input.checked;
      update();
    }));
    panel.querySelector('#dash-reset').addEventListener('click', () => {
      done.fill(false);
      inputs.forEach(input => {input.checked = false;});
      update();
    });
    panel.querySelector('#dash-copy').addEventListener('click', async event => {
      const button = event.currentTarget;
      const message = ['Caregiver Compass KC — Action checklist', ...tasks.map((t,i)=>`${done[i] ? '[x]' : '[ ]'} ${t.title}: ${t.action}`), '', 'Confirm all services and eligibility with each organization.'].join('\n');
      try {
        await navigator.clipboard.writeText(message);
        button.textContent = 'Checklist copied ✓';
      } catch (_) {
        button.textContent = 'Copy unavailable';
      }
    });
    update();
  }

  // The existing app's form handler renders recommendations first; this
  // document-level listener then attaches the tracker without modifying app.js.
  document.addEventListener('submit', event => {
    if (event.target?.id === 'assessment-form') renderDashboard();
  });
})();
