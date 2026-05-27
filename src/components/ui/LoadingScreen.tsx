import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store/useStore'

export function LoadingScreen() {
  const setReady = useStore((s) => s.setReady)
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 4
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setReady(true)
            setTimeout(() => setShow(false), 450)
          }, 220)
          return 100
        }
        return next
      })
    }, 100)

    return () => clearInterval(interval)
  }, [setReady])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#e7f0fb_100%)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(118,215,255,0.35),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,170,133,0.28),transparent_22%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-[min(88vw,420px)] rounded-[32px] border border-white/70 bg-white/72 p-8 text-center shadow-[0_32px_90px_rgba(23,50,77,0.14)] backdrop-blur-xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyber-cyan/30 bg-sky-50 shadow-[0_16px_36px_rgba(22,158,230,0.16)]">
              <div className="h-8 w-8 rounded-xl border border-cyber-cyan/40 bg-white" />
            </div>

            <h1 className="font-display text-3xl font-black tracking-[0.18em] text-slate-800 md:text-4xl">
              PORTFOLIO
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.35em] text-slate-500">
              preparing the robot guide
            </p>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-200/80">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full bg-[linear-gradient(90deg,#169ee6,#79d8ff,#f3b63f)]"
              />
            </div>

            <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
              <span>{progress < 100 ? 'syncing sections' : 'ready'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
