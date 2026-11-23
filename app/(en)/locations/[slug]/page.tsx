import { notFound } from "next/navigation";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import DirectoryLinks from "../../../../components/DirectoryLinks";
import { en } from "../../../../content/en";
import { locations, locationsPath, primaryLocations } from "../../../../content/locations";
import { servicePages } from "../../../../content/service-pages";
import { buildMetadata } from "../../../../lib/metadata";
import { site } from "../../../../site.config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map(({ slug }) => ({ slug }));
}

async function getLocation({ params }: Props) {
  const { slug } = await params;
  return locations.find((location) => location.slug === slug) ?? notFound();
}

export async function generateMetadata(props: Props) {
  const { heading, description, path } = await getLocation(props);
  return buildMetadata({ path, locale: en.locale, meta: { title: `${heading} | HABERRY`, description } });
}

export default async function LocationPage(props: Props) {
  const location = await getLocation(props);
  const services = servicePages.filter(({ id }) => location.services.includes(id));
  const message = encodeURIComponent(`Hi Haberry Studio, I’m enquiring about a project in ${location.name}. `);
  return (
    <main className="sec">
      <div className="wrap service-page">
        <Breadcrumbs section={{ name: "Locations", path: locationsPath }} current={location} />
        <h1>{location.heading}</h1>
        <p className="sec__intro">{location.description}</p>
        <h2>What your project could look like</h2>
        <p>{location.focus}</p>
        <h2>Services to explore</h2>
        <DirectoryLinks items={services} />
        <h2>What to include in your brief</h2>
        <p>{location.brief}</p>
        {site.contact.whatsapp && (
          <a className="btn btn--wa" href={`https://wa.me/${site.contact.whatsapp}?text=${message}`}>Discuss your project on WhatsApp</a>
        )}
        <p><a className="ulink" href="/#contact">Send a project brief</a></p>
        <h2>Explore other markets</h2>
        <DirectoryLinks items={primaryLocations.filter(({ slug }) => slug !== location.slug)} />
      </div>
    </main>
  );
}
