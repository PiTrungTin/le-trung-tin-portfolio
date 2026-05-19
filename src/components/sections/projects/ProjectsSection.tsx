import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { HolographicCard } from '../../ui/HolographicCard'
import { useStore } from '../../../store/useStore'

const projects = [
  {
    name: '3D Product Configurator',
    desc: 'Real-time 3D customization with photorealistic rendering and AR preview',
    tech: ['Three.js', 'React', 'Node.js'],
    color: 'cyan' as const,
  },
  {
    name: 'AI Analytics Dashboard',
    desc: 'ML-powered business intelligence processing 1M+ events daily',
    tech: ['Next.js', 'Python', 'D3.js'],
    color: 'magenta' as const,
  },
  {
    name: 'E-Commerce Platform',
    desc: 'Full-stack shopping platform with headless CMS and Stripe',
    tech: ['React', 'GraphQL', 'PostgreSQL'],
    color: 'yellow' as const,
  },
  {
    name: 'Weather 3D Globe',
    desc: 'Immersive WebGL visualization of global weather patterns',
    tech: ['Three.js', 'Web Workers', 'Mapbox'],
    color: 'cyan' as const,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionHeading
            title="Projects"
            subtitle="// ls -la ~/projects/"
            variant="magenta"
            className="text-center flex flex-col items-center"
          />
        </motion.div>

        {/* Staggered project cards */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`${
                i % 2 === 0
                  ? 'md:mt-0 md:mr-8'
                  : 'md:mt-16 md:ml-8'
              }`}
            >
              <HolographicCard variant={project.color} delay={i * 0.12}>
                <button
                  className="w-full text-left cursor-pointer"
                  onClick={() => {
                    useStore.getState().setActiveProject(i)
                    useStore.getState().triggerGlitchEffect()
                  }}
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <h3
                    className={`font-display text-lg font-bold mb-2 ${
                      project.color === 'cyan' ? 'text-cyber-cyan' :
                      project.color === 'magenta' ? 'text-cyber-magenta' : 'text-cyber-yellow'
                    }`}
                    style={{
                      textShadow: `0 0 8px ${
                        project.color === 'cyan' ? '#00ffff' : project.color === 'magenta' ? '#ff00ff' : '#ffff00'
                      }44`,
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="font-mono text-sm text-gray-400 mb-4">{project.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 border border-cyber-cyan/15 rounded-full text-gray-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              </HolographicCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
