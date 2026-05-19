import { useMemo } from 'react'

interface GlitchTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

export function GlitchText({ text, as: Tag = 'h1', className = '' }: GlitchTextProps) {
  const glitchStyle = useMemo(() => ({
    '--clip-top': `${Math.random() * 40 + 5}%`,
    '--clip-bottom': `${Math.random() * 30 + 60}%`,
  }), [])

  return (
    <Tag
      className={`relative inline-block font-display ${className}`}
      data-text={text}
      style={{
        ...glitchStyle,
        textShadow:
          '0 0 10px #00ffff, 0 0 40px #00ffff, 0 0 80px #00ffff, ' +
          '2px 2px 0px #ff00ff, -2px -2px 0px #00ffff',
      }}
    >
      <span className="relative z-10">{text}</span>

      {/* Glitch clone layers */}
      <span
        aria-hidden
        className="absolute inset-0 z-20 text-cyber-cyan"
        style={{ clipPath: 'inset(var(--clip-top) 0 0 0)', animation: 'flicker 3s infinite' }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-20 text-cyber-magenta"
        style={{ clipPath: 'inset(0 0 var(--clip-bottom) 0)', animation: 'flicker 2.5s infinite 0.2s' }}
      >
        {text}
      </span>
    </Tag>
  )
}
