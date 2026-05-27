interface SectionHeadingProps {
  title: string
  subtitle?: string
  variant?: 'cyan' | 'magenta' | 'yellow'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  variant = 'cyan',
  className = '',
}: SectionHeadingProps) {
  const glowColor = variant === 'cyan' ? '#169ee6' : variant === 'magenta' ? '#f97352' : '#f3b63f'
  const textColor = variant === 'cyan' ? 'text-cyber-cyan' : variant === 'magenta' ? 'text-cyber-magenta' : 'text-cyber-yellow'

  return (
    <div className={`mb-12 ${className}`}>
      <h2
        className={`font-display text-4xl md:text-5xl font-bold leading-[1.05] tracking-[0.04em] ${textColor}`}
        style={{ textShadow: `0 8px 30px ${glowColor}33` }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 md:text-xs">{subtitle}</p>
      )}
      <div
        className="mt-5 h-[2px] w-28 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, rgba(255,255,255,0))`,
          boxShadow: `0 8px 24px ${glowColor}33`,
        }}
      />
    </div>
  )
}
