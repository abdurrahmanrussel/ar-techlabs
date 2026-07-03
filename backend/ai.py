"""
AI reply generator for AR TechLabs — Facebook bot.
Uses Groq (llama-3.3-70b-versatile) with up to 5 rotating API keys.
"""
import logging
import time
from groq import Groq
from config import GROQ_API_KEY, GROQ_API_KEY2, GROQ_API_KEY3, GROQ_API_KEY4, GROQ_API_KEY5

logger = logging.getLogger(__name__)

# ── Groq clients (5 keys, round-robin, 100k tokens/day each) ─────────────────
_CLIENTS = [
    (Groq(api_key=k, max_retries=0), "llama-3.3-70b-versatile")
    for k in [GROQ_API_KEY, GROQ_API_KEY2, GROQ_API_KEY3, GROQ_API_KEY4, GROQ_API_KEY5]
    if k
]
_COOLDOWN_SECS = 60
_rate_limited_until: dict[int, float] = {}
_next_client_index = 0

CONTACT_NUMBER = "01714-042230"

# ── Service / pricing catalogue ───────────────────────────────────────────────

SERVICE_LIST = f"""\
🤖 AR TechLabs — Facebook Page Automation:

১. Starter — FB Page অটোমেশন
   সেটআপ: ৳৫,০০০ | মাসিক সার্ভিস চার্জ: ৳৫০০
   ✅ কমেন্ট ও ইনবক্সে AI অটো-রিপ্লাই
   ✅ প্রতিদিন AI-লিখিত পোস্ট (আপনার Google Drive-এর ছবি দিয়ে)

২. Growth — FB অটোমেশন + ওয়েবসাইট
   সেটআপ: ৳৮,০০০ | মাসিক সার্ভিস চার্জ: ৳৫০০
   ✅ উপরের সবকিছু
   ✅ সাধারণ বিজনেস ওয়েবসাইট, Vercel-এ হোস্টেড

৩. Enterprise — কাস্টম প্যাকেজ
   একাধিক পেজ / বড় ভলিউম হলে আগে আলোচনা করে নিই।

ছোট পেজের জন্য উপযোগী। খরচ কমাতে আমরা ফ্রি/কম খরচের AI টুল ব্যবহার করি — কোনো হিডেন চার্জ নেই।
📲 যোগাযোগ: {CONTACT_NUMBER} (WhatsApp/কল)"""

# Package name aliases for detection
PACKAGE_ALIASES = {
    "starter":      "Starter",
    "growth":       "Growth",
    "enterprise":   "Enterprise",
    "স্টার্টার":    "Starter",
    "গ্রোথ":       "Growth",
}

LIST_KEYWORDS = [
    "প্যাকেজ", "package", "price", "pricing", "দাম", "কত", "কি কি", "কী কী",
    "কোন কোন", "প্যাকেজ লিস্ট", "সার্ভিস চার্জ", "খরচ", "cost", "charge",
]


def detect_package(text: str):
    """Return package name if user asked about a specific tier."""
    text_lower = text.lower()
    for alias, name in PACKAGE_ALIASES.items():
        if alias in text_lower:
            return name
    return None


def is_list_request(text: str) -> bool:
    """True if user is asking for pricing/package details."""
    text_lower = text.lower()
    return any(kw in text_lower for kw in LIST_KEYWORDS)


# ── System prompts ────────────────────────────────────────────────────────────

BASE_PROMPT = f"""\
তুমি AR TechLabs-এর কাস্টমার সার্ভিস। আমরা ছোট বিজনেস পেজের জন্য Facebook Page Automation সার্ভিস দিই —
AI অটো-রিপ্লাই (কমেন্ট + ইনবক্স) এবং প্রতিদিন AI-লিখিত অটো-পোস্ট।

প্যাকেজ:
- Starter: সেটআপ ৳৫,০০০ + মাসিক ৳৫০০ — শুধু FB অটোমেশন
- Growth: সেটআপ ৳৮,০০০ + মাসিক ৳৫০০ — FB অটোমেশন + Vercel-এ হোস্টেড ওয়েবসাইট
- Enterprise: কাস্টম — আগে আলোচনা করে নিতে হবে

যোগাযোগ: {CONTACT_NUMBER} (WhatsApp/কল)

নিয়ম:
- সবসময় বাংলায় উত্তর দাও (ইংরেজিতে প্রশ্ন করলে ইংরেজিতেও দিতে পারো)।
- উত্তর সংক্ষিপ্ত রাখো (২-৩ লাইন)।
- দাম বা প্যাকেজ নিজে থেকে বানিও না, উপরের তথ্যই ব্যবহার করো।
- কোনো হিডেন চার্জ নেই — জিজ্ঞেস করলে স্পষ্টভাবে বলো।
- Enterprise বা বড় স্কেলের প্রশ্নে বলো: "আগে বিস্তারিত আলোচনা করে নিই, {CONTACT_NUMBER} নম্বরে নক করুন।"
- AI বা বট পরিচয় দেবে না। কোনো markdown ব্যবহার করবে না।"""

