import type { Content } from "../content/types";
import type { site as Site } from "../site.config";

type Props = {
  c: Content;
  site: typeof Site;
  has: { whatsapp: boolean; phone: boolean; email: boolean };
};

/** Structured data uses only facts we have: name, city, services. Contact fields appear once supplied. */
export default function JsonLd({ c, site, has }: Props) {
  const sameAs = Object.values(site.social).filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": (site.url || "") + "/#org",
        name: "HABERRY",
        description: c.meta.description,
        areaServed: { "@type": "AdministrativeArea", name: "Kasaragod, Kerala, India" },
        address: { "@type": "PostalAddress", addressLocality: "Kasaragod", addressRegion: "Kerala", addressCountry: "IN" },
        knowsAbout: [
          "Digital marketing",
          "Web development",
          "Mobile app development",
          "Custom software",
          "Branding and identity",
          "Content creation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Agency services",
          itemListElement: c.services.items.map(({ name }) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
        ...(site.url ? { url: site.url + "/" } : {}),
        ...(has.email ? { email: site.contact.email } : {}),
        ...(has.phone ? { telephone: site.contact.phone } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "FAQPage",
        inLanguage: c.lang,
        mainEntity: c.faq.items.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      },
      {
        "@type": "WebSite",
        name: "HABERRY",
        inLanguage: c.lang,
        ...(site.url ? { url: site.url + c.path } : {}),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
