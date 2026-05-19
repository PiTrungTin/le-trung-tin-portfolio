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
        const next = prev + Math.random() * 15 + 3
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setReady(true)
            setTimeout(() => setShow(false), 500)
          }, 300)
          return 100
        }
        return next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [setReady])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] bg-cyber-darker flex flex-col items-center justify-center"
        >
          {/* Scanlines on loading screen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.02) 2px, rgba(0,255,255,0.02) 4px)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1
              className="font-display text-4xl md:text-5xl font-black text-cyber-cyan mb-4"
              style={{ textShadow: '0 0 15px #00ffff, 0 0 40px #00ffff, 0 0 80px #00ffff66' }}
            >
              SYS_INIT
            </h1>

            <p className="font-mono text-xs text-cyber-magenta mb-8 tracking-widest">
              INITIALIZING NEURAL INTERFACE...
            </p>

            {/* Progress bar */}
            <div className="w-64 md:w-80 h-1 bg-cyber-surface/50 rounded-full overflow-hidden border border-cyber-cyan/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyber-cyan/60 to-cyber-cyan"
                style={{ boxShadow: '0 0 10px #00ffff' }}
              />
            </div>

            <div className="flex justify-between mt-2">
              <span className="font-mono text-[10px] text-gray-500">
                {progress < 100 ? 'LOADING_MODULES...' : 'READY'}
              </span>
              <span className="font-mono text-[10px] text-cyber-cyan">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Loading log lines */}
            <div className="mt-8 font-mono text-[10px] text-gray-600 space-y-1 text-left max-w-xs mx-auto">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: progress > 10 ? 1 : 0 }}>
                [OK] WebGL context initialized
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: progress > 25 ? 1 : 0 }}>
                [OK] Shader modules loaded (32/32)
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: progress > 50 ? 1 : 0 }}>
                [OK] Particle system online ({'>'}2000 nodes)
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: progress > 75 ? 1 : 0 }}>
                [OK] Post-processing pipeline ready
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: progress > 90 ? 1 : 0 }}>
                [OK] Neural network calibrated
              </motion.p>
              {progress >= 100 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyber-cyan">
                  [OK] System ready. Welcome, operator.
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
