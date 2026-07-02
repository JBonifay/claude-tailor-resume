# Resume — tailored per job offer, driven by Claude Code

A small pipeline for generating a **job-tailored CV** from a single master résumé, then
rendering it to a clean, ATS-friendly PDF. The tailoring is done by
[Claude Code](https://claude.com/claude-code): you hand it a job offer, it reshapes your
master CV to match, and renders the PDF.

> The repo ships with the **tooling only** — the template, the renderer, and this guide.
> Your actual résumé (with your personal contact details) stays on your machine and is
> gitignored. You bring your own master CV.

## Prerequisites

- [Claude Code](https://claude.com/claude-code)
- Node.js
- Google Chrome (`google-chrome`, used headless to print the PDF)

## Setup

Create your master CV as `2026.md` in the repo root — this is your **source of truth**.
It holds every real fact about you (experience, projects, skills, contact details). Keep it
complete; tailoring only ever *reorders, rephrases, emphasizes, or hides* — it never invents.

```
2026.md            # your master CV in Markdown  (gitignored — stays local)
```

Optionally keep a `2026.html` version (a clean base, using `template/style.css`, that
per-offer CVs are cloned from). These files are gitignored so they never get published.

## How to use with Claude Code

1. Open this folder in Claude Code:
   ```bash
   cd Resume
   claude
   ```

2. Give Claude a **job-offer URL** or paste the **job description**, e.g.:

   > Tailor my CV for this offer: https://example.com/jobs/senior-backend-engineer

   or

   > Here's a job description, tailor my CV for it:
   > ```
   > <paste the offer text>
   > ```

3. Claude then:
   - Fetches / reads the offer and extracts **keywords, must-haves, seniority, and stack**.
   - Detects the offer's **language** (FR/EN) → produces the tailored CV in that language.
   - Builds a tailored résumé from `2026.md`: reorders sections, surfaces the most relevant
     projects/skills, rewrites the title + summary + bullets using the offer's vocabulary, and
     hides off-topic content. **No fabricated experience.**
   - Renders a clean, single-column, ATS-friendly **PDF**.

4. The deliverable lands in `offers/<company>/resume.pdf`.

## Layout

```
2026.md                     # master CV (source of truth — gitignored, local only)
2026.html                   # master CV in the clean template (gitignored, local only)
template/style.css          # shared design (A4, single-column, ATS-friendly)
build/render.mjs            # HTML -> PDF via headless Chrome
offers/<company>/           # per-offer working dir (gitignored)
  ├── offer.md              # the offer (fetched or pasted)
  ├── analysis.md           # extracted keywords / gaps / mapping
  ├── resume.html           # tailored CV
  └── resume.pdf            # final deliverable
```

## Render command

If you want to render an HTML CV to PDF yourself (Claude runs this for you during tailoring):

```bash
node build/render.mjs <input.html> <output.pdf>
```

Requires `google-chrome` (headless) and Node.js. A one-off NSS certificate warning from
Chrome during rendering is harmless.
