import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../../store/useStore'
import { projects } from '../../../content/projects'

export function ProjectModal() {
  const activeProject = useStore((s) => s.activeProject)
  const setActiveProject = useStore((s) => s.setActiveProject)
  const project = activeProject !== null ? projects[activeProject] : null

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-8"
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl rounded-[28px] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-6 top-6 text-sm text-slate-500 hover:text-slate-900"
              aria-label="Close project modal"
            >
              Close
            </button>

            <p className="text-sm text-slate-500">{project.eyebrow}</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-slate-950">
              {project.name}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">{project.summary}</p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-2 text-base leading-8 text-slate-700">{project.role}</p>

                <p className="mt-8 text-sm text-slate-500">Highlights</p>
                <div className="mt-3 space-y-3">
                  {project.details.map((detail) => (
                    <p key={detail} className="text-base leading-8 text-slate-700">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500">Outcome</p>
                <p className="mt-2 text-base leading-8 text-slate-700">{project.outcome}</p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full bg-[#f5f5f4] px-3 py-1 text-sm text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
