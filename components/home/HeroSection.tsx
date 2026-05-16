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
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
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
