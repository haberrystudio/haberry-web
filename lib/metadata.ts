import type { Metadata } from "next";
import type { Content } from "../content/types";
import { site } from "../site.config";

/** Canonical, hreflang and share image appear only once NEXT_PUBLIC_SITE_URL is set. */
export function buildMetadata(c: Content): Metadata {
  const hasUrl = site.url.length > 0;
  const base: Metadata = {
    title: c.meta.title,
    description: c.meta.description,
    applicationName: site.name,
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      siteName: site.name,
      type: "website",
      locale: c.locale,
      ...(hasUrl ? { url: site.url + c.path, images: [{ url: site.url + "/og.png", width: 1200, height: 630, alt: "HABERRY" }] } : {}),
    },
    twitter: { card: "summary_large_image", title: c.meta.title, description: c.meta.description },
    robots: { index: true, follow: true },
  };
  if (hasUrl) {
    base.metadataBase = new URL(site.url);
    base.alternates = { canonical: site.url + c.path };
  }
  return base;
}