COMMENT_PROMPT = f"""\
তুমি AR TechLabs-এর কাস্টমার সার্ভিস। আমরা ছোট বিজনেস পেজের জন্য Facebook Page Automation সার্ভিস দিই
(AI অটো-রিপ্লাই + প্রতিদিন AI অটো-পোস্ট)। ফ্রি/কম খরচের AI টুল ব্যবহার করি — কোনো হিডেন চার্জ নেই।
নিয়ম:
- কমেন্টের উত্তর ১-২ লাইনে দাও, বন্ধুত্বপূর্ণভাবে।
- দাম বা প্যাকেজ জিজ্ঞেস করলে সংক্ষেপে বলো এবং ইনবক্সে বিস্তারিত জানার কথা বলো।
- সবসময় বাংলায় উত্তর দাও (ইংরেজি কমেন্টে ইংরেজিতে)।
- AI বা বট পরিচয় দেবে না। কোনো markdown ব্যবহার করবে না।"""


# ── Groq chat with key rotation ───────────────────────────────────────────────

def _chat(messages: list, max_tokens: int = 400, temperature: float = 0.7) -> str:
    global _next_client_index
    now = time.time()
    n = len(_CLIENTS)
    for attempt in range(n):
        i = (_next_client_index + attempt) % n
        client, model = _CLIENTS[i]
        if now < _rate_limited_until.get(i, 0):
            logger.info("Skipping key %d (cooldown %.0fs left)", i, _rate_limited_until[i] - now)
            continue
        try:
            resp = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            _next_client_index = (i + 1) % n
            return resp.choices[0].message.content.strip()
        except Exception as e:
            err = str(e)
            if "429" in err or "rate_limit" in err.lower():
                _rate_limited_until[i] = time.time() + _COOLDOWN_SECS
                logger.warning("Rate limit key %d — cooldown %ds", i, _COOLDOWN_SECS)
                continue
            if "413" in err or "too large" in err.lower():
                logger.warning("Payload too large, trying next client...")
                continue
            raise
    raise RuntimeError("All Groq clients exhausted")


# ── Reply generators ──────────────────────────────────────────────────────────

def generate_comment_reply(comment_text: str, post_text: str = "") -> str:
    context = f'পোস্ট: "{post_text[:150]}"\n' if post_text else ""
    try:
        return _chat(
            messages=[
                {"role": "system", "content": COMMENT_PROMPT},
                {"role": "user", "content": f"{context}কমেন্ট: \"{comment_text}\""},
            ],
            max_tokens=100,
            temperature=0.7,
        )
    except Exception as e:
        logger.error("Groq comment reply failed: %s", e)
        return f"ধন্যবাদ! 🤖 বিস্তারিত জানতে ইনবক্সে মেসেজ করুন অথবা কল করুন {CONTACT_NUMBER}।"


def generate_inbox_reply(user_message: str, history: list = None) -> str:
    messages = [{"role": "system", "content": BASE_PROMPT}]
    if history:
        messages.extend(history[-4:])
    messages.append({"role": "user", "content": user_message})
    try:
        return _chat(messages=messages, max_tokens=500, temperature=0.7)
    except Exception as e:
        logger.error("Groq inbox reply failed: %s", e)
        return f"আপনার বার্তার জন্য ধন্যবাদ! 🤖 আমরা শীঘ্রই উত্তর দেব। যোগাযোগ: {CONTACT_NUMBER}"
