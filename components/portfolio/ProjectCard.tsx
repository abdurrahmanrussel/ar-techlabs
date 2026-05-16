import AnimatedSection from '@/components/ui/AnimatedSection'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  url: string | null
}

export default function ProjectCard({ title, description, tags, url }: ProjectCardProps) {
  return (
    <AnimatedSection direction="up">
      <div className="h-full relative bg-navy-800 border border-navy-700 rounded-2xl p-6 sm:p-7 md:p-8 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/8 hover:-translate-y-1 transition-all duration-300 group flex flex-col card-premium overflow-hidden">
        {/* Top glow accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status */}
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <div className={`w-1.5 h-1.5 rounded-full ${url ? 'bg-green-400 shadow-sm shadow-green-400/50' : 'bg-slate-600'}`} />
          <span className="text-xs text-slate-600 font-mono tracking-wide">
            {url ? 'live' : 'private'}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2 sm:mb-3 group-hover:text-purple-400 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5 sm:mb-6 flex-1">{description}</p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-navy-950 border border-navy-700 text-slate-400 group-hover:border-navy-600 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            View live project ↗
          </a>
        ) : (
          <span className="text-sm text-slate-600 font-mono">Private project</span>
        )}
      </div>
    </AnimatedSection>
  )
}
