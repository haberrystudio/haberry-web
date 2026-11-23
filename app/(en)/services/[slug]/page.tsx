import { notFound } from "next/navigation";
import { en } from "../../../../content/en";
import { servicePages } from "../../../../content/service-pages";
import { buildMetadata } from "../../../../lib/metadata";
import { site } from "../../../../site.config";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import DirectoryLinks from "../../../../components/DirectoryLinks";
import { locationsPath, primaryLocations } from "../../../../content/locations";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

async function getService({ params }: Props) {
  const { slug } = await params;
  return servicePages.find((service) => service.slug === slug) ?? notFound();
}

export async function generateMetadata(props: Props) {
  const { heading, description, path } = await getService(props);
  return buildMetadata({ path, locale: en.locale, meta: { title: `${heading} | HABERRY`, description } });
}

export default async function ServicePage(props: Props) {
  const service = await getService(props);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    areaServed: { "@type": "AdministrativeArea", name: "Kerala" },
    provider: site.url ? { "@id": `${site.url}/#org` } : { "@type": "Organization", name: site.name },
    ...(site.url ? { url: site.url + service.path, "@id": `${site.url}${service.path}#service` } : {}),
  };

  return (
    <main className="sec">
      <div className="wrap service-page">
        <Breadcrumbs section={{ name: "Services", path: "/services/" }} current={service} />
        <h1>{service.heading}</h1>
        <p className="sec__intro">{service.summary}</p>
        <h2>What you get</h2>
        <ul>{service.gets.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Planning your project</h2>
        <p>{service.planning}</p>
        <a className="btn btn--wa" href="/#contact">Start a project request</a>
        <h2>Explore other services</h2>
        <DirectoryLinks items={servicePages.filter(({ slug }) => slug !== service.slug)} />
        <h2>Find services by location</h2>
        <DirectoryLinks items={[...primaryLocations, { name: "All locations", path: locationsPath }]} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </main>
  );
}
