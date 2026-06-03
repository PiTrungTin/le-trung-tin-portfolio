import { NeonButton } from '../../ui/NeonButton'

const stackTags = ['Java', 'Spring Boot', 'Vue.js', 'Python', 'MySQL', 'ElasticSearch']

export function HeroSection() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-sm tracking-[0.02em] text-slate-500">
        Software Engineer / Ho Chi Minh City, Vietnam
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="font-serif text-4xl leading-none text-slate-950 md:text-5xl">Hi,</span>
        <img
          src="/welcome-transparent.gif"
          alt="Welcome"
          className="h-24 w-auto object-contain md:h-28"
        />
      </div>

      <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-slate-950 md:text-7xl">
        If you want work done efficiently and with real attention to detail, I am the engineer you hire.
      </h1>

      <div className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-9 text-slate-700">
        <p>
          I am a full-stack software engineer with 4+ years of experience building hotel booking,
          tour creation, and travel commerce systems for enterprise and product teams.
        </p>
        <p>
          My work spans multi-vendor microservice platforms, search performance improvements,
          flexible tour customization flows, and internal tools that help operations teams map
          bookings and responses back to the right order quickly and accurately.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
        {stackTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/80 px-3 py-1 text-sm text-slate-600 ring-1 ring-black/8"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <NeonButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          View projects
        </NeonButton>
        <NeonButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Contact
        </NeonButton>
      </div>
    </div>
  )
}
