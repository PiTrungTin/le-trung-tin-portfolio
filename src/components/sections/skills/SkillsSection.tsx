import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { HolographicCard } from '../../ui/HolographicCard'

const skillColumns = [
  {
    title: 'Languages',
    variant: 'cyan' as const,
    items: ['JavaScript', 'TypeScript', 'Java', 'SQL', 'Python'],
  },
  {
    title: 'Backend',
    variant: 'magenta' as const,
    items: ['Spring Boot', 'Node.js', 'NestJS', 'Kafka', 'Redis', 'CQRS'],
  },
  {
    title: 'Frontend & Cloud',
    variant: 'yellow' as const,
    items: ['React.js', 'Next.js', 'Vue.js (Vuex)', 'Tailwind CSS', 'Azure DevOps', 'App Service'],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative flex min-h-screen items-center py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[5%] top-28 h-28 w-28 rounded-full border border-cyan-200/35" />
        <div className="absolute right-[10%] top-20 grid grid-cols-4 gap-3 opacity-40">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-cyan-200/70" />
          ))}
        </div>
        <div className="absolute bottom-24 right-[8%] h-48 w-48 rounded-[36px] border border-amber-200/30" />
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <SectionHeading title="Stack" subtitle="toolkit and working strengths" variant="cyan" />
          <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            These are the technologies I use most often in production work, especially across
            backend services, booking flows, and operational systems in travel products.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {skillColumns.map((column, index) => (
            <HolographicCard key={column.title} variant={column.variant} delay={0.12 * index} className="bg-white/72">
              <p className="font-display text-2xl uppercase leading-[1.2] tracking-[0.08em] text-slate-900">{column.title}</p>
              <div className="mt-6 space-y-3">
                {column.items.map((item, itemIndex) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/65 px-4 py-3">
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">
                      0{itemIndex + 1}
                    </span>
                    <span className="min-w-0 text-sm leading-6 text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </HolographicCard>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5 md:gap-3">
          {['PostgreSQL', 'MySQL', 'ElasticSearch', 'Microservices', 'Idempotency', 'Saga Pattern'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/70 bg-white/70 px-3.5 py-2 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-slate-500 shadow-[0_12px_26px_rgba(23,50,77,0.06)] sm:text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
