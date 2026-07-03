# AR TechLabs — Facebook Bot

## What This Is
A polling-based Facebook auto-reply bot for the "AR TechLabs" page. This is also the
product itself: the same engine (auto-reply + auto-post) is what we sell to clients as
"Facebook Page Automation." We run it on our own page both to demo it and to market it.
Replies to post comments and Messenger inbox using Groq AI (llama-3.3-70b-versatile).
No webhook needed — pure polling every 15 seconds.

## Business Info
- **Company:** AR TechLabs
- **Owner:** Md. Abdur Rahman
- **Page:** AR TechLabs (Facebook)
- **Contact:** 01714-042230 (WhatsApp / Call)
- **Email:** abdurrahmanrussel77@gmail.com
- **Portfolio:** https://md-abdur-rahman.vercel.app/
- **Frontend site:** `frontend/` — Next.js, pulled from github.com/abdurrahmanrussel/ar-techlabs

## What We Sell — Pricing
| Package | Setup Fee | Monthly | Includes |
|---|---|---|---|
| Starter | ৳5,000 | ৳500 | AI auto-reply (comments + inbox) + daily AI auto-posts |
| Growth | ৳8,000 | ৳500 | Starter + a simple business website hosted on Vercel |
| Enterprise | Custom | Custom | Multi-page / high-volume — discuss requirements first |

Positioning: built for **small business pages**. We use free/low-cost AI tools to keep
the service charge low. No hidden charges — what's quoted is what's billed.

## Files
| File | Purpose |
|---|---|
| `poller.py` | Main bot — polls comments and inbox every 15s, runs the daily evening auto-post |
| `ai.py` | Groq AI reply generator + service/pricing catalogue |
| `config.py` | Loads env vars from `.env` |
| `fb_api.py` | Facebook Graph API helpers |
| `server.py` | Flask entry point for Render deployment |
| `post_offer.py` | Manual script to post a package offer to the page |
| `add_post.py` | **Local only** — reads `posts.txt`, uploads posts to Google Sheet queue |
| `download_images.py` | **Local only** — downloads images by keyword, save to Drive folder |
| `posts.txt` | **Local only** — 30-day content calendar (AI/automation/engagement topics), run `add_post.py` to upload |
| `apps_script.js` | Reference copy of the Google Apps Script code (paste into the Sheet's Apps Script editor) |
| `render.yaml` | Render deployment config |
| `requirements.txt` | Python dependencies |
| `.env` | Secrets — never commit this |

## Running Locally
```bash
cd backend
source venv/bin/activate
python poller.py
```

## Deploying to Render
- Start command: `gunicorn server:app --bind 0.0.0.0:$PORT --timeout 120`
- UptimeRobot pings `/health` every 5 minutes to keep it awake
- Push to GitHub → Render auto-deploys

## Facebook App
Created and configured — see `PERMISSIONS.md` for App ID / Page ID / permissions.
`.env` has `APP_ID`, `APP_SECRET`, `PAGE_ACCESS_TOKEN`, `PAGE_ID` all filled in and verified
(test post confirmed working). Current app grants: `pages_show_list`, `pages_messaging`,
`pages_read_engagement`, `pages_manage_metadata`, `pages_read_user_content`,
`pages_manage_posts`, `pages_manage_engagement`, `public_profile`.

## Groq AI
- Model: `llama-3.3-70b-versatile`
- Up to 5 API keys rotating (round-robin) — 100k tokens/day each
- On 429 rate limit: marks key in 60s cooldown, moves to next key
- Keys stored as `GROQ_API_KEY` through `GROQ_API_KEY5` in `.env`

## Bot Behavior

### Comments
- Short 1-2 line friendly AI reply
- Always appends: "📩 বিস্তারিত জানতে ইনবক্সে মেসেজ করুন।"

### Inbox (Messenger)
- If pricing/package keyword detected → serve raw `SERVICE_LIST` (no AI, no hallucination)
- Otherwise → AI reply with last 4 turns of conversation history
- Only ONE reply per poll cycle

### Special Cases
| Trigger | Bot Response |
|---|---|
| Voice message | Asks to send text |
| Image only | Silently ignored |
| Enterprise / bulk inquiry | "আগে বিস্তারিত আলোচনা করে নিই, কল করুন: 01714-042230" |
| Language | Bangla by default, mirrors English if asked in English |

## Daily Auto-Post (Bangladesh Time)
Once per day, in the evening (~19:00 BD time, 10-minute fire window). Pulled from the
Google Sheet queue — see `posts.txt` for the 30-day rotating content calendar (AI value,
Facebook engagement, why late replies lose customers, why use our automation, etc.). If
the sheet is empty at that slot, it's skipped.

## Manual Post
```bash
source venv/bin/activate
python post_offer.py              # full package/pricing list
python post_offer.py starter      # Starter package post
python post_offer.py growth       # Growth package post
```

## Uploading Scheduled Posts (Local Only)

### Step 1 — Download images
```bash
source venv/bin/activate
python download_images.py "facebook marketing" 50
python download_images.py "ai automation business" 50
```
Images saved to `downloaded_images/<keyword>/`. Upload that folder to the Google Drive
image folder manually (same Drive folder link used for the page's post images).

### Step 2 — Write posts
`posts.txt` already contains 30 numbered posts (one per day, evening auto-post). Edit as
needed — Bengali or English numbers both work:
```
১. First post text here
২. Second post text here
৩. Third post text here
```

### Step 3 — Upload to queue
```bash
source venv/bin/activate
python add_post.py          # preview + upload all posts from posts.txt
python add_post.py --list   # see what's currently queued in the sheet
python add_post.py --clear  # clear the entire queue
```
Apps Script auto-assigns images from the Drive folder (cycles through them in order).

## Google Sheets / Apps Script
- Image folder (public): https://drive.google.com/drive/folders/1YVwkNkUGgAXTX-xkm0taohUt4R3T7Hi8
- Apps Script code: `apps_script.js` — deploy as a Web App bound to a new Google Sheet
  (Extensions → Apps Script → paste → Deploy → New deployment → Web app → Execute as Me →
  Access: Anyone). Copy the resulting `/exec` URL into `.env` as `GOOGLE_SCRIPT_URL`.
- Sheet layout: single column (A) of queued post text, row 1 = header, row 2+ = queue.
- Each post is paired with a random image picked fresh from the Drive folder at post time.
