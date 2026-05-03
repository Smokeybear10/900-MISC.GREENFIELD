# /GREEN

Project bootstrap workflow for Claude Code.

## Install

```bash
git clone <repo> ~/Github/Settings
cd ~/Github/Settings && ./install.sh
```

Adds `/greenfield` to `~/.claude/commands/` and a pointer to `~/.claude/CLAUDE.md`. Idempotent.

Requires gstack.

## Workflow

Type `/greenfield` in a new project.

1. `/office-hours`
2. Write `DESIGN.md` from the office-hours output (250–450 lines)
3. `/plan-ceo-review`
4. `/plan-eng-review`
5. `/plan-design-review`
6. Reconcile `DESIGN.md` against the office-hours doc
7. Cleanup: inspect dir, rename folder, lock dev port

## Prompts

```
/effort

/office-hours
# output: ~/.gstack/projects/{slug}/*.md

# design doc
make a design doc based on the /office-hours output at <path>
[paste thesis: one-liner, gap, audience, primitives, modes, voice, MVP]

# reviews
/plan-ceo-review
Run /plan-eng-review now
Run /plan-design-review now

# reconcile
Compare DESIGN.md against the /office-hours doc. Surface anything missing.
Fold all [N] items into DESIGN.md

# pre-build
what gstack stuff should i use now
Name tentatively is X. friends already in.
localhost only, port {port}

# scaffold
get started with scaffolding
```

When scaffolding, Claude inspects the directory first. If a scaffold already exists, pick option C (rename folder to product name, move contents up, single git).

## Reusable prompts

Idea validation and planning stress-test prompts (role-prompt format) live in [`PROMPTS.md`](./PROMPTS.md).

## Decision defaults

| Skill | Default |
|-------|---------|
| `/plan-ceo-review` mode | SELECTIVE EXPANSION (greenfield), HOLD (refactors), REDUCTION (>15-file plans) |
| `/plan-ceo-review` audience | Broader first if niche is saturated |
| `/plan-ceo-review` cherry-picks | Hours not days, load-bearing only |
| `/plan-eng-review` scope reduction | Snap back to /office-hours |
| `/plan-eng-review` alternatives | Boring approach unless there's a real reason |
| `/plan-design-review` mockups | Wedge screens only |

## Gotchas

- Run `/office-hours` before any review skill.
- Reconcile (step 6) is easy to forget; the review chain drifts.
- `ls -la` before scaffolding (a scaffold might already exist).
- Rename folder to product name before the first commit.
- Lock the dev port at scaffold time.

## Files

- `README.md` — this file
- `PLAYBOOK.md` — lessons, anti-patterns
- `PROMPTS.md` — verbatim prompts from a real session
