import type { MetadataRoute } from "next";
import { site } from "../site.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [{ url: site.url + "/", changeFrequency: "monthly", priority: 1 }];
}
