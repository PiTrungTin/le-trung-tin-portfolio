import { NeonButton } from '../../ui/NeonButton'

export function HeroSection() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)] lg:items-end">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <p className="text-sm tracking-[0.02em] text-slate-500">
            Software Engineer / Ho Chi Minh City, Vietnam
          </p>
          <div className="mt-5 flex items-center justify-center gap-3 lg:justify-start">
            <span className="font-serif text-4xl leading-none text-slate-950 md:text-5xl">Hi,</span>
            <img
              src="/welcome-transparent.gif"
              alt="Welcome"
              className="h-24 w-auto object-contain md:h-28"
            />
          </div>
          <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-slate-950 md:text-7xl">
            I build reliable backend systems and clear product-facing software.
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-9 text-slate-700">
            <p>
              I am a backend and full-stack software engineer with 4+ years of experience across travel,
              booking, and operational systems.
            </p>
            <p>
              My strongest work is in Java, Spring Boot, NestJS, Kafka, React, and Vue.js, especially when
              the product needs to stay stable under complex business rules.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
            <NeonButton onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View projects
            </NeonButton>
            <NeonButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact
            </NeonButton>
          </div>
        </div>

        <div className="mx-auto max-w-md space-y-7 text-center lg:mx-0 lg:text-left">
          <div className="border-t border-black/10 pt-5">
            <p className="text-sm text-slate-500">Focus</p>
            <p className="mt-2 text-base leading-7 text-slate-800">
              Backend engineering, event-driven systems, and product delivery.
            </p>
          </div>
          <div className="border-t border-black/10 pt-5">
            <p className="text-sm text-slate-500">Core stack</p>
            <p className="mt-2 text-base leading-7 text-slate-800">
              Java, Spring Boot, NestJS, Kafka, React, Vue.js.
            </p>
          </div>
          <div className="border-t border-black/10 pt-5">
            <p className="text-sm text-slate-500">Domain</p>
            <p className="mt-2 text-base leading-7 text-slate-800">
              Travel, hospitality, booking flows, and operational systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
