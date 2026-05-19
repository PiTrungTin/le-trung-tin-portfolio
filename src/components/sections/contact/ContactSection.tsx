import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { NeonButton } from '../../ui/NeonButton'

const socialLinks = [
  { name: 'GitHub', url: '#', icon: 'GH', variant: 'cyan' as const },
  { name: 'LinkedIn', url: '#', icon: 'LI', variant: 'magenta' as const },
  { name: 'Email', url: '#', icon: '@', variant: 'yellow' as const },
  { name: 'Twitter', url: '#', icon: 'TW', variant: 'cyan' as const },
]

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionHeading
            title="Get In Touch"
            subtitle="// ssh user@contact-form"
            variant="cyan"
          />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Social links — left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-48 flex-shrink-0 space-y-1"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, x: 5 }}
                className={`group flex items-center gap-3 border-l-2 pl-4 py-2.5 transition-all duration-300 cursor-pointer ${
                  link.variant === 'cyan' ? 'border-cyber-cyan/30 hover:border-cyber-cyan' :
                  link.variant === 'magenta' ? 'border-cyber-magenta/30 hover:border-cyber-magenta' :
                  'border-cyber-yellow/30 hover:border-cyber-yellow'
                }`}
              >
                <span
                  className={`font-mono text-base font-bold ${
                    link.variant === 'cyan' ? 'text-cyber-cyan' :
                    link.variant === 'magenta' ? 'text-cyber-magenta' : 'text-cyber-yellow'
                  }`}
                >
                  {link.icon}
                </span>
                <span className="font-mono text-sm text-gray-400 group-hover:text-white transition-colors">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form — right side, wider */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="flex-1 space-y-4"
          >
            <div>
              <label className="font-mono text-xs text-gray-500 mb-1 block">$USER</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                placeholder="your_name"
                className="w-full bg-cyber-dark/80 border border-cyber-cyan/20 p-3 font-mono text-sm text-white
                           focus:border-cyber-cyan/60 focus:outline-none transition-colors
                           placeholder:text-gray-600"
                style={{ boxShadow: 'inset 0 0 10px rgba(0,255,255,0.03)' }}
              />
            </div>

            <div>
              <label className="font-mono text-xs text-gray-500 mb-1 block">$EMAIL</label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                placeholder="you@domain.dev"
                className="w-full bg-cyber-dark/80 border border-cyber-magenta/20 p-3 font-mono text-sm text-white
                           focus:border-cyber-magenta/60 focus:outline-none transition-colors
                           placeholder:text-gray-600"
                style={{ boxShadow: 'inset 0 0 10px rgba(255,0,255,0.03)' }}
              />
            </div>

            <div>
              <label className="font-mono text-xs text-gray-500 mb-1 block">$MESSAGE</label>
              <textarea
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                placeholder="// write your message here..."
                className="w-full bg-cyber-dark/80 border border-cyber-yellow/20 p-3 font-mono text-sm text-white
                           focus:border-cyber-yellow/60 focus:outline-none transition-colors resize-none
                           placeholder:text-gray-600"
                style={{ boxShadow: 'inset 0 0 10px rgba(255,255,0,0.03)' }}
              />
            </div>

            <div className="flex items-center gap-4">
              <NeonButton variant="cyan" type="submit" disabled={submitted}>
                {submitted ? 'SENT // ✓' : 'SEND_TRANSMISSION'}
              </NeonButton>
              {submitted && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-cyber-cyan"
                >
                  Message transmitted successfully.
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
