import { SectionHeading } from '../../ui/SectionHeading'

const skillGroups = [
  {
    title: 'Backend',
    items: ['Java', 'Spring Boot', 'NestJS', 'Kafka', 'Redis', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'Vue.js', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Systems',
    items: ['Microservices', 'Idempotency', 'DLQ patterns', 'ElasticSearch', 'Azure DevOps'],
  },
]

export function SkillsSection() {
  return (
    <div>
      <SectionHeading title="Skills" subtitle="Core stack" className="mx-auto mb-14 max-w-3xl text-center" />

      <div className="mx-auto grid max-w-5xl gap-12 text-center md:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-serif text-2xl text-slate-950">{group.title}</h3>
            <div className="mt-5 space-y-4">
              {group.items.map((item) => (
                <p key={item} className="border-b border-black/8 pb-4 text-base text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
