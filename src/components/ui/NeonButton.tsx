import { type ButtonHTMLAttributes } from 'react'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'magenta' | 'yellow'
  children: React.ReactNode
}

export function NeonButton({
  variant = 'cyan',
  children,
  className = '',
  style,
  ...props
}: NeonButtonProps) {
  void variant

  return (
    <button
      className={`rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-900 transition-colors hover:bg-slate-900 hover:text-white ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  )
}
