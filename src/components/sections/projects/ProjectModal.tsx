import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../../store/useStore'

interface Project {
  name: string
  desc: string
  tech: string[]
  details: string
  color: 'cyan' | 'magenta' | 'yellow'
}

const projects: Project[] = [
  {
    name: 'Vue 3 Frontend Initialization',
    desc: 'Modular frontend setup for booking-related modules at Hanatour Japan System.',
    tech: ['Vue 3', 'Architecture', 'Reusable Modules', 'State Management'],
    details: 'Led frontend initialization using Vue 3 and designed a modular structure to improve reusability and state management across booking-related modules.',
    color: 'cyan',
  },
  {
    name: 'Tour Builder Logic',
    desc: 'Dynamic pricing and business-rule-heavy booking configuration.',
    tech: ['Frontend Logic', 'Business Rules', 'Pricing'],
    details: 'Developed custom tour-builder logic to support dynamic pricing and complex configuration rules for tours, directly reflecting product-specific booking workflows.',
    color: 'magenta',
  },
  {
    name: 'NestJS Microservices Migration',
    desc: 'Legacy modules moved toward more scalable service boundaries.',
    tech: ['NestJS', 'Microservices', 'Maintenance', 'Scale'],
    details: 'Migrated legacy modules into NestJS microservices, making the system easier to scale and maintain compared with the earlier monolithic structure.',
    color: 'yellow',
  },
  {
    name: 'Kafka and Reliability Patterns',
    desc: 'Background processing and safety nets for sensitive business flows.',
    tech: ['Kafka', 'Idempotent Keys', 'DLQ', '3rd-party APIs'],
    details: 'Set up Kafka for background tasks such as confirmations and notifications, fixed double-processing with idempotent keys, added dead letter queues, and integrated travel APIs including Amadeus and Sabre.',
    color: 'cyan',
  },
]

const colorMap = {
  cyan: { text: 'text-cyber-cyan', accent: '#169ee6', bg: 'rgba(22, 158, 230, 0.16)' },
  magenta: { text: 'text-cyber-magenta', accent: '#f97352', bg: 'rgba(249, 115, 82, 0.16)' },
  yellow: { text: 'text-cyber-yellow', accent: '#f3b63f', bg: 'rgba(243, 182, 63, 0.18)' },
}

export function ProjectModal() {
  const activeProject = useStore((s) => s.activeProject)
  const setActiveProject = useStore((s) => s.setActiveProject)
  const isOpen = activeProject !== null
  const project = isOpen ? projects[activeProject] : null

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[rgba(231,240,251,0.7)] backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-[32px] border border-white/80 bg-white/88 p-8 shadow-[0_36px_110px_rgba(23,50,77,0.18)] backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-5 top-5 h-10 w-10 rounded-full border border-slate-200 bg-white text-slate-400 transition-colors hover:text-slate-700"
              aria-label="Close project modal"
            >
              x
            </button>

            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-slate-500">Project detail</p>
            <h2 className={`mt-4 font-display text-3xl uppercase tracking-[0.12em] ${colorMap[project.color].text}`}>
              {project.name}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{project.desc}</p>

            <div
              className="mt-6 rounded-[24px] border border-white/80 px-5 py-5 text-sm leading-7 text-slate-600"
              style={{ background: `linear-gradient(135deg, ${colorMap[project.color].bg}, rgba(255,255,255,0.86))` }}
            >
              {project.details}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
