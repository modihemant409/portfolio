import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  description: string
  isCurrent?: boolean
}

const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Tech Lead',
    company: 'Visit Health (VisitApp)',
    location: 'Noida',
    period: 'Dec 2022 – Present',
    description:
      'Leading backend systems for a health-tech platform serving millions of users — FWA fraud detection, AI medical digitisation, cashless insurance backend, OCR microservice, OAuth2/PKCE, SAML 2.0 SSO, and 322 Airflow DAGs.',
    isCurrent: true,
  },
  {
    role: 'Chatbot Developer Trainee',
    company: 'Celebal Technologies',
    location: 'Noida',
    period: 'Oct 2022 – Dec 2022',
    description:
      'Built a chatbot SDK using Microsoft Bot Framework. Developed conversational flows and integrated with enterprise messaging platforms.',
  },
  {
    role: 'Junior Backend Developer',
    company: 'iWebwiser',
    location: 'Bikaner',
    period: 'Dec 2021 – Sep 2022',
    description:
      'Built a Udemy-like e-learning platform for a foreign client using Node.js and Laravel — courses, video streaming, billing, and enrollment.',
  },
]

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="experience"
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
          Experience
          <span className="text-xs text-[#555] font-normal">→ where I've worked</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-4 top-2 bottom-2 w-px hidden sm:block"
          style={{ background: '#1e1e30' }}
        />

        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((item, i) => (
            <motion.div
              key={item.company + item.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="sm:pl-12 relative"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-2.5 top-4 w-3 h-3 rounded-full border-2 hidden sm:block -translate-x-1/2"
                style={{
                  borderColor: item.isCurrent ? '#6366f1' : '#2a2a45',
                  background: item.isCurrent ? '#6366f1' : '#080810',
                  boxShadow: item.isCurrent
                    ? '0 0 8px rgba(99,102,241,0.6)'
                    : 'none',
                }}
              />

              <div
                className="rounded-2xl border p-5 transition-colors hover:border-[#2a2a45]"
                style={{ background: '#0f0f1a', borderColor: '#1e1e30' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="text-sm font-semibold text-[#e2e2f0]">
                      {item.role}
                    </h3>
                    <p className="text-xs text-[#a78bfa] mt-0.5">
                      {item.company},{' '}
                      <span className="text-[#555]">{item.location}</span>
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                      item.isCurrent
                        ? 'text-[#6366f1] bg-[#1a1a35] border border-[#2a2a55]'
                        : 'text-[#555] bg-[#111120]'
                    }`}
                  >
                    {item.period}
                  </span>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mt-3">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
