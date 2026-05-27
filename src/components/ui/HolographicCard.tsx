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
  cyan: 'border-cyber-cyan/20 hover:border-cyber-cyan/45',
  magenta: 'border-cyber-magenta/20 hover:border-cyber-magenta/45',
  yellow: 'border-cyber-yellow/24 hover:border-cyber-yellow/50',
}

const glowColors = {
  cyan: 'rgba(22, 158, 230, 0.12)',
  magenta: 'rgba(249, 115, 82, 0.12)',
  yellow: 'rgba(243, 182, 63, 0.14)',
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
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`relative overflow-hidden rounded-[28px] border bg-cyber-surface/78 backdrop-blur-xl ${borderColors[variant]} ${className}`}
      style={{
        boxShadow: `0 24px 80px rgba(17, 50, 85, 0.08), inset 0 1px 0 rgba(255,255,255,0.75), inset 0 0 0 1px ${glowColors[variant]}`,
        padding: '2rem',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-x-0 top-0 h-px opacity-70"
          style={{
            background: `linear-gradient(90deg, transparent, ${variant === 'cyan' ? '#169ee6' : variant === 'magenta' ? '#f97352' : '#f3b63f'}, transparent)`,
            animation: 'scanline-sweep 4s linear infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.34), transparent 38%, rgba(255,255,255,0.12) 100%)',
          }}
        />
      </div>
      {children}
    </motion.div>
  )
}
