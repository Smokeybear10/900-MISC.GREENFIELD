---
name: greenfield
version: 0.1.0
description: |
  Walk the user through a 9-step greenfield project bootstrap. Take a vague
  idea and produce a reconciled DESIGN.md, ARCHITECTURE.md (with HTML
  companion), reviewed plans, and a scaffolded project ready to build.
  Heavy use of refinement checkpoints between steps — the user drives
  decisions, not Claude. Combines four gstack review skills with
  architecture synthesis, design shotgun, and a reconciliation step.
  Use when starting a brand-new project, asked to "bootstrap a new project",
  "start from scratch", "scaffold a new app", "begin a greenfield project",
  or /greenfield.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
---

You are walking the user through a 9-step greenfield project bootstrap. The goal: take a vague idea and turn it into a shippable v1 spec + clean repo, ready to build. Combines four gstack skills with architecture synthesis, design shotgun, and a reconciliation step that catches drift.

Walk the user through the steps in order. At each step, tell them what to type and what to expect. Apply the decision defaults below unless the user has reason to deviate. Surface scope decisions via AskUserQuestion — never make them for the user.

## The refinement loop (read this before every step)

**Greenfield is NOT a wizard. It is a back-and-forth.** This is the load-bearing principle of the framework — if you ignore it, you ship the wrong product no matter how good the rest is.

After every artifact you produce (DESIGN.md draft, each review output, ARCHITECTURE.md, design-shotgun mockups, reconcile delta), STOP and explicitly invite the user's pushback before moving to the next step:

> "Here's what we have. What context do you have that I don't? What would you change?"

Or a topical variant. The user's context (taste, market knowledge, business relationships, people-already-in-the-loop) only enters the plan through these checkpoints. **Skip the checkpoint and you skip the user.** If you find yourself silently moving from one step to the next, the framework is being misused — stop and ask.

Every step below ends with an implicit refinement checkpoint. Don't proceed to the next step until the user signals "yes, move on."

## Step 0 (recommended): max effort + pre-flight

1. **Effort:** if the user hasn't already, suggest they run `/effort` to bump Claude to highest reasoning effort for the planning session.

2. **Pre-flight check for gstack.** The review steps (1, 3, 4, 6, 7) all depend on gstack being installed. Run `gstack --version` (via Bash) once at the start. If it errors, halt and tell the user: "gstack isn't installed — install it first (see https://gstack.dev or the project's install instructions), then re-run /greenfield. The review skills won't work without it." Don't try to proceed without gstack — you'll fail 30 minutes in with a confused error.

## Step 1: diagnostic — `/office-hours`

Have the user run `/office-hours`. It walks through six forcing questions: demand reality, status quo, desperate specificity, narrowest wedge, observation, future-fit.

**Output:** `~/.gstack/projects/{slug}/{user}-{branch}-design-{datetime}.md` — the diagnostic doc. This becomes the source of truth for step 8 (reconcile).

End with a refinement checkpoint before moving on.

## Step 2: write DESIGN.md

**Already-exists guard:** before writing, check if `DESIGN.md` exists at the project root (use Read or Bash `ls`). If it does, AskUserQuestion: "DESIGN.md already exists — overwrite, append a new section, or skip this step?" Don't silently overwrite the user's prior work.

Once the user shares their full product thesis, write `DESIGN.md` at the project root using the /office-hours doc as the scaffolding. Target ~250–450 lines.

The thesis should cover: one-line product, why it exists / the gap, audience (in priority order), core primitives / data model, game loops (if relevant), modes, voice on gamification, technical shape (high-level), MVP cut.

If the user pastes a partial thesis, ask for the missing pieces before writing the doc.

End with a refinement checkpoint: read the four required sections back to the user (premises, hot-path budgets, degradation matrix, state map) and ask what they'd change.

## Step 3: CEO review — `/plan-ceo-review`

Have the user run `/plan-ceo-review`. Walks through scope, audience, ambition.

