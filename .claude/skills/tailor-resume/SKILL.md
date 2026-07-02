---
name: tailor-resume
description: >-
  Build a job-tailored, ATS-friendly resume PDF from the user's CV. Use when the user wants to
  tailor/adapt/customize their resume or CV to a specific job offer, generate a resume for an
  application, or asks to "tailor my resume", "make a CV for this job", "adapt my resume to this
  offer". The flow: collect the user's CV as a PDF, then the job offer in any form (URL, pasted
  text, PDF, or image), then produce a tailored single-column PDF. Never fabricates experience.
---

# Tailor Resume

Produce a resume tailored to a specific job offer, rendered as a clean, single-column,
ATS-friendly PDF. Work through the three steps below **in order**. Do not skip a step; if you
already have the input from earlier in the conversation, confirm it rather than re-asking.

The golden rule, enforced at every step: **never invent experience, skills, employers, dates,
or metrics.** Tailoring means reorder, rephrase, emphasize, translate, and hide off-topic
content — nothing more. If the offer wants something the CV doesn't show, leave it out; don't
manufacture it.

Paths below are relative to this skill's directory unless noted. Outputs go under `offers/` in
the current working directory.

## Step 1 — Get the CV (as a PDF) and extract the master

1. Ask the user to provide **the PDF of their current CV / résumé** (a file path). If a
   `master.md` already exists in the working directory, offer to reuse it and skip extraction.
2. Read the PDF with the Read tool. Extract **every** real fact into `master.md` (Markdown) in
   the working directory: name, contact details, titles, each role (company, dates, location,
   bullets, stack), skills, projects (with links), education, languages, certifications.
   - `master.md` is the source of truth. Capture completely and verbatim in meaning — this is
     extraction, not editing. It is gitignored and stays local.
3. Briefly confirm with the user that the extracted master looks complete before tailoring.

## Step 2 — Get the job offer (any form)

Ask for the offer and accept it however it comes:

- **URL** → fetch it (WebFetch) and read the description.
- **Pasted text** → use it directly.
- **PDF / screenshot / image** → read it with the Read tool.

Then write `offers/<company>/offer.md` (the captured offer) and `offers/<company>/analysis.md`
containing:

- Detected **language** of the offer (FR/EN/…). The tailored CV is produced in **that** language.
- Extracted **keywords, must-haves, seniority, and tech stack**.
- A **mapping** from offer requirements → matching evidence in `master.md`, and an honest note
  of gaps (requirements with no backing in the CV — these are simply omitted, never invented).

Use a short, filesystem-safe `<company>` slug (e.g. `acme-corp`).

## Step 3 — Build and render the tailored resume

1. Clone `assets/resume-template.html` into `offers/<company>/resume.html` and fill it from
   `master.md`, guided by `analysis.md`:
   - Rewrite the **title** and **summary** to the target role using the offer's vocabulary.
   - **Reorder** sections and bullets so the most offer-relevant content comes first.
   - Surface matching projects/skills; **hide** off-topic content.
   - Produce all prose in the **offer's language** (translate real content; don't add content).
   - Keep only real facts. Metrics must come from the CV.
2. **Inline the stylesheet**: replace the `<style>…</style>` block in the cloned HTML with the
   full contents of `assets/style.css`, so the HTML is self-contained. Class names in the
   template map 1:1 to that stylesheet — don't invent new classes.
3. Render to PDF:
   ```bash
   node <skill-dir>/scripts/render.mjs offers/<company>/resume.html offers/<company>/resume.pdf
   ```
   Requires `google-chrome` (headless) and Node.js. A one-off NSS certificate warning from
   Chrome is harmless.
4. Report the path to `offers/<company>/resume.pdf` and give a short summary of what you
   emphasized, reordered, or omitted and why.

## Quality checklist before delivering

- [ ] Single column, fits cleanly on A4, ATS-friendly (no images/tables for layout).
- [ ] Every claim traces back to `master.md`. Nothing invented.
- [ ] Language matches the offer.
- [ ] Title + summary + top bullets clearly speak to the offer's must-haves.
- [ ] Contact details preserved exactly from the CV.
