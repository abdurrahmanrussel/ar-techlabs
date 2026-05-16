'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 line-grid animate-grid-fade pointer-events-none" />

      {/* Glow blobs — more dramatic */}
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-indigo-600/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full flex-1 flex items-center">
        <div className="max-w-3xl w-full">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/8 border border-green-500/20 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono text-green-400 tracking-wide">Available for projects</span>
          </motion.div>

          {/* Label line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-linear-to-r from-blue-500 to-purple-600" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400">
              AR TechLabs
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight text-slate-100 mb-5"
          >
            Building Web &{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text">AI Systems</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-xl leading-relaxed"
          >
            Full-stack SaaS platforms, AI agent pipelines, and automation systems — engineered from zero to production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.46 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-blue-500/25"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-navy-700 text-slate-300 font-semibold text-sm hover:border-blue-500/50 hover:text-slate-100 hover:bg-blue-500/5 active:scale-95 transition-all"
            >
              Start a Project →
            </Link>
          </motion.div>

          {/* Stats — 3-col grid on mobile, flex on sm+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-5"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-navy-800/80 border border-navy-700 rounded-xl px-4 py-3 sm:px-5 sm:py-4 sm:min-w-[110px] backdrop-blur-sm"
              >
                <div className="text-xl sm:text-2xl font-black text-blue-400 leading-none mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative pb-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-linear-to-b from-slate-600 to-transparent"
        />
      </motion.div>
    </section>
  )
}
