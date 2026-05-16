'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { stats, contact } from '@/lib/data'

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
          const duration = 1200
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

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

const terminalLines = [
  { type: 'cmd', text: 'npx create-saas --stack next+supabase+stripe' },
  { type: 'info', text: '✓ Auth, payments, DB — wired up' },
  { type: 'cmd', text: 'python deploy_agent.py --model groq/llama' },
  { type: 'info', text: '✓ Multi-agent pipeline running on AWS' },
  { type: 'cmd', text: 'n8n trigger --workflow linkedin-content-ai' },
  { type: 'info', text: '✓ 7 posts scheduled. Zero cost.' },
  { type: 'cursor', text: '█' },
]

function Terminal() {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(v => {
        if (v >= terminalLines.length - 1) { clearInterval(id); return v }
        return v + 1
      })
    }, 600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-navy-950 border border-navy-700 rounded-xl overflow-hidden shadow-2xl shadow-black/40">
      {/* Window bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-navy-700 bg-navy-900">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-slate-600 font-mono">ar-techlabs ~ bash</span>
      </div>
      {/* Terminal body */}
      <div className="p-5 font-mono text-xs sm:text-sm space-y-2 min-h-[220px]">
        {terminalLines.slice(0, visible + 1).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={
              line.type === 'cmd'
                ? 'text-blue-400'
                : line.type === 'info'
                ? 'text-green-400 pl-2'
                : 'text-slate-400 animate-pulse'
            }
          >
            {line.type === 'cmd' && <span className="text-slate-600 mr-2">$</span>}
            {line.text}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 line-grid animate-grid-fade pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-purple-600/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-blue-600/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/8 border border-green-500/20 mb-7"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-green-400 tracking-wider">Available for new projects</span>
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-linear-to-r from-blue-500 to-purple-600" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400">AR TechLabs</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.07] tracking-tight text-slate-100 mb-5"
            >
              I Build Web &
              <br />
              <span className="gradient-text">AI Systems</span>
              <br />
              <span className="text-slate-400 font-semibold text-2xl sm:text-3xl lg:text-4xl">that ship.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-slate-400 text-base sm:text-lg mb-8 max-w-md leading-relaxed"
            >
              Full-stack SaaS, multi-agent AI pipelines, and automation systems — production-grade from day one.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25"
              >
                See My Work <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-navy-700 text-slate-300 font-semibold text-sm hover:border-blue-500/40 hover:text-slate-100 hover:bg-white/[0.03] active:scale-[0.98] transition-all"
              >
                Start a Project
              </Link>
            </motion.div>

            {/* Social + stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex items-center gap-5"
            >
              <a href={contact.github} target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-300 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-300 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <div className="w-px h-4 bg-navy-700" />
              <div className="flex gap-5">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-base font-black text-slate-100">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="hidden lg:block"
          >
            <Terminal />
            {/* Floating tech badges */}
            <div className="flex flex-wrap gap-2 mt-4 justify-end">
              {['Next.js', 'LangChain', 'AWS', 'Groq', 'n8n', 'Docker'].map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-navy-800 border border-navy-700 text-slate-500 font-mono">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
