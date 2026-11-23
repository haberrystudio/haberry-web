import DirectoryLinks from "../../../components/DirectoryLinks";
import { locations, locationsPath } from "../../../content/locations";
import { en } from "../../../content/en";
import { buildMetadata } from "../../../lib/metadata";

export const metadata = buildMetadata({
  path: locationsPath,
  locale: en.locale,
  meta: {
    title: "Digital Agency for Businesses in Kerala and Dubai | HABERRY",
    description: "Explore Haberry Studio’s website, digital marketing and software services for businesses in Kasaragod, Kozhikode, across Kerala and remotely for Dubai.",
  },
});

export default function LocationsPage() {
  return (
    <main className="sec">
      <div className="wrap service-page">
        <nav aria-label="Breadcrumb"><a className="ulink" href="/">HABERRY</a></nav>
        <h1>Digital agency services across Kerala and for Dubai</h1>
        <p className="sec__intro">Haberry Studio is based in Kasaragod. We help businesses in Kerala with websites, marketing, branding and software, and take remote project enquiries from Dubai.</p>
        <h2>Kerala cities and regions</h2>
        <DirectoryLinks items={locations.filter(({ slug }) => slug !== "dubai")} />
        <h2>Dubai project enquiries</h2>
        <DirectoryLinks items={locations.filter(({ slug }) => slug === "dubai")} />
        <a className="btn btn--wa" href="/services/">Explore all services</a>
      </div>
    </main>
  );
}
