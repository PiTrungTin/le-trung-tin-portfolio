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
    name: '3D Product Configurator',
    desc: 'Real-time 3D product customization with photorealistic rendering',
    tech: ['Three.js', 'React', 'Node.js', 'WebGL'],
    details: 'Built an interactive 3D configurator allowing users to customize products in real-time. Features include material swapping, color picker, AR preview, and screenshot capture. Optimized to run at 60fps on mobile devices with LOD system and texture streaming.',
    color: 'cyan',
  },
  {
    name: 'AI Analytics Dashboard',
    desc: 'Real-time ML-powered business intelligence platform',
    tech: ['Next.js', 'Python', 'TensorFlow', 'D3.js'],
    details: 'Designed and developed a comprehensive analytics dashboard processing 1M+ events daily. Implemented real-time data streaming, anomaly detection with ML models, and interactive data visualizations. Reduced query latency by 60% with Redis caching layer.',
    color: 'magenta',
  },
  {
    name: 'E-Commerce Platform',
    desc: 'Full-stack shopping experience with headless CMS',
    tech: ['React', 'GraphQL', 'PostgreSQL', 'Stripe'],
    details: 'Architected a modern e-commerce platform from scratch. Features include real-time inventory management, personalized recommendations, multi-currency support, and a headless CMS for content teams. Handles 10K+ concurrent users.',
    color: 'yellow',
  },
  {
    name: 'Weather 3D Globe',
    desc: 'Global weather patterns visualization in WebGL',
    tech: ['Three.js', 'Web Workers', 'Mapbox', 'REST API'],
    details: 'Created an immersive 3D globe visualizing real-time weather data. Features include animated wind patterns, temperature heatmaps, storm tracking, and time-lapse mode. Uses Web Workers for data processing to maintain 60fps rendering.',
    color: 'cyan',
  },
]

const colorMap = {
  cyan: { border: 'border-cyber-cyan/50', text: 'text-cyber-cyan', glow: '#00ffff', bg: 'rgba(0,255,255,0.05)' },
  magenta: { border: 'border-cyber-magenta/50', text: 'text-cyber-magenta', glow: '#ff00ff', bg: 'rgba(255,0,255,0.05)' },
  yellow: { border: 'border-cyber-yellow/50', text: 'text-cyber-yellow', glow: '#ffff00', bg: 'rgba(255,255,0,0.05)' },
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative max-w-2xl w-full bg-cyber-surface/90 backdrop-blur-xl border border-cyber-cyan/30 p-8"
            style={{
              clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
              boxShadow: `0 0 40px ${colorMap[project.color].bg}, 0 0 80px rgba(0,0,0,0.5)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 font-mono text-gray-400 hover:text-cyber-cyan transition-colors text-xl cursor-pointer"
            >
              [X]
            </button>

            <h2
              className={`font-display text-2xl md:text-3xl font-bold ${colorMap[project.color].text} mb-2`}
              style={{ textShadow: `0 0 15px ${colorMap[project.color].glow}` }}
            >
              {project.name}
            </h2>

            <p className="font-mono text-gray-400 text-sm mb-6">{project.desc}</p>

            <p className="font-mono text-gray-300 text-sm leading-relaxed mb-6 border-l-2 border-cyber-cyan/30 pl-4">
              {project.details}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1 border border-cyber-cyan/20 rounded-full text-cyber-cyan bg-cyber-dark/50"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className={`font-mono text-xs ${colorMap[project.color].text} border ${colorMap[project.color].border} px-4 py-2 hover:brightness-125 transition-all`}
                style={{ boxShadow: `0 0 10px ${colorMap[project.color].bg}` }}
              >
                View Live
              </a>
              <a
                href="#"
                className="font-mono text-xs text-gray-400 border border-gray-600 px-4 py-2 hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-all"
              >
                Source Code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
