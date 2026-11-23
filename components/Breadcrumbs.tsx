import { site } from "../site.config";

export default function Breadcrumbs({ section, current }: {
  section: { name: string; path: string };
  current: { name: string; path: string };
}) {
  const items = [{ name: "HABERRY", path: "/" }, section, current];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: site.url + path,
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb">
        <a className="ulink" href="/">HABERRY</a>
        {" / "}
        <a className="ulink" href={section.path}>{section.name}</a>
        {" / "}
        <span aria-current="page">{current.name}</span>
      </nav>
      {site.url && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}
    </>
  );
}
