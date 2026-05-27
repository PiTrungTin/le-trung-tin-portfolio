import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../../ui/SectionHeading'
import { NeonButton } from '../../ui/NeonButton'
import { HolographicCard } from '../../ui/HolographicCard'

const contactChannels = [
  { name: 'Phone', value: '(+84) 909 212 434', variant: 'cyan' as const },
  { name: 'LinkedIn', value: 'linkedin.com/in/le-tin1404', variant: 'magenta' as const },
  { name: 'Email', value: 'lttin144@gmail.com', variant: 'yellow' as const },
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
    <section id="contact" className="relative flex min-h-screen items-center py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[7%] top-24 h-40 w-40 rounded-full bg-cyan-100/25 blur-3xl" />
        <div className="absolute right-[10%] top-24 h-24 w-24 rotate-12 rounded-[24px] border border-orange-200/35" />
        <div className="absolute bottom-24 right-[14%] flex gap-2 opacity-45">
          <span className="h-3 w-3 rounded-full bg-cyan-200/75" />
          <span className="h-3 w-3 rounded-full bg-orange-200/75" />
          <span className="h-3 w-3 rounded-full bg-amber-200/75" />
        </div>
      </div>

      <div className="relative z-10 grid w-full gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start xl:grid-cols-[320px_minmax(0,1fr)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading title="Contact" subtitle="start a conversation" variant="cyan" />
          <div className="space-y-4">
            {contactChannels.map((channel) => (
              <HolographicCard key={channel.name} variant={channel.variant} className="bg-white/70 !p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">{channel.name}</p>
                <p className="mt-2 text-sm text-slate-600">{channel.value}</p>
              </HolographicCard>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <HolographicCard variant="cyan" className="bg-white/74">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Name</span>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-cyber-cyan"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Email</span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-cyber-magenta"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">Message</span>
              <textarea
                rows={6}
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                placeholder="Tell me what you are building and where you need help."
                className="w-full resize-none rounded-[24px] border border-slate-200 bg-white/90 px-4 py-4 text-sm leading-7 text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-cyber-yellow"
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <NeonButton variant="cyan" type="submit" disabled={submitted}>
                {submitted ? 'Message Sent' : 'Send Message'}
              </NeonButton>
              {submitted && (
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-cyber-cyan">
                  Message queued successfully
                </span>
              )}
            </div>
          </HolographicCard>
        </motion.form>
      </div>
    </section>
  )
}
