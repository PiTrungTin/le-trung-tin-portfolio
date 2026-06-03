import { SectionHeading } from '../../ui/SectionHeading'

const experiences = [
  {
    year: '2024 - Present',
    role: 'Full-Stack Developer',
    company: 'Hanatour System Japan',
    desc: 'Working across Hanamade and Gorilla, two travel platforms with different product models. My work includes building a new Vue.js frontend from scratch, contributing to Spring Boot backend services, improving search performance with ElasticSearch, supporting database design, and solving operational workflows such as PDF and QR-based response mapping.',
  },
  {
    year: '2022 - 2024',
    role: 'Full-Stack Developer to Project Leader',
    company: 'Ascotts / Capitaland project',
    desc: 'Worked on a hotel booking platform in a multi-vendor microservice environment using AEM, Vue.js, Spring Boot, and SQL Server. During the project, I grew from a full-stack developer into a leadership role while coordinating delivery across a more complex team structure.',
  },
]

export function ExperienceSection() {
  return (
    <div>
      <SectionHeading title="Experience" subtitle="Career" className="mx-auto mb-14 max-w-3xl text-center" />

      <div className="mx-auto max-w-4xl space-y-12">
        {experiences.map((item) => (
          <div key={`${item.company}-${item.year}`} className="grid gap-4 border-b border-black/8 pb-12 text-center lg:grid-cols-[180px_minmax(0,1fr)] lg:text-left">
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
