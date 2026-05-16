# AR TechLabs Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium dark-themed multi-page Next.js 15 agency website for AR TechLabs with Framer Motion animations and Resend contact form, deployable to Vercel.

**Architecture:** Next.js 15 App Router with TypeScript and Tailwind CSS. All pages are statically generated. Framer Motion handles scroll-triggered animations via `whileInView`. Contact form uses a Server Action that calls Resend to deliver email to the owner's inbox.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Resend, Vercel

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout — Navbar, Footer, fonts, metadata |
| `app/globals.css` | Tailwind directives, base styles, custom CSS vars |
| `app/page.tsx` | Home page — Hero, ServicesPreview, PortfolioTeaser |
| `app/services/page.tsx` | Services page — 6 service cards |
| `app/portfolio/page.tsx` | Portfolio page — 6 project cards |
| `app/about/page.tsx` | About page — Bio, TechStack grid |
| `app/contact/page.tsx` | Contact page — ContactForm |
| `app/actions/contact.ts` | Server Action — validates input, calls Resend |
| `components/ui/Navbar.tsx` | Sticky nav with scroll-blur, active link highlight |
| `components/ui/Footer.tsx` | Footer with links and copyright |
| `components/ui/AnimatedSection.tsx` | Framer Motion `whileInView` wrapper — reusable |
| `components/ui/SectionHeader.tsx` | Gradient headline + subtitle, animated |
| `components/home/HeroSection.tsx` | Grid bg, gradient headline, stat counters, CTAs |
| `components/home/ServicesPreview.tsx` | 3-card preview of services with "View All" link |
| `components/home/PortfolioTeaser.tsx` | 3-card portfolio preview with "View All" link |
| `components/services/ServiceCard.tsx` | Service card — icon, title, desc, tech tags |
| `components/portfolio/ProjectCard.tsx` | Project card — title, desc, tech tags, live link |
| `components/about/Bio.tsx` | Owner bio section |
| `components/about/TechStack.tsx` | Tech stack grid grouped by category |
| `components/contact/ContactForm.tsx` | Form with name/email/message, Server Action |
| `lib/data.ts` | All static content — services, projects, tech stack |
| `lib/resend.ts` | Resend client instance |
| `tailwind.config.ts` | Custom colors, fonts, animations |
| `.env.local` | RESEND_API_KEY (local only) |

---

## Task 1: Initialize Project

**Files:**
- Create: project root via `npx create-next-app@latest`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /home/md-abdur-rahman/code/ar-techlabs
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected: project files created in current directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion resend
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev &
sleep 5 && curl -s http://localhost:3000 | head -5
```

Expected: HTML response with `<!DOCTYPE html>`.

Kill the server after verify: `pkill -f "next dev"` or Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 15 project with Tailwind and Framer Motion"
```

---

