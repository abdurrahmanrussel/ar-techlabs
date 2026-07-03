'use client'

import { Layers, BrainCircuit, Workflow, Plug, Cloud, Cpu, MessageCircle, LucideIcon } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const iconMap: Record<string, LucideIcon> = {
  Layers,
  BrainCircuit,
  Workflow,
  Plug,
  Cloud,
  Cpu,
  MessageCircle,
}

interface ServiceCardProps {
  iconName: string
  title: string
  description: string
  tags: string[]
  index: number
}

export default function ServiceCard({ iconName, title, description, tags, index }: ServiceCardProps) {
  const Icon = iconMap[iconName] ?? Layers
  const num = String(index + 1).padStart(2, '0')

  return (
    <AnimatedSection direction="up">
      <div className="h-full relative bg-navy-800 border border-navy-700 rounded-2xl p-6 sm:p-7 md:p-8 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/8 hover:-translate-y-1 transition-all duration-300 group card-premium overflow-hidden">
        {/* Top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Number + Icon row */}
        <div className="flex items-start justify-between mb-5">
          <span className="text-[11px] font-mono font-bold text-slate-700 tracking-widest">{num}</span>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 group-hover:border-blue-500/35 transition-all duration-300">
            <Icon size={18} className="text-blue-400" strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5 sm:mb-6">{description}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-navy-950 border border-navy-700 text-slate-500 group-hover:border-navy-600 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
