# Options — Greenfield Project Framework

A reusable workflow for taking a project from "vague idea" to "shippable v1 spec + clean repo, ready to build." Captured from the Zetaprime planning session (2026-05-02) and kept here so the next project doesn't re-discover it.

When you start a new project, follow this.

---

## Install (new machine)

```bash
git clone <this-repo-url> ~/Github/Settings
cd ~/Github/Settings && ./install.sh
```

`install.sh` symlinks `~/.claude/commands/greenfield.md` → the file in this repo (so edits stay in git) and appends a pointer to your global `~/.claude/CLAUDE.md`. Idempotent — safe to re-run.

Then type `/greenfield` in any new project directory to kick off the workflow.

**Prereq:** gstack must be installed separately — the framework calls `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review` from gstack.

---

## The workflow (9 steps)

```
1. /office-hours              — diagnostic, premise challenge, design doc draft
2. write DESIGN.md            — based on the /office-hours output, not from scratch
3. /plan-ceo-review           — scope, audience, ambition; cherry-pick expansions
4. /plan-eng-review           — architecture, schema, anti-cheat, tests, perf
5. /plan-design-review        — IA, state coverage, journey, mockups
6. reconcile DESIGN.md vs /office-hours doc   ← easy to skip; don't
7. capture the prompts        — write PLAYBOOK.md + PROMPTS.md
8. pre-build kill gates       — naming, demand validation
9. cleanup before first code  — inspect dir state, rename to product name, lock port
```

Each step compounds on the last. **Step 6 is the one easiest to forget.** Step 9 is the one you regret skipping when your folder name doesn't match the product name in three months.

---

## The prompts to type (chronological)

### Setup (once per session)

> `/effort`

Per-session toggle to max effort. Use at the start of any high-stakes session.

### 1. Office hours

> `/office-hours`

Diagnostic. Produces `~/.gstack/projects/{slug}/{user}-{branch}-design-{datetime}.md`.

### 2. Design doc

> make a design doc based on the /office-hours output at `~/.gstack/projects/{slug}/...`
>
> \[paste full thesis as one block\]

Thesis should cover: one-line product, why it exists / the gap, audience, core primitives, game loops, modes, gamification voice, technical shape, MVP cut. Claude writes `DESIGN.md` at repo root. Target ~250–450 lines.

### 3–5. Review chain

> `/plan-ceo-review`

Then when prompted:

> Run /plan-eng-review now

Then:

> Run /plan-design-review now

Each surfaces decisions via AskUserQuestion. See cheat sheet below.

### 6. Reconcile (don't skip)

> Compare DESIGN.md against the /office-hours doc at `~/.gstack/projects/{slug}/...`. Surface anything in /office-hours that's missing from DESIGN.md.

Then:

> Fold all \[N\] items into DESIGN.md

### 7. Capture the framework

> make PLAYBOOK.md and PROMPTS.md capturing this session

### 8. Pre-build kill gates

> what gstack stuff should i use now

(Claude: pick a name, run kill gates.)

> Name tentatively is X. friends already in.
> no need to make the app rn i just want to do localhost
> i want this to be localhost {port} default

### 9. Scaffolding (with inspection)

> get started with scaffolding

**Critical:** Claude inspects the dir state FIRST. If a scaffold already exists (you forgot you ran `create-next-app` last night), Claude halts and presents cleanup options A/B/C. Pick **C** (rename to product name, move scaffold up, single git) unless the parent dir is already correct.

---

## Decision-point cheat sheet

| Skill | Question | Default |
|-------|----------|---------|
| /plan-ceo-review | Mode selection | SELECTIVE EXPANSION (greenfield); HOLD (refactors); REDUCTION (>15-file plans) |
| /plan-ceo-review | Audience priority | Flip to broader audience first if niche is saturated; paid tier on top |
| /plan-ceo-review | Cherry-pick expansions | Add to MVP only if marginal cost is hours, not days, AND load-bearing for the wedge |
| /plan-eng-review | Scope reduction (complexity triggered) | Snap back to /office-hours scope |
| /plan-eng-review | Implementation alternatives | Pick the boring [Layer 1] approach unless there's a real reason for an innovation token |
| /plan-design-review | Mockup scope | The 1–2 screens that ARE the wedge moment; spec the rest inline |

---

## Don't skip these

- **/office-hours first.** The diagnostic catches premise problems no review skill can recover.
- **Reconcile (step 6).** The 3-review chain drifts. The reconcile catches what it missed.
- **Inspect the dir before scaffolding.** You may have already scaffolded last night and forgot. Always `ls -la` first.
- **Rename folder to product name BEFORE the first commit.** Cheap now, expensive in 3 months.
- **Lock the dev port at scaffold time.** Avoids OAuth callback drift.

---

## Files in this repo

| File | What it is |
|------|------------|
| `README.md` | This guide. The one you actually read. |
| `PROMPTS.md` | Verbatim prompts from a real session (Zetaprime, 2026-05-02). Reference example. |
| `PLAYBOOK.md` | *(later)* Distilled framework — lessons, anti-patterns, quickstart bash. |

After running this workflow on a new project, append new lessons back to this repo. It's a living artifact.
