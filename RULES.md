## About me
- GitHub: Smokeybear10
- LinkedIn: https://www.linkedin.com/in/thomasou0/
- Website: thomasou.com
- Fullstack engineer — TypeScript, React, Next.js, Python, FastAPI
- Building: D4NCE (DJ app), V3RSUS (competitive app), HarborOS (maritime defense), and other projects
- Prefer shipping fast over perfect abstractions

## Defaults
- Maximum effort, highest quality output
- Think deeply before acting — reason through architecture, edge cases, and tradeoffs
- When in doubt, do the thorough thing
- Read existing code before modifying it — understand context first

## Communication
- Be concise. No preamble, no trailing summaries
- Don't explain what you're about to do — just do it
- Don't restate what I said. Don't narrate tool calls
- Only ask clarifying questions when genuinely ambiguous
- Don't over-explain — I can read diffs

## Code style
- Simple, readable code over clever code
- Modern idioms (optional chaining, nullish coalescing, const over let)
- No unnecessary comments, docstrings, or type annotations on obvious code
- No error handling for impossible cases
- No speculative abstractions — build what's needed now
- Prefer early returns over nested conditionals
- Use array methods over manual loops where readable

### TypeScript
- Strict mode when tsconfig supports it
- No `any` — use `unknown` if type is truly unknown
- Prefer `type` over `interface` for data shapes
- Use Zod or similar for validation at trust boundaries (API inputs, env vars)

### Python
- Type hints on function signatures, not obvious locals
- Use Pydantic models for API request/response schemas
- f-strings over .format() or concatenation
- Use `pathlib` over `os.path`

### React / Next.js
- Functional components only
- Prefer server components where possible (Next.js App Router)
- Colocate related files — don't scatter across distant directories
- Use `cn()` or `clsx()` for conditional classNames
- Tailwind for styling unless the project uses something else

## Git
- Never add Co-Authored-By lines to commit messages
- Keep commit messages short, lowercase, imperative mood, <72 chars
- No conventional commit prefixes (no `fix:`, `feat:`, `chore:`)
- Group related changes — don't split trivially-related work
- One logical change per commit; if the message needs bullets, split the commit instead
- Don't commit unless I ask
- Never push unless I explicitly say to push
- Never force push

**Good commit messages:**
```
fix waveform visualizer and add smart cue points
add permanent tracks and fix upload persistence
improve AI transition prompts and add cancel button
few bug fixes
new colors
cleaned up code and improved structure
```

**Bad commit messages:**
```
Updated the README file
Fix: resolved issue with button not working
WIP - trying stuff
Enhance website mobile responsiveness and navigation - Fix horizontal overflow...
```

## README style

**Voice:** Direct and confident. Lead with what the thing does. No marketing language, no "Welcome to...", no "This project aims to..."

Good:
```
# D4NCE | LLM-Driven DJ

A browser-based DJ system powered by Grok AI. Talk to it, give it commands, and let it handle the mix.
```

Bad:
```
# MyProject 🚀

Welcome! This is an amazing tool designed to revolutionize how you...
```

**Format:**
- No emojis in headers or body
- No badge shields
- No "Made with love" footers
- No Contributing/Roadmap sections unless actually open-source with contributors
- Use `---` horizontal rules sparingly, only between major conceptual breaks
- Shorter is better — don't pad

