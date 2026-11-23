import DirectoryLinks from "../../../components/DirectoryLinks";
import { en } from "../../../content/en";
import { servicePages } from "../../../content/service-pages";
import { buildMetadata } from "../../../lib/metadata";

export const metadata = buildMetadata({
  path: "/services/",
  locale: en.locale,
  meta: {
    title: "Digital Marketing, Web & Software Services in Kerala | HABERRY",
    description: "Explore web development, e-commerce, local SEO, digital marketing, mobile apps, business software, branding and content services from Haberry Studio.",
  },
});

export default function ServicesPage() {
  return (
    <main className="sec">
      <div className="wrap service-page">
        <nav aria-label="Breadcrumb"><a className="ulink" href="/">HABERRY</a></nav>
        <h1>Digital marketing, design and software services</h1>
        <p className="sec__intro">Haberry Studio brings customer-facing work and business software together. We can plan how an enquiry moves from a campaign or website into your sales, booking or fulfilment workflow.</p>
        <h2>Explore our services</h2>
        <ul className="service-directory">
          {servicePages.map(({ path, name, summary }) => (
            <li key={path}>
              <h3><a className="ulink" href={path}>{name}</a></h3>
              <p>{summary}</p>
            </li>
          ))}
        </ul>
        <a className="btn btn--wa" href="/#contact">Start a project request</a>
      </div>
    </main>
  );
}
