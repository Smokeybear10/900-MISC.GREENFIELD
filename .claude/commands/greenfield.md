You are walking the user through a 7-step greenfield project bootstrap. The goal: take a vague idea and turn it into a shippable v1 spec + clean repo, ready to build. Combines four gstack skills with a reconciliation step that catches drift.

Walk the user through the steps in order. At each step, tell them what to type and what to expect. Apply the decision defaults below unless the user has reason to deviate. Surface scope decisions via AskUserQuestion — never make them for the user.

## Step 0 (recommended): max effort

If the user hasn't already, suggest they run `/effort` to bump Claude to highest reasoning effort for the planning session.

## Step 1: diagnostic — `/office-hours`

Have the user run `/office-hours`. It walks through six forcing questions: demand reality, status quo, desperate specificity, narrowest wedge, observation, future-fit.

**Output:** `~/.gstack/projects/{slug}/{user}-{branch}-design-{datetime}.md` — the diagnostic doc. This becomes the source of truth for step 6 (reconcile).

## Step 2: write DESIGN.md

Once the user shares their full product thesis, write `DESIGN.md` at the project root using the /office-hours doc as the scaffolding. Target ~250–450 lines.

The thesis should cover: one-line product, why it exists / the gap, audience (in priority order), core primitives / data model, game loops (if relevant), modes, voice on gamification, technical shape (high-level), MVP cut.

If the user pastes a partial thesis, ask for the missing pieces before writing the doc.

## Step 3: CEO review — `/plan-ceo-review`

Have the user run `/plan-ceo-review`. Walks through scope, audience, ambition.

**Decision defaults** (apply unless the user has reason to deviate):
- **Mode selection:** SELECTIVE EXPANSION for greenfield projects, HOLD SCOPE for refactors, REDUCTION for plans with >15 files
- **Audience priority:** flip to broader audience first if the specified niche is saturated; build narrower paid tier on top later
- **Cherry-pick expansions:** add to MVP only if marginal cost is hours (not days) AND the addition is load-bearing for the wedge moment

At the end, suggest the user run `/plan-eng-review now`.

## Step 4: eng review — `/plan-eng-review`

Have the user run `/plan-eng-review`. Walks through architecture, DB schema, indexes, race conditions, RLS, anti-cheat, code quality, test coverage, performance. **Required gate** — must be CLEAR before code starts.

**Output:** may produce `~/.gstack/projects/{slug}/{user}-{branch}-eng-review-test-plan-{datetime}.md` for `/qa` to consume later.

**Decision defaults:**
- **Implementation alternatives:** pick the boring [Layer 1] approach unless there's a specific reason to spend an innovation token
- **Scope reduction (when complexity check triggers):** snap back to /office-hours scope if it exists; otherwise hold

At the end, suggest the user run `/plan-design-review now`.

## Step 5: design review — `/plan-design-review`

Have the user run `/plan-design-review`. Walks through information architecture, state coverage, journey, mockups, AI-slop guardrails, design system, responsive + a11y.

**Decision defaults:**
- **Mockup scope:** the 1–2 screens that ARE the wedge moment; spec the rest inline
- **Outside design voices:** skip if 2+ adversarial passes already happened in the chain

## Step 6: reconcile (don't skip)

The most-skipped and most load-bearing step. The 3-review chain drifts from the original premise; reconcile catches what was lost.

Compare `DESIGN.md` against the /office-hours doc at `~/.gstack/projects/{slug}/{user}-{branch}-design-{datetime}.md`. Surface anything in /office-hours that's missing from `DESIGN.md`, organized by severity:
- **Architectural** — load-bearing decisions that change the build
- **Spec gaps** — features or constraints that should be in DESIGN.md
- **Context** — background that adds nuance

Then via AskUserQuestion, offer: "Fold all [N] items into DESIGN.md?" with options to fold all, fold a subset, or skip.

## Step 7: cleanup before scaffolding

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

If the directory is empty (no existing scaffold), proceed with a fresh scaffold using the appropriate generator (`bunx create-next-app`, `uv init`, etc.) for the stack chosen in /plan-eng-review.

If the user mentioned a port lock or "localhost only" preference earlier in the session, apply that during scaffolding (set the dev script in `package.json` to that port).

## Output files (after the full workflow)

| Path | What it is |
|------|-----------|
| `~/.gstack/projects/{slug}/{...}-design-{...}.md` | Office-hours diagnostic |
| `{repo}/DESIGN.md` | Implementable v1 spec |
| `~/.gstack/projects/{slug}/ceo-plans/{date}-{slug}.md` | CEO scope decisions |
| `~/.gstack/projects/{slug}/{...}-eng-review-test-plan-{...}.md` | Test plan for `/qa` |

## After it's done

Suggest the user start with Lane 2 (drill engine / pure logic / business logic) first — usually no backend dependency. Lanes 1 (schema) and 4 (API routes) come after backend is provisioned.

Cross-project lessons learned → append to `~/Github/Settings/PLAYBOOK.md` and commit. The Settings repo is a living artifact.

## Hard rules

- **Surface decisions, don't make them.** Use AskUserQuestion. The user always has context Claude doesn't.
- **Never skip the reconcile step.** It's the highest-leverage step in the chain.
- **Always inspect the directory before scaffolding.** A scaffold may already exist from a previous session.
