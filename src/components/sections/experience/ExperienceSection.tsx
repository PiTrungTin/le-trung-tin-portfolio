import { SectionHeading } from '../../ui/SectionHeading'

const experiences = [
  {
    year: 'Oct 2024 - Present',
    role: 'Middle Software Engineer',
    company: 'Hanatour Japan System',
    desc: 'Own frontend architecture and booking-related product implementation while also contributing to performance improvements around high-traffic travel workflows.',
  },
  {
    year: 'Sep 2022 - Sep 2024',
    role: 'Full-Stack Software Engineer',
    company: 'FPT Software',
    desc: 'Worked across Spring Boot services, NestJS microservices, Kafka workflows, and React or Vue interfaces for travel products with real operational complexity.',
  },
  {
    year: 'Ongoing',
    role: 'Technical Coordination',
    company: 'Cross-team support and reliability',
    desc: 'Support delivery by unblocking technical issues, reviewing code quality, and applying reliability patterns such as idempotency and dead-letter handling.',
  },
]

export function ExperienceSection() {
  return (
    <div>
      <SectionHeading title="Experience" subtitle="Career" className="mx-auto mb-14 max-w-3xl text-center" />

      <div className="mx-auto max-w-4xl space-y-12">
        {experiences.map((item) => (
          <div key={item.role} className="grid gap-4 border-b border-black/8 pb-12 text-center lg:grid-cols-[180px_minmax(0,1fr)] lg:text-left">
            <p className="text-sm text-slate-500">{item.year}</p>
            <div className="mx-auto max-w-3xl lg:mx-0">
              <h3 className="font-serif text-2xl text-slate-950">{item.role}</h3>
              <p className="mt-2 text-base text-slate-600">{item.company}</p>
              <p className="mt-5 text-base leading-8 text-slate-700">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
