## Brain Vault (MANDATORY)
**BEFORE doing any search, grep, or exploration — read the vault note first:**
`/Users/nicoesgeb/Documents/PersonalPorjects/Vault_brain/proyectos/nicoesgeb-github-io.md`
This is NOT optional. Read it BEFORE touching any code.
Use `/update-obsidian-brain` to sync changes back when done.

---

# nicoesgeb.github.io — Portfolio

## Stack
- Vanilla HTML/CSS/JavaScript — no framework, no bundler, no build step
- Hosted on GitHub Pages, auto-deploys on `git push`
- Google Analytics 4 (tag `G-HS1BJ90TQM`)

## Structure
```
index.html              # Main portfolio — all sections live here
My3DPortfolio/          # Separate 3D experience (standalone, linked from hero)
css/                    # One file per concern (global, layout, buttons, id-card, projects, text, portfolio, pixel-character)
scripts/                # idCard.js · projectModal.js · ux.js
assets/cv · fonts · images · videos
projects/project1–4/    # Per-project subdirs
SKILL.md                # soft-skill design rules — Awwwards-tier UI
```

## Key Conventions
- CSS split by concern — do not consolidate
- Cache-bust `portfolio.css` and `ux.js` via `?v=YYYY-MM-DD` in `index.html` on every deploy
- `data-reveal` on elements → scroll entry animations handled by `ux.js`
- Modals pre-built in HTML, toggled via `projectModal.js`
- ID card = 3D CSS flip card with drag-to-rotate via `idCard.js`
- `SKILL.md` at root = soft-skill (Awwwards-tier). For reimagines, use Ethereal Glass vibe (OLED black + mesh gradients)

## Sections in index.html
Hero → About → Experience → Skills → Projects → Contact → Modals → Footer

## Deployment
```bash
git add . && git commit -m "..." && git push
```
No build step. Changes go live in ~1 min.
