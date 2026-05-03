export const metadata = {
  title: 'menu — /GREEN',
  description:
    'Curated list of the gstack skills actually used, organized by phase, with when-to-use + what-each-does.',
}

export default function Menu() {
  return (
    <main>
      <h1>menu</h1>
      <p className="lead">
        Curated list of the gstack skills actually worth reaching for —
        organized by phase, with when-to-use and what-each-does. Type{' '}
        <code>/menu</code> in any project to print this in your terminal.
      </p>

      <h2>What it does</h2>
      <p>
        Drops a clean, opinionated index of 16 gstack skills (out of 29) into
        the chat — the ones used regularly. Each entry tells you{' '}
        <em>when</em> to reach for the skill and <em>what</em> it actually
        does in 1–2 sentences.
      </p>
      <p>
        Excluded by default: <code>/careful</code>, <code>/codex</code>,{' '}
        <code>/guard</code>, <code>/qa-only</code>, all Ship + deploy skills,
        all Quality + ops skills. Edit{' '}
        <code>~/Github/Settings/.claude/commands/menu.md</code> to add or
        remove any.
      </p>

      <h2>The 16 skills</h2>

      <h3>Idea + planning</h3>
      <p>
        <strong>
          <code>/office-hours</code>
        </strong>{' '}
        — <em>Use when starting a new idea, before any planning.</em> Walks
        through six forcing questions (demand reality, status quo, desperate
        specificity, narrowest wedge, observation, future-fit). Catches
        premise problems early.
      </p>
      <p>
        <strong>
          <code>/plan-ceo-review</code>
        </strong>{' '}
        — <em>
          Use when you have a draft <code>DESIGN.md</code> and need to
          challenge scope, audience, and ambition.
        </em>{' '}
        Founder-mode review. Picks the right mode (SELECTIVE EXPANSION /
        HOLD / REDUCTION), flips audience priority if needed, cherry-picks
        expansions for MVP.
      </p>
      <p>
        <strong>
          <code>/plan-eng-review</code>
        </strong>{' '}
        — <em>Use after CEO review, before any code.</em> Eng manager-mode
        review of architecture, DB schema, race conditions, RLS, anti-cheat,
        test coverage, performance. <strong>Required gate.</strong>
      </p>
      <p>
        <strong>
          <code>/plan-design-review</code>
        </strong>{' '}
        — <em>Use after eng review, before mockups exist.</em> Designer&apos;s
        eye plan review. Walks IA, state coverage, journey, mockup scope,
        AI-slop guardrails, design system, responsive + a11y.
      </p>
      <p>
        <strong>
          <code>/autoplan</code>
        </strong>{' '}
        — <em>Use when you don&apos;t want to answer 15–30 intermediate
        questions.</em> Runs all three plan reviews sequentially with
        auto-decisions. Only stops at borderline taste decisions.
      </p>

      <h3>Design</h3>
      <p>
        <strong>
          <code>/design-consultation</code>
        </strong>{' '}
        — <em>Use when starting a new product with no design system yet.</em>{' '}
        Researches your product landscape, proposes a complete design system
        (typography, color, layout, motion), generates <code>DESIGN.md</code>{' '}
        and font + color preview pages.
      </p>
      <p>
        <strong>
          <code>/design-shotgun</code>
        </strong>{' '}
        — <em>Use when you don&apos;t know what a UI should look like and
        want to explore.</em> Generates multiple AI design variants, opens a
        comparison board, collects structured feedback.
      </p>
      <p>
        <strong>
          <code>/design-review</code>
        </strong>{' '}
        — <em>Use when a UI is built and live, before shipping.</em>{' '}
        Designer&apos;s eye QA on the running site. Catches visual
        inconsistency, spacing, hierarchy, AI-slop patterns. Iteratively
        fixes and re-verifies with before/after screenshots.
      </p>

      <h3>During build</h3>
      <p>
        <strong>
          <code>/investigate</code>
        </strong>{' '}
        — <em>Use when something&apos;s broken and you don&apos;t know
        why.</em> Systematic four-phase debugging: investigate → analyze →
        hypothesize → implement. Iron Law: no fixes without root cause first.
      </p>
      <p>
        <strong>
          <code>/freeze</code>
        </strong>{' '}
        — <em>Use when debugging and you want to stop yourself from
        accidentally editing unrelated code.</em> Restricts Edit and Write to
        a specific directory for the session.
      </p>
      <p>
        <strong>
          <code>/unfreeze</code>
        </strong>{' '}
        — <em>Use to widen edit scope without ending the session.</em> Clears
        the freeze boundary; edits allowed everywhere again.
      </p>

      <h3>Pre-merge / QA</h3>
      <p>
        <strong>
          <code>/review</code>
        </strong>{' '}
        — <em>Use right before merging a PR.</em> Analyzes diff for SQL
        safety, LLM trust boundary violations, conditional side effects,
        structural issues.
      </p>
      <p>
        <strong>
          <code>/qa</code>
        </strong>{' '}
        — <em>Use when a feature is ready for testing.</em> Systematic QA +
        iterative bug fixing. Each fix committed atomically and re-verified.
        Produces health scores, fix evidence, ship-readiness summary.
      </p>
      <p>
        <strong>
          <code>/browse</code>
        </strong>{' '}
        — <em>Use when you need to test or dogfood a page programmatically.</em>{' '}
        Fast headless browser. Navigate, interact, screenshot, diff
        before/after, test responsive layouts.
      </p>
      <p>
        <strong>
          <code>/connect-chrome</code>
        </strong>{' '}
        — <em>Use when you want to watch every browser action in real time.</em>{' '}
        Launches real Chrome controlled by gstack with the side panel
        extension auto-loaded.
      </p>
      <p>
        <strong>
          <code>/setup-browser-cookies</code>
        </strong>{' '}
        — <em>Use before QA-testing authenticated pages.</em> Imports cookies
        from your real Chromium browser into the headless session via an
        interactive picker.
      </p>

      <h2>Use it</h2>
      <pre>
        <code>/menu</code>
      </pre>
      <p className="muted">
        Works in any project. To customize the list, edit{' '}
        <code>~/Github/Settings/.claude/commands/menu.md</code> and re-run{' '}
        <code>./install.sh</code>. The full 29-skill gstack catalog is on the{' '}
        <a href="/rules">rules</a> page.
      </p>
    </main>
  )
}