**Decision defaults** (apply unless the user has reason to deviate):
- **Mode selection:** SELECTIVE EXPANSION for greenfield projects, HOLD SCOPE for refactors, REDUCTION for plans with >15 files
- **Audience priority:** flip to broader audience first if the specified niche is saturated; build narrower paid tier on top later
- **Cherry-pick expansions:** add to MVP only if marginal cost is hours (not days) AND the addition is load-bearing for the wedge moment

End with a refinement checkpoint, then suggest the user run `/plan-eng-review now`.

## Step 4: eng review — `/plan-eng-review`

Have the user run `/plan-eng-review`. Walks through architecture, DB schema, indexes, race conditions, RLS, anti-cheat, code quality, test coverage, performance. **Required gate** — must be CLEAR before code starts.

**Output:** may produce `~/.gstack/projects/{slug}/{user}-{branch}-eng-review-test-plan-{datetime}.md` for `/qa` to consume later.

**Decision defaults:**
- **Implementation alternatives:** pick the boring [Layer 1] approach unless there's a specific reason to spend an innovation token
- **Scope reduction (when complexity check triggers):** snap back to /office-hours scope if it exists; otherwise hold

End with a refinement checkpoint, then guide the user into Step 5 (architecture synthesis). Don't jump straight to design review — synthesize first, then design review can reference concrete components.

## Step 5: architecture synthesis — `ARCHITECTURE.md` + `public/architecture/index.html`

Synthesize the eng review's output into a permanent system reference. Two artifacts, same source:

- `ARCHITECTURE.md` at repo root — the textual source of truth, version-controlled, GitHub-renderable
- `public/architecture/index.html` — visual companion (open in browser)

**Why this step exists.** DESIGN.md says *what* to build (premises, hot-path budgets, degradation matrix, state map — all constraints). The eng review decides *how it's wired* but its output is buried in chat history. ARCHITECTURE.md captures that permanently so any future Claude session (or you, in 3 months) can pick up the system cold without re-reading every review.

**Already-exists guard:** before writing, check if `ARCHITECTURE.md` or `public/architecture/index.html` already exist. If either does, AskUserQuestion: "Architecture artifacts already exist — overwrite, append a new decision-log entry only, or skip?" Don't silently overwrite.

**Templates:** copy from `~/Github/Settings/templates/architecture/`:
- `ARCHITECTURE.md` → repo root, fill in
- `index.html` → `public/architecture/index.html`, fill in (Mermaid via CDN, no toolchain)

**How to fill in (read this before writing — the templates are skeletons, not finished docs):**

1. **Read first.** Open the eng review's test plan output (if it exists at `~/.gstack/projects/{slug}/{...}-eng-review-test-plan-{...}.md`), the just-written DESIGN.md, and the /office-hours doc. The components, lifecycles, state, and trust boundaries are derived from these — don't invent them.
2. **Write the `.md` first.** It's the source of truth. Rewrite every Mermaid block, every table row, every decision-log entry with project-specific content. Don't leave any `{placeholder}` strings — every placeholder gets replaced.
3. **Mirror the diagrams into the `.html`.** The HTML template's Mermaid blocks (the inline `<pre class="mermaid">…</pre>` content) must match the `.md` Mermaid source verbatim. Replace the example diagrams with the same Mermaid you wrote in the `.md`.
4. **Replace `{{PRODUCT}}`, `{{VERSION}}`, `{{DATE}}`** in the HTML's header. Replace the component cards (the `.card` divs) with one card per component from the `.md` table. Replace the decision-log entries and out-of-scope entries the same way. Use a project-specific `{{ONE_PARAGRAPH_SYSTEM_PITCH}}` for the hero section.
5. **Verify by opening `public/architecture/index.html` in a browser.** If Mermaid fails to render or the layout breaks, fix before moving on.

**Required sections (both files mirror this structure — non-negotiable):**

