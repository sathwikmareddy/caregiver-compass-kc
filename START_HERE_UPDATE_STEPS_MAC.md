# Caregiver Compass KC — exact update instructions (Mac + GitHub)

This upgrade addresses Kathy Benich's two questions about **resource scalability** and **urgent medical warning phrases**. It is a student prototype, not a clinical triage system. These instructions assume your current site is ordinary HTML/CSS/JavaScript, published from a GitHub repository.

## 1. First: save a backup

1. In Finder, find your original project folder (the one containing `index.html`).
2. Right-click it and choose **Duplicate**. Rename the copy `Caregiver_Compass_KC_BACKUP`.
3. Do **not** delete or overwrite the backup.
4. If your GitHub repository already contains newer work, review differences before replacing `index.html`, `app.js`, or `styles.css`: those three files are replaced by this upgrade.

## 2. Download and extract

1. Download `Caregiver_Compass_KC_Kathy_Feedback_Updated.zip` from the ChatGPT response.
2. Double-click the ZIP in **Finder > Downloads**.
3. Open the resulting `Caregiver_Compass_KC_Updated` folder. Open its `index.html` by double-clicking it.
4. The updated site should load, including the previous pages: Find support, Resource library, Cancer terms explained, Donate & volunteer, About this project.

## 3. Which files changed?

If you already have the original project, you can use the smaller upgrade-only ZIP instead of copying everything:

**Replace three existing files at the website root:**
- `index.html` — loads two new scripts and adds the safety message area.
- `app.js` — shows safety messages and pauses ordinary recommendations for detected warning phrases.
- `styles.css` — styles emergency and oncology-call warnings.

**Add two NEW files at the website root:**
- `safety.js` — transparent, limited keyword rules (not medical diagnosis or guaranteed emergency detection).
- `approved-resources.js` — generated source of human-reviewed new resources; currently has no additions.

**Add three directories, preserving their internal structure:**
- `.github/workflows/resource-review.yml` — optional weekly GitHub Actions scan. The `.github` folder starts with a dot and may be hidden in Finder; press **Command + Shift + .** to show hidden items.
- `maintenance/` — official-source registry, scanner, human approval JSON and publish script.
- `tests/` — automated tests of safety examples and resource governance.

**Optional but recommended documentation replacements/additions:**
- `README.md`, `KATHY_FEEDBACK_UPGRADE.md`, `DEMO_SCRIPT.md`, `PROJECT_REPORT.md`, `PRESENTATION_OUTLINE.md`, `START_HERE_UPDATE_STEPS_MAC.md`.

You do **not** need to rewrite `resources.js`, `engine.js`, `glossary.js`, `dashboard.js`, `financial-checker.js`, or `request-help.js`. They are included, unchanged, in the full ZIP to make it runnable by itself.

## 4. Test the website locally BEFORE uploading

1. Open `Caregiver_Compass_KC_Updated/index.html` in Chrome or Safari. No web server is required for basic functionality.
2. Click **Find support**.
3. Scenario A (normal): enter `I need rides to chemotherapy and help with bills.` Click **Find my next steps**. You should get the ordinary recommendation cards.
4. Scenario B (emergency): replace the text with `My dad cannot breathe.` You should see a strong emergency warning and guidance to call 911 in the United States. Click **Find my next steps**: ordinary recommendations should be paused.
5. Scenario C (urgent oncology): replace the text with `My mom is on chemotherapy and has a fever of 100.4 F.` You should see a prompt to contact the oncology team immediately. Again, the regular results should be paused.
6. Scenario D (negation check): replace the text with `No chest pain, only difficulty paying medical bills.` The limited rule set should allow a normal resource plan.
7. Click **Need urgent help?** in the header and verify that the standalone safety panel opens.
8. Open **Resource library** and **Cancer terms explained**. Check that the existing features still work.

**Important:** The alerts only detect some English warning phrases. A missing alert is NOT evidence of safety. Do not test or rely on the prototype with a real medical emergency.

