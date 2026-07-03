import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { contact } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How AR TechLabs collects, uses, and protects data across our website and Facebook automation service.',
}

const sections = [
  {
    heading: '1. Who We Are',
    body: `AR TechLabs ("we", "us") builds and operates web, AI, and Facebook automation services for small businesses. This policy covers this website and our Facebook Page Automation service. Contact: ${contact.email}.`,
  },
  {
    heading: '2. Data We Collect',
    body: 'Contact form: name, email address, and message content, submitted voluntarily. Facebook Page Automation (for clients using the service): comment text, Messenger message text, and sender ID on the connected Facebook Page, used only to generate and send a reply. We do not collect payment card details — payments are handled directly via bKash/Nagad/Rocket outside this website.',
  },
  {
    heading: '3. How We Use Data',
    body: 'Contact form submissions are emailed to us (via Resend) so we can respond to your inquiry — nothing else. For the automation service, comment/message text is sent to our AI provider (Groq) solely to generate a reply, and a short in-memory record of already-replied IDs is kept to avoid duplicate replies; this is not persisted to a database.',
  },
  {
    heading: '4. Third-Party Services',
    body: 'We use Meta/Facebook Graph API (to read and post to a client’s Page, with their authorization), Groq (AI reply generation), Resend (contact form email delivery), Vercel (website hosting), and Render (automation service hosting). Each processes data only as needed to perform its function for us.',
  },
  {
    heading: '5. Data Retention',
    body: 'Contact form emails are retained in our inbox until we delete them. Comment/message text processed by the automation service is not stored beyond the short-lived reply-deduplication tracking described above, which resets on service restart.',
  },
  {
    heading: '6. Your Rights / Data Deletion',
    id: 'data-deletion',
    body: `You can request access to or deletion of any personal data we hold about you (e.g. a contact form submission) by emailing ${contact.email} with your name and the request. We will respond and act within a reasonable time. If you are a Facebook user who interacted with a client Page using our automation service, you can also remove your data by deleting your comment/message on Facebook, or by contacting us at the email above.`,
  },
  {
    heading: '7. Changes to This Policy',
    body: 'We may update this policy as the service evolves. The latest version always applies and is posted on this page.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <AnimatedSection className="mb-12">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 block mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-4 leading-tight">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-slate-500 text-sm">Last updated: 2026</p>
        </AnimatedSection>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.heading} id={s.id}>
              <AnimatedSection>
                <h2 className="text-lg font-bold text-slate-100 mb-3">{s.heading}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
