'use client'

import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import ProjectCard from './ProjectCard'
import { staggerContainer } from '@/components/ui/AnimatedSection'

export default function PortfolioGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </motion.div>
  )
}
