# HABERRY website

The build output is the `out/` folder: upload it to any static host.

## What the site does
- Hero states what, for whom and where; six service tiles pre-fill WhatsApp and the brief.
- 30-second brief builder (what, goal, timing, budget band, contact): send on WhatsApp (opens WhatsApp with the brief written) or as a request to the form endpoint.
- Honest by design: no fake numbers, clients or reviews. Roadmap marks only the Digital Agency as "Now".
- See `COMPETITOR-ANALYSIS.md` for how it compares with other Kerala agency sites and what is still missing (a real portfolio).

## Audits (last run)
- axe-core (WCAG 2.x A/AA + best practice): 0 violations on the homepage at 1440 and 390 pixels and on all six service pages at 390 pixels.
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
| `NEXT_PUBLIC_SITE_URL` | Local builds omit canonicals, absolute share image URLs and sitemap entries. Set the public HTTPS origin before deploying. |
| `NEXT_PUBLIC_INSTAGRAM` / `LINKEDIN` / `YOUTUBE` | Footer social links hidden |

Form endpoint: any service that accepts a JSON POST (Formspree, Web3Forms, your own server).
The site shows success only after a 2xx response without `ok:false` / `success:false` / `error` in the body.
Fields sent: `name, contact, services, goal, timing, budget_band, note, message, language`.

## Edit the copy
Homepage copy lives in `content/en.ts`. Service page titles, descriptions and planning guidance live in `content/service-pages.ts`.
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
Set `NEXT_PUBLIC_SITE_URL` to the preferred HTTPS origin in the build environment, rebuild, and publish `out/` to the static host. Activate the host's HTTPS redirect for HTTP and point alternate hostnames at the preferred HTTPS origin with permanent redirects that preserve the path and query string. The static export cannot issue these HTTP redirects itself.

After publishing, confirm that HTTP redirects with 301 or 308, the HTTPS pages return 200, and the live `/robots.txt`, `/sitemap.xml` and `/llms.txt` use the preferred origin. Check the homepage and a service page for canonical URLs and any host-added `X-Robots-Tag` header. Submit the sitemap in Google Search Console. The six service pages use lowercase, hyphenated URLs. Keep the homepage section links intact and point any known legacy page URLs to their closest equivalent at the host.

Images in `public/media` are concept artwork from the pitch deck. The site serves responsive WebP files at 800 and 1376 pixels.

See [BACKLINK-STRATEGY.md](BACKLINK-STRATEGY.md) for a 90-day outreach plan.
