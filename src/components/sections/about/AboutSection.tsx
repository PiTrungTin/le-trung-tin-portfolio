import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { HolographicCard } from '../../ui/HolographicCard'

const stats = [
  { value: '3+', label: 'Years Exp', variant: 'cyan' as const },
  { value: '20+', label: 'Projects', variant: 'magenta' as const },
  { value: '5+', label: 'Tech Stack', variant: 'yellow' as const },
  { value: '100%', label: 'Passion', variant: 'cyan' as const },
]

const bioParagraphs = [
  'I craft immersive digital experiences at the intersection of design and technology. With a deep passion for 3D graphics and interactive web applications, I transform complex ideas into elegant, performant solutions.',
  'My journey spans full-stack development, real-time 3D rendering, and creative coding. I believe in pushing boundaries — whether it\'s building scalable backend systems or crafting pixel-perfect frontends with cinematic flair.',
]

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="About Me"
              subtitle="// whoami"
              variant="cyan"
            />

            {bioParagraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                className="font-mono text-gray-300 leading-relaxed text-sm md:text-base mb-4"
              >
                <span className="text-cyber-cyan mr-2">&gt;</span>
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-6"
            >
              <span className="font-mono text-xs text-cyber-magenta tracking-widest">
                LOCATION: HO_CHI_MINH_CITY // STATUS: OPEN_TO_WORK
              </span>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <HolographicCard
                key={stat.label}
                variant={stat.variant}
                delay={0.3 + i * 0.1}
              >
                <div className="text-center">
                  <div
                    className={`font-display text-3xl md:text-4xl font-bold ${
                      stat.variant === 'cyan' ? 'text-cyber-cyan' :
                      stat.variant === 'magenta' ? 'text-cyber-magenta' : 'text-cyber-yellow'
                    }`}
                    style={{
                      textShadow: `0 0 15px ${
                        stat.variant === 'cyan' ? '#00ffff' :
                        stat.variant === 'magenta' ? '#ff00ff' : '#ffff00'
                      }66`,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-gray-400 mt-2 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </HolographicCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
