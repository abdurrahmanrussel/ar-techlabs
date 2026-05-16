'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Layers, BrainCircuit, Workflow, LucideIcon } from 'lucide-react'
import { services } from '@/lib/data'
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'

const iconMap: Record<string, LucideIcon> = { Layers, BrainCircuit, Workflow }

export default function ServicesPreview() {
  const preview = services.slice(0, 3)

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="What We Build"
          title="Core"
          gradientTitle="Services"
          subtitle="End-to-end engineering from concept to production."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10"
        >
          {preview.map((service, i) => {
            const Icon = iconMap[service.iconName] ?? Layers
            const num = String(i + 1).padStart(2, '0')
            return (
              <AnimatedSection key={service.id} direction="up">
                <div className="h-full relative bg-navy-800 border border-navy-700 rounded-xl p-5 sm:p-6 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 group card-premium overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-slate-700 tracking-widest">{num}</span>
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 transition-all duration-300">
                      <Icon size={16} className="text-blue-400" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-navy-950 border border-navy-700 text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </motion.div>

        <AnimatedSection className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
          >
            View all 6 services →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
