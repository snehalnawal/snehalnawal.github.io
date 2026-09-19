# Snehal Nawal — personal site

A single-page personal site, plus a small "ask about me" AI answer engine.
Plain HTML, CSS, and a little JavaScript. No build step, no framework. Open
`index.html` and it works.

This README is written so you can hand it to a Claude Code session and let it do
the technical parts. If you get stuck, the web-UI steps are given too.

---

## Publish it at https://snehalnawal.github.io

GitHub Pages hosts this for free. A GitHub **user site** must live in a repo
named exactly `<your-username>.github.io`, under **your own** account. Your
username is `snehalnawal`, so the repo must be named **`snehalnawal.github.io`**.

You already have access to the source repo `apurwa/snehal.github.io` (you're a
collaborator). The plan is: copy it into a repo under your account, make that
public, and turn on Pages.

### The steps (a Claude Code session can run these)

1. Make sure the GitHub CLI is signed in **as you**:
   ```
   gh auth status        # if not logged in: gh auth login
   ```
2. Get the code:
   ```
   gh repo clone apurwa/snehal.github.io snehalnawal.github.io
   cd snehalnawal.github.io
   ```
3. Create the repo under your account and push to it:
   ```
   gh repo create snehalnawal.github.io --public
   git remote add mine https://github.com/snehalnawal/snehalnawal.github.io.git
   git push mine main
   ```
4. Turn on GitHub Pages:
   ```
   gh api -X POST repos/snehalnawal/snehalnawal.github.io/pages \
     -f 'source[branch]=main' -f 'source[path]=/'
   ```
   Or in the browser: **Settings → Pages → Build and deployment → Source:
   Deploy from a branch → Branch: `main` / `/ (root)` → Save.**
5. Wait about a minute, then open **https://snehalnawal.github.io**.

That's the whole deploy. The "ask about me" box works immediately (see below).

> After it's live, tell Apurwa so he can lock the answer engine to your domain
> (one small setting on his side). Until then it's open, which is fine.

---

## The "ask about me" answer engine

There's a box on the page where visitors can ask questions about you ("How does
she handle technical evaluations?") and get a live AI answer in your voice.

- It answers **only** from one plain-English file: **`assets/snehal-facts.md`**.
  If something isn't in that file, the bot won't say it. It's set up to refuse
  off-topic questions and to never invent numbers.
- It's **already running** (hosted by Apurwa for now), so there's nothing to set
  up. The connection is wired into `script.js`.

### Change what the bot can say

Edit `assets/snehal-facts.md` in plain English, commit, and push. The bot picks
up your changes within about 10 minutes. No redeploy needed.

### (Optional) Run the answer engine on your own account

If you'd rather own the whole thing (your own Google Gemini key + Cloudflare),
follow `worker/README.md`, then put your new Worker URL into `WORKER_URL` at the
top of `script.js`. Apurwa can walk you through it. The AI key is always a
Cloudflare secret; it never goes in this repo.

---

## Make it sound like you

The writing is a **draft in your voice** for you to own. Read `index.html` and
change anything that doesn't sound like you, especially:

- the hero line ("I'm Snehal. I sell AI to enterprises."),
- the `// how I work` paragraphs,
- the `// in practice` stories,
- the `// say hello` closing line.

Also update `assets/snehal-facts.md` so the bot reflects any changes. Commit and
push and the live site updates.

---

## Before you go public: the phone number

The linked resume, `Snehal-Nawal-Resume.pdf`, includes your phone number, and a
public page is downloadable by anyone. The web page and the AI bot do **not**
show your number, but the PDF does. If you'd rather not have it out there,
replace `Snehal-Nawal-Resume.pdf` with a phone-free copy before publishing (keep
the full one for sending directly to people).

---

## Files

| File | What it is |
|------|------------|
| `index.html` | All the content and structure. Edit copy here. |
| `styles.css` | The full design (colors, type, layout) as CSS variables at the top. |
| `script.js` | Year stamp + the "ask about me" widget. `WORKER_URL` at the top points it at the AI backend. The page works without it. |
| `assets/snehal-facts.md` | The only thing the AI answer engine is allowed to say. Edit in plain English. |
| `assets/snehal.jpg` | The hero photo. |
| `assets/og-image.png` | The preview card shown when the link is shared. |
| `assets/logos/` | Company and university logos. |
| `Snehal-Nawal-Resume.pdf` | The resume the "resume" link points to. |
| `worker/` | The AI answer engine's server code + its own setup guide. Only needed if you host it yourself. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (needed so the bot can read the facts file). |

## Preview locally

```
open index.html
```
Everything except the "ask about me" box works offline; the box needs internet
to reach the AI backend.
