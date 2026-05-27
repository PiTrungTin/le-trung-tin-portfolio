interface SectionHeadingProps {
  title: string
  subtitle?: string
  variant?: 'cyan' | 'magenta' | 'yellow'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${className}`}>
      {subtitle && (
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-4xl leading-tight text-slate-950 md:text-5xl">
        {title}
      </h2>
    </div>
  )
}
