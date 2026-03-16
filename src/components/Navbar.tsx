import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  onOpenChat: () => void
}

const navLinks = [
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'experience', href: '#experience' },
  { label: 'skills', href: '#skills' },
  { label: 'contact', href: '#contact' },
]

export default function Navbar({ onOpenChat }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b"
      style={{
        borderColor: '#1e1e30',
        background: scrolled
          ? 'rgba(8,8,16,0.95)'
          : 'rgba(8,8,16,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Logo */}
      <a href="#" className="font-mono text-sm font-bold text-[#e2e2f0] hover:text-[#a78bfa] transition-colors">
        hemant.dev<span className="text-[#a78bfa] animate-blink">_</span>
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs text-[#666] hover:text-[#e2e2f0] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenChat}
          className="chat-btn-glow flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}
        >
          <span>🤖</span>
          <span className="hidden sm:inline">Chat with me</span>
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#666] hover:text-[#e2e2f0] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 border-b py-4 px-6 flex flex-col gap-3 md:hidden"
          style={{
            background: 'rgba(8,8,16,0.98)',
            backdropFilter: 'blur(12px)',
            borderColor: '#1e1e30',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#999] hover:text-[#e2e2f0] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
