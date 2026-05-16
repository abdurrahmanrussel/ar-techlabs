# AR TechLabs Website — Design Spec

## Brand
- **Company:** AR TechLabs — "Building Web & AI Systems"
- **Owner:** Md. Abdur Rahman
- **Colors:** Deep navy (#060b14, #0a0f1e) + blue-to-purple gradient (#3b82f6 → #8b5cf6)
- **Style:** Modern dark tech, minimal, professional, startup agency

## Decisions Made
| Decision | Choice |
|----------|--------|
| Framework | Next.js 15 App Router + TypeScript |
| Styling | Tailwind CSS (dark theme) |
| Animations | Framer Motion (rich: scroll-triggered, staggered, counters) |
| Page structure | Multi-page routing |
| Hero style | C — Grid + Stats (dot grid bg, gradient headline, stat counters) |
| Contact form | Real Resend API via Server Action |
| Hosting | Vercel |

## Pages
1. **Home** — Hero (grid bg, gradient headline, stat counters), services overview (3 cards teaser), portfolio teaser
2. **Services** — 6 service cards with icon, title, description, tech tags
3. **Portfolio** — 6 project cards with title, description, tech tags, live link
4. **About** — Bio, full tech stack grid by category
5. **Contact** — Name/email/message form → Resend → owner inbox

## Services
1. Full-Stack SaaS Development — React, Next.js, Node.js, PostgreSQL, Stripe, JWT
2. AI Agent Systems — LangChain, LangGraph, Google ADK, A2A, MCP, Groq, LLaMA
3. Automation Workflows — n8n, Playwright, Facebook Graph API, Telegram bots
4. API Development & Integration — REST APIs, third-party integrations, webhooks
5. Cloud Deployment — AWS EC2, Docker, GitHub Actions CI/CD, Nginx, PM2
6. LLM Integration — Groq, Gemini, HuggingFace, RAG pipelines, fine-tuning

## Portfolio
1. AA Trading (https://aatrading.us) — SaaS license platform, Stripe, Supabase, JWT, AWS EC2
2. KasbyIQ (http://54.159.236.60) — Real estate fit platform, TypeScript, Prisma, PostgreSQL
3. AI Currency Agent (http://51.20.7.105:8000) — Multi-agent, ADK + A2A + MCP, Docker, AWS
4. Facebook AI Automation — Groq LLaMA 3.3 70B Bangla NLP, 7 auto-posts/day
5. AI LinkedIn Content Engine — Multi-agent n8n pipeline, GCP, Slack approval gate
6. Voice AI Assistant — Whisper STT + Groq LLaMA + Kokoro TTS real-time loop

## Animation Strategy
- `AnimatedSection` wrapper: `whileInView` fade+slide up, `viewport={{ once: true }}`
- Staggered children: `staggerChildren: 0.1` on container
- Stat counters: animated number count-up on viewport enter
- Hero grid background: subtle CSS animated gradient
- Nav: scroll-aware background blur on scroll

## Contact
- Email: abdurrahmanrussel77@gmail.com
- Phone: +8801714042230
- GitHub: https://github.com/abdurrahmanrussel
- LinkedIn: https://www.linkedin.com/in/md-abdur-rahman77/
- Upwork: https://www.upwork.com/freelancers/~01dfb26627e7c7a09a