**Structure** (skip sections that don't apply):
```
# Project Name | Subtitle

**Live demo: [link](url)**    (if deployed, always include right after the title)

One-liner description.

## Quick Start
## What It Does
## Tech Stack          (pipe table: Layer | Tools)
## Project Structure   (code tree, important files only)
## [Domain-Specific]

---

Built by Thomas Ou
```

**Section guidelines:**
- **Title + one-liner**: project name, optional `|` subtitle for context. One-liner is one sentence — no period if it reads like a tagline, period if it's a full sentence. Add a short backstory paragraph after only if there's real motivation worth conveying.
- **Quick Start**: exact commands to install, configure, run. Fenced blocks with the shell language specified. Show `.env` format inline if env vars are needed. End with `Open http://localhost:XXXX` for web apps.
- **What It Does**: bold sub-headers per feature group, short bullets under each. For technical/research projects, use prose paragraphs instead.
- **Tech Stack**: pipe table with `Layer | Tools` columns, one line per layer.
- **Project Structure**: fenced code tree, important files only, brief `#` comments on non-obvious entries.
- **Images/GIFs**: only for visual projects (CV, games, UI). Place near the top or in the relevant section. Don't use to fill space.
- **References/citations**: only for research-heavy projects. Numbered footnotes in text, list at bottom.

**Live links:** If the project has a deployed URL, always include it as a bold line directly under the title, before the description. Don't bury it in the body.

**Don't include:**
- Emoji-heavy headers (`## ✨ Features`, `### 🤖 AI-Powered Analysis`)
- Generic Contributing sections copy-pasted from templates
- Deployment instructions for platforms you're not actually using
- Support/contact sections
- Roadmap checklists unless actively maintained
- Redundant sections (don't explain how to run the project in three different places)
- "Course Information" or "Homework Description" links (mention naturally if relevant)

## Don'ts
- Don't create README or docs files unless asked
- Don't refactor code beyond what was asked
- Don't add features I didn't request
- Don't suggest things I didn't ask for
- Don't add tests unless asked or the project already has a test suite
- Don't wrap things in try/catch unless there's a real failure mode to handle
- Don't create utility files for one-off operations

## Browser automation
Prefer `agent-browser` for web automation. Fall back to `WebFetch` or `curl` if unavailable.

Workflow: `open <url>` → `snapshot -i` → interact with refs (`@e1`, `@e2`) → re-snapshot after changes.

## Skills

The full gstack suite is installed plus five personal commands. Claude should invoke proactively when a task maps — don't ask first.

### Personal (/GREEN)
| Situation | Skill |
|-----------|-------|
| Bootstrap a brand new project | `/greenfield` |
| Turn a rough prompt into a polished one | `/prompt-engineer` |
| Show the curated list of skills I actually use | `/menu` |
| Tutor me through a concept, file, or library | `/teach` |
| Final ship-readiness audit (9-gate sweep) | `/audit` |

### Idea + planning
| Situation | Skill |
|-----------|-------|
| Starting a new feature idea | `/office-hours` |
| Plan-stage CEO review (scope, audience, ambition) | `/plan-ceo-review` |
| Plan-stage eng review (architecture, tests, perf) | `/plan-eng-review` |
| Plan-stage design review (IA, state coverage, mockups) | `/plan-design-review` |
| Run all three plan reviews automatically | `/autoplan` |

### Design
| Situation | Skill |
|-----------|-------|
| Design system or aesthetics for a new project | `/design-consultation` |
| Explore visual design variants | `/design-shotgun` |
| Visual QA + polish on a live site | `/design-review` |

### During build
| Situation | Skill |
|-----------|-------|
| Debugging a hard bug (root cause) | `/investigate` |
| Independent second opinion (OpenAI Codex CLI) | `/codex` |
| Block destructive commands | `/careful` |
| Lock edits to one directory | `/freeze` |
| Both freeze + careful (max safety) | `/guard` |
| Unlock edits | `/unfreeze` |

### Pre-merge / QA
| Situation | Skill |
|-----------|-------|
| Pre-landing PR review | `/review` |
| QA testing with real browser (test + fix loop) | `/qa` |
| QA report without fixes | `/qa-only` |
| Headless browser navigation | `/browse` |
| Real Chrome with live side panel | `/connect-chrome` |
| Import browser cookies for authenticated tests | `/setup-browser-cookies` |

### Ship + deploy
| Situation | Skill |
|-----------|-------|
| Ship a PR (tests + review + push + PR create) | `/ship` |
| Merge PR + wait for CI + verify production | `/land-and-deploy` |
| Configure deploy platform (one-time setup) | `/setup-deploy` |
| Post-deploy canary monitoring | `/canary` |

### Quality + ops
| Situation | Skill |
|-----------|-------|
| Performance benchmarking | `/benchmark` |
| Security audit (OWASP, secrets, supply chain) | `/cso` |
| Post-ship docs update (README, CHANGELOG, etc.) | `/document-release` |
| Weekly engineering retro | `/retro` |
| Upgrade gstack itself | `/gstack-upgrade` |
