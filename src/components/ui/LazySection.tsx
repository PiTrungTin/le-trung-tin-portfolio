import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LazySectionProps {
  id: string
  backgroundClassName: string
  children: ReactNode
}

export function LazySection({ id, backgroundClassName, children }: LazySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [shouldRender, setShouldRender] = useState(id === 'hero')

  useEffect(() => {
    if (shouldRender) return

    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '320px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [shouldRender])

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`px-6 py-20 sm:px-8 md:py-28 lg:px-12 lg:py-32 ${backgroundClassName}`}
    >
      <div className="mx-auto max-w-[920px]">
        {shouldRender ? (
          <Suspense fallback={<div className="min-h-[220px]" />}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </Suspense>
        ) : (
          <div className="min-h-[240px]" />
        )}
      </div>
    </section>
  )
}
