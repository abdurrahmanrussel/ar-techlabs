'use client'

import { motion } from 'framer-motion'
import { techStack } from '@/lib/data'
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'

export default function TechStack() {
  return (
    <div>
      <SectionHeader
        label="Technology"
        title="Full"
        gradientTitle="Tech Stack"
        subtitle="The tools used to build and ship every project."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {Object.entries(techStack).map(([category, techs]) => (
          <AnimatedSection key={category} direction="up">
            <div className="bg-navy-800 border border-navy-700 rounded-xl p-5 sm:p-6 h-full hover:border-blue-500/20 transition-colors">
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-blue-400 mb-4">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md bg-navy-950 border border-navy-700 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </motion.div>
    </div>
  )
}
