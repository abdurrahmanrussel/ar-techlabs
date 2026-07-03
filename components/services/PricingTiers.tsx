'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { automationPricing } from '@/lib/data'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'

export default function PricingTiers() {
  return (
    <div className="mb-24">
      <SectionHeader
        label="Facebook Page Automation"
        title="Pricing for"
        gradientTitle="Small Business Pages"
        subtitle="One-time setup, then a flat monthly service charge. We run on free/low-cost AI tools to keep costs down — no hidden charges."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {automationPricing.map((tier) => (
          <AnimatedSection key={tier.id} direction="up">
            <div
              className={`h-full flex flex-col rounded-2xl p-6 sm:p-7 border ${
                tier.highlighted
                  ? 'bg-linear-to-b from-blue-500/10 to-purple-600/5 border-blue-500/40 shadow-xl shadow-blue-500/10'
                  : 'bg-navy-800 border-navy-700'
              }`}
            >
              {tier.highlighted && (
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 mb-3">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-slate-100 mb-1">{tier.name}</h3>
              <p className="text-slate-500 text-sm mb-5">{tier.tagline}</p>

              <div className="mb-1">
                <span className="text-3xl font-black text-slate-100">{tier.setupFee}</span>
                <span className="text-slate-500 text-sm ml-1">setup</span>
              </div>
              <div className="text-slate-400 text-sm mb-6">
                + {tier.monthlyFee} <span className="text-slate-500">{tier.monthlyLabel}</span>
              </div>

              <ul className="space-y-2.5 mb-7 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                    <Check size={15} className="text-blue-400 mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  tier.highlighted
                    ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                    : 'border border-navy-700 text-slate-300 hover:border-blue-500/40 hover:text-slate-100'
                }`}
              >
                {tier.id === 'enterprise' ? "Let's Talk" : 'Get Started'}
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
