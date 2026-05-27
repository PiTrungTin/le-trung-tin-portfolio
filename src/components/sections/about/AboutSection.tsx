import { SectionHeading } from '../../ui/SectionHeading'

export function AboutSection() {
  return (
    <div>
      <SectionHeading title="About" subtitle="Profile" className="mx-auto mb-12 max-w-3xl text-center" />

      <div className="mx-auto max-w-3xl space-y-6 text-center text-lg leading-9 text-slate-700">
        <p>
          I work across backend services, frontend applications, and delivery coordination when a team needs
          someone who can move between architecture, implementation, and practical execution.
        </p>
        <p>
          Most of my experience has been in travel and hospitality systems, where correctness matters every day:
          pricing, search, booking, notifications, and downstream operational workflows all need to stay reliable.
        </p>
        <p>
          I care about maintainability, clear system boundaries, and building software that remains understandable
          for both engineers and product teams as the system grows.
        </p>
      </div>
    </div>
  )
}
