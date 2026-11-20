import type { Content } from "../content/types";
import { site, hasContact, formatPhone } from "../site.config";
import LiteToggle from "./LiteToggle";

export default function Footer({ c }: { c: Content }) {
  const f = c.footer;
  const social = [
    site.social.instagram && ["Instagram", site.social.instagram],
    site.social.linkedin && ["LinkedIn", site.social.linkedin],
    site.social.youtube && ["YouTube", site.social.youtube],
  ].filter(Boolean) as [string, string][];
  const hasChannels = hasContact.whatsapp || hasContact.phone || hasContact.email;

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__top g">
          <p className="ftr__line">{f.line}</p>
          {hasChannels && (
            <div className="ftr__col">
              <p className="label">{f.contactHeading}</p>
              <ul>
                {hasContact.whatsapp && (
                  <li>
                    <a className="ulink" href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      {c.contact.channels.whatsapp} {formatPhone(site.contact.whatsapp)}
                    </a>
                  </li>
                )}
                {hasContact.phone && (
                  <li><a className="ulink" href={`tel:${site.contact.phone}`}>{formatPhone(site.contact.phone)}</a></li>
                )}
                {hasContact.email && (
                  <li><a className="ulink" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
                )}
              </ul>
            </div>
          )}
          {social.length > 0 && (
            <div className="ftr__col">
              <p className="label">{f.followHeading}</p>
              <ul>
                {social.map(([n, href]) => (
                  <li key={n}><a className="ulink" href={href} target="_blank" rel="noopener noreferrer">{n}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <p className="ftr__word" aria-hidden="true" translate="no">haberry</p>
        <div className="ftr__base">
          <span>© {new Date().getFullYear()} HABERRY. {f.rights}</span>
          <LiteToggle label={c.a11y.lite} hint={c.a11y.liteHint} />
          <a className="ulink" href="#top">{f.toTop} ↑</a>
        </div>
      </div>
    </footer>
  );
}
