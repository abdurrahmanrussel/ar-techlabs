import Link from 'next/link'
import { contact } from '@/lib/data'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: contact.github, label: 'GitHub' },
  { href: contact.linkedin, label: 'LinkedIn' },
  { href: contact.upwork, label: 'Upwork' },
]

export default function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">
                AR
              </div>
              <span className="font-bold text-slate-100">
                AR <span className="gradient-text-blue">TechLabs</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Building Web & AI Systems. Premium solutions for ambitious products.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
            >
              {contact.email}
            </a>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-4">Pages</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-slate-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-4">Connect</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} AR TechLabs. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
