import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { HolographicCard } from '../../ui/HolographicCard'

const experiences = [
  {
    role: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    year: '2024 — Present',
    desc: 'Leading 3D visualization team, architecting WebGL-based product configurators. Reduced bundle size by 40%, improved Core Web Vitals by 35%. Mentoring junior developers in React and Three.js.',
    tech: ['React', 'Three.js', 'TypeScript', 'WebGL'],
    variant: 'cyan' as const,
  },
  {
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    year: '2022 — 2024',
    desc: 'Built core product from scratch - a real-time collaboration platform serving 50K+ users. Designed GraphQL API, implemented WebSocket layer for live sync, and managed AWS infrastructure.',
    tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'AWS'],
    variant: 'magenta' as const,
  },
  {
    role: 'Junior Developer',
    company: 'WebAgency Pro',
    year: '2021 — 2022',
    desc: 'Delivered 15+ client projects from concept to deployment. Specialized in interactive landing pages with Framer Motion and CSS animations. Introduced component library that cut dev time by 30%.',
    tech: ['React', 'Framer Motion', 'SCSS', 'Figma'],
    variant: 'yellow' as const,
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionHeading
            title="Experience"
            subtitle="// cat /var/log/career.log"
            variant="yellow"
            className="text-center flex flex-col items-center"
          />
        </motion.div>

        {/* Single-axis timeline: all dots on the left, cards on the right */}
        <div className="relative pl-8 md:pl-0">
          {/* Vertical timeline line on the left */}
          <div
            className="absolute left-0 md:left-[11px] top-2 bottom-2 w-px"
            style={{
              background: 'linear-gradient(180deg, #00ffff44, #ff00ff44, #ffff0044)',
            }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const colorVal = exp.variant === 'cyan' ? '#00ffff' : exp.variant === 'magenta' ? '#ff00ff' : '#ffff00'
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative pl-8 md:pl-10"
                >
                  {/* Timeline dot — all on the same left axis */}
                  <div
                    className="absolute left-0 md:left-0 top-4 w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: colorVal,
                      boxShadow: `0 0 10px ${colorVal}, 0 0 20px ${colorVal}66`,
                      transform: 'translateX(-5.5px)',
                    }}
                  />

                  {/* Connector line from dot to card */}
                  <div
                    className="absolute left-[5.5px] md:left-[5.5px] top-[22px] w-6 md:w-6 h-px hidden md:block"
                    style={{
                      background: `linear-gradient(90deg, ${colorVal}88, transparent)`,
                    }}
                  />

                  <HolographicCard variant={exp.variant} delay={i * 0.12}>
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase opacity-60"
                      style={{ color: colorVal }}
                    >
                      {exp.year}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-1 mb-1">
                      {exp.role}
                    </h3>
                    <p
                      className="font-mono text-xs opacity-70 mb-3"
                      style={{ color: colorVal }}
                    >
                      {exp.company}
                    </p>
                    <p className="font-mono text-xs text-gray-400 leading-relaxed mb-3">
                      {exp.desc}
                    </p>
                    <div className="flex gap-1.5 flex-wrap">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[9px] px-2 py-0.5 bg-cyber-dark/50 rounded border border-cyber-border/30 text-gray-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </HolographicCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
