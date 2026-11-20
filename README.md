# HABERRY website

The build output is the `out/` folder: upload it to any static host.

## What the site does
- Hero states what, for whom and where; six service tiles pre-fill WhatsApp and the brief.
- 30-second brief builder (what, goal, timing, budget band, contact): send on WhatsApp (opens WhatsApp with the brief written) or as a request to the form endpoint.
- Honest by design: no fake numbers, clients or reviews. Roadmap marks only the Digital Agency as "Now".
- See `COMPETITOR-ANALYSIS.md` for how it compares with other Kerala agency sites and what is still missing (a real portfolio).

## Audits (last run)
- axe-core (WCAG 2.x A/AA + best practice): 0 violations on `/` and `/ml/` at 1440 and 390 (`node scripts/a11y.mjs`).
- Lighthouse mobile (simulated slow phone, Edge): Accessibility 100, Best practices 100, SEO 100, Performance 80
  (LCP 1.1 s, CLS 0, TBT about 0.8 s). The remaining cost is React's runtime; going further would mean replacing React
  with hand-written scripts. Run `node scripts/lighthouse.mjs` (needs Edge and the site served on port 4173).
- 34 browser interaction checks: `node scripts/test.mjs` (needs a build with `NEXT_PUBLIC_FORM_ENDPOINT=https://forms.test/submit`).

## Run
```
npm install
npm run dev          # http://localhost:3000
npm run build        # writes ./out
node scripts/serve.mjs   # serve ./out on http://127.0.0.1:4173
```

## Contacts
The WhatsApp number (918590186881), phone (+91 85901 86881) and email (haberrydigital@gmail.com) are set as defaults in `site.config.ts`. Change them there or with the variables below. The WhatsApp number is assumed to be the same as the phone number.

## Still to supply (all optional, nothing is faked)
Copy `.env.example` to `.env.local` and fill in, then rebuild:

| Variable | Effect when empty |
|---|---|
| `NEXT_PUBLIC_WHATSAPP` / `PHONE` / `EMAIL` | Override the defaults above |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Form validates, then says plainly it is not connected. It never claims success |
| `NEXT_PUBLIC_SITE_URL` | No canonical, hreflang, sitemap entries or share image URL |
| `NEXT_PUBLIC_INSTAGRAM` / `LINKEDIN` / `YOUTUBE` | Footer social links hidden |

Form endpoint: any service that accepts a JSON POST (Formspree, Web3Forms, your own server).
The site shows success only after a 2xx response without `ok:false` / `success:false` / `error` in the body.
Fields sent: `name, contact, services, goal, timing, budget_band, note, message, language`.

## Edit the copy
All words live in `content/en.ts` (shape in `content/types.ts`). Components contain no copy.
- Service "You get" lists are plain-language drafts based on the PDF's one-line descriptions. Confirm them.
- Facts come only from the investor PDF. The roadmap marks the Digital Agency "Now" and everything else "Planned".
- There is no Work section: add one when you have real projects (no placeholders were used).

## Other things to know
- Lite mode: automatic with Save-Data or 2G, or the footer toggle. Stops all motion; the colour iris becomes a still.
  Reduced-motion has the same effect. The iris is pure CSS (no WebGL, no images). Palette comes from the pitch deck (indigo, violet, magenta, orange) plus yellow; tokens are at the top of `app/globals.css`.
- The wordmark is set as text. Replace it with your logo SVG in `components/Header.tsx` and `Footer.tsx` when you have one.
- `scripts/test.mjs` runs interaction tests (needs Microsoft Edge; the form tests expect a build with
  `NEXT_PUBLIC_FORM_ENDPOINT=https://forms.test/submit` and fake contact numbers). `scripts/shoot.mjs` takes screenshots at 390/768/1024/1440.
  `scripts/og.mjs` regenerates `public/og.png`.

## Deploy
Upload `out/` to Netlify, Cloudflare Pages, Vercel (static), GitHub Pages or any web server. Set the env vars in the host's build settings if it builds for you.
- Images in public/media come from the investor pitch deck. They are AI-generated concept images, not real photos: replace them with real photos of your team, studio and projects when you have them (same file names, 800 and 1376 px wide).