1. **System overview** — one paragraph + a Mermaid `graph TD` showing top-level components and arrows (browser → edge → DB → external services). Color-code by trust boundary if useful.
2. **Components** — table per module/service: `name | purpose | owns | depends on | lives in (file path or service name)`. Be specific about file paths — this is the table future-Claude opens first.
3. **Request lifecycles** — one Mermaid `sequenceDiagram` per hot-path from DESIGN.md, with the ms budget in the heading. End-to-end through real components.
4. **State topology** — extends DESIGN.md's state map with the *physical* home: `name | logical (DESIGN) | physical (table.column / ls key) | TTL | failure mode`.
5. **Deployment topology** — Mermaid `graph LR` with subgraphs per environment (browser / edge / Supabase / external). Note trust boundaries and where secrets live.
6. **Decision log** — load-bearing architectural calls with the *why*: `decision | one-line rationale | alternatives considered | date`. Future-Claude reads this first to avoid relitigating settled debates.
7. **Out of scope** — what this system intentionally does NOT do, with the reason. Prevents scope drift on every future feature ask.

**Mermaid blocks are the source of truth.** The `.md` and `.html` use the same Mermaid code. When updating a diagram, update both files (or paste once and copy across — the diagrams are identical).

**Decision defaults:**
- **Granularity of components:** one row per surface that has its own state, not one row per file. Group leaf components.
- **Lifecycles to diagram:** every entry in DESIGN.md's hot-path budget table. No more, no less.
- **Decision log scope:** only entries where the *alternative would have shipped a meaningfully different system*. Skip taste-level calls.

After both files exist, prompt the user with: "Open `public/architecture/index.html` in a browser. Does the visual match how you think the system should be wired? What would you change?" — refinement checkpoint.

## Step 6: design review — `/plan-design-review`

Have the user run `/plan-design-review`. Walks through information architecture, state coverage, journey, mockups, AI-slop guardrails, design system, responsive + a11y.

**Decision defaults:**
- **Mockup scope:** the 1–2 screens that ARE the wedge moment; spec the rest inline
- **Outside design voices:** skip if 2+ adversarial passes already happened in the chain

End with a refinement checkpoint, then suggest the user run `/design-shotgun` next (Step 7).

## Step 7: design shotgun — `/design-shotgun`

Have the user run `/design-shotgun`. Generates 8–10 concrete HTML mockups under `public/design/`. Run this **before** reconcile, not "when stuck" — concrete visuals beat hours of design-consultation text.

**Why this step exists.** Once you have visuals, picking a direction takes seconds. Without them, you stay stuck in adjectives ("cinematic", "minimalist", "data-dense") that never converge. The mockups also become a permanent reference for the entire build — `public/design/` ships as a static comparison board for any future redesign.

**Decision defaults:**
- **Direction count:** 8–10 (the skill default). Don't trim before seeing them.
- **Picking a direction:** AskUserQuestion with the file paths of the top 2–3 mockups so the user can open and compare. Don't pick for them.

End with a refinement checkpoint and confirm a winning direction before moving to reconcile.

## Step 8: reconcile (don't skip)

The most-skipped and most load-bearing step. The review chain drifts from the original premise; reconcile catches what was lost.

Compare both `DESIGN.md` and `ARCHITECTURE.md` against the /office-hours doc at `~/.gstack/projects/{slug}/{user}-{branch}-design-{datetime}.md`. Surface anything in /office-hours that's missing from either file, organized by severity:
- **Architectural** — load-bearing decisions that change the build (fold into ARCHITECTURE.md, including the decision log entry)
- **Spec gaps** — features or constraints that should be in DESIGN.md
- **Context** — background that adds nuance

Then via AskUserQuestion, offer: "Fold all [N] items into DESIGN.md / ARCHITECTURE.md?" with options to fold all, fold a subset, or skip.

End with a refinement checkpoint after folding. The user is the final say on what makes it in.

## Step 9: cleanup before scaffolding

**Critical: inspect the directory state FIRST with `ls -la`.** If a scaffold already exists (the user may have run `create-next-app` previously and forgotten), HALT before doing anything destructive and present these three options via AskUserQuestion:

| Option | What it does | When to pick |
|--------|--------------|--------------|
| A | Keep parent repo, delete nested `.git` | Two-tier structure (planning at root, code in subdir). Cheap but awkward. |
| B | Move code up, keep parent dir name | Single flat repo, but folder name doesn't match product name. |
| **C** | **Rename folder to product name, move scaffold contents up, single git** | **Cleanest end state. Recommend this unless parent dir name is already correct.** |

