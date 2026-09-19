# Snehal Nawal — personal site

A single-page personal portfolio. Plain HTML, CSS, and a small JS file. No build
step, no framework, no dependencies. Open `index.html` and it works.

## Files

| File | What it is |
|------|------------|
| `index.html` | All the content and structure. Edit copy here. |
| `styles.css` | The full design system (colors, type, layout) as CSS variables at the top. |
| `script.js` | Progressive enhancement only: current year, the fixed header, and the one count-up animation. The page works without it. |
| `Snehal-Nawal-Resume.pdf` | The resume the "Resume" button links to. Replace this file to update it. |
| `assets/favicon.svg` | Browser-tab icon (an "SN" monogram). |
| `assets/og-image.png` | The preview card shown when the link is shared (LinkedIn, iMessage, etc.). |

## Preview it locally

Just open the file:

```
open index.html
```

Or serve it (some browsers are strict about local fonts):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Edit the content

Everything you'd want to change is plain text inside `index.html`:

- **Headline number** lives on the `.figure-value` element in the hero. Change the
  visible text *and* its `data-count` / `data-prefix` / `data-suffix` attributes so
  the count-up matches.
- **The five-line results statement**, the four **signature wins**, the **track
  record**, **how she sells**, **education**, and **contact** are each their own
  clearly labelled `<section>`.
- **Colors and fonts** are CSS variables at the very top of `styles.css` under
  `:root`. Change them in one place and the whole page follows.

To swap in a headshot, add the image to `assets/` and place an `<img>` in the hero;
the layout leaves room for it on the left.

## Deploy to snehal.github.io

GitHub Pages serves this for free.

1. This site needs to live in a repository named **`<your-github-username>.github.io`**
   under your own GitHub account. If your username is `snehal`, the repo is
   `snehal.github.io` and the site publishes at `https://snehal.github.io`.
2. Push these files to that repository's `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → Branch: `main` / `root` → Save.**
4. Wait a minute, then open your URL.

If you use a repo with any other name, Pages still works, but the URL becomes
`https://<username>.github.io/<repo-name>/` instead of the clean root.

## A note before you go public

The linked resume PDF includes a phone number. A public web page is crawlable, so
if you'd rather not have the number indexed, link a phone-free copy of the resume
instead (keep the full one for direct sends).
