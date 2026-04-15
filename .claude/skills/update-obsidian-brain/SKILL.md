---
skill: update-obsidian-brain
description: >-
  Sync this project's current state back to the Obsidian brain vault. Updates the project note
  with new decisions, conventions, structural changes, and learnings from this coding session.
  Triggered when the user says "update the brain", "sync to vault", "update obsidian", or wants
  to save what was learned in this session to their second brain.
---

# Update Obsidian Brain Skill

## Constants
- **Vault path**: /Users/nicoesgeb/Documents/PersonalPorjects/Vault_brain
- **Project note**: proyectos/nicoesgeb-github-io.md

## Purpose
Sync what changed or was learned in the current coding session back to the brain vault's project note. Also update the project's own CLAUDE.md if conventions changed.

## Behavior

When triggered:

### Step 1 — Assess what changed
Review the current session context:
- What files were created, modified, or deleted?
- Were any architectural decisions made?
- Were new conventions established?
- Were new dependencies added?
- Did the folder structure change significantly?
- Were any bugs found that reveal non-obvious gotchas?

### Step 2 — Read current vault note
Read the project note at:
`/Users/nicoesgeb/Documents/PersonalPorjects/Vault_brain/proyectos/nicoesgeb-github-io.md`

### Step 3 — Update the vault project note
Update ONLY the sections that changed:
- Add new decisions to the **📌 Key Decisions** table with today's date
- Update **🏗 Architecture** if tech stack or patterns changed
- Update **📁 Key Structure** if folder structure changed
- Update **🧠 Key Conventions** if new conventions were established
- Update **✅ Next Steps** based on current state
- Add new **🔗 Related** links if new people, ideas, or research were referenced
- Update the `modified` date in frontmatter

### Step 4 — Update project CLAUDE.md if needed
If conventions, folder structure, or commands changed, update `.claude/CLAUDE.md` to reflect the new state. Keep it under 80 lines.

### Step 5 — Report
Tell the user what was updated in the vault and why.

## Rules
- Be SELECTIVE — only update what actually changed
- Add to the decisions table, don't replace old decisions (they're a log)
- Never modify source code — only `.claude/` files and the vault note
- Update the `modified` date on the vault note
