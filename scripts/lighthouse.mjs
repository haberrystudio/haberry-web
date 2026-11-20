// Mobile Lighthouse run against the local export using Edge: node scripts/lighthouse.mjs [url]
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const url = process.argv[2] || "http://127.0.0.1:4173/";
const edge = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find((p) => fs.existsSync(p));
if (!edge) throw new Error("Microsoft Edge not found");
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "lh-"));
const port = 9333;
const browser = spawn(edge, [`--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--headless=new", "--no-first-run", "about:blank"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 4000));
const out = path.join(profile, "lh.json");
const run = spawnSync("npx", ["-y", "lighthouse", url, `--port=${port}`, "--form-factor=mobile", "--only-categories=performance,accessibility,best-practices,seo", "--output=json", `--output-path=${out}`, "--quiet"], { stdio: "inherit", shell: true });
browser.kill();
if (!fs.existsSync(out)) { console.log("Lighthouse produced no report", run.status); process.exit(1); }
const r = JSON.parse(fs.readFileSync(out, "utf8"));
for (const [k, v] of Object.entries(r.categories)) console.log(k.padEnd(16), Math.round(v.score * 100));
for (const id of ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index", "total-byte-weight"]) console.log(id.padEnd(28), r.audits[id].displayValue);
for (const a of Object.values(r.audits)) if (a.score !== null && a.score < 0.9 && !["informative", "notApplicable", "manual"].includes(a.scoreDisplayMode)) console.log("ISSUE", a.id, a.score, a.displayValue || "");
