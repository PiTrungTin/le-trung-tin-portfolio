import { SectionHeading } from '../../ui/SectionHeading'
import { projects } from '../../../content/projects'
import { useStore } from '../../../store/useStore'

export function ProjectsSection() {
  return (
    <div>
      <SectionHeading title="Projects" subtitle="Selected work" className="mx-auto mb-14 max-w-3xl text-center" />

      <div className="mx-auto max-w-5xl space-y-12">
        {projects.map((project, index) => (
          <button
            key={project.name}
            onClick={() => useStore.getState().setActiveProject(index)}
            className="group w-full border-b border-black/8 pb-12 text-center transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-3 lg:justify-between">
              <p className="text-sm text-slate-500">{project.eyebrow}</p>
              <span className="inline-flex items-center gap-2 text-sm text-slate-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                View details
                <span aria-hidden>↗</span>
              </span>
            </div>
            <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:text-left">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h3 className="font-serif text-3xl leading-tight text-slate-950 transition-colors duration-200 group-hover:text-slate-700">
                  {project.name}
                </h3>
                <p className="mt-5 text-base leading-8 text-slate-700">{project.summary}</p>
              </div>
              <p className="mx-auto max-w-[280px] text-sm leading-7 text-slate-500 lg:mx-0">{project.outcome}</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/80 px-3 py-1 text-sm text-slate-600 ring-1 ring-black/8 transition-colors duration-200 group-hover:bg-white group-hover:text-slate-900"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex justify-center lg:justify-start">
              <span className="rounded-full border border-black/10 px-4 py-2 text-sm text-slate-500 transition-colors duration-200 group-hover:border-black/20 group-hover:text-slate-900">
                Click to open case study
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
