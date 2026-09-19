# The answer engine (Worker)

This little service powers the "ask about me" box on the site. It sits between
the page and Google's Gemini model, holds the API key so it never sits in the
page, keeps answers grounded in `assets/snehal-facts.md`, refuses off-topic
questions, and rate-limits so nobody can run it up.

You only need to set this up **once**. Until you do, the "ask about me" box
simply stays hidden and the rest of the site works normally.

## What you'll need

1. A **Google AI Studio API key** (free): https://aistudio.google.com/apikey
   Click "Create API key", copy it.
2. A **Cloudflare account** (free): https://dash.cloudflare.com/sign-up

## Easiest path: the Cloudflare dashboard (no terminal)

1. In the Cloudflare dashboard, go to **Workers & Pages > Create > Create Worker**.
   Give it a name like `snehal-ask` and deploy the starter.
2. Click **Edit code**, delete what's there, paste in all of `worker.js` from
   this folder, and **Deploy**.
3. Open the Worker's **Settings > Variables and Secrets** and add:
   - Secret: `GEMINI_API_KEY` = your Google key from step 1.
   - Variables (plain text):
     - `MODEL` = `gemini-2.5-flash`
     - `FACTS_URL` = `https://snehalnawal.github.io/assets/snehal-facts.md`
     - `ALLOWED_ORIGIN` = `https://snehalnawal.github.io`
     - `PER_MIN_LIMIT` = `5`, `PER_DAY_LIMIT` = `30`, `GLOBAL_DAY_LIMIT` = `600`
4. Create a **KV namespace** for rate limiting: **Storage & Databases > KV >
   Create**, name it anything. Back in the Worker's **Settings > Bindings**, add
   a **KV namespace binding** with the variable name `ASK_KV` pointing to it.
5. Copy your Worker's URL (looks like `https://snehal-ask.<you>.workers.dev`).
6. In the site's `script.js`, set `WORKER_URL` at the top to that URL, then
   commit and push. The box appears and goes live.

## Terminal path (if you prefer wrangler)

```bash
cd worker
npm install -g wrangler
wrangler login
wrangler kv namespace create ASK_KV      # paste the printed id into wrangler.toml
wrangler secret put GEMINI_API_KEY        # paste your Google key when prompted
wrangler deploy
```

Then put the deployed URL into `WORKER_URL` in `script.js`.

## Editing what the bot knows

Everything the bot can say comes from `assets/snehal-facts.md`. Edit that file
in plain English and push; the Worker re-reads it within about 10 minutes, no
redeploy needed. If it isn't in that file, the bot won't say it.

## Cost and safety

- Gemini Flash has a free tier, so ordinary traffic costs nothing.
- Rate limits: each visitor gets `PER_MIN_LIMIT` per minute and `PER_DAY_LIMIT`
  per day; `GLOBAL_DAY_LIMIT` is a whole-site daily backstop. When a limit is
  hit, the box politely says to try later or email you. Nothing breaks.
- The bot answers only about your work and only from the facts file, so it can't
  be talked into saying something off-brand.
- Optional hardening later: add Cloudflare Turnstile (a free invisible captcha)
  to block bots before they reach the model.
