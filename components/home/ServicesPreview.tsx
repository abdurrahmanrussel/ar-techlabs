'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { services } from '@/lib/data'
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'

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
          {preview.map((service) => (
            <AnimatedSection key={service.id} direction="up">
              <div className="h-full bg-navy-800 border border-navy-700 rounded-xl p-5 sm:p-6 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 group card-premium">
                <div className="text-3xl mb-4">{service.icon}</div>
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
          ))}
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
