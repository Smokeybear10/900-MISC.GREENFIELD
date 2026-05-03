import './globals.css'
import Link from 'next/link'
import { SkillsDropdown } from './SkillsDropdown'

export const metadata = {
  title: '/GREEN — Claude Code skills',
  description: 'Two Claude Code skills for shipping new projects faster.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <div className="nav-group">
            <Link href="/" className="logo">/GREEN</Link>
            <SkillsDropdown />
          </div>
          <div className="nav-group">
            <span className="nav-label" aria-hidden>reference</span>
            <Link href="/prompts">prompts</Link>
            <Link href="/rules">rules</Link>
            <Link href="/git">git</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
