// Accessibility audit with axe-core (WCAG 2 A/AA): node scripts/a11y.mjs [baseUrl]
import { chromium } from "playwright-core";
import fs from "node:fs";
const base = process.argv[2] || "http://127.0.0.1:4173";
const axeSrc = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const b = await chromium.launch({ channel: "msedge" });
let total = 0;
for (const path of ["/"]) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
    const p = await c.newPage();
    await p.goto(base + path, { waitUntil: "networkidle" });
    await p.addScriptTag({ content: axeSrc });
    const res = await p.evaluate(() => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] } }));
    console.log(`\n== ${path} @${w}: ${res.violations.length} violations, ${res.passes.length} rules passed`);
    for (const v of res.violations) {
      total++;
      console.log(`- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
      for (const n of v.nodes.slice(0, 3)) console.log(`    ${n.target.join(" ")} :: ${(n.failureSummary || "").split("\n").slice(0, 2).join(" ").slice(0, 160)}`);
    }
    await c.close();
  }
}
await b.close();
console.log(total ? `\n${total} violation groups` : "\nNo violations");
