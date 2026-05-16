'use client'

import { motion } from 'framer-motion'
import { services } from '@/lib/data'
import ServiceCard from './ServiceCard'
import { staggerContainer } from '@/components/ui/AnimatedSection'

export default function ServicesGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-24"
    >
      {services.map((service, i) => (
        <ServiceCard key={service.id} {...service} index={i} />
      ))}
    </motion.div>
  )
}
