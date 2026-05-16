import AnimatedSection from './AnimatedSection'

interface SectionHeaderProps {
  label?: string
  title: string
  gradientTitle?: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeader({
  label,
  title,
  gradientTitle,
  subtitle,
  center = false,
}: SectionHeaderProps) {
  const align = center ? 'text-center items-center' : ''

  return (
    <AnimatedSection className={`flex flex-col gap-3 mb-12 ${align}`}>
      {label && (
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400">
          {label}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-100 leading-tight">
        {title}{' '}
        {gradientTitle && (
          <span className="gradient-text">{gradientTitle}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base max-w-xl">{subtitle}</p>
      )}
    </AnimatedSection>
  )
}
