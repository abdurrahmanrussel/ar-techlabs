import AnimatedSection from '@/components/ui/AnimatedSection'
import { contact } from '@/lib/data'

export default function Bio() {
  return (
    <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-20 sm:mb-24">
      {/* Text */}
      <div>
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 mb-4">
          About
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-100 mb-6 leading-tight">
          Md. Abdur Rahman
          <br />
          <span className="gradient-text-blue text-2xl font-bold">AR TechLabs</span>
        </h2>
        <div className="space-y-4 text-slate-400 leading-relaxed">
          <p>
            Full-stack engineer and AI systems architect building production software for ambitious products. AR TechLabs operates as a precision tech lab — not a generic agency.
          </p>
          <p>
            Specializing in SaaS platforms, multi-agent AI systems, and automation pipelines. Every project is engineered for scale, not just shipped to look good in a demo.
          </p>
          <p>
            Based in Bangladesh. Working globally.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-navy-700 text-slate-400 text-sm hover:border-blue-500/50 hover:text-slate-100 transition-all"
          >
            GitHub ↗
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-navy-700 text-slate-400 text-sm hover:border-blue-500/50 hover:text-slate-100 transition-all"
          >
            LinkedIn ↗
          </a>
          <a
            href={contact.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#14a800]/10 border border-[#14a800]/30 text-[#14a800] text-sm hover:bg-[#14a800]/20 transition-all"
          >
            Hire on Upwork ↗
          </a>
        </div>
      </div>

      {/* Info card */}
      <AnimatedSection direction="left" delay={0.2}>
        <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 sm:p-8 space-y-5">
          {[
            { label: 'Role', value: 'Full-Stack Engineer & AI Architect', href: undefined },
            { label: 'Location', value: 'Bangladesh 🇧🇩', href: undefined },
            { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
            { label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-xs font-mono text-slate-600 uppercase tracking-wider">{label}</span>
              {href ? (
                <a href={href} className="text-slate-300 text-sm hover:text-blue-400 transition-colors">
                  {value}
                </a>
              ) : (
                <span className="text-slate-300 text-sm">{value}</span>
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>
    </AnimatedSection>
  )
}
