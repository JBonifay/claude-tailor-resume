# tailor-resume — a Claude Code skill

A [Claude Code](https://claude.com/claude-code) **skill** that turns your CV into a
job-tailored, ATS-friendly PDF. You give it your résumé as a PDF and a job offer in any form;
it reshapes your CV to the offer's language and vocabulary and renders a clean single-column
PDF. It **never invents experience** — it only reorders, rephrases, emphasizes, translates, and
hides off-topic content.

## What it does

Three steps, run by the skill:

1. **CV in** — you provide the **PDF of your current CV**. Claude extracts every real fact into
   a local `master.md` (your source of truth, gitignored).
2. **Offer in (any form)** — you provide the **job offer** as a URL, pasted text, PDF, or
   screenshot. Claude detects its language and extracts keywords, must-haves, seniority, and
   stack, then maps them against your master CV.
3. **Tailored CV out** — Claude builds a tailored résumé in the offer's language and renders
   `offers/<company>/resume.pdf`.

## Prerequisites

- [Claude Code](https://claude.com/claude-code)
- Node.js
- Google Chrome (`google-chrome`, used headless to print the PDF)

## Install

The skill lives in this repo under `.claude/skills/tailor-resume/`, so it's available whenever
you run Claude Code from this folder:

```bash
git clone https://github.com/JBonifay/Resume.git
cd Resume
claude
```

To make it available in **any** project, copy it into your personal skills directory instead:

```bash
cp -r .claude/skills/tailor-resume ~/.claude/skills/
```

## Use

Inside Claude Code, just ask — for example:

> Tailor my resume for this offer: https://example.com/jobs/senior-backend-engineer

or

> /tailor-resume

Claude will ask for your CV PDF (step 1), then the offer (step 2), then produce the tailored
PDF (step 3). It confirms the extracted master looks complete before tailoring, and finishes
with a summary of what it emphasized, reordered, or omitted.

## Layout

```
.claude/skills/tailor-resume/
  ├── SKILL.md                  # the skill: the 3-step tailoring workflow
  ├── assets/
  │   ├── style.css             # A4, single-column, ATS-friendly design
  │   └── resume-template.html  # PII-free structure reference to clone
  └── scripts/
      └── render.mjs            # HTML -> PDF via headless Chrome

# created locally at use time (all gitignored):
master.md                       # facts extracted from your CV PDF (source of truth)
offers/<company>/
  ├── offer.md                  # the captured offer
  ├── analysis.md               # keywords / gaps / requirement→evidence mapping
  ├── resume.html               # tailored CV (stylesheet inlined)
  └── resume.pdf                # final deliverable
```

## Render command (manual)

Claude runs this for you, but you can render any HTML CV yourself:

```bash
node .claude/skills/tailor-resume/scripts/render.mjs <input.html> <output.pdf>
```

A one-off NSS certificate warning from Chrome during rendering is harmless.
