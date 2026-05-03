export const metadata = {
  title: 'greenfield — /GREEN',
  description:
    '9-step bootstrap workflow for new projects. Idea to shippable v1 spec.',
}

export default function Greenfield() {
  return (
    <main>
      <h1>greenfield</h1>
      <p className="lead">
        Bootstrap a new project with structured planning. Idea → diagnostic →
        plan → reviewed → reconciled → scaffolded.
      </p>

      <h2>What it does</h2>
      <p>
        Walks through 7 steps that take a project from "vague idea" to
        "shippable v1 spec + clean repo, ready to build." Combines four
        gstack skills (<code>/office-hours</code>,{' '}
        <code>/plan-ceo-review</code>, <code>/plan-eng-review</code>,{' '}
        <code>/plan-design-review</code>) with a reconciliation step that
        catches drift between the planning chain and the original premise.
      </p>

      <h2>When to use it</h2>
      <p>
        Run in a fresh project directory <em>before</em> you write any code.
        It exists because the most common project failure isn&apos;t bad
        implementation — it&apos;s building the wrong thing because the
        premise wasn&apos;t challenged early.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>Claude Code installed</li>
        <li>
          <strong>gstack</strong> installed (provides the underlying review
          skills)
        </li>
        <li>
          An empty project directory under <code>~/Github/&lt;name&gt;</code>
          {' '}— name it tentatively, you&apos;ll rename later
        </li>
      </ul>

      <h2>Setup (one-time)</h2>
      <pre>
        <code>{`git clone <repo-url> ~/Github/Settings
cd ~/Github/Settings && ./install.sh`}</code>
      </pre>
      <p className="muted">
        Symlinks <code>/greenfield</code> into{' '}
        <code>~/.claude/commands/</code>. Idempotent — re-run anytime.
      </p>

      <h2>Quickstart</h2>
      <pre>
        <code>{`mkdir ~/Github/<tentative-name>
cd ~/Github/<tentative-name>
# in Claude Code:
/greenfield`}</code>
      </pre>
      <p>
        That kicks off the 9-step chain. Each step is detailed below — they
        compound, so do them in order.
      </p>

      <h2>The 7 steps</h2>

      <h3>Step 0 (optional): max effort</h3>
      <pre>
        <code>/effort</code>
      </pre>
      <p>
        Per-session toggle. Use at the start of any high-stakes planning
        session — bumps Claude to highest reasoning effort.
      </p>

      <h3>Step 1: diagnostic</h3>
      <pre>
        <code>/office-hours</code>
      </pre>
      <p>
        Walks through six forcing questions: demand reality, status quo,
        desperate specificity, narrowest wedge, observation, future-fit.
      </p>
      <p>
        <strong>Output:</strong>{' '}
        <code>~/.gstack/projects/&lt;slug&gt;/&lt;user&gt;-&lt;branch&gt;-design-&lt;datetime&gt;.md</code>
        {' '}— the diagnostic doc that becomes your source of truth for the
        next steps.
      </p>

      <h3>Step 2: write DESIGN.md</h3>
      <p>Prompt to type:</p>
      <pre>
        <code>{`make a design doc based on the /office-hours output at
~/.gstack/projects/<slug>/...-design-...md

[paste your full thesis as one block]`}</code>
      </pre>
      <p>The thesis should cover:</p>
      <ul>
        <li>One-line product statement</li>
        <li>Why it exists / the gap</li>
        <li>Audience (in priority order)</li>
        <li>Core primitives / data model</li>
        <li>Game loops (round / daily / long-term, if relevant)</li>
        <li>Modes</li>
        <li>Voice on gamification (what you use vs avoid)</li>
        <li>Technical shape (high-level)</li>
        <li>MVP cut</li>
      </ul>
      <p>
        <strong>Output:</strong> <code>DESIGN.md</code> at the project root,
        target ~250–450 lines.
      </p>

      <h3>Step 3: CEO review</h3>
      <pre>
        <code>/plan-ceo-review</code>
      </pre>
      <p>Walks through scope, audience, ambition. Decisions you&apos;ll make:</p>
      <ul>
        <li>
          <strong>Mode selection</strong> — default SELECTIVE EXPANSION for
          greenfield
        </li>
        <li>
          <strong>Audience priority</strong> — flip to broader audience first
          if specified niche is saturated
        </li>
        <li>
          <strong>Cherry-pick expansions</strong> — one AskUserQuestion per
          expansion; default is "add to MVP only if marginal cost is hours
          (not days) AND load-bearing for the wedge"
        </li>
      </ul>
      <p>
        At the end Claude offers the next review — pick "Run /plan-eng-review
        now."
      </p>

      <h3>Step 4: eng review</h3>
      <pre>
        <code>Run /plan-eng-review now</code>
      </pre>
      <p>
        Walks through architecture, DB schema, indexes, race conditions, RLS,
        anti-cheat, code quality, test coverage diagram, performance.{' '}
        <strong>Required gate</strong> — must be CLEAR before code starts.
      </p>
      <p>
        Decisions: implementation alternatives (default: pick the boring
        Layer-1 approach unless you have a real reason to spend an innovation
        token), scope reduction if complexity check triggers (default: snap
        back to /office-hours scope).
      </p>
      <p>At the end, pick "Run /plan-design-review now."</p>

      <h3>Step 5: design review</h3>
      <pre>
        <code>Run /plan-design-review now</code>
      </pre>
      <p>
        Walks through information architecture, state coverage, journey,
        mockups, AI-slop guardrails, design system, responsive + a11y.
      </p>
      <p>
        Decision: mockup scope — default is "the 1–2 screens that ARE the
        wedge moment; spec the rest inline."
      </p>

      <h3>Step 6: reconcile (don&apos;t skip)</h3>
      <p>
        The most-skipped step and the most load-bearing. The 3-review chain
        drifts from the original premise; reconcile catches what was lost.
      </p>
      <p>Prompt:</p>
      <pre>
        <code>{`Compare DESIGN.md against the /office-hours doc at
~/.gstack/projects/<slug>/...-design-...md.
Surface anything in /office-hours that's missing from DESIGN.md.`}</code>
      </pre>
      <p>Then:</p>
      <pre>
        <code>Fold all [N] items into DESIGN.md</code>
      </pre>

      <h3>Step 7: cleanup before scaffolding</h3>
      <pre>
        <code>get started with scaffolding</code>
      </pre>
      <p>
        <strong>Critical:</strong> Claude inspects the dir state FIRST. If a
        scaffold already exists (you may have run{' '}
        <code>create-next-app</code> last night and forgot), it halts and
        presents cleanup options:
      </p>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>What it does</th>
            <th>When to pick</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A</td>
            <td>Keep parent repo, delete nested .git</td>
            <td>Two-tier structure (planning at root, code in subdir). Cheap but awkward.</td>
          </tr>
          <tr>
            <td>B</td>
            <td>Move code up, keep parent dir name</td>
            <td>Single flat repo, but folder name doesn&apos;t match product name.</td>
          </tr>
          <tr>
            <td>
              <strong>C</strong>
            </td>
            <td>
              <strong>
                Rename folder to product name, move scaffold up, single git
              </strong>
            </td>
            <td>
              <strong>Cleanest end state. Default pick.</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Output files</h2>
      <p>After the full workflow runs, these exist:</p>
      <table>
        <thead>
          <tr>
            <th>Path</th>
            <th>What it is</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>~/.gstack/projects/&lt;slug&gt;/&lt;...&gt;-design-&lt;...&gt;.md</code>
            </td>
            <td>Office-hours diagnostic</td>
          </tr>
          <tr>
            <td>
              <code>{`<repo>/DESIGN.md`}</code>
            </td>
            <td>Implementable v1 spec</td>
          </tr>
          <tr>
            <td>
              <code>~/.gstack/projects/&lt;slug&gt;/ceo-plans/&lt;...&gt;.md</code>
            </td>
            <td>CEO scope decisions</td>
          </tr>
          <tr>
            <td>
              <code>~/.gstack/projects/&lt;slug&gt;/&lt;...&gt;-eng-review-test-plan-&lt;...&gt;.md</code>
            </td>
            <td>
              Test plan for <code>/qa</code> to consume later
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Decision defaults</h2>
      <table>
        <thead>
          <tr>
            <th>Skill</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>/plan-ceo-review</code> mode
            </td>
            <td>
              SELECTIVE EXPANSION (greenfield), HOLD (refactors), REDUCTION
              (&gt;15-file plans)
            </td>
          </tr>
          <tr>
            <td>
              <code>/plan-ceo-review</code> audience
            </td>
            <td>Broader first if niche is saturated</td>
          </tr>
          <tr>
            <td>
              <code>/plan-ceo-review</code> cherry-picks
            </td>
            <td>Hours not days, load-bearing only</td>
          </tr>
          <tr>
            <td>
              <code>/plan-eng-review</code> scope reduction
            </td>
            <td>Snap back to /office-hours</td>
          </tr>
          <tr>
            <td>
              <code>/plan-eng-review</code> alternatives
            </td>
            <td>Boring approach unless there&apos;s a real reason</td>
          </tr>
          <tr>
            <td>
              <code>/plan-design-review</code> mockups
            </td>
            <td>Wedge screens only</td>
          </tr>
        </tbody>
      </table>

      <h2>Gotchas</h2>
      <ul>
        <li>
          <strong>Always run /office-hours first.</strong> Skipping it means
          the review chain has nothing to reconcile against, and premise
          problems sneak through.
        </li>
        <li>
          <strong>Reconcile (step 6) is the easiest to forget.</strong> The
          3-review chain drifts; reconcile catches what was lost.
        </li>
        <li>
          <strong>
            <code>ls -la</code> before scaffolding.
          </strong>{' '}
          A scaffold may already exist from a previous session. Don&apos;t
          blindly run <code>create-next-app</code> over existing files.
        </li>
        <li>
          <strong>Rename folder to product name before the first commit.</strong>{' '}
          Cheap now, expensive in 3 months when grep results don&apos;t match
          the codebase name.
        </li>
        <li>
          <strong>Lock the dev port at scaffold time.</strong> Avoids OAuth
          callback drift across config files.
        </li>
        <li>
          <strong>Watch for deny-rule snags.</strong> If your global settings
          have <code>Bash(rm -rf *)</code> denied, cleanup fails. Workaround:{' '}
          <code>mv .git /tmp/old-git-$(date +%s)</code> instead — same effect,
          doesn&apos;t trigger the deny.
        </li>
      </ul>

      <h2>What to do after</h2>
      <ul>
        <li>
          Lane 2 (drill engine / pure logic / business logic) is usually the
          first lane to write — no backend dependency.
        </li>
        <li>
          Lanes 1 (schema) and 4 (API routes) come after backend is
          provisioned.
        </li>
        <li>
          Update your project&apos;s <code>PLAYBOOK.md</code> with new lessons
          as you go.
        </li>
        <li>
          Cross-project lessons → append to{' '}
          <code>~/Github/Settings/PLAYBOOK.md</code> and commit.
        </li>
      </ul>

      <h2>Use it</h2>
      <pre>
        <code>/greenfield</code>
      </pre>
      <p className="muted">
        In any new project directory. The skill walks you through each step
        with prompts at the right moments.
      </p>
    </main>
  )
}
