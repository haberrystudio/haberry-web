// Screenshots at the four test widths: node scripts/shoot.mjs [url] [outDir] [suffix]
import { chromium } from "playwright-core";
import fs from "node:fs";

const url = process.argv[2] || "http://127.0.0.1:4173/";
const out = process.argv[3] || "shots";
const suffix = process.argv[4] || "";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
for (const [w, h] of [[390, 844], [768, 1024], [1024, 768], [1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await page.screenshot({ path: `${out}/${w}${suffix}-fold.png` });
  await page.screenshot({ path: `${out}/${w}${suffix}-full.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(w, "horizontal overflow px:", overflow);
  await ctx.close();
}
await browser.close();
