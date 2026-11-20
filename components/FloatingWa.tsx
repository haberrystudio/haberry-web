"use client";
import { useEffect, useState } from "react";
import type { Content } from "../content/types";
import { site, hasContact } from "../site.config";

/** Desktop and tablet: a WhatsApp button that stays in the corner, except over the contact section. */
export default function FloatingWa({ c }: { c: Content }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = [document.querySelector(".hero"), document.querySelector("#contact")].filter(Boolean) as Element[];
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setHidden(visible.size > 0);
    }, { threshold: 0.25 });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  if (!hasContact.whatsapp) return null;
  const href = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(c.hero.whatsappMsgGeneric)}`;
  return (
    <aside className="fwa-wrap" aria-label={c.contact.channels.whatsapp}>
    <a
      className="fwa"
      data-hidden={hidden}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.contact.channels.whatsapp}
      tabIndex={hidden ? -1 : undefined}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.9 13.6c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4l.8 1.9c.1.2.1.4 0 .5l-.4.5-.3.4c-.1.2-.3.3-.1.6.2.3.7 1.1 1.5 1.8.9.8 1.8 1.1 2.1 1.3.3.1.4.1.6-.1l.9-1c.2-.2.3-.2.5-.1l1.8.9c.3.1.4.2.5.3.1.1.1.6-.1 1.2Z" />
      </svg>
      <span className="fwa__t">{c.contact.channels.whatsapp}</span>
    </a>
    </aside>
  );
}
