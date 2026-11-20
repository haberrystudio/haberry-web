"use client";
import { useEffect, useState } from "react";
import type { Content, ServiceId } from "../content/types";
import { site, hasContact } from "../site.config";
import { SERVICE_EVENT } from "./Starter";

/** Fixed action bar on phones. It appears once the hero's own buttons have scrolled away. */
export default function MobileBar({ c }: { c: Content }) {
  const [shown, setShown] = useState(false);
  const [sel, setSel] = useState<ServiceId | null>(null);

  useEffect(() => {
    const targets = [document.querySelector(".hero .actions"), document.querySelector("#contact")].filter(Boolean) as Element[];
    if (targets.length === 0 || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setShown(visible.size === 0);
    }, { threshold: 0 });
    targets.forEach((t) => io.observe(t));
    const on = (e: Event) => setSel((e as CustomEvent<ServiceId | null>).detail ?? null);
    window.addEventListener(SERVICE_EVENT, on);
    return () => {
      io.disconnect();
      window.removeEventListener(SERVICE_EVENT, on);
    };
  }, []);

  const svc = c.services.items.find((s) => s.id === sel);
  const msg = svc ? c.hero.whatsappMsg.replace("{service}", svc.short) : c.hero.whatsappMsgGeneric;
  const wa = hasContact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}` : "";
  const lone = !wa && !hasContact.phone;

  return (
    <nav className="mbar" data-shown={shown} aria-label={c.a11y.mobileActions}>
      {wa && (
        <a className="mbar__a mbar__a--wa" href={wa} target="_blank" rel="noopener noreferrer">
          {c.contact.channels.whatsapp}
        </a>
      )}
      {hasContact.phone && (
        <a className="mbar__a" href={`tel:${site.contact.phone}`}>{c.contact.channels.call}</a>
      )}
      <a className={`mbar__a${lone ? " mbar__a--wa" : ""}`} href="#contact">{c.hero.request}</a>
    </nav>
  );
}
