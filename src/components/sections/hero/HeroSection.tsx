import { motion } from 'framer-motion'
import { GlitchText } from '../../ui/GlitchText'
import { NeonButton } from '../../ui/NeonButton'
import { HolographicCard } from '../../ui/HolographicCard'

const highlights = [
  'Java, Spring Boot, NestJS, and event-driven backend services',
  'React, Vue.js, and booking flows shaped for real users',
  'Travel and hospitality systems focused on reliability and scale',
]

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[-4rem] top-20 h-56 w-56 rounded-full bg-cyan-200/18 blur-3xl" />
        <div className="absolute right-[18%] top-24 h-32 w-32 rotate-12 rounded-[32px] border border-cyan-200/35" />
        <div className="absolute bottom-24 left-[10%] h-px w-44 bg-[linear-gradient(90deg,rgba(22,158,230,0),rgba(22,158,230,0.55),rgba(22,158,230,0))]" />
      </div>

      <div className="relative z-10 grid w-full items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex max-w-full rounded-full border border-cyber-cyan/20 bg-white/70 px-4 py-2 font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-slate-600 backdrop-blur-xl sm:text-[11px]">
            Software engineer from Ho Chi Minh City, Vietnam
          </div>

          <GlitchText
            text="Le Trung Tin"
            as="h1"
            className="text-5xl font-black leading-[0.95] text-slate-900 sm:text-7xl md:text-[5.75rem]"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-5 max-w-2xl font-display text-lg uppercase leading-[1.4] tracking-[0.08em] text-cyber-cyan md:text-2xl"
          >
            Software Engineer | Java/Spring Boot, NestJS | React/Vue.js
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg"
          >
            Full-Stack Software Engineer with 4 years of experience in travel and hospitality.
            I specialize in reliable backend services, Kafka-driven systems, and interactive
            frontends with React and Vue.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-10 flex flex-wrap gap-3 md:gap-4"
          >
            <NeonButton
              variant="cyan"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Work
            </NeonButton>
            <NeonButton
              variant="magenta"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </NeonButton>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-2.5 md:gap-3">
            {['Spring Boot', 'NestJS', 'Kafka', 'Vue 3', 'React', 'Azure DevOps'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-slate-500 backdrop-blur-sm sm:text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="lg:justify-self-end lg:self-center"
        >
          <HolographicCard variant="cyan" className="bg-white/68">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Current focus</p>
            <h2 className="mt-4 font-display text-2xl uppercase leading-[1.2] tracking-[0.08em] text-slate-900">
              Reliable booking systems, scalable services, and clear frontend delivery
            </h2>
            <div className="mt-6 space-y-4">
              {highlights.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 font-mono text-[11px] text-cyber-cyan">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </section>
  )
}
