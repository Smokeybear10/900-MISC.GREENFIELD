import fs from 'node:fs'
import path from 'node:path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata = {
  title: 'rules — /GREEN',
  description:
    'The conventions I tell Claude on every session — communication, code style, git, gstack skills.',
}

export default function Rules() {
  const md = fs.readFileSync(
    path.resolve(process.cwd(), '..', 'RULES.md'),
    'utf-8'
  )

  return (
    <main>
      <p className="eyebrow">Personal · framework</p>
      <h1>rules</h1>
      <p className="lead">
        The conventions I tell Claude on every session. The shit I say to do —
        communication, code style, git, README discipline, when to invoke a
        skill. Borrow what fits.
      </p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </main>
  )
}
