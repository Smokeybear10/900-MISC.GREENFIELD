---
name: audit
version: 0.2.0
description: |
  Final ship-readiness audit. Runs up to 10 quality gates sequentially —
  /health, /qa, end-to-end dogfood walk, /cso, inline web-quality checks
  (perf / a11y / SEO / best-practices), /benchmark, /review, /codex,
  /design-review, /document-release — and produces a pass/fail summary
  with a ship verdict. Halts on critical-gate failures (broken tests,
  broken QA, structural review issues). Three tiers: quick (~5 min),
  standard (~25 min, default), full (~50 min). Use when finishing a
  project, asked to "is this ready to ship", "final pass", "ready check",
  "preflight check", "ship audit", "audit before ship", or /audit.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
  - Skill
---

> **Note:** `/web-quality-audit` can be deleted from `~/.claude/skills/` once this version works — its logic is now inlined as gate 5.

You are running a ship-readiness audit. Run the configured gates in order, halting on critical-gate failures. At the end, produce a ship-readiness summary with a verdict.

## Step 0 — Pick a tier

If `$ARGUMENTS` contains `quick`, `standard`, or `full`, use that and skip the question. Otherwise AskUserQuestion:

- **Quick (~5 min)** — gates 1, 2, 3, 7 (health, qa, dogfood, review). Catches dealbreakers and broken user flows.
- **Standard (recommended, ~25 min)** — gates 1–8. Adds security, web quality, perf regression, second opinion.
- **Full (~50 min)** — all 10 gates. Adds visual polish + docs sync.

If `$ARGUMENTS` contains `--no-halt`, run all configured gates regardless of failures (useful for "give me the full report even if something's broken").

## Gates

| # | Gate | Tier | Halt on fail? |
|---|---|---|---|
| 1 | `/health` | All | **YES** — broken types/tests = no ship |
| 2 | `/qa` | All | **YES** — broken UX = no ship |
| 3 | Dogfood — end-to-end user flow | All | No — advisory; broken flow downgrades verdict |
| 4 | `/cso` (daily mode) | Standard, Full | No — advisory |
| 5 | Web quality (inline: perf / a11y / SEO / best-practices) | Standard, Full | No — advisory |
| 6 | `/benchmark` | Standard, Full | No — advisory; first run establishes baseline |
| 7 | `/review` | All | **YES** — structural issues = no ship |
| 8 | `/codex review` | Standard, Full | No — advisory |
| 9 | `/design-review` | Full | No — cosmetic, only if UI exists |
| 10 | `/document-release` | Full | No — last step |

## Execution

Pre-flight: check the project shape with `ls -la` and `find . -maxdepth 3 -name "package.json" -o -name "pyproject.toml" -o -name "go.mod"`. Detect:
- **Dev port** from `package.json` `"dev"` script (default 3000 if absent)
- **UI presence** — look for `app/` (Next.js App Router), `pages/` (Next.js Pages Router), `src/components/`, `public/index.html`. Used to decide if gates 3, 5, 6, 9 run

For each configured gate, in order:

1. Invoke with sensible defaults:
   - **Gate 3 dogfood** → run inline (see "Dogfood gate" below)
   - **Gate 4 `/cso`** → daily mode unless the user asked for comprehensive
   - **Gate 5 web quality** → run inline (see "Web quality gate" below)
   - **Gate 6 `/benchmark`** → if no baseline exists, establish one and report absolute numbers; if baseline exists, compare and flag regressions. Skip with note "skipped — no UI detected" if pre-flight didn't find one
   - **Gate 8 `/codex`** → `codex review` mode (independent diff review with pass/fail gate)
   - **Gate 2 `/qa`** → standard tier unless the user said quick or exhaustive
   - **Gate 9 `/design-review`** → skip with note "skipped — no UI detected" if pre-flight didn't find one
2. Capture the gate's verdict and any findings.
3. If it's a halt-on-fail gate (1, 2, 7) and it failed (and `--no-halt` wasn't passed), jump to **Halt and report**.
4. Otherwise append findings to the running list and continue.

