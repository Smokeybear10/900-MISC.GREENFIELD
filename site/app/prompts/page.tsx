import fs from 'node:fs'
import path from 'node:path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const metadata = {
  title: 'Prompts — /GREEN',
  description:
    'Reusable role-prompt templates for idea validation and planning.',
}

export default function Prompts() {
  const md = fs.readFileSync(
    path.resolve(process.cwd(), '..', 'PROMPTS.md'),
    'utf-8'
  )

  return (
    <main>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </main>
  )
}
