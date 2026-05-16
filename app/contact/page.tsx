import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { contact } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with AR TechLabs. Full-stack SaaS, AI agents, and automation.',
}

const contactInfo = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
  { label: 'Upwork', value: 'Hire on Upwork', href: contact.upwork },
  { label: 'GitHub', value: 'View GitHub', href: contact.github },
]

export default function ContactPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <AnimatedSection className="max-w-xl mb-16">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 block mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-4 leading-tight">
            Start a{' '}
            <span className="gradient-text">Project</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Describe what you&apos;re building and I&apos;ll get back within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Form — 3 cols */}
          <AnimatedSection className="md:col-span-3" direction="left">
            <div className="bg-navy-800 border border-navy-700 rounded-2xl p-8">
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Info — 2 cols */}
          <AnimatedSection className="md:col-span-2" direction="right" delay={0.2}>
            <div className="space-y-4">
              {contactInfo.map(({ label, value, href }) => (
                <div
                  key={label}
                  className="bg-navy-800 border border-navy-700 rounded-xl p-5"
                >
                  <div className="text-xs font-mono text-slate-600 uppercase tracking-wider mb-1">
                    {label}
                  </div>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-slate-300 text-sm hover:text-blue-400 transition-colors break-all"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
