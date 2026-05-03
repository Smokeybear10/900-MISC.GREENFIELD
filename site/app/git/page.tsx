export const metadata = {
  title: 'git — /GREEN',
  description:
    'Git cheat sheet for connecting local folders to GitHub repos and routine commit/push.',
}

export default function Git() {
  return (
    <main>
      <h1>git</h1>
      <p className="lead">
        Cheat sheet for connecting local folders to GitHub repos, routine
        commit/push, and the common error you hit on the first push.
      </p>

      <h2>Connect existing local folder ↔ existing GitHub repo</h2>
      <p>You already have a folder on disk and an empty (or near-empty) GitHub repo. To wire them together:</p>
      <pre>
        <code>{`cd ~/Github/<folder>
git init                              # safe to run; no-op if already a repo
git add .
git commit -m "init"
git remote add origin <github-url>    # if a wrong remote already exists,
                                      #   use: git remote set-url origin <url>
git branch -M main                    # only if you're on "master" instead of "main"
git push -u origin main`}</code>
      </pre>
      <p>
        Get <code>&lt;github-url&gt;</code> from your repo on github.com →
        green <strong>Code</strong> button → copy HTTPS or SSH URL.
      </p>

      <h2>Routine commit + push</h2>
      <pre>
        <code>{`git add .
git commit -m "<short imperative msg>"
git push`}</code>
      </pre>

      <h2>Pull from remote</h2>
      <pre>
        <code>git pull</code>
      </pre>

      <h2>The error you&apos;ll hit on first push</h2>

      <h3>
        <code>error: src refspec master does not match any</code>
      </h3>
      <p>
        Means: <em>the branch you&apos;re trying to push doesn&apos;t exist
        yet</em>. <code>git init</code> creates an empty repo with no commits
        and no branches — the branch only materializes once you make a commit.
      </p>
      <p>
        <strong>Fix:</strong> you skipped <code>git add</code> +{' '}
        <code>git commit</code>. Run them, then push.
      </p>
      <pre>
        <code>{`git add .
git commit -m "init"
git push -u origin master   # or main, whichever branch git init created`}</code>
      </pre>

      <h3>
        Hint: <code>Using &apos;master&apos; as the name for the initial
        branch...</code>
      </h3>
      <p>
        Means: your git default is the old <code>master</code> name. Modern
        convention is <code>main</code>.
      </p>
      <p>
        <strong>Fix this repo:</strong>
      </p>
      <pre>
        <code>{`git branch -m master main
git push -u origin main`}</code>
      </pre>
      <p>
        <strong>Fix it for every future repo</strong> — set the default
        globally so <code>git init</code> uses <code>main</code> from now on:
      </p>
      <pre>
        <code>git config --global init.defaultBranch main</code>
      </pre>

      <h3>
        <code>fatal: remote origin already exists</code>
      </h3>
      <p>
        Means: there&apos;s already a remote (often a leftover from a clone or
        previous setup).
      </p>
      <p>
        <strong>Fix:</strong> overwrite the URL instead of adding a new
        remote.
      </p>
      <pre>
        <code>git remote set-url origin &lt;new-github-url&gt;</code>
      </pre>

      <h2>Other handy commands</h2>
      <ul>
        <li>
          <code>git status</code> — what&apos;s changed, staged, untracked
        </li>
        <li>
          <code>git log --oneline -10</code> — last 10 commits, one per line
        </li>
        <li>
          <code>git remote -v</code> — show the configured remotes (and
          double-check the URL)
        </li>
        <li>
          <code>git diff</code> — unstaged changes
        </li>
        <li>
          <code>git diff --staged</code> — staged changes (what would commit)
        </li>
        <li>
          <code>git restore &lt;file&gt;</code> — discard unstaged changes to
          a file
        </li>
      </ul>

      <h2>Workflow notes</h2>
      <ul>
        <li>
          Commit often with short imperative messages ("add login form", "fix
          auth race condition"). Keeps history readable.
        </li>
        <li>
          When connecting a folder you&apos;ve been working in for a while,
          double-check there are no secrets being staged —{' '}
          <code>git status</code> first, look for <code>.env</code>,{' '}
          <code>credentials.json</code>, etc. Add them to{' '}
          <code>.gitignore</code> before <code>git add .</code>.
        </li>
        <li>
          For a brand new project from scratch, follow{' '}
          <a href="/greenfield">greenfield</a> step 9 — it handles the git
          init, port lock, and folder rename in one cleanup pass.
        </li>
      </ul>
    </main>
  )
}
