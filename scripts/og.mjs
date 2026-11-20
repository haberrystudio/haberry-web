// Regenerates public/og.png (1200x630) from the live hero: node scripts/og.mjs
import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "msedge" });
const c = await b.newContext({ viewport: { width: 1200, height: 630 }, reducedMotion: "reduce" });
const p = await c.newPage();
await p.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await p.addStyleTag({ content: ".sec,.ftr,.hdr,.mbar,.hero__scale{display:none!important} .hero{padding-top:40px} .hero__actions{display:none!important} .hero{min-height:630px} h1{font-size:76px!important} .lede{display:none}" });
await p.screenshot({ path: "public/og.png" });
await b.close();
