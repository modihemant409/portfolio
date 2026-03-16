import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HeroProps {
  onOpenChat: () => void
}

interface TerminalLine {
  type: 'prompt' | 'output' | 'blank'
  text?: string
  cmd?: string
  color?: string
  isCursor?: boolean
}

const TERMINAL_LINES: TerminalLine[] = [
  { type: 'prompt', cmd: 'whoami' },
  { type: 'output', text: 'Hemant Modi — Tech Lead @ VisitApp, Noida', color: '#3fb950' },
  { type: 'blank' },
  { type: 'prompt', cmd: 'cat stack.txt' },
  { type: 'output', text: 'Node.js · TypeScript · React · Kafka · AWS · Gemini AI', color: '#d2a8ff' },
  { type: 'blank' },
  { type: 'prompt', cmd: 'git log --oneline | wc -l' },
  { type: 'output', text: '800+ commits in production', color: '#e3b341' },
  { type: 'blank' },
  { type: 'prompt', cmd: '', isCursor: true },
]

const STATS = [
  { value: '4+', label: 'Years Experience' },
  { value: '800+', label: 'Commits' },
  { value: '30+', label: 'Enterprise Clients' },
  { value: '5', label: 'Major Projects' },
]

export default function Hero({ onOpenChat }: HeroProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const tbodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let idx = 0
    const delays = TERMINAL_LINES.map((l) =>
      l.type === 'prompt' ? 700 : l.type === 'blank' ? 80 : 150,
    )

    function showNext() {
      if (idx >= TERMINAL_LINES.length) return
      setVisibleLines((v) => v + 1)
      idx++
      if (idx < TERMINAL_LINES.length) {
        setTimeout(showNext, delays[idx] ?? 200)
      }
    }

    const t = setTimeout(showNext, 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (tbodyRef.current) {
      tbodyRef.current.scrollTop = tbodyRef.current.scrollHeight
    }
  }, [visibleLines])

  return (
    <section
      id="about"
      className="relative flex flex-col items-center px-6 pt-16 pb-12 text-center"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{
          background:
            'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-5 flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs text-[#888]"
        style={{ borderColor: '#1e1e30' }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-green-400"
          style={{ boxShadow: '0 0 6px #22c55e' }}
        />
        Open to full-time roles
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4"
      >
        I build systems
        <span className="block gradient-text">that actually scale.</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[#666] text-sm sm:text-base max-w-lg leading-relaxed mb-8"
      >
        Full-stack engineer specialising in distributed backends, AI pipelines,
        and health-tech infrastructure. 4+ years shipping at scale.
      </motion.p>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="terminal-shadow w-full max-w-2xl rounded-2xl overflow-hidden border mb-6"
        style={{ background: '#0a0a14', borderColor: '#1e1e30' }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{ background: '#111120', borderColor: '#1e1e30' }}
        >
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-[#555] font-mono">
            hemant@portfolio ~ zsh
          </span>
        </div>

        {/* Body */}
        <div
          ref={tbodyRef}
          className="px-5 py-4 font-mono text-sm leading-7 text-[#c9d1d9] overflow-hidden"
          style={{ height: '210px' }}
        >
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => {
            if (line.type === 'blank') {
              return <div key={i} className="h-2" />
            }
            if (line.type === 'prompt') {
              return (
                <div key={i} className="flex items-center">
                  <span className="text-[#58a6ff]">
                    <span className="text-[#3fb950]">hemant</span>
                    @portfolio:~$
                  </span>
                  <span className="text-[#e6edf3] ml-2">{line.cmd}</span>
                  {line.isCursor && (
                    <span
                      className="inline-block w-2 h-4 bg-[#6366f1] ml-1 align-middle animate-blink"
                      style={{ verticalAlign: 'middle' }}
                    />
                  )}
                </div>
              )
            }
            return (
              <div key={i} style={{ color: line.color ?? '#8b949e' }}>
                &nbsp;&nbsp;{line.text}
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-12"
      >
        <button
          onClick={onOpenChat}
          className="chat-btn-glow flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
          style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}
        >
          🤖 Chat with me
        </button>
        <a
          href="/Hemant_Modi_Resume.pdf"
          download
          className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#a78bfa] border transition-colors hover:bg-[#1a1a28]"
          style={{ borderColor: '#2a2a45' }}
        >
          ↓ Download Resume
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-px border rounded-2xl overflow-hidden w-full max-w-2xl"
        style={{ borderColor: '#1e1e30', background: '#1e1e30' }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center py-5 px-4"
            style={{ background: '#0f0f1a' }}
          >
            <span className="text-2xl font-bold text-[#a78bfa]">{stat.value}</span>
            <span className="text-xs text-[#555] mt-1">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-xs text-[#444]"
      >
        ↓ or click{' '}
        <button
          onClick={onOpenChat}
          className="text-[#a78bfa] hover:underline"
        >
          Chat with me
        </button>{' '}
        to ask anything about my work
      </motion.p>
    </section>
  )
}
