export const metadata = {
  title: 'prompt-engineer — /GREEN',
  description:
    'Turn rough prompts into polished Claude Code prompts grounded in your repo.',
}

export default function PromptEngineer() {
  return (
    <main>
      <h1>prompt-engineer</h1>
      <p className="lead">
        Turn rough prompts into polished Claude Code prompts, grounded in your
        repo&apos;s actual files.
      </p>

      <h2>What it does</h2>
      <p>
        Takes a rough description of what you want to build or fix, then runs
        a three-step process: first <strong>inspects the repo</strong> (file
        listing, git state, dependencies, mentioned files), then{' '}
        <strong>clarifies anything ambiguous</strong> by asking up to four
        targeted questions via <code>AskUserQuestion</code>, then{' '}
        <strong>synthesizes a polished prompt</strong> using verified paths,
        real stack context, and your answers.
      </p>
      <p>
        Smart-skips questions you already answered in your input. Specific
        prompts go straight through; vague ones get a short Q&amp;A first.
      </p>

      <h2>When to use it</h2>
      <ul>
        <li>
          You have a rough idea ("fix the login form") but don&apos;t want to
          type out the full ceremony every time.
        </li>
        <li>
          You want Claude to inspect the right files <em>before</em> acting,
          not invent paths from training data.
        </li>
        <li>
          You want explicit constraints baked in — no broad refactors, no
          overwriting your changes, run lints, verify in browser.
        </li>
      </ul>

      <h2>When NOT to use it</h2>
      <ul>
        <li>The task is trivial (one-line edit, rename a variable).</li>
        <li>You already have a complete, well-formed prompt.</li>
        <li>
          You&apos;re in exploration/brainstorm mode — use{' '}
          <code>/office-hours</code> instead.
        </li>
      </ul>

      <h2>Prerequisites</h2>
      <ul>
        <li>Claude Code installed</li>
        <li>
          The /GREEN install (symlinks <code>/prompt-engineer</code> into{' '}
          <code>~/.claude/commands/</code>)
        </li>
      </ul>

      <h2>Setup (one-time)</h2>
      <pre>
        <code>{`git clone <repo-url> ~/Github/Settings
cd ~/Github/Settings && ./install.sh`}</code>
      </pre>

      <h2>How it works (step by step)</h2>

      <h3>Step 1 — inspect the repo</h3>
      <p>Runs in parallel:</p>
      <ul>
        <li>
          <code>pwd</code> and <code>ls -la</code> — current dir state
        </li>
        <li>
          <code>git status</code> — uncommitted changes that matter
        </li>
        <li>
          <code>git log --oneline -10</code> — recent direction
        </li>
        <li>Reads any files you name explicitly</li>
        <li>
          Runs <code>find</code> / <code>grep</code> if you describe a feature
          without naming files — never guesses paths
        </li>
        <li>
          Reads <code>package.json</code>, <code>pyproject.toml</code>, or
          equivalent — learns the stack, scripts, lint/test commands
        </li>
        <li>
          Skims any <code>CLAUDE.md</code> or <code>README.md</code> for
          project conventions
        </li>
      </ul>
      <p>
        If you mention an error, the skill treats it as ground truth — does
        not try to reproduce or debug.
      </p>

      <h3>Step 1.5 — clarify before synthesizing</h3>
      <p>
        After inspection, identifies what&apos;s genuinely ambiguous and asks
        up to <strong>four questions in a single <code>AskUserQuestion</code>
        call</strong>. Common gaps:
      </p>
      <ul>
        <li>
          <strong>Goal type</strong> — bug fix / new feature / refactor /
          investigation only
        </li>
        <li>
          <strong>Scope</strong> — single function / single file / module /
          cross-cutting
        </li>
        <li>
          <strong>Behavior preservation</strong> — must preserve X? free to
          change Y?
        </li>
        <li>
          <strong>Output rigor</strong> — ship-it-quick / tested / fully
          verified with lint + typecheck + browser
        </li>
        <li>
          <strong>File ambiguity</strong> — inspection surfaced two candidates;
          which one?
        </li>
      </ul>
      <p>
        Each option is specific (no yes/no), with the most likely answer
        labeled <code>(recommended)</code> based on what inspection showed.
        Free-text via the <code>Other</code> field is always available.
      </p>
      <p>
        <strong>Smart-skip rule:</strong> a question is skipped entirely if
        your input already answers it. Name a file? No file question. Say
        &quot;with tests&quot;? No rigor question. If everything is
        smart-skipped, the skill goes straight to Step 2 with no questions
        asked. If 4+ remain, picks the 4 most decision-shaping; placeholders
        cover the rest.
      </p>
      <p>
        Answers are baked into Step 2 silently — no &quot;you said X&quot;
        recap, no commentary. The output is still just the polished prompt.
      </p>

      <h3>Step 2 — synthesize</h3>
      <p>Produces a Claude Code prompt that:</p>
      <ul>
        <li>States the goal in 1–2 sentences</li>
        <li>
          Lists relevant files with <strong>verified paths</strong> (paths it
          actually saw during inspection)
        </li>
        <li>Includes the error / current-vs-expected behavior verbatim</li>
        <li>
          Defines constraints from the observed stack (framework, language,
          existing patterns, lint/test commands from{' '}
          <code>package.json</code>)
        </li>
        <li>Asks for safe step-by-step implementation, not a one-shot rewrite</li>
        <li>Forbids unrelated edits or broad refactors</li>
        <li>
          Requests tests, type-checks, or browser verification when
          appropriate
        </li>
        <li>
          Includes the line: "don&apos;t overwrite uncommitted changes unless
          I explicitly ask"
        </li>
      </ul>
      <p>If context is missing after inspection, returns placeholders:</p>
      <ul>
        <li>
          <code>[insert file path]</code>
        </li>
        <li>
          <code>[paste error output]</code>
        </li>
        <li>
          <code>[describe expected behavior]</code>
        </li>
        <li>
          <code>[describe current behavior]</code>
        </li>
      </ul>
      <p>
        <strong>Hard rule:</strong> the skill does not solve the task. Does
        not edit files. Only returns the improved prompt.
      </p>

      <h2>Anatomy of a good rough input</h2>

      <h3>Bad</h3>
      <pre>
        <code>/prompt-engineer fix auth</code>
      </pre>
      <p>
        Too vague. Skill fires Step 1.5 and asks you which auth file, what
        kind of fix, what to preserve, and what rigor you want — answering
        all four in chat takes longer than typing the better version below.
      </p>

      <h3>Better</h3>
      <pre>
        <code>{`/prompt-engineer Context: Next.js app with NextAuth.
Login throws "session undefined" after submit.
Files: app/login, lib/auth.ts.
Rough prompt: fix login`}</code>
      </pre>
      <p>Names the framework, library, file paths, error, and goal.</p>

      <h3>Best</h3>
      <pre>
        <code>{`/prompt-engineer Context: Next.js 15 app, NextAuth.js,
login form at app/login/page.tsx fails with TypeError after
submit. Have NOT touched lib/auth.ts in 3 weeks.
Error: TypeError: Cannot read properties of undefined
(reading 'user') at line 47 of lib/auth.ts.
Rough prompt: fix login while preserving redirect logic
for OAuth flows`}</code>
      </pre>
      <p>
        Names exact files, specifies what hasn&apos;t changed (rules out
        suspects), includes line number, includes domain constraint (preserve
        OAuth behavior).
      </p>

      <h2>Examples</h2>

      <h3>Example 1: bug fix</h3>
      <p>
        <strong>Input:</strong>
      </p>
      <pre>
        <code>{`/prompt-engineer Context: Next.js app, login form
fails after submit. Files: app/login/page.tsx, lib/auth.ts.
Error: TypeError: Cannot read properties of undefined.
Rough prompt: fix login`}</code>
      </pre>
      <p>
        <strong>What it does first:</strong>
      </p>
      <ul>
        <li>
          Confirms <code>app/login/page.tsx</code> and{' '}
          <code>lib/auth.ts</code> exist
        </li>
        <li>Greps for related auth helpers, server actions, API routes</li>
        <li>
          Reads <code>package.json</code> — learns the auth library and
          lint/test scripts
        </li>
        <li>
          Checks <code>git status</code> for uncommitted changes that affect
          login
        </li>
      </ul>
      <p>
        <strong>Output (a polished prompt):</strong>
      </p>
      <pre>
        <code>{`### Improved Claude Code Prompt

You are working in a Next.js 15 app using NextAuth.js.
The login flow throws "TypeError: Cannot read properties
of undefined" after form submission.

Inspect:
- app/login/page.tsx (the form component)
- lib/auth.ts (NextAuth config + helpers)
- app/api/auth/[...nextauth]/route.ts (server-side handlers)

Current error:
TypeError: Cannot read properties of undefined

Goal:
Fix the login submission flow so valid users can sign in.

Constraints:
- Do not refactor unrelated files
- Do not overwrite uncommitted changes
- Run \`pnpm lint\` and \`pnpm tsc --noEmit\` after changes
- Verify in browser at localhost:3000/login

Step-by-step:
1. Trace the request: form submit → server action → auth handler
2. Identify where the undefined access happens
3. Fix the root cause (not just the symptom)
4. Run lint + typecheck + browser test
5. Report what changed and what you verified`}</code>
      </pre>

      <h3>Example 2: new feature</h3>
      <p>
        <strong>Input:</strong>
      </p>
      <pre>
        <code>{`/prompt-engineer Context: Next.js app with Supabase auth.
Want to add a Settings page where logged-in users can update
display name and avatar URL.
Rough prompt: add settings page`}</code>
      </pre>
      <p>
        <strong>What it does first:</strong>
      </p>
      <ul>
        <li>
          Greps for existing routes under <code>app/</code> to learn
          conventions
        </li>
        <li>
          Reads <code>app/layout.tsx</code> to understand the auth wrapper
        </li>
        <li>
          Greps for Supabase client setup (<code>lib/supabase</code> or
          similar)
        </li>
        <li>
          Reads <code>package.json</code> — confirms Supabase client version,
          form library if any
        </li>
        <li>Looks for existing form components to match style</li>
      </ul>
      <p>
        <strong>Output:</strong> a polished prompt that names the route to
        create (<code>app/settings/page.tsx</code>), points to the existing
        Supabase client, asks for a server action for the update, calls out
        whatever form library is already in use, and asks for a browser
        verification.
      </p>

      <h3>Example 3: investigation</h3>
      <p>
        <strong>Input:</strong>
      </p>
      <pre>
        <code>{`/prompt-engineer Context: Python FastAPI app.
The /api/search endpoint takes 8 seconds for a simple query.
Should be sub-second.
Rough prompt: figure out why search is slow`}</code>
      </pre>
      <p>
        <strong>What it does first:</strong>
      </p>
      <ul>
        <li>
          Greps for <code>/api/search</code> route definition
        </li>
        <li>Reads the route handler + any service it calls</li>
        <li>
          Reads <code>pyproject.toml</code> — learns ORM, DB driver, profiling
          tools available
        </li>
        <li>Looks for existing logging or APM setup</li>
      </ul>
      <p>
        <strong>Output:</strong> a polished prompt asking for an investigation
        — not a fix — that traces the call path, instruments timing at each
        layer (route → service → DB), checks for N+1 patterns, missing
        indexes, and reports findings before changing anything.
      </p>

      <h2>Edge cases</h2>
      <ul>
        <li>
          <strong>Not in a git repo:</strong> skill notes that and skips git
          commands
        </li>
        <li>
          <strong>Empty directory:</strong> returns a prompt focused on
          scaffolding (suggests <code>/greenfield</code>)
        </li>
        <li>
          <strong>Mentioned files don&apos;t exist:</strong> notes that and
          asks for clarification rather than inventing paths
        </li>
        <li>
          <strong>Mixed-language repo:</strong> reads multiple manifests
          (package.json, pyproject.toml, Cargo.toml) and includes both stacks
          in context
        </li>
      </ul>

      <h2>Output usage</h2>
      <ol>
        <li>Run <code>/prompt-engineer ...</code> in your repo.</li>
        <li>
          Copy the polished prompt from under{' '}
          <code>### Improved Claude Code Prompt</code>.
        </li>
        <li>
          Open a new Claude Code session in the same repo (or use{' '}
          <code>/clear</code> in the current one).
        </li>
        <li>Paste the polished prompt.</li>
        <li>
          Claude executes — should follow the constraints exactly: inspect
          named files, not refactor unrelated code, run lint/typecheck, etc.
        </li>
      </ol>

      <h2>Use it</h2>
      <pre>
        <code>/prompt-engineer [your rough prompt + any context]</code>
      </pre>
      <p className="muted">
        Works in any repo, any project. Always inspects the current directory
        state before producing the improved prompt — never invents file paths
        it didn&apos;t verify.
      </p>
    </main>
  )
}
