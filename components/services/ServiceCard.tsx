import AnimatedSection from '@/components/ui/AnimatedSection'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  tags: string[]
}

export default function ServiceCard({ icon, title, description, tags }: ServiceCardProps) {
  return (
    <AnimatedSection direction="up">
      <div className="h-full bg-navy-800 border border-navy-700 rounded-xl p-8 hover:border-blue-500/30 transition-all group hover:-translate-y-1 duration-300">
        <div className="text-4xl mb-5">{icon}</div>
        <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-navy-950 border border-navy-700 text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
