import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface HolographicCardProps {
  children: ReactNode
  className?: string
  variant?: 'cyan' | 'magenta' | 'yellow'
  hover?: boolean
  delay?: number
}

const borderColors = {
  cyan: 'border-cyber-cyan/30 hover:border-cyber-cyan/60',
  magenta: 'border-cyber-magenta/30 hover:border-cyber-magenta/60',
  yellow: 'border-cyber-yellow/30 hover:border-cyber-yellow/60',
}

const glowColors = {
  cyan: 'rgba(0, 255, 255, 0.08)',
  magenta: 'rgba(255, 0, 255, 0.08)',
  yellow: 'rgba(255, 255, 0, 0.08)',
}

export function HolographicCard({
  children,
  className = '',
  variant = 'cyan',
  hover = true,
  delay = 0,
}: HolographicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02, transition: { duration: 0.2 } } : undefined}
      className={`relative border bg-cyber-surface/30 backdrop-blur-md ${borderColors[variant]} ${className}`}
      style={{
        boxShadow: `inset 0 0 30px ${glowColors[variant]}, 0 0 15px ${glowColors[variant]}`,
        clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
        padding: '2rem',
      }}
    >
      {/* Scanline sweep */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
        aria-hidden
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${variant === 'cyan' ? '#00ffff' : variant === 'magenta' ? '#ff00ff' : '#ffff00'}, transparent)`,
            animation: 'scanline-sweep 4s linear infinite',
          }}
        />
      </div>
      {children}
    </motion.div>
  )
}
