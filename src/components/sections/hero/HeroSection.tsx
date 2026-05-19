import { motion } from 'framer-motion'
import { GlitchText } from '../../ui/GlitchText'
import { NeonButton } from '../../ui/NeonButton'

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center z-10 px-4"
      >
        <GlitchText
          text="LÊ TRUNG TÍN"
          as="h1"
          className="text-5xl sm:text-7xl md:text-8xl font-black text-cyber-cyan mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-mono text-lg md:text-2xl text-cyber-magenta mb-4"
          style={{ textShadow: '0 0 8px #ff00ff, 0 0 20px #ff00ff' }}
        >
          Full-Stack Developer 
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="font-mono text-gray-400 text-base md:text-lg max-w-lg mx-auto mb-10"
        >
          Full-Stack Software Engineer with 4 years of experience in travel and hospitality. Specialized in building reliable backend services
          (Java/Spring Boot, NestJS), event-driven systems (Kafka), and interactive frontends (Vue.js, React). Experienced in leading small teams and
          coordinating technical tasks to meet real-world business goals with a focus on reliability and scalability
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <NeonButton variant="cyan" onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            View Projects
          </NeonButton>
          <NeonButton variant="magenta" onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Get In Touch
          </NeonButton>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cyber-cyan/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-3 bg-cyber-cyan/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
