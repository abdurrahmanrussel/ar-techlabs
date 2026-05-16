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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
    >
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </motion.div>
  )
}
