import type { MetadataRoute } from "next";
import { site } from "../site.config";
import { en } from "../content/en";
import { servicePages } from "../content/service-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [en.path, ...servicePages.map(({ path }) => path)].map((path) => ({ url: site.url + path }));
}
