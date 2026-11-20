// Screenshots of the brief builder at step 1 and step 5: node scripts/wizard-shots.mjs [url]
import { chromium } from "playwright-core";
const url = process.argv[2] || "http://127.0.0.1:4173/";
const b = await chromium.launch({ channel: "msedge" });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const c = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  const p = await c.newPage();
  await p.goto(url, { waitUntil: "networkidle" });
  await p.click(".tile[data-k='web']");
  await p.locator("#contact").scrollIntoViewIfNeeded();
  await p.waitForTimeout(300);
  await p.locator("#contact").screenshot({ path: `shots/wiz-${w}-1.png` });
  for (let i = 0; i < 4; i++) {
    if (i === 0) await p.click("#contact .opt:has-text('Sell online')").catch(() => {});
    await p.click("#contact .form__nav .btn--wa");
  }
  await p.fill("#f-name", "Rahul");
  await p.fill("#f-reach", "98765 43210");
  await p.locator("#contact").screenshot({ path: `shots/wiz-${w}-5.png` });
  await c.close();
}
await b.close();