## 5. Run automated tests on Mac (recommended)

1. Open **Terminal** (Spotlight: Command + Space, type `Terminal`).
2. Enter `node --version`. If macOS says command not found, install a supported Node.js LTS version from https://nodejs.org/ and reopen Terminal.
3. Type `cd ` (with a trailing space), drag the extracted `Caregiver_Compass_KC_Updated` folder from Finder into Terminal to insert its path, and press **Return**.
4. Run:

   ```bash
   node --test tests/*.test.js
   ```

5. Expected for this supplied version: **25 tests, 25 pass, 0 fail**. These are development tests; they do not prove clinical validity.

## 6. Update your EXISTING GitHub repository (GitHub Desktop method)

1. Install **GitHub Desktop** from https://desktop.github.com/ (if not installed), open it, and sign in to your GitHub account.
2. Choose **File > Clone Repository** (if your repository is not already on this Mac). Select your Caregiver Compass repository under GitHub.com; choose a local folder and click **Clone**.
   - If it is already cloned: **File > Add Local Repository**, select its existing folder, and open it.
3. In GitHub Desktop select the repository, then choose **Repository > Show in Finder**.
4. Confirm that the repository's website publish folder contains `index.html`. GitHub Pages often uses the repository root, but your Pages settings may instead point to `/docs` or another publishing branch. Use the folder **actually used by your live website**.
5. From the downloaded upgrade folder, **copy the contents INSIDE it** into that publishing folder. Do not paste an extra `Caregiver_Compass_KC_Updated` wrapper folder beside `index.html`.
6. When Finder asks about duplicate files, choose **Replace** for the three code files (`index.html`, `app.js`, `styles.css`) **only after you have backed up or reviewed any newer local edits**. Include the NEW files/folders, especially `safety.js`, `approved-resources.js` and `.github/workflows/resource-review.yml`.
7. The `.github` folder belongs in the **repository root**, regardless of whether the website is published from `/docs`. The `maintenance/` folder also belongs at the repository root because GitHub Actions runs from that root. If your actual webpage files live in `/docs`, this particular scanner/publisher setup needs path adjustments; do not run it unchanged.
8. Return to GitHub Desktop. On the **Changes** tab, confirm that the intended new and modified files appear.
9. Enter a commit summary such as `Add medical safety notices and reviewed resource discovery`.
10. Click **Commit to main** (or your active branch), then **Push origin**. If your project uses a review branch or pull-request policy, follow that policy instead of pushing directly to main.

**Alternative (Terminal + git):** in your locally cloned repository, use `git status`, copy the update contents into the correct folders, then run `git add .`, `git commit -m "Add resource review and safety notices"`, and `git push`. Do not run `git init` inside the downloaded folder if you're updating an existing repository.

## 7. Verify your GitHub Pages site

1. Open the repository on github.com.
2. Open **Settings > Pages**.
3. If GitHub Pages is already configured, **do not change its publishing source without a reason**. Verify that the branch/folder match where you placed `index.html`.
4. If Pages has not been configured, choose **Source: Deploy from a branch**, **Branch: main** (or your primary branch), **Folder: /(root)**, then **Save**, provided `index.html` really is in that root.
5. Open the site's URL from **Settings > Pages**. Refresh it (Mac: **Command + Shift + R**) and repeat the normal and emergency/urgent fictional scenarios.
6. If the live site shows the old version, check the latest GitHub commit, your Pages publishing folder, the Pages deployment run, and that `safety.js` appears next to `index.html` on the published site.

Official GitHub Pages guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 8. Enable and check the resource scanner on GitHub

This is SEPARATE from publishing the website. The website does not magically fetch updated resources.

