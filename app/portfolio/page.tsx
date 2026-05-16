import type { Metadata } from 'next'
import SectionHeader from '@/components/ui/SectionHeader'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Live projects built by AR TechLabs — SaaS platforms, AI agent systems, and automation pipelines.',
}

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="py-16 max-w-2xl">
          <SectionHeader
            label="Our Work"
            title="Projects Built"
            gradientTitle="& Shipped"
            subtitle="6 live projects across SaaS, AI, and automation. Each one production-grade."
          />
        </div>
        <PortfolioGrid />
      </div>
    </div>
  )
}
