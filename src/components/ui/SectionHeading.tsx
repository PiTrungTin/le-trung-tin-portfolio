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
  const glowColor = variant === 'cyan' ? '#00ffff' : variant === 'magenta' ? '#ff00ff' : '#ffff00'
  const textColor = variant === 'cyan' ? 'text-cyber-cyan' : variant === 'magenta' ? 'text-cyber-magenta' : 'text-cyber-yellow'

  return (
    <div className={`mb-12 ${className}`}>
      <h2
        className={`font-display text-4xl md:text-5xl font-bold ${textColor}`}
        style={{ textShadow: `0 0 10px ${glowColor}, 0 0 30px ${glowColor}44` }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-gray-400 mt-3 text-sm tracking-wide">{subtitle}</p>
      )}
      <div
        className="mt-4 h-[1px] w-24"
        style={{
          background: `linear-gradient(90deg, ${glowColor}, transparent)`,
          boxShadow: `0 0 6px ${glowColor}`,
        }}
      />
    </div>
  )
}