1. Ensure `.github/workflows/resource-review.yml` is committed to the default branch at the **repository root**.
2. On GitHub, open the repository's **Actions** tab. If GitHub asks you to enable workflows, review and enable them.
3. Under **Actions**, select **Weekly trusted-resource discovery**.
4. Click **Run workflow**, select the default branch, and start the run. This workflow is also scheduled for **Monday at 15:10 UTC**, subject to GitHub scheduling behavior.
5. Open the workflow run and review success/failure. Download the `resource-scan-report` artifact from its run page; it contains `review-queue.json` and `latest-report.md`.
6. The workflow tries to create or update a GitHub Issue if it discovers candidates. Your repository's Actions permissions must permit the workflow's requested `issues: write` scope. If issue creation is blocked, check **Settings > Actions > General** and any organization policy. The report artifact can still be reviewed separately.
7. New links found by this scan are only **candidates**, NOT automatically vetted and NOT published into the caregiver library.

GitHub manual-workflow guide: https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow

## 9. Approve and publish a REAL new resource (human review)

1. Review a candidate from the scan's report, or receive a resource suggestion directly.
2. Visit the provider's **official website**. Confirm the service currently exists, supported counties/states, who qualifies, contact information, restrictions, and whether funds/slots are available or only potential.
3. Confirm the official domain is in `maintenance/trusted-sources.json`. For a new trusted organization, add an audited provider hub and approved domain *after* researching it. Do not trust a name or link just because it appears in a scan.
4. Add a complete JSON entry to the array in `maintenance/approved-resources.json` using the actual verified facts. Mandatory keys are `id`, `name`, `organization`, `categories`, `scope`, `verified`, `url`, `summary`, `eligibility`, `action`, `kind`, `reviewedBy`, `reviewedAt`. Accepted scope values: `national`, `kc-region`, `six-counties`. Category IDs must be from `engine.js`.
5. Run from the **repository root**:

   ```bash
   node maintenance/publish.mjs
   node --test tests/*.test.js
   ```

6. The publisher validates required fields, the source domain, duplicate IDs, and date recency. It updates `approved-resources.js` only with human-reviewed entries.
7. Open `index.html` locally and make sure the vetted program appears in **Resource library**, with the correct source link and limitations.
8. Commit **both** `maintenance/approved-resources.json` and the regenerated `approved-resources.js`, and **Push origin** in GitHub Desktop.
9. Check the live site after GitHub Pages publishes the change. If a provider changes or stops a program, update or remove the approved record and republish.

Currently `maintenance/approved-resources.json` is `[]` — NO new program has been approved or imported yet. That is intentional.

## 10. What to say in the poster session

**Scalability:** "Our app separates discovering candidate programs from publishing trusted resources. A scheduled scan of selected official providers feeds a human review queue. Only verified entries are integrated into the resource library, and the public site is updated when that approved change is deployed."

**Urgent situations:** "A separate, rule-based safety-signpost layer checks a small group of concerning phrases before ordinary recommendations. It can display 911 or oncology-team guidance. It cannot diagnose, reliably triage all medical emergencies, or replace clinician instructions, so clinical validation is essential before patient use."

## 11. Troubleshooting

- **Blank page or scripts not loading**: confirm `index.html`, `resources.js`, `approved-resources.js`, `glossary.js`, `safety.js`, `engine.js`, `app.js` are adjacent in the same webpage folder, exactly named. Check the browser developer console for missing-file errors.
- **No fever alert**: enter the exact synthetic phrase in Step 4 and choose a treatment context; the rules are intentionally narrow.
- **GitHub Pages unchanged**: confirm **Push origin** completed and **Settings > Pages** points at the directory you updated. Hard refresh.
- **Action not visible**: `.github/workflows/resource-review.yml` must exist at the repository root on the default branch, and Actions must be enabled.
- **Issue not created**: check the workflow's permissions and logs; inspect the report artifact regardless.
- **Scanner reports errors**: provider pages may block automated requests; this is a candidate-discovery aid, not a comprehensive service-feed system.
- **No extra resources in the directory**: that's expected until a reviewer approves a real entry, runs `publish.mjs`, and deploys `approved-resources.js`.

Always retain the original project backup until you have checked the deployed site.
