import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: {
    default: 'AR TechLabs — Building Web & AI Systems',
    template: '%s | AR TechLabs',
  },
  description: 'Premium full-stack SaaS development, AI agent systems, and automation workflows. Built by AR TechLabs.',
  keywords: ['Next.js', 'AI Agents', 'SaaS Development', 'Automation', 'LangChain', 'Full-Stack'],
  authors: [{ name: 'Md. Abdur Rahman' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'AR TechLabs',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-navy-950 text-slate-100 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
