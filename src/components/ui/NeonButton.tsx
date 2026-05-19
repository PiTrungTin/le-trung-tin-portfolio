import { type ButtonHTMLAttributes } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'yellow'
  children: React.ReactNode
}

const variantStyles = {
  cyan: {
    border: '#00ffff',
    glow: '#00ffff',
    bg: 'rgba(0, 255, 255, 0.05)',
    text: '#00ffff',
  },
  magenta: {
    border: '#ff00ff',
    glow: '#ff00ff',
    bg: 'rgba(255, 0, 255, 0.05)',
    text: '#ff00ff',
  },
  yellow: {
    border: '#ffff00',
    glow: '#ffff00',
    bg: 'rgba(255, 255, 0, 0.05)',
    text: '#ffff00',
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
      className={`font-mono text-sm tracking-widest uppercase px-8 py-3 cursor-pointer
        transition-all duration-300
        hover:scale-105 hover:brightness-125
        active:scale-95 ${className}`}
      style={{
        color: v.text,
        background: v.bg,
        border: `1px solid ${v.border}`,
        boxShadow: `0 0 10px ${v.glow}, 0 0 20px ${v.glow}, inset 0 0 10px ${v.glow}22`,
        clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
