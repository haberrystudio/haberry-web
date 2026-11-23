import { notFound } from "next/navigation";
import { en } from "../../../../content/en";
import { servicePages } from "../../../../content/service-pages";
import { buildMetadata } from "../../../../lib/metadata";
import { site } from "../../../../site.config";

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
    areaServed: { "@type": "City", name: "Kasaragod" },
    provider: site.url ? { "@id": `${site.url}/#org` } : { "@type": "Organization", name: site.name },
    ...(site.url ? { url: site.url + service.path, "@id": `${site.url}${service.path}#service` } : {}),
  };

  return (
    <main className="sec">
      <div className="wrap service-page">
        <nav aria-label="Breadcrumb">
          <a className="ulink" href="/">HABERRY</a>
          {" / "}
          <a className="ulink" href="/#services">Services</a>
        </nav>
        <h1>{service.heading}</h1>
        <p className="sec__intro">{service.summary}</p>
        <h2>What you get</h2>
        <ul>{service.gets.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Planning your project</h2>
        <p>{service.planning}</p>
        <a className="btn btn--wa" href="/#contact">Start a project request</a>
        <h2>Explore other services</h2>
        <ul>
          {servicePages.filter(({ id }) => id !== service.id).map(({ path, name }) => (
            <li key={path}><a className="ulink" href={path}>{name}</a></li>
          ))}
        </ul>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </main>
  );
}
