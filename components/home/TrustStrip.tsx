'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/components/ui/AnimatedSection'

const metrics = [
  { value: '6+', label: 'Live products shipped' },
  { value: '3+', label: 'Years building in production' },
  { value: '100%', label: 'Client satisfaction rate' },
  { value: '<2s', label: 'AI pipeline latency target' },
]

export default function TrustStrip() {
  return (
    <section className="border-y border-navy-700 bg-navy-900/60 backdrop-blur-sm">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {metrics.map(({ value, label }) => (
          <motion.div
            key={label}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="text-center"
          >
            <div className="text-2xl sm:text-3xl font-black text-slate-100 mb-1 gradient-text">{value}</div>
            <div className="text-xs text-slate-500 leading-snug">{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
