import type { Metadata } from 'next'
import Link from 'next/link'
import ServicesGrid from '@/components/services/ServicesGrid'
import PricingTiers from '@/components/services/PricingTiers'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Facebook page automation, full-stack SaaS development, AI agent systems, automation workflows, API development, cloud deployment, and LLM integration.',
}

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 sm:py-16 max-w-2xl">
          <SectionHeader
            label="What We Offer"
            title="Services Built for"
            gradientTitle="Production"
            subtitle="Every service is delivered as a complete, production-ready solution — not a prototype."
          />
        </div>

        <ServicesGrid />

        <PricingTiers />

        <AnimatedSection className="bg-linear-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-7 sm:p-10 text-center">
          <h3 className="text-2xl font-black text-slate-100 mb-3">
            Ready to build something?
          </h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Describe your project and I&apos;ll tell you how we can build it.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
          >
            Start a Project →
          </Link>
        </AnimatedSection>
      </div>
    </div>
  )
}