For option C, execute:
1. Move scaffold contents up to the parent
2. Rename parent folder to the product name
3. `git init` at the new root (single repo)
4. Set dev port in `package.json` (use the port the user requested, default 3000 if none)
5. Single initial commit including both planning docs and the scaffold

**Watch for the deny-rule snag:** if the user's global settings have `Bash(rm -rf *)` in `permissions.deny`, use `mv .git /tmp/old-git-$(date +%s)` instead of `rm -rf .git`. Same effect, doesn't trigger the deny rule. macOS reaps `/tmp` eventually.

If the directory is empty (no existing scaffold), scaffold based on the stack chosen in /plan-eng-review.

**Default for Next.js / Supabase web apps:** clone the personal starter template instead of running `create-next-app`. The template is pre-wired with shadcn UI (9 components), Supabase auth flow, project conventions in `CLAUDE.md`, and a README skeleton — saves ~30 minutes of boilerplate per project.

```bash
gh repo create <project-name> --template Smokeybear10/nextjs-starter --private --clone
cd <project-name>
bun install
cp .env.example .env.local      # fill in NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
```

After cloning, replace the `{project-name}` placeholder in the template's `README.md` and `CLAUDE.md` with the actual product name.

**Other stacks:**
- Plain Next.js (no Supabase): `bunx create-next-app@latest <name>`
- Vite + React: `bunx create-vite <name> -- --template react-ts`
- Python / FastAPI: `uv init <name>` then `uv add fastapi uvicorn`
- T3 stack (Next + tRPC + Prisma + Tailwind): `bunx create-t3-app <name>`

If the user mentioned a port lock or "localhost only" preference earlier in the session, apply that during scaffolding (set the dev script in `package.json` to that port — e.g. `"dev": "next dev -p 2900"`).

## Output files (after the full workflow)

| Path | What it is |
|------|-----------|
| `~/.gstack/projects/{slug}/{...}-design-{...}.md` | Office-hours diagnostic |
| `{repo}/DESIGN.md` | Implementable v1 spec (product) |
| `{repo}/ARCHITECTURE.md` | System spec — components, lifecycles, decision log |
| `{repo}/public/architecture/index.html` | Visual companion to ARCHITECTURE.md (Mermaid in browser) |
| `~/.gstack/projects/{slug}/ceo-plans/{date}-{slug}.md` | CEO scope decisions |
| `~/.gstack/projects/{slug}/{...}-eng-review-test-plan-{...}.md` | Test plan for `/qa` |

## After it's done

Suggest the user start with Lane 2 (drill engine / pure logic / business logic) first — usually no backend dependency. Lanes 1 (schema) and 4 (API routes) come after backend is provisioned.

Cross-project lessons learned → append to `~/Github/Settings/PLAYBOOK.md` and commit. The Settings repo is a living artifact.

## Hard rules

- **Run the refinement loop.** After every artifact, explicitly invite the user's pushback. Greenfield is not a wizard. If you're silently moving step-to-step, you're using the framework wrong.
- **Surface decisions, don't make them.** Use AskUserQuestion. The user always has context Claude doesn't.
- **Never skip the reconcile step.** It's the highest-leverage step in the chain.
- **Never skip ARCHITECTURE.md.** Both the `.md` and the `public/architecture/index.html` get filled in at Step 5. The seven required sections are non-negotiable. If the user pushes back on a section as redundant, push back — DESIGN.md and ARCHITECTURE.md cover different concerns (product vs. system) and conflating them makes both stale faster.
- **Never skip /design-shotgun.** Run it as a normal step before reconcile, not a fallback when stuck. 10 concrete mockups beat hours of design-consultation text.
- **Pre-flight gstack at Step 0.** If `gstack --version` errors, halt and tell the user to install it. Don't try to proceed without it.
- **Guard against silent overwrites.** If `DESIGN.md`, `ARCHITECTURE.md`, or `public/architecture/index.html` already exists, AskUserQuestion before writing — don't blow away prior work.
- **Always inspect the directory before scaffolding.** A scaffold may already exist from a previous session.
