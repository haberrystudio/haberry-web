// Interaction tests against the served export: node scripts/test.mjs
// Expects a build made with NEXT_PUBLIC_FORM_ENDPOINT=https://forms.test/submit (requests are mocked here).
import { chromium } from "playwright-core";
const base = "http://127.0.0.1:4173";
let fails = 0;
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) fails++; };
const browser = await chromium.launch({ channel: "msedge" });
const ctx = (w, h, extra = {}) => browser.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce", ...extra });
const small = (p) => p.evaluate(() => [...document.querySelectorAll("a,button,select,input,textarea,summary")].filter((e) => {
  const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
  return r.width > 0 && cs.visibility !== "hidden" && cs.display !== "none" && !e.closest(".hp") && !e.classList.contains("skip") && !e.classList.contains("sr") && r.height < 44;
}).map((e) => e.outerHTML.slice(0, 90)));

// --- desktop: tiles, wizard, submit states
{
  const c = await ctx(1440, 900); const p = await c.newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.click(".tile[data-k='web']");
  const href = await p.getAttribute(".actions .btn--wa", "href");
  ok(href.includes("wa.me/918590186881") && decodeURIComponent(href).includes("Website"), "tile writes service into WhatsApp link");
  ok(await p.isChecked("#contact input[type=checkbox] >> nth=1"), "wizard step 1 pre-selected from tile");
  await p.click(".xp__item:nth-child(5) .xp__tab"); await p.click(".xp__panel:not([hidden]) .ask");
  ok(await p.isChecked("#contact input[type=checkbox] >> nth=4"), "services 'Ask about this' pre-selects");

  // step 1 validation: clear selection then Next
  await p.click("#contact .opt:has-text('Branding')"); // untick
  await p.click("#contact .form__nav .btn--wa");
  ok((await p.locator(".err").count()) === 1, "step 1 requires a choice");
  await p.click("#contact .opt:has-text('Website')");
  await p.click("#contact .opt:has-text('Content')");
  await p.click("#contact .form__nav .btn--wa");
  ok((await p.textContent(".form__step")).includes("2"), "advances to step 2");
  ok(await p.evaluate(() => document.activeElement?.className) === "fs__title", "focus moves to step title");
  await p.click("#contact .opt:has-text('Sell online')");
  await p.click("#contact .form__nav .btn--wa");
  await p.click("#contact .form__nav .btn--wa"); // skip timing
  ok(/Skip|Next/.test(await p.textContent("#contact .form__nav .btn--wa")), "step 4 has next/skip");
  await p.click("#contact .opt:has-text('Under')");
  await p.click("#contact .form__nav .btn--wa");
  ok((await p.textContent(".form__step")).includes("5"), "reaches step 5");
  ok((await p.textContent(".summary")).includes("Website, Content") && (await p.textContent(".summary")).includes("Under ₹25,000"), "summary shows the brief");

  // validation at step 5
  await p.click("#contact .form__send .btn--line");
  ok((await p.locator(".err").count()) === 2, "step 5 rejects empty name and contact");
  await p.fill("#f-name", "Test"); await p.fill("#f-reach", "12345");
  await p.click("#contact .form__send .btn--line");
  ok((await p.locator("#err-reach").count()) === 1, "invalid phone rejected");
  await p.fill("#f-reach", "98765 43210");
  // WhatsApp link content
  const wa = decodeURIComponent(await p.getAttribute("#contact .form__send .btn--wa", "href"));
  ok(wa.includes("this is Test") && wa.includes("Website, Content") && wa.includes("Goal: Sell online") && wa.includes("Budget: Under"), "WhatsApp message carries the brief");

  await p.route("https://forms.test/**", (r) => r.fulfill({ status: 500, body: "{}" }));
  await p.click("#contact .form__send .btn--line"); await p.waitForSelector(".form__fail");
  ok(!(await p.locator(".form__ok").count()), "500 response does NOT show success");
  await p.unroute("https://forms.test/**");
  await p.route("https://forms.test/**", (r) => r.abort());
  await p.click("#contact .form__send .btn--line"); await p.waitForSelector(".form__fail");
  ok(!(await p.locator(".form__ok").count()), "network error does NOT show success");
  await p.unroute("https://forms.test/**");
  await p.route("https://forms.test/**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"success":false}' }));
  await p.click("#contact .form__send .btn--line"); await p.waitForSelector(".form__fail");
  ok(!(await p.locator(".form__ok").count()), "200 with success:false does NOT show success");
  await p.unroute("https://forms.test/**");
  let body = null;
  await p.route("https://forms.test/**", (r) => { body = r.request().postDataJSON(); r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }); });
  await p.click("#contact .form__send .btn--line"); await p.waitForSelector(".form__ok");
  ok(body && body.contact === "98765 43210" && body.budget_band.startsWith("Under") && body.services === "Website, Content", "success only after real 2xx; payload correct");
  ok(errs.length === 0, "no page errors " + errs.join("|"));

  // FAQ + structured data + sections
  await p.goto(base + "/?r=1", { waitUntil: "networkidle" });
  ok((await p.locator("details.qa").count()) === 6, "6 FAQ items");
  await p.click("details.qa:nth-child(2) summary");
  ok(await p.evaluate(() => document.querySelector("details.qa:nth-child(2)").open), "FAQ item opens");
  const ld = await p.evaluate(() => [...document.querySelectorAll("script[type='application/ld+json']")].map((s) => s.textContent).join(""));
  ok(ld.includes("FAQPage") && ld.includes("haberrydigital@gmail.com"), "JSON-LD has FAQ and real contact");
  ok(await p.evaluate(() => !!document.querySelector(".fwa")), "floating WhatsApp present on desktop");
  const sm = await small(p);
  ok(sm.length === 0, "all targets >=44px high (desktop) " + sm.join(" ; "));
  await p.goto(base + "/?r=2", { waitUntil: "networkidle" });
  await p.keyboard.press("Tab");
  ok(await p.evaluate(() => document.activeElement?.className) === "skip", "first Tab hits skip link");
  await c.close();
}
// --- mobile
{
  const c = await ctx(390, 844, { isMobile: true, hasTouch: true }); const p = await c.newPage();
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelector(".hero .actions").scrollIntoView({ block: "center" })); await p.waitForTimeout(500);
  ok(await p.evaluate(() => getComputedStyle(document.querySelector(".mbar")).visibility) === "hidden", "mobile bar hidden while hero buttons visible");
  ok(await p.evaluate(() => getComputedStyle(document.querySelector(".fwa")).display) === "none", "floating button hidden on phone");
  await p.click(".menu-btn");
  ok(await p.getAttribute(".menu-btn", "aria-expanded") === "true", "menu opens");
  await p.screenshot({ path: "shots/390-menu.png" });
  await p.click("#menu a[href='#roadmap']");
  await p.waitForTimeout(700);
  ok(await p.evaluate(() => getComputedStyle(document.querySelector(".mbar")).visibility) === "visible", "mobile bar visible after scrolling");
  const sm = await small(p);
  ok(sm.length === 0, "all targets >=44px high (390) " + sm.join(" ; "));
  await p.evaluate(() => document.querySelector("#contact").scrollIntoView());
  await p.waitForTimeout(300);
  await p.screenshot({ path: "shots/390-wizard1.png" });
  await c.close();
}
// --- lite mode
{
  const c = await ctx(1440, 900); const p = await c.newPage();
  await p.goto(base + "/", { waitUntil: "networkidle" });
  await p.click(".lite");
  ok(await p.evaluate(() => document.documentElement.hasAttribute("data-lite")), "lite toggle sets data-lite");
  await p.reload({ waitUntil: "networkidle" });
  ok(await p.evaluate(() => document.documentElement.hasAttribute("data-lite")), "lite persists after reload");
  await c.close();
}
await browser.close();
console.log(fails ? `${fails} FAILED` : "ALL PASSED");
process.exit(fails ? 1 : 0);
