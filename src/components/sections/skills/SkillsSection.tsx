import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { HolographicCard } from '../../ui/HolographicCard'

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  title: string
  icon: string
  variant: 'cyan' | 'magenta' | 'yellow'
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: '</>',
    variant: 'cyan',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Three.js / R3F', level: 85 },
      { name: 'TailwindCSS', level: 92 },
      { name: 'Next.js', level: 80 },
      { name: 'Framer Motion', level: 88 },
    ],
  },
  {
    title: 'Backend',
    icon: '{}',
    variant: 'magenta',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 82 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'GraphQL', level: 75 },
      { name: 'REST APIs', level: 92 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '#',
    variant: 'yellow',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'Git', level: 95 },
      { name: 'Linux', level: 82 },
      { name: 'CI/CD', level: 78 },
      { name: 'AWS', level: 72 },
    ],
  },
]

function SkillBar({ name, level, variant }: { name: string; level: number; variant: 'cyan' | 'magenta' | 'yellow' }) {
  const glowColor = variant === 'cyan' ? '#00ffff' : variant === 'magenta' ? '#ff00ff' : '#ffff00'

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <div className="flex justify-between mb-1">
        <span className="font-mono text-xs text-gray-300">{name}</span>
        <span className="font-mono text-xs text-gray-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-cyber-dark/80 rounded-full overflow-hidden border border-cyber-border/30">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${glowColor}88, ${glowColor})`,
            boxShadow: `0 0 8px ${glowColor}66`,
          }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionHeading
            title="Skills & Tech"
            subtitle="// cat /etc/skills.conf"
            variant="cyan"
            className="text-center flex flex-col items-center"
          />
        </motion.div>

        {/* Staggered 3-column layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
          {skillCategories.map((category, catIdx) => (
            <div
              key={category.title}
              className={`w-full md:w-[30%] ${
                catIdx === 0
                  ? 'md:self-start md:mt-0'
                  : catIdx === 1
                    ? 'md:self-center md:mt-16'
                    : 'md:self-end md:mt-32'
              }`}
            >
              <HolographicCard variant={category.variant} delay={catIdx * 0.15}>
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className={`font-mono text-lg ${
                      category.variant === 'cyan' ? 'text-cyber-cyan' :
                      category.variant === 'magenta' ? 'text-cyber-magenta' : 'text-cyber-yellow'
                    }`}
                    style={{
                      textShadow: `0 0 8px ${
                        category.variant === 'cyan' ? '#00ffff' :
                        category.variant === 'magenta' ? '#ff00ff' : '#ffff00'
                      }`,
                    }}
                  >
                    {category.icon}
                  </span>
                  <h3 className={`font-display text-sm font-bold tracking-wider ${
                    category.variant === 'cyan' ? 'text-cyber-cyan' :
                    category.variant === 'magenta' ? 'text-cyber-magenta' : 'text-cyber-yellow'
                  }`}>
                    {category.title}
                  </h3>
                </div>

                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    variant={category.variant}
                  />
                ))}
              </HolographicCard>
            </div>
          ))}
        </div>

        {/* Additional skill tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mt-16"
        >
          {['WebGL', 'Blender', 'Figma', 'Redis', 'MongoDB', 'WebSocket', 'Nginx', 'Terraform'].map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1.5 border border-cyber-cyan/20 rounded-full
                         bg-cyber-surface/30 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50
                         transition-colors duration-300 cursor-default backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
