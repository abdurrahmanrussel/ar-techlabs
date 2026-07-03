export const services = [
  {
    id: 'fb-automation',
    iconName: 'MessageCircle',
    title: 'Facebook Page Automation',
    description: 'AI auto-reply on comments and Messenger inbox, plus scheduled AI-written posts — every day, without you lifting a finger.',
    tags: ['Auto-Reply', 'Daily AI Posts', 'Facebook Graph API', 'Groq AI'],
  },
  {
    id: 'fullstack-saas',
    iconName: 'Layers',
    title: 'Full-Stack SaaS Development',
    description: 'End-to-end SaaS platforms with authentication, payments, and scalable architecture. From landing page to production in weeks.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'JWT'],
  },
  {
    id: 'ai-agents',
    iconName: 'BrainCircuit',
    title: 'AI Agent Systems',
    description: 'Multi-agent AI pipelines with memory, tool use, and autonomous decision-making. Production-ready and cost-optimized.',
    tags: ['LangChain', 'LangGraph', 'Google ADK', 'A2A', 'MCP', 'Groq', 'LLaMA'],
  },
  {
    id: 'automation',
    iconName: 'Workflow',
    title: 'Automation Workflows',
    description: 'Custom automation pipelines that eliminate repetitive work. Social media, email, scraping, and business process automation.',
    tags: ['n8n', 'Playwright', 'Facebook Graph API', 'Telegram', 'Email'],
  },
  {
    id: 'api-dev',
    iconName: 'Plug',
    title: 'API Development & Integration',
    description: 'Clean, documented REST APIs and seamless third-party integrations. Webhooks, rate limiting, and production-hardened.',
    tags: ['REST API', 'FastAPI', 'Express', 'Webhooks', 'OAuth'],
  },
  {
    id: 'cloud',
    iconName: 'Cloud',
    title: 'Cloud Deployment',
    description: 'Zero-downtime deployments with Docker, CI/CD pipelines, and cloud infrastructure. Your app stays up.',
    tags: ['AWS EC2', 'Docker', 'GitHub Actions', 'Nginx', 'PM2'],
  },
  {
    id: 'llm',
    iconName: 'Cpu',
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
  { value: 7, label: 'Services' },
  { value: 3, label: 'Years Exp', suffix: '+' },
]

export const automationPricing = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For small Facebook pages',
    setupFee: '৳5,000',
    monthlyFee: '৳500',
    monthlyLabel: '/month service charge',
    features: [
      'AI auto-reply on post comments',
      'AI auto-reply on Messenger inbox',
      'Scheduled AI-written daily posts',
      'Images posted from your Google Drive',
      'Free/low-cost AI tools — no hidden charges',
    ],
    highlighted: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Automation + your own website',
    setupFee: '৳8,000',
    monthlyFee: '৳500',
    monthlyLabel: '/month service charge',
    features: [
      'Everything in Starter',
      'Simple business website, hosted on Vercel',
      'Mobile-friendly, fast, SEO-ready',
      'Free/low-cost AI tools — no hidden charges',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Multi-page or high-volume brands',
    setupFee: 'Custom',
    monthlyFee: 'Custom',
    monthlyLabel: 'let’s discuss your needs',
    features: [
      'Multiple pages / multi-agent workflows',
      'Custom AI models & integrations',
      'Dedicated support & SLAs',
      'Tailored pricing — no fixed package',
    ],
    highlighted: false,
  },
]

export const contact = {
  email: 'abdurrahmanrussel77@gmail.com',
  phone: '+8801714042230',
  github: 'https://github.com/abdurrahmanrussel',
  linkedin: 'https://www.linkedin.com/in/md-abdur-rahman77/',
  upwork: 'https://www.upwork.com/freelancers/~01dfb26627e7c7a09a',
}
