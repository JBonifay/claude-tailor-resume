# Resume — tailored per job offer

Master CV lives in **`2026.md`** (source of truth — content is never invented, only
reordered / rephrased / emphasized when tailoring).

## How a tailored CV is produced

Give Claude a **job-offer URL or the pasted description**. Claude then:

1. Fetches / reads the offer and extracts keywords, must-haves, seniority, and stack.
2. Detects the offer's language (FR/EN) → the tailored CV is produced in that language.
3. Builds a tailored resume from `2026.md`: reorders sections, surfaces the most relevant
   projects/skills, rewrites the title + summary + bullets with the offer's vocabulary, and hides
   off-topic content. **No fabricated experience.**
4. Renders a clean, single-column, ATS-friendly PDF.

## Layout

```
2026.md                     # master CV (source of truth)
2026.html                   # master CV in the clean template (base to clone per offer)
template/style.css          # shared design (A4, single-column, ATS-friendly)
build/render.mjs            # HTML -> PDF via headless Chrome
offers/<company>/
  ├── offer.md              # the offer (fetched or pasted)
  ├── analysis.md           # extracted keywords / gaps / mapping
  ├── resume.html           # tailored CV
  └── resume.pdf            # final deliverable
```

## Render command

```bash
node build/render.mjs <input.html> <output.pdf>
```

Requires `google-chrome` (headless) and Node.js.
