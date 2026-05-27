export interface ProjectEntry {
  name: string
  eyebrow: string
  summary: string
  role: string
  outcome: string
  tech: string[]
  details: string[]
  color: 'cyan' | 'magenta' | 'yellow'
}

export const projects: ProjectEntry[] = [
  {
    name: 'Vue 3 Frontend Initialization',
    eyebrow: 'Frontend architecture',
    summary: 'Established a modular Vue 3 foundation for booking-related product flows at Hanatour Japan System.',
    role: 'I led the frontend initialization, set module boundaries, and shaped reusable patterns for booking features that needed to scale without turning into a one-off codebase.',
    outcome: 'The result was a cleaner starting point for delivery teams, with more consistent state flow and lower friction when adding new product modules.',
    tech: ['Vue 3', 'TypeScript', 'State Management', 'Booking Modules'],
    details: [
      'Defined a reusable structure for booking-facing modules instead of feature-by-feature setup.',
      'Reduced early architectural drift by standardizing patterns around shared state and composition.',
      'Set the project up for longer-term maintainability as more travel flows were added.',
    ],
    color: 'cyan',
  },
  {
    name: 'Tour Builder Logic',
    eyebrow: 'Complex product flow',
    summary: 'Implemented business-rule-heavy tour configuration with dynamic pricing and product-specific booking behavior.',
    role: 'I translated product rules into frontend logic that could handle combinational options, pricing changes, and constraints without breaking the booking journey.',
    outcome: 'This made a high-variance flow more reliable for users and easier for the team to evolve as business rules changed.',
    tech: ['Business Rules', 'Pricing Logic', 'UX Flow', 'Travel Products'],
    details: [
      'Mapped product-specific configuration rules into predictable UI and state transitions.',
      'Handled pricing updates and dependent selections in ways that matched real booking workflows.',
      'Balanced flexibility for the business with a frontend implementation that stayed maintainable.',
    ],
    color: 'magenta',
  },
  {
    name: 'NestJS Microservices Migration',
    eyebrow: 'Backend modernization',
    summary: 'Moved legacy modules toward NestJS service boundaries to improve maintainability and delivery speed.',
    role: 'I worked on separating responsibilities from older implementations into clearer service boundaries, while keeping behavior stable during the transition.',
    outcome: 'The migration made modules easier to reason about, scale, and extend without carrying monolithic coupling forward.',
    tech: ['NestJS', 'Microservices', 'Service Boundaries', 'Refactoring'],
    details: [
      'Separated legacy responsibilities into cleaner service-level units.',
      'Improved maintainability by reducing tight coupling inside older modules.',
      'Created a more practical path for future scaling and feature delivery.',
    ],
    color: 'yellow',
  },
  {
    name: 'Kafka Reliability Patterns',
    eyebrow: 'Operational resilience',
    summary: 'Built background processing flows with Kafka, idempotency protections, and dead-letter handling for sensitive travel operations.',
    role: 'I implemented event-driven processing for confirmations and notifications, then hardened the flow against duplicates, retries, and failure cases.',
    outcome: 'This reduced duplicate processing risk and improved confidence in high-sensitivity operational workflows tied to third-party travel integrations.',
    tech: ['Kafka', 'Idempotency', 'DLQ', 'Travel APIs'],
    details: [
      'Introduced idempotent processing to prevent duplicate downstream actions.',
      'Added dead-letter handling so failures could be isolated and recovered safely.',
      'Integrated external travel APIs while keeping background workflows operationally safer.',
    ],
    color: 'cyan',
  },
]
