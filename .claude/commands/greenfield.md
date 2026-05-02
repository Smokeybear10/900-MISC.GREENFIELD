Start a new greenfield project using the framework at `~/Github/Settings/`.

First, read `~/Github/Settings/README.md` and `~/Github/Settings/PLAYBOOK.md` to load the full 9-step workflow into context. Reference `~/Github/Settings/PROMPTS.md` for verbatim example prompts.

Then walk through the steps in order:

1. Run `/office-hours` for the diagnostic. Output lands at `~/.gstack/projects/{slug}/{user}-{branch}-design-{datetime}.md`.
2. Write `DESIGN.md` at the project root, based on the /office-hours output (~250–450 lines).
3. Run `/plan-ceo-review` (scope, audience, ambition).
4. Run `/plan-eng-review` (architecture, schema, anti-cheat, tests, perf).
5. Run `/plan-design-review` (IA, state coverage, journey, mockups).
6. **Reconcile** `DESIGN.md` against the /office-hours doc — don't skip; this catches drift the review chain itself missed.
7. Capture prompts: write `PLAYBOOK.md` + `PROMPTS.md` for THIS new project.
8. Pre-build kill gates: naming, demand validation.
9. Cleanup before first code: inspect dir state, rename folder to product name, lock dev port, single git.

Use the decision-point cheat sheet in `~/Github/Settings/PLAYBOOK.md` for AskUserQuestion defaults. Don't make scope decisions for the user — surface them.

After the project ships, append new lessons to `~/Github/Settings/PLAYBOOK.md` and commit. The Settings repo is a living artifact.
