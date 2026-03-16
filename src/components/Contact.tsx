import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CONTACTS = [
  {
    icon: '✉',
    label: 'Email',
    value: 'modihemant409@gmail.com',
    href: 'mailto:modihemant409@gmail.com',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: '+91 7062896083',
    href: 'tel:+917062896083',
  },
  {
    icon: '⌥',
    label: 'GitHub',
    value: 'github.com/modihemant409',
    href: 'https://github.com/modihemant409',
  },
  {
    icon: '◎',
    label: 'Location',
    value: 'Noida, India',
    href: null,
  },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="px-6 md:px-10 py-20 max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-lg font-bold flex items-center gap-3 text-[#e2e2f0]">
          Contact
          <span className="text-xs text-[#555] font-normal">→ let's talk</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-[#e2e2f0] mb-3">
            Open to new opportunities
          </h3>
          <p className="text-sm text-[#666] leading-relaxed mb-6">
            I'm actively looking for full-time roles at product companies and
            MNCs. If you have an interesting engineering problem to solve, I'd
            love to chat.
          </p>
          <a
            href="mailto:modihemant409@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}
          >
            ✉ Send me an email
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border p-5"
          style={{ background: '#0f0f1a', borderColor: '#1e1e30' }}
        >
          <div className="flex flex-col gap-4">
            {CONTACTS.map((contact) => {
              const Inner = (
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-[#a78bfa] flex-shrink-0"
                    style={{ background: '#1a1a28' }}>
                    {contact.icon}
                  </span>
                  <div>
                    <div className="text-[10px] text-[#555] mb-0.5">{contact.label}</div>
                    <div className="text-xs text-[#ccc]">{contact.value}</div>
                  </div>
                </div>
              )

              return contact.href ? (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:bg-[#1a1a28] rounded-xl p-2 -m-2 transition-colors"
                >
                  {Inner}
                </a>
              ) : (
                <div key={contact.label} className="p-2 -m-2">
                  {Inner}
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 pt-8 border-t text-center text-xs text-[#333]"
        style={{ borderColor: '#1e1e30' }}
      >
        <p>
          <span className="font-mono text-[#a78bfa]">hemant.dev</span> — Built
          with React, TypeScript & TailwindCSS
        </p>
      </motion.div>
    </section>
  )
}
