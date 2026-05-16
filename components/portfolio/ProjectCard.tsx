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
      <div className="h-full bg-navy-800 border border-navy-700 rounded-xl p-8 hover:border-purple-500/30 transition-all group hover:-translate-y-1 duration-300 flex flex-col">
        {/* Status dot */}
        <div className="flex items-center gap-2 mb-5">
          <div className={`w-2 h-2 rounded-full ${url ? 'bg-green-400' : 'bg-slate-600'}`} />
          <span className="text-xs text-slate-600 font-mono">
            {url ? 'live' : 'private'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-navy-950 border border-navy-700 text-slate-400"
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
          <span className="text-sm text-slate-600">Private project</span>
        )}
      </div>
    </AnimatedSection>
  )
}
