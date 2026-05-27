import { useMemo } from 'react'

interface GlitchTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

export function GlitchText({ text, as: Tag = 'h1', className = '' }: GlitchTextProps) {
  const glitchStyle = useMemo(() => {
    const base = text.length % 7
    return {
      '--clip-top': `${12 + base * 2}%`,
      '--clip-bottom': `${70 + base}%`,
    }
  }, [text])

  return (
    <Tag
      className={`relative inline-block font-display ${className}`}
      data-text={text}
      style={{
        ...glitchStyle,
        textShadow:
          '0 10px 26px rgba(22, 158, 230, 0.22), ' +
          '1px 1px 0px rgba(249, 115, 82, 0.3), -1px -1px 0px rgba(22, 158, 230, 0.18)',
      }}
    >
      <span className="relative z-10">{text}</span>

      <span
        aria-hidden
        className="absolute inset-0 z-20 text-cyber-cyan/50"
        style={{ clipPath: 'inset(var(--clip-top) 0 0 0)', animation: 'flicker 4.5s infinite' }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-20 text-cyber-magenta/45"
        style={{ clipPath: 'inset(0 0 var(--clip-bottom) 0)', animation: 'flicker 4s infinite 0.2s' }}
      >
        {text}
      </span>
    </Tag>
  )
}
