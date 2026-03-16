import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SkillGroup {
  category: string
  icon: string
  skills: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    icon: '{ }',
    skills: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'SQL'],
  },
  {
    category: 'Backend',
    icon: '⚙',
    skills: ['Node.js', 'Express.js', 'Microservices', 'Laravel', 'REST APIs'],
  },
  {
    category: 'Frontend',
    icon: '◻',
    skills: ['React.js', 'React Native', 'Redux', 'TailwindCSS', 'Ant Design', 'MUI'],
  },
  {
    category: 'Databases',
    icon: '⬡',
    skills: ['MySQL', 'Redis', 'Elasticsearch'],
  },
  {
    category: 'AI / ML',
    icon: '✦',
    skills: ['Google Gemini', 'OpenAI', 'AWS Textract', 'Vertex AI'],
  },
  {
    category: 'Messaging',
    icon: '↔',
    skills: ['Apache Kafka', 'Confluent Schema Registry', 'Avro'],
  },
  {
    category: 'Cloud & Infra',
    icon: '☁',
    skills: ['AWS S3', 'Lambda', 'SQS', 'SES', 'Secrets Manager', 'Airflow', 'PM2'],
  },
  {
    category: 'Auth & Security',
    icon: '⚿',
    skills: ['OAuth 2.0', 'PKCE (RFC 7636)', 'JWT', 'SAML 2.0', 'Azure MSAL'],
  },
]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
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
          Skills
          <span className="text-xs text-[#555] font-normal">→ what I work with</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SKILL_GROUPS.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border p-4 hover:border-[#2a2a45] transition-colors"
            style={{ background: '#0f0f1a', borderColor: '#1e1e30' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base text-[#6366f1] font-mono w-5 text-center">
                {group.icon}
              </span>
              <span className="text-xs font-semibold text-[#a78bfa]">
                {group.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] px-2 py-0.5 rounded text-[#999] transition-colors hover:text-[#e2e2f0]"
                  style={{ background: '#1a1a28' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
