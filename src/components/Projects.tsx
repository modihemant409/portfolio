import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Project {
  icon: string
  name: string
  description: string
  tags: string[]
}

const PROJECTS: Project[] = [
  {
    icon: '🔍',
    name: 'FWA Fraud Detection System',
    description:
      'Real-time fraud profiling with 20+ signals and in-memory longitudinal analysis. 6 parallel MySQL queries, sub-second response.',
    tags: ['Node.js', 'MySQL', 'Redis'],
  },
  {
    icon: '🤖',
    name: 'AI Medical Digitisation Pipeline',
    description:
      'Async pipeline processing 1000s of medical docs daily via Gemini + OpenAI + Kafka consumers with schema-validated Avro events.',
    tags: ['TypeScript', 'Kafka', 'Elasticsearch', 'Gemini', 'OpenAI'],
  },
  {
    icon: '🏗️',
    name: 'Cashless Insurance Backend',
    description:
      'Greenfield TypeScript microservice, primary author (33% of commits). TypeDI, master-slave MySQL, PM2 cluster, PII redaction.',
    tags: ['TypeScript', 'Express', 'TypeDI', 'AWS'],
  },
  {
    icon: '📄',
    name: 'OCR Lab Report Service',
    description:
      'PDF → structured data extraction via AWS Textract + Google Vertex AI. Handles handwritten prescriptions and printed lab reports.',
    tags: ['Node.js', 'AWS Textract', 'Vertex AI'],
  },
  {
    icon: '🎓',
    name: 'E-Learning Platform',
    description:
      'Udemy-like platform for a foreign client — courses, video streaming, billing, and enrollment management.',
    tags: ['Node.js', 'Laravel', 'MySQL'],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border p-5 transition-all duration-300 cursor-default"
      style={{
        background: '#0f0f1a',
        borderColor: '#1e1e30',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: '0 0 0 1px rgba(167,139,250,0.3), 0 8px 32px rgba(99,102,241,0.1)',
        }}
      />
      <div className="relative">
        <div className="text-2xl mb-3">{project.icon}</div>
        <h3 className="text-sm font-semibold text-[#e2e2f0] mb-2 leading-snug">
          {project.name}
        </h3>
        <p className="text-xs text-[#666] leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded text-[#888]"
              style={{ background: '#1a1a28' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="px-6 md:px-10 py-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-lg font-bold flex items-center gap-3 text-[#e2e2f0]">
          Projects
          <span className="text-xs text-[#555] font-normal">→ what I've shipped</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
        {PROJECTS.map((project, i) => (
          <div key={project.name} className="relative">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
