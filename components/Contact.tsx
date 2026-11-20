import type { Content } from "../content/types";
import { site, hasContact, formatPhone } from "../site.config";
import ContactForm from "./ContactForm";

export default function Contact({ c }: { c: Content }) {
  const k = c.contact;
  const wa = hasContact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(c.hero.whatsappMsgGeneric)}`
    : "";
  const channels = [
    wa && { href: wa, label: k.channels.whatsapp, value: "wa.me", ext: true },
    hasContact.phone && { href: `tel:${site.contact.phone}`, label: k.channels.call, value: site.contact.phone, ext: false },
    hasContact.email && { href: `mailto:${site.contact.email}`, label: k.channels.email, value: site.contact.email, ext: false },
  ].filter(Boolean) as { href: string; label: string; value: string; ext: boolean }[];

  return (
    <section className="sec sec--contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap g">
        <div className="contact__head">
          <p className="label">06 / {k.label}</p>
          <h2 id="contact-title">{k.title}</h2>
          <p className="sec__intro">{k.lede}</p>
          {channels.length > 0 && (
            <ul className="channels">
              {channels.map((ch) => (
                <li key={ch.label}>
                  <a
                    className="channel"
                    href={ch.href}
                    {...(ch.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="channel__k">{ch.label}</span>
                    <span className="channel__v">{ch.label === k.channels.whatsapp ? formatPhone(site.contact.whatsapp) : ch.label === k.channels.call ? formatPhone(site.contact.phone) : ch.value}</span>
                    <span className="channel__arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <ContactForm c={c} endpoint={site.formEndpoint} />
      </div>
    </section>
  );
}
