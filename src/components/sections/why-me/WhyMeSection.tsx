import { SectionHeading } from '../../ui/SectionHeading'

const strengths = [
  {
    title: 'I can own real product complexity',
    body: 'I have worked on hotel booking, tour creation, search, and operational workflows where mistakes affect real customers and business operations.',
  },
  {
    title: 'I am full-stack, but strong where it matters most',
    body: 'I can deliver across frontend and backend, but my strongest value is in backend logic, reliability, data flow, and system behavior under complex rules.',
  },
  {
    title: 'I do not stop at coding the happy path',
    body: 'I have worked on flexible tour customization, search performance, PDF and QR processing, and booking-related tooling where edge cases and operational detail matter.',
  },
  {
    title: 'I grow into ownership',
    body: 'I have moved from implementation into leadership responsibility, and I am comfortable helping teams move from technical detail to delivery outcomes.',
  },
  {
    title: 'I use AI as a practical engineering tool',
    body: 'I am familiar with using AI to speed up coding, debugging, exploration, and repetitive work while still keeping technical judgment in the loop.',
  },
]

export function WhyMeSection() {
  return (
    <div>
      <SectionHeading title="Why me" subtitle="Reasons to hire me" className="mx-auto mb-12 max-w-3xl text-center" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-lg leading-9 text-slate-700">
          I am most valuable in teams that need more than a task-by-task developer. I work well when the product is complex,
          the system has real business impact, and the team needs someone who can ship features while still thinking carefully
          about architecture, operations, and long-term maintainability.
        </p>

        <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
          {strengths.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-black/8 bg-white/70 px-5 py-5">
              <h3 className="font-serif text-xl leading-8 text-slate-950">{item.title}</h3>
              <p className="mt-3 text-base leading-8 text-slate-700">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
