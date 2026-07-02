#!/usr/bin/env node
// Render an HTML resume to PDF using headless Chrome.
// Usage: node scripts/render.mjs <input.html> <output.pdf>
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { existsSync } from "node:fs";

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("Usage: node scripts/render.mjs <input.html> <output.pdf>");
  process.exit(1);
}

const inPath = resolve(input);
if (!existsSync(inPath)) {
  console.error(`Input not found: ${inPath}`);
  process.exit(1);
}
const outPath = resolve(output);

// Chrome's sandbox refuses to start when running as root (containers, CI, some
// servers). Only then disable it — keep the sandbox on for normal users.
const runningAsRoot = typeof process.getuid === "function" && process.getuid() === 0;

execFileSync(
  "google-chrome",
  [
    "--headless=new",
    ...(runningAsRoot ? ["--no-sandbox"] : []),
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=8000",
    `--print-to-pdf=${outPath}`,
    `file://${inPath}`,
  ],
  { stdio: ["ignore", "ignore", "inherit"] }
);

console.log(`✔ ${outPath}`);
