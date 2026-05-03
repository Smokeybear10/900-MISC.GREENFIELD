'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const CLOSE_DELAY = 220

export function SkillsDropdown() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  function openNow() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpen(true)
  }

  function closeSoon() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY)
  }

  // Click outside closes immediately
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Escape closes
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  return (
    <div className="dropdown" data-open={open} ref={ref}>
      <button
        className="dropdown-trigger"
        onClick={() => (open ? setOpen(false) : openNow())}
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        skills <span className="chevron" aria-hidden>▾</span>
      </button>
      {open && (
        <div
          className="dropdown-menu"
          role="menu"
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
        >
          <Link href="/greenfield" role="menuitem" onClick={() => setOpen(false)}>
            <span className="menu-name">greenfield</span>
            <span className="menu-desc">bootstrap a new project</span>
          </Link>
          <Link href="/prompt-engineer" role="menuitem" onClick={() => setOpen(false)}>
            <span className="menu-name">prompt-engineer</span>
            <span className="menu-desc">upgrade rough prompts</span>
          </Link>
          <Link href="/menu" role="menuitem" onClick={() => setOpen(false)}>
            <span className="menu-name">menu</span>
            <span className="menu-desc">curated gstack skill list</span>
          </Link>
        </div>
      )}
    </div>
  )
}
