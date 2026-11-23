import { servicePages } from "../../content/service-pages";
import { site } from "../../site.config";

export const dynamic = "force-static";

export function GET() {
  const links = servicePages.map(({ name, path, description }) =>
    `- [${name}](${site.url}${path}): ${description}`,
  );

  return new Response([
    "# HABERRY",
    "",
    "> Digital and creative agency based in Kasaragod, Kerala, India.",
    "",
    "## Company",
    "",
    `- [Homepage](${site.url}/): Agency information, frequently asked questions and contact options.`,
    `- [Contact](${site.url}/#contact): Project inquiries.`,
    "",
    "## Services",
    "",
    ...links,
    "",
  ].join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