## Dogfood gate (gate 3)

Walk the app end-to-end as a real user would. `/qa` tests features in isolation; this catches breaks in the actual user journey.

**Skip condition:** if pre-flight found no UI, log "skipped — no UI detected" and move on.

**Steps:**
1. Open `localhost:{dev-port}` via the `/browse` skill
2. Identify the primary user flow by inspecting routes:
   - Next.js App Router → walk `app/` directory; the index `page.tsx` is the landing surface
   - Next.js Pages Router → walk `pages/`; `index.{js,tsx}` is the landing
   - Other → use the project's `README.md` or `CLAUDE.md` if either describes the flow
3. Walk the happy path top-to-bottom: **homepage → primary CTA → auth (if it exists) → main feature**
4. At each step: take a screenshot, note any friction (broken links, missing assets, weird empty states, layout breaks, console errors, slow transitions)

**Verdict:**
- All steps complete cleanly → Pass
- Friction present but flow completes → ⚠️ N findings (downgrades summary verdict to SHIP WITH CAVEATS)
- Flow breaks before completing → Fail (advisory, doesn't halt — `/qa` already halts on hard breaks)

## Web quality gate (gate 5)

Inline web-quality audit covering Performance, Accessibility, SEO, and Best Practices. Based on Google Lighthouse criteria, ~150 checks across the four categories. Skip with "skipped — no UI detected" if pre-flight found no UI.

Tools to use: Lighthouse via `/browse` (perf metrics, a11y, SEO, best-practices), `curl -I` (security headers, HTTPS, charset), DOM inspection via `/browse` (alt text, ARIA, heading hierarchy, structured data).

### Performance (~40% of typical issues)

**Core Web Vitals — must pass:**
- **LCP < 2.5s** — largest visible element renders fast. Check image/font/server response time
- **INP < 200ms** — interactions feel instant. Reduce JS execution time, break up long tasks
- **CLS < 0.1** — no layout shifts. Set explicit dimensions on images, embeds, ads

**Resource optimization:**
- Images: WebP/AVIF with fallbacks, correctly-sized via `srcset`
- JavaScript: minimized, unused code removed, code-split, non-critical deferred
- CSS: critical CSS extracted, unused removed, no `@import`
- Fonts: `font-display: swap`, critical preloaded, subset

**Loading strategy:**
- `<link rel="preconnect">` for third-party domains
- Preload critical assets (LCP image, fonts, above-fold CSS)
- Lazy-load below-fold (images, iframes, heavy components)
- Long cache TTLs for static assets, immutable for hashed files

### Accessibility (~30% of typical issues)

**Perceivable:**
- Every `<img>` has meaningful `alt` (decorative uses `alt=""`)
- Color contrast ≥ 4.5:1 normal text, ≥ 3:1 large text (WCAG AA)
- Don't rely on color alone — use icons/patterns/text alongside
- Video has captions, audio has transcripts

**Operable:**
- All functionality keyboard-accessible, no keyboard traps
- Visible focus indicators on interactive elements
- "Skip to main content" link
- No auto-advancing content without user controls

**Understandable:**
- `lang` attribute on `<html>`
- Consistent navigation across pages
- Form errors clearly described and associated with fields
- All form inputs have associated labels

**Robust:**
- Valid HTML — no duplicate IDs, proper nesting
- ARIA used correctly — prefer native elements, roles match behavior
- Interactive elements have accessible names + correct roles

### SEO (~15% of typical issues)

**Crawlability:**
- Valid `robots.txt` (doesn't block important resources)
- XML sitemap with all important pages
- Canonical URLs set
- No `noindex` on important pages (check meta and headers)

**On-page:**
- Unique `<title>` 50–60 chars with primary keyword
- Meta description 150–160 chars, compelling and unique
- Single `<h1>`, logical heading hierarchy
- Descriptive link text (not "click here" / "read more")

**Technical:**
- Mobile-friendly responsive design, tap targets ≥ 48px
- HTTPS only
- Page-load performance (perf gate above feeds this)
- Structured data via JSON-LD where relevant (Article, Product, FAQ, etc.)

### Best practices (~15% of typical issues)

**Security:**
- HTTPS everywhere, no mixed content, HSTS enabled
- No vulnerable libraries (deps up to date)
- CSP headers (Content Security Policy)
- No exposed source maps in production

**Modern standards:**
- No deprecated APIs (`document.write`, sync XHR, etc.)
- `<!DOCTYPE html>` declared
- `<meta charset="UTF-8">` as first element in `<head>`
- Clean console — no errors, no CORS issues

**UX patterns:**
- No intrusive interstitials (especially mobile)
- Permission requests only when needed, with context
- Buttons do what they say (no misleading labels)

### Severity classification

| Level | Description | Action |
|---|---|---|
| **Critical** | Security vulnerabilities, complete failures | Fix immediately |
| **High** | Core Web Vitals failures, major a11y barriers | Fix before launch |
| **Medium** | Performance opportunities, SEO improvements | Fix within sprint |
| **Low** | Minor optimizations, code quality | Fix when convenient |

### Output format for this gate

```
**Web quality findings:**
- Critical (N): {issue} ({category}) — file:line
- High (N): {issue} ({category}) — file:line
- Medium (N): {issue} ({category})
- Low (N): {issue} ({category})

By category:
- Performance: N issues (M critical/high)
- Accessibility: N issues (M critical/high)
- SEO: N issues
- Best Practices: N issues
```

Roll up to a single line for the summary table: `⚠️ N findings (X critical, Y high)`.

## Halt and report

When a halt-on-fail gate (1, 2, or 7) fails:

1. Show the failing gate's output (or summary if very long).
2. Say:
   > **Ship blocked at gate {N}: {gate name}.**
   > Fix the issues above, then re-run `/audit`.
3. Do NOT continue to remaining gates.

## Ship-readiness summary

After all configured gates run (or after halt), produce a single block:

```
## Ship readiness — {tier} pass

| Gate | Status | Findings |
|---|---|---|
| 1. /health | ✅ Pass / ⚠️ {N} / ❌ Fail | {one-line summary} |
| 2. /qa | ... | ... |
| 3. Dogfood | ... or "skipped — no UI" | {steps walked, friction count} |
| 4. /cso | ... | ... |
| 5. Web quality | ... or "skipped — no UI" | {N findings, X critical} |
| 6. /benchmark | ... or "baseline established" / "skipped — no UI" | ... |
| 7. /review | ... | ... |
| 8. /codex review | ... | ... |
| 9. /design-review | ... or "skipped — no UI" | ... |
| 10. /document-release | ... | ... |

### Verdict
**{SHIP / SHIP WITH CAVEATS / DON'T SHIP}**

### Blockers ({N})
- {gate}: {issue}

### Advisory findings ({N})
- {gate} ({severity}): {issue}

### Suggested next step
{one specific action — e.g. "fix the 2 a11y issues from gate 5" or "run /ship"}
```

**Verdict logic:**
- **SHIP** — all configured gates pass, no advisory findings rated medium or higher
- **SHIP WITH CAVEATS** — all halt-on-fail gates pass, but advisory findings exist
- **DON'T SHIP** — any halt-on-fail gate (1, 2, 7) failed (chain halted earlier; this is the fallback path when `--no-halt` is set)

## Hard rules

- **Don't skip a gate silently.** If a gate isn't applicable (e.g., gates 3, 5, 6, 9 on a backend-only repo), explicitly note "skipped — no UI" in the summary table.
- **Don't auto-fix advisory findings during /audit.** The user decides what to act on. The exception is `/qa`, which has its own fix-and-commit loop by design.
- **Respect halt-on-fail unless `--no-halt`.** Halt fast when the foundation is broken — running advisory gates on a typecheck failure wastes time.
- **Run gates in the listed order.** Later gates depend on earlier gates passing (e.g., no point running `/codex review` if the diff is broken).
- **Don't commit anything yourself.** `/qa` and `/document-release` may commit per their own rules; nothing else should write to git.

User input:

$ARGUMENTS
