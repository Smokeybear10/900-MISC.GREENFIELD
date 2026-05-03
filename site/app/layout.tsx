import './globals.css'
import Link from 'next/link'

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
          <Link href="/" className="logo">/GREEN</Link>
          <Link href="/greenfield">greenfield</Link>
          <Link href="/prompt-engineer">prompt-engineer</Link>
          <Link href="/prompts">prompts</Link>
          <Link href="/git">git</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
