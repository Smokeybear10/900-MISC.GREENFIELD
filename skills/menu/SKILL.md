---
name: menu
version: 0.1.0
description: |
  Show the curated list of gstack skills the user actually reaches for,
  organized by category and labeled with both *when to use* and *what it
  does*. Use when asked to "show me the skills", "what skills do I have",
  "list my commands", "show the menu", "what can you do", or /menu.
allowed-tools: []
---

Show the user this curated list of gstack skills, organized by category and labeled with both *when to use* and *what it does*. Present it cleanly — no extra commentary, no follow-up questions, no suggestions unless the user asks.

### Idea + planning

**`/office-hours`** — *Use when starting a new idea, before any planning.* Walks through six forcing questions (demand reality, status quo, desperate specificity, narrowest wedge, observation, future-fit). Catches premise problems early.

**`/plan-ceo-review`** — *Use when you have a draft `DESIGN.md` and need to challenge scope, audience, and ambition.* Founder-mode review. Picks the right mode (SELECTIVE EXPANSION / HOLD / REDUCTION), flips audience priority if needed, cherry-picks expansions for MVP.

**`/plan-eng-review`** — *Use after CEO review, before any code.* Eng manager-mode review of architecture, DB schema, race conditions, RLS, anti-cheat, test coverage, performance. **Required gate** — must be CLEAR before code starts.

**`/plan-design-review`** — *Use after eng review, before mockups exist.* Designer's eye plan review. Walks information architecture, state coverage, journey, mockup scope, AI-slop guardrails, design system, responsive + a11y.

**`/autoplan`** — *Use when you don't want to answer 15–30 intermediate questions.* Runs all three plan reviews sequentially with auto-decisions using six decision principles. Only stops at borderline taste decisions for your approval.

### Design

**`/design-consultation`** — *Use when starting a new product with no design system yet.* Researches your product landscape, proposes a complete design system (typography, color, layout, motion), generates `DESIGN.md` and font + color preview pages.

**`/design-shotgun`** — *Use when you don't know what a UI should look like and want to explore.* Generates multiple AI design variants, opens a comparison board, collects structured feedback, lets you iterate.

**`/design-review`** — *Use when a UI is built and live, before shipping.* Designer's eye QA on the running site. Catches visual inconsistency, spacing issues, hierarchy, AI-slop patterns, slow interactions. Iteratively fixes and re-verifies with before/after screenshots.

### During build

**`/investigate`** — *Use when something's broken and you don't know why.* Systematic four-phase debugging: investigate → analyze → hypothesize → implement. Iron Law: no fixes without root cause first.

**`/freeze`** — *Use when debugging and you want to stop yourself from accidentally editing unrelated code.* Restricts Edit and Write to a specific directory for the session.

**`/unfreeze`** — *Use to widen edit scope without ending the session.* Clears the freeze boundary; edits allowed everywhere again.

### Pre-merge / QA

**`/review`** — *Use right before merging a PR.* Analyzes diff against the base branch for SQL safety, LLM trust boundary violations, conditional side effects, structural issues.

**`/qa`** — *Use when a feature is ready for testing.* Systematic QA testing of a web app + iterative bug fixing. Each fix committed atomically and re-verified. Produces health scores, fix evidence, ship-readiness summary.

**`/browse`** — *Use when you need to test or dogfood a page programmatically.* Fast headless browser. Navigate URLs, interact with elements, take annotated screenshots, diff before/after, test responsive layouts.

**`/connect-chrome`** — *Use when you want to watch every browser action in real time.* Launches real Chrome controlled by gstack with the side panel extension auto-loaded. Live activity feed.

**`/setup-browser-cookies`** — *Use before QA-testing authenticated pages.* Imports cookies from your real Chromium browser into the headless browse session via an interactive picker UI.
