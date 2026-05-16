import type { Metadata } from 'next'
import Bio from '@/components/about/Bio'
import TechStack from '@/components/about/TechStack'

export const metadata: Metadata = {
  title: 'About',
  description: 'Md. Abdur Rahman — full-stack engineer and AI systems architect behind AR TechLabs.',
}

export default function AboutPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Bio />
        <TechStack />
      </div>
    </div>
  )
}
