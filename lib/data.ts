export const services = [
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
