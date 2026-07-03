import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { contact } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing AR TechLabs web, AI, and Facebook automation services.',
}

const sections = [
  {
    heading: '1. Services',
    body: 'AR TechLabs provides custom software, AI, and automation services, including a Facebook Page Automation service (AI auto-reply on comments/Messenger and scheduled AI-written posts) available in Starter and Growth packages, plus custom Enterprise engagements and freelance/agency development work.',
  },
  {
    heading: '2. Pricing & Payment',
    body: 'Facebook Page Automation packages have a one-time setup fee and a fixed monthly service charge, as quoted at the time of purchase. Payment is accepted via bKash, Nagad, or Rocket unless otherwise agreed. There are no hidden charges — the price quoted is the price billed. Enterprise and custom project pricing is agreed in writing before work begins.',
  },
  {
    heading: '3. Service Delivery',
    body: 'Setup begins once payment is received and the client has granted the access needed (e.g. Facebook Page admin access, or content/credentials for a custom project). Delivery timelines are communicated per project. The monthly service charge covers continued operation of the automation (hosting, AI usage, monitoring) for that Page.',
  },
  {
    heading: '4. Client Responsibilities',
    body: 'Clients are responsible for the accuracy of the business information, pricing, and product details used to configure their automation, and for complying with Facebook’s Platform Terms and Community Standards on their own Page. AR TechLabs is not responsible for account restrictions imposed by Meta due to a client’s content or policy violations.',
  },
  {
    heading: '5. Cancellation',
    body: 'The monthly service charge can be cancelled at any time by notifying us; service continues until the end of the period already paid for. Setup fees are non-refundable once setup work has started, as they cover work already performed.',
  },
  {
    heading: '6. Limitation of Liability',
    body: 'Services are provided as-is. AR TechLabs is not liable for indirect losses (e.g. lost sales) arising from third-party outages (Facebook, Meta, Groq, hosting providers) outside our control. Our liability is limited to fees paid for the affected service in the preceding month.',
  },
  {
    heading: '7. Contact',
    body: `Questions about these terms: ${contact.email} or ${contact.phone}.`,
  },
]

export default function TermsPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <AnimatedSection className="mb-12">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 block mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-4 leading-tight">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-slate-500 text-sm">Last updated: 2026</p>
        </AnimatedSection>

        <div className="space-y-10">
          {sections.map((s) => (
            <AnimatedSection key={s.heading}>
              <h2 className="text-lg font-bold text-slate-100 mb-3">{s.heading}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
