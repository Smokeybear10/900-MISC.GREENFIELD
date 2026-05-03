import Link from 'next/link'

export default function Home() {
  return (
    <main className="home">
      <p className="eyebrow">Claude Code · framework</p>
      <h1 className="hero">
        /GREEN<span className="cursor">_</span>
      </h1>
      <div className="hero-rule" />

      <p className="lead">
        Two Claude Code skills. One walks you through bootstrapping a new
        project. One reads your repo before writing a better prompt than you
        would&apos;ve.
      </p>
      <p className="subtag">
        For when &quot;figure it out as I go&quot; stops working.
      </p>

      <div className="cards">
        <Link className="card" href="/greenfield">
          <div className="card-head">
            <span className="num">01</span>
            <span className="arrow" aria-hidden>→</span>
          </div>
          <h2>greenfield</h2>
          <p>
            9-step bootstrap. Idea → diagnostic → plan → reconciled →
            scaffolded. Built around the step you&apos;ll most want to skip.
          </p>
        </Link>
        <Link className="card" href="/prompt-engineer">
          <div className="card-head">
            <span className="num">02</span>
            <span className="arrow" aria-hidden>→</span>
          </div>
          <h2>prompt-engineer</h2>
          <p>
            Reads your repo before it writes the prompt. No invented file
            paths, no broad refactors, real constraints baked in.
          </p>
        </Link>
      </div>

      <section className="block">
        <p className="block-label">Install</p>
        <pre>
          <code>{`$ git clone <repo-url> ~/Github/Settings
$ cd ~/Github/Settings && ./install.sh`}</code>
        </pre>
        <p className="muted">
          Symlinks both slash commands into <code>~/.claude/commands/</code>.
          Idempotent — re-run anytime.
        </p>
      </section>

      <section className="block">
        <p className="block-label">Requires</p>
        <p className="muted">
          <strong>gstack</strong> — the underlying review skills{' '}
          <code>/office-hours</code>, <code>/plan-ceo-review</code>,{' '}
          <code>/plan-eng-review</code>, <code>/plan-design-review</code> that
          greenfield orchestrates.
        </p>
      </section>

      <footer className="footer">
        <p>made for future-me · so the workflow doesn&apos;t get re-discovered every time</p>
      </footer>
    </main>
  )
}
