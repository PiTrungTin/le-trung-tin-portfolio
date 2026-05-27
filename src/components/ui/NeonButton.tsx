import { type ButtonHTMLAttributes } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'yellow'
  children: React.ReactNode
}

const variantStyles = {
  cyan: {
    border: '#169ee6',
    glow: '#169ee6',
    bg: 'linear-gradient(135deg, rgba(22, 158, 230, 0.18), rgba(255, 255, 255, 0.9))',
    text: '#0f4f7f',
  },
  magenta: {
    border: '#f97352',
    glow: '#f97352',
    bg: 'linear-gradient(135deg, rgba(249, 115, 82, 0.18), rgba(255, 255, 255, 0.92))',
    text: '#8b3e28',
  },
  yellow: {
    border: '#f3b63f',
    glow: '#f3b63f',
    bg: 'linear-gradient(135deg, rgba(243, 182, 63, 0.18), rgba(255, 255, 255, 0.92))',
    text: '#7d5a10',
  },
}

export function NeonButton({
  variant = 'cyan',
  children,
  className = '',
  style,
  ...props
}: NeonButtonProps) {
  const v = variantStyles[variant]

  return (
    <button
      className={`font-mono text-sm tracking-[0.16em] uppercase px-7 py-3.5 cursor-pointer rounded-full
        transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      style={{
        color: v.text,
        background: v.bg,
        border: `1px solid ${v.border}`,
        boxShadow: `0 16px 32px ${v.glow}22, inset 0 1px 0 rgba(255,255,255,0.75)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