## Task 2: Configure Tailwind + Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060b14',
          900: '#0a0f1e',
          800: '#0f172a',
          700: '#1e2a4a',
          600: '#1e3a5f',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'gradient-brand-h': 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'grid-fade': 'gridFade 8s ease-in-out infinite alternate',
      },
      keyframes: {
        gridFade: {
          '0%': { opacity: '0.03' },
          '100%': { opacity: '0.07' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update app/globals.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-primary: #060b14;
    --bg-secondary: #0a0f1e;
    --bg-card: #0f172a;
    --border: #1e2a4a;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #475569;
    --accent-blue: #3b82f6;
    --accent-purple: #8b5cf6;
    --accent-pink: #ec4899;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: rgba(139, 92, 246, 0.3);
    color: #f1f5f9;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #0a0f1e;
  }

  ::-webkit-scrollbar-thumb {
    background: #1e2a4a;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #3b82f6;
  }
}

@layer utilities {
  .gradient-text {
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-text-blue {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .border-gradient {
    border: 1px solid transparent;
    background: linear-gradient(#0f172a, #0f172a) padding-box,
                linear-gradient(135deg, #3b82f6, #8b5cf6) border-box;
  }

  .dot-grid {
    background-image: radial-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .line-grid {
    background-image:
      linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "style: configure Tailwind theme and global CSS for dark navy brand"
```

---

## Task 3: Static Data

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create lib/data.ts**

```typescript
export const services = [
  {
    id: 'fullstack-saas',
    icon: '⚡',
    title: 'Full-Stack SaaS Development',
    description: 'End-to-end SaaS platforms with authentication, payments, and scalable architecture. From landing page to production in weeks.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'JWT'],
  },
  {
    id: 'ai-agents',
    icon: '🤖',
    title: 'AI Agent Systems',
    description: 'Multi-agent AI pipelines with memory, tool use, and autonomous decision-making. Production-ready and cost-optimized.',
    tags: ['LangChain', 'LangGraph', 'Google ADK', 'A2A', 'MCP', 'Groq', 'LLaMA'],
  },
  {
    id: 'automation',
    icon: '🔄',
    title: 'Automation Workflows',
    description: 'Custom automation pipelines that eliminate repetitive work. Social media, email, scraping, and business process automation.',
    tags: ['n8n', 'Playwright', 'Facebook Graph API', 'Telegram', 'Email'],
  },
  {
    id: 'api-dev',
    icon: '🔌',
    title: 'API Development & Integration',
    description: 'Clean, documented REST APIs and seamless third-party integrations. Webhooks, rate limiting, and production-hardened.',
    tags: ['REST API', 'FastAPI', 'Express', 'Webhooks', 'OAuth'],
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Deployment',
    description: 'Zero-downtime deployments with Docker, CI/CD pipelines, and cloud infrastructure. Your app stays up.',
    tags: ['AWS EC2', 'Docker', 'GitHub Actions', 'Nginx', 'PM2'],
  },
  {
    id: 'llm',
    icon: '🧠',
    title: 'LLM Integration',
    description: 'Integrate large language models into your product. RAG pipelines, fine-tuning, and cost-efficient inference.',
    tags: ['Groq', 'Gemini', 'HuggingFace', 'RAG', 'FAISS', 'QLoRA'],
  },
]

export const projects = [
  {
    id: 'aa-trading',
    title: 'AA Trading',
    description: 'SaaS license sales platform with automated delivery, Stripe payments, and JWT authentication on AWS EC2.',
    url: 'https://aatrading.us',
    tags: ['Next.js', 'Stripe', 'Supabase', 'JWT', 'AWS EC2'],
  },
  {
    id: 'kasbyiq',
    title: 'KasbyIQ',
    description: 'Real estate property fit platform with advanced filtering, TypeScript throughout, and a Prisma-managed PostgreSQL schema.',
    url: 'http://54.159.236.60',
    tags: ['TypeScript', 'Prisma', 'PostgreSQL', 'React'],
  },
  {
    id: 'ai-currency-agent',
    title: 'AI Currency Agent',
    description: 'Multi-agent currency analysis system using Google ADK, A2A protocol, and MCP — all containerized and running on AWS.',
    url: 'http://51.20.7.105:8000',
    tags: ['Google ADK', 'A2A', 'MCP', 'Docker', 'AWS'],
  },
  {
    id: 'facebook-ai',
    title: 'Facebook AI Automation',
    description: 'Bangla NLP automation that generates and posts content 7 times per day using Groq LLaMA 3.3 70B — zero operating cost.',
    url: null,
    tags: ['Groq', 'LLaMA 3.3 70B', 'NLP', 'Bangla', 'Automation'],
  },
  {
    id: 'linkedin-engine',
    title: 'AI LinkedIn Content Engine',
    description: 'Multi-agent n8n pipeline that researches, drafts, and queues LinkedIn posts with a Slack approval gate before publishing.',
    url: null,
    tags: ['n8n', 'Multi-agent', 'GCP', 'Slack', 'LLM'],
  },
  {
    id: 'voice-ai',
    title: 'Voice AI Assistant',
    description: 'Real-time voice assistant loop: Whisper STT → Groq LLaMA reasoning → Kokoro TTS output. Sub-2s latency end-to-end.',
    url: null,
    tags: ['Whisper', 'Groq', 'LLaMA', 'Kokoro TTS', 'Real-time'],
  },
]

export const techStack = {
  Languages: ['Python', 'TypeScript', 'JavaScript'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Express', 'FastAPI', 'Flask'],
  Databases: ['PostgreSQL', 'Supabase', 'MySQL', 'Prisma'],
  'AI / ML': ['LangChain', 'LangGraph', 'Groq', 'Gemini', 'HuggingFace', 'FAISS', 'RAG', 'QLoRA'],
  Cloud: ['AWS EC2', 'GCP', 'Docker', 'GitHub Actions', 'Nginx', 'Vercel', 'Render'],
  Automation: ['n8n', 'Playwright', 'Make', 'Zapier'],
}

export const stats = [
  { value: 6, label: 'Live Projects' },
  { value: 6, label: 'Services' },
  { value: 3, label: 'Years Exp', suffix: '+' },
]

export const contact = {
  email: 'abdurrahmanrussel77@gmail.com',
  phone: '+8801714042230',
  github: 'https://github.com/abdurrahmanrussel',
  linkedin: 'https://www.linkedin.com/in/md-abdur-rahman77/',
  upwork: 'https://www.upwork.com/freelancers/~01dfb26627e7c7a09a',
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add static data for services, projects, tech stack, contact"
```

---

## Task 4: Resend Client + Server Action

**Files:**
- Create: `lib/resend.ts`
- Create: `app/actions/contact.ts`
- Create: `.env.local`

- [ ] **Step 1: Create .env.local**

```
RESEND_API_KEY=re_your_key_here
```

Replace `re_your_key_here` with your actual Resend API key from resend.com.

- [ ] **Step 2: Create lib/resend.ts**

```typescript
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

- [ ] **Step 3: Create app/actions/contact.ts**

```typescript
'use server'

import { resend } from '@/lib/resend'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function sendContactEmail(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'All fields are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { status: 'error', message: 'Invalid email address.' }
  }

  if (message.length < 10) {
    return { status: 'error', message: 'Message must be at least 10 characters.' }
  }

  try {
    await resend.emails.send({
      from: 'AR TechLabs Contact <onboarding@resend.dev>',
      to: 'abdurrahmanrussel77@gmail.com',
      subject: `New message from ${name} — AR TechLabs`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0f1e;color:#f1f5f9;padding:32px;border-radius:8px;">
          <h2 style="color:#3b82f6;margin-top:0">New Contact from AR TechLabs</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#3b82f6">${email}</a></p>
          <hr style="border-color:#1e2a4a;margin:24px 0"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    })
    return { status: 'success', message: "Message sent! I'll get back to you soon." }
  } catch {
    return { status: 'error', message: 'Failed to send message. Please try again or email directly.' }
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/resend.ts app/actions/contact.ts
git commit -m "feat: add Resend client and contact Server Action with validation"
```

---

## Task 5: Reusable UI Primitives

**Files:**
- Create: `components/ui/AnimatedSection.tsx`
- Create: `components/ui/SectionHeader.tsx`

- [ ] **Step 1: Create components/ui/AnimatedSection.tsx**

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

const variants = {
  hidden: (direction: string) => ({
    opacity: 0,
    y: direction === 'up' ? 40 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      custom={direction}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create components/ui/SectionHeader.tsx**

```typescript
import AnimatedSection from './AnimatedSection'

interface SectionHeaderProps {
  label?: string
  title: string
  gradientTitle?: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeader({
  label,
  title,
  gradientTitle,
  subtitle,
  center = false,
}: SectionHeaderProps) {
  const align = center ? 'text-center items-center' : ''

  return (
    <AnimatedSection className={`flex flex-col gap-3 mb-12 ${align}`}>
      {label && (
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-black text-slate-100 leading-tight">
        {title}{' '}
        {gradientTitle && (
          <span className="gradient-text">{gradientTitle}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base max-w-xl">{subtitle}</p>
      )}
    </AnimatedSection>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/AnimatedSection.tsx components/ui/SectionHeader.tsx
git commit -m "feat: add AnimatedSection and SectionHeader reusable UI components"
```

---

## Task 6: Navbar + Footer

**Files:**
- Create: `components/ui/Navbar.tsx`
- Create: `components/ui/Footer.tsx`

- [ ] **Step 1: Create components/ui/Navbar.tsx**

```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/90 backdrop-blur-md border-b border-navy-700'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">
            AR
          </div>
          <span className="font-bold text-slate-100 tracking-tight">
            AR <span className="gradient-text-blue">TechLabs</span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-blue-500/10 rounded-md"
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Start a Project
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-400 hover:text-slate-100 p-2"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-navy-950/95 backdrop-blur-md border-b border-navy-700"
        >
          <ul className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-400'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold text-center"
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
```

- [ ] **Step 2: Create components/ui/Footer.tsx**

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Navbar.tsx components/ui/Footer.tsx
git commit -m "feat: add Navbar with scroll-blur and mobile menu, Footer with links"
```

---

## Task 7: Root Layout + Home Page Components

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/home/HeroSection.tsx`
- Create: `components/home/ServicesPreview.tsx`
- Create: `components/home/PortfolioTeaser.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update app/layout.tsx**

```typescript
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
```

- [ ] **Step 2: Create components/home/HeroSection.tsx**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { stats } from '@/lib/data'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 1500
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(value)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 line-grid animate-grid-fade pointer-events-none" />
      {/* Glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400">
              AR TechLabs
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-slate-100 mb-4"
          >
            Building Web &{' '}
            <br />
            <span className="gradient-text">AI Systems</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-slate-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed"
          >
            Full-stack SaaS platforms, AI agent pipelines, and automation systems — from zero to production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-navy-700 text-slate-300 font-semibold text-sm hover:border-blue-500/50 hover:text-slate-100 transition-all"
            >
              Start a Project →
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-navy-800 border border-navy-700 rounded-lg px-5 py-4 min-w-[100px]"
              >
                <div className="text-2xl font-black text-blue-400">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create components/home/ServicesPreview.tsx**

```typescript
import Link from 'next/link'
import { motion } from 'framer-motion'
import { services } from '@/lib/data'
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'

export default function ServicesPreview() {
  const preview = services.slice(0, 3)

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="What We Build"
          title="Core"
          gradientTitle="Services"
          subtitle="End-to-end engineering from concept to production."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {preview.map((service) => (
            <AnimatedSection key={service.id} direction="up">
              <div className="h-full bg-navy-800 border border-navy-700 rounded-xl p-6 hover:border-blue-500/30 transition-colors group">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-navy-950 border border-navy-700 text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </motion.div>

        <AnimatedSection className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
          >
            View all 6 services →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create components/home/PortfolioTeaser.tsx**

```typescript
import Link from 'next/link'
import { motion } from 'framer-motion'
import { projects } from '@/lib/data'
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection'
import SectionHeader from '@/components/ui/SectionHeader'

export default function PortfolioTeaser() {
  const teaser = projects.slice(0, 3)

  return (
    <section className="py-24 bg-navy-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Recent Work"
          title="Live"
          gradientTitle="Projects"
          subtitle="Real products. Real users. Real impact."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {teaser.map((project) => (
            <AnimatedSection key={project.id} direction="up">
              <div className="h-full bg-navy-800 border border-navy-700 rounded-xl p-6 hover:border-purple-500/30 transition-colors group flex flex-col">
                <h3 className="text-base font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-navy-950 border border-navy-700 text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View live ↗
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </motion.div>

        <AnimatedSection className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors"
          >
            View all 6 projects →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Update app/page.tsx**

```typescript
import HeroSection from '@/components/home/HeroSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import PortfolioTeaser from '@/components/home/PortfolioTeaser'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <PortfolioTeaser />
    </>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx components/home/ app/page.tsx
git commit -m "feat: add root layout, HeroSection with animated counters, services and portfolio teasers"
```

---

## Task 8: Services Page

**Files:**
- Create: `components/services/ServiceCard.tsx`
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create components/services/ServiceCard.tsx**

```typescript
import AnimatedSection from '@/components/ui/AnimatedSection'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  tags: string[]
}

export default function ServiceCard({ icon, title, description, tags }: ServiceCardProps) {
  return (
    <AnimatedSection direction="up">
      <div className="h-full bg-navy-800 border border-navy-700 rounded-xl p-8 hover:border-blue-500/30 transition-all group hover:-translate-y-1 duration-300">
        <div className="text-4xl mb-5">{icon}</div>
        <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-navy-950 border border-navy-700 text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Create app/services/page.tsx**

```typescript
import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { services } from '@/lib/data'
import ServiceCard from '@/components/services/ServiceCard'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-stack SaaS development, AI agent systems, automation workflows, API development, cloud deployment, and LLM integration.',
}

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="py-16 max-w-2xl">
          <SectionHeader
            label="What We Offer"
            title="Services Built for"
            gradientTitle="Production"
            subtitle="Every service is delivered as a complete, production-ready solution — not a prototype."
          />
        </div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </motion.div>

        {/* CTA */}
        <AnimatedSection className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-black text-slate-100 mb-3">
            Ready to build something?
          </h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Describe your project and I'll tell you how we can build it.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
          >
            Start a Project →
          </Link>
        </AnimatedSection>
      </div>
    </div>
  )
}
```

Note: `motion` from framer-motion requires `'use client'` — but this page is a Server Component. Move the staggerContainer animation to the ServiceCard or wrap just the grid in a client component. The simplest fix: add `'use client'` at the top of `app/services/page.tsx` since it uses motion directly, OR extract the grid into `components/services/ServicesGrid.tsx` as a client component and import it. Use the extraction approach to keep metadata working:

**Correction — Create components/services/ServicesGrid.tsx:**

```typescript
'use client'

import { motion } from 'framer-motion'
import { services } from '@/lib/data'
import ServiceCard from './ServiceCard'
import { staggerContainer } from '@/components/ui/AnimatedSection'

export default function ServicesGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
    >
      {services.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </motion.div>
  )
}
```

**Correction — Update app/services/page.tsx (server component, no motion import):**

```typescript
import type { Metadata } from 'next'
import { services } from '@/lib/data'
import ServicesGrid from '@/components/services/ServicesGrid'
import SectionHeader from '@/components/ui/SectionHeader'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Full-stack SaaS development, AI agent systems, automation workflows, API development, cloud deployment, and LLM integration.',
}

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="py-16 max-w-2xl">
          <SectionHeader
            label="What We Offer"
            title="Services Built for"
            gradientTitle="Production"
            subtitle="Every service is delivered as a complete, production-ready solution — not a prototype."
          />
        </div>

        <ServicesGrid />

        <AnimatedSection className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-black text-slate-100 mb-3">
            Ready to build something?
          </h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Describe your project and I'll tell you how we can build it.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20"
          >
            Start a Project →
          </Link>
        </AnimatedSection>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/services/ app/services/
git commit -m "feat: add Services page with animated service cards grid"
```

---

## Task 9: Portfolio Page

**Files:**
- Create: `components/portfolio/ProjectCard.tsx`
- Create: `components/portfolio/PortfolioGrid.tsx`
- Create: `app/portfolio/page.tsx`

- [ ] **Step 1: Create components/portfolio/ProjectCard.tsx**

```typescript
import AnimatedSection from '@/components/ui/AnimatedSection'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  url: string | null
}

export default function ProjectCard({ title, description, tags, url }: ProjectCardProps) {
  return (
    <AnimatedSection direction="up">
      <div className="h-full bg-navy-800 border border-navy-700 rounded-xl p-8 hover:border-purple-500/30 transition-all group hover:-translate-y-1 duration-300 flex flex-col">
        {/* Top: status dot */}
        <div className="flex items-center gap-2 mb-5">
          <div className={`w-2 h-2 rounded-full ${url ? 'bg-green-400' : 'bg-slate-600'}`} />
          <span className="text-xs text-slate-600 font-mono">
            {url ? 'live' : 'private'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-navy-950 border border-navy-700 text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            View live project ↗
          </a>
        ) : (
          <span className="text-sm text-slate-600">Private project</span>
        )}
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Create components/portfolio/PortfolioGrid.tsx**

```typescript
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
```

- [ ] **Step 3: Create app/portfolio/page.tsx**

```typescript
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
```

- [ ] **Step 4: Commit**

```bash
git add components/portfolio/ app/portfolio/
git commit -m "feat: add Portfolio page with live/private status indicators"
```

---

## Task 10: About Page

**Files:**
- Create: `components/about/Bio.tsx`
- Create: `components/about/TechStack.tsx`
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create components/about/Bio.tsx**

```typescript
import AnimatedSection from '@/components/ui/AnimatedSection'
import { contact } from '@/lib/data'

export default function Bio() {
  return (
    <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
      {/* Text */}
      <div>
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 mb-4">
          About
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-100 mb-6 leading-tight">
          Md. Abdur Rahman
          <br />
          <span className="gradient-text-blue text-2xl font-bold">AR TechLabs</span>
        </h2>
        <div className="space-y-4 text-slate-400 leading-relaxed">
          <p>
            Full-stack engineer and AI systems architect building production software for ambitious products. AR TechLabs operates as a precision tech lab — not a generic agency.
          </p>
          <p>
            Specializing in SaaS platforms, multi-agent AI systems, and automation pipelines. Every project is engineered for scale, not just shipped to look good in a demo.
          </p>
          <p>
            Based in Bangladesh. Working globally.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-navy-700 text-slate-400 text-sm hover:border-blue-500/50 hover:text-slate-100 transition-all"
          >
            GitHub ↗
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-navy-700 text-slate-400 text-sm hover:border-blue-500/50 hover:text-slate-100 transition-all"
          >
            LinkedIn ↗
          </a>
          <a
            href={contact.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#14a800]/10 border border-[#14a800]/30 text-[#14a800] text-sm hover:bg-[#14a800]/20 transition-all"
          >
            Hire on Upwork ↗
          </a>
        </div>
      </div>

      {/* Card */}
      <AnimatedSection direction="left" delay={0.2}>
        <div className="bg-navy-800 border border-navy-700 rounded-2xl p-8 space-y-5">
          {[
            { label: 'Role', value: 'Full-Stack Engineer & AI Architect' },
            { label: 'Location', value: 'Bangladesh 🇧🇩' },
            { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
            { label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-xs font-mono text-slate-600 uppercase tracking-wider">{label}</span>
              {href ? (
                <a href={href} className="text-slate-300 text-sm hover:text-blue-400 transition-colors">
                  {value}
                </a>
              ) : (
                <span className="text-slate-300 text-sm">{value}</span>
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Create components/about/TechStack.tsx**

```typescript
import AnimatedSection, { staggerContainer } from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'
import { techStack } from '@/lib/data'
import SectionHeader from '@/components/ui/SectionHeader'

export default function TechStack() {
  return (
    <div>
      <SectionHeader
        label="Technology"
        title="Full"
        gradientTitle="Tech Stack"
        subtitle="The tools used to build and ship every project."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(techStack).map(([category, techs]) => (
          <AnimatedSection key={category} direction="up">
            <div className="bg-navy-800 border border-navy-700 rounded-xl p-6 h-full">
              <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-blue-400 mb-4">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md bg-navy-950 border border-navy-700 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </motion.div>
    </div>
  )
}
```

Note: `TechStack` uses `motion` from framer-motion — needs `'use client'`. Add `'use client'` at the top of `components/about/TechStack.tsx`.

**Correction — add at top:**
```typescript
'use client'
```

- [ ] **Step 3: Create app/about/page.tsx**

```typescript
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
```

- [ ] **Step 4: Commit**

```bash
git add components/about/ app/about/
git commit -m "feat: add About page with bio, social links, and full tech stack grid"
```

---

## Task 11: Contact Page

**Files:**
- Create: `components/contact/ContactForm.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create components/contact/ContactForm.tsx**

```typescript
'use client'

import { useActionState } from 'react'
import { sendContactEmail, ContactState } from '@/app/actions/contact'

const initialState: ContactState = { status: 'idle', message: '' }

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactEmail, initialState)

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Describe your project or question..."
          className="w-full px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
        />
      </div>

      {state.status !== 'idle' && (
        <div
          className={`px-4 py-3 rounded-lg text-sm font-medium ${
            state.status === 'success'
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
      >
        {pending ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Create app/contact/page.tsx**

```typescript
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
            Describe what you're building and I'll get back within 24 hours.
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
```

- [ ] **Step 3: Commit**

```bash
git add components/contact/ app/contact/
git commit -m "feat: add Contact page with Resend Server Action form and contact info panel"
```

---

## Task 12: Vercel Deployment

**Files:**
- Create: `vercel.json`
- Add env var to Vercel

- [ ] **Step 1: Verify build locally**

```bash
npm run build
```

Expected: Build completes with no errors. Fix any TypeScript or import errors before proceeding.

- [ ] **Step 2: Create vercel.json**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

- [ ] **Step 3: Push to GitHub and deploy to Vercel**

```bash
git add vercel.json
git commit -m "chore: add Vercel deployment config"
```

Then:
1. Push repo to GitHub: `git remote add origin <your-repo-url> && git push -u origin main`
2. Go to vercel.com → Import Project → select repo
3. Add environment variable: `RESEND_API_KEY` = your key
4. Deploy

- [ ] **Step 4: Verify deployment**

Open the Vercel URL and test:
- All 5 pages load
- Navbar links work
- Animations trigger on scroll
- Contact form sends email (check inbox)
- Mobile layout on narrow viewport

---
