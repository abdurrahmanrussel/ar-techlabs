'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'

export default function PortfolioTeaser() {
  const teaser = projects.slice(0, 3)

  return (
    <section className="py-24 bg-navy-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Recent Work"
          title="Live"
          gradientTitle="Projects"
          subtitle="Real products. Real users. Real impact."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {teaser.map((project) => (
            <AnimatedSection key={project.id} direction="up">
              <div className="h-full bg-navy-800 border border-navy-700 rounded-xl p-6 hover:border-purple-500/30 transition-colors group flex flex-col">
                <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-navy-950 border border-navy-700 text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View live ↗
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </motion.div>

        <AnimatedSection className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors"
          >
            View all 6 projects →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
