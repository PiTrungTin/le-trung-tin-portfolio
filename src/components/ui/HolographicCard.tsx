import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface HolographicCardProps {
  children: ReactNode
  className?: string
  variant?: 'cyan' | 'magenta' | 'yellow'
  hover?: boolean
  delay?: number
}

export function HolographicCard({
  children,
  className = '',
  hover = false,
  delay = 0,
}: HolographicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay }}
      whileHover={hover ? { y: -2, transition: { duration: 0.18 } } : undefined}
      className={`rounded-[28px] border border-black/8 bg-white p-6 md:p-8 ${className}`}
      style={{ boxShadow: '0 20px 50px rgba(15, 23, 42, 0.05)' }}
    >
      {children}
    </motion.div>
  )
}
