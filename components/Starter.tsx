"use client";
import { useEffect, useState } from "react";
import type { Content, ServiceId } from "../content/types";
import { site, hasContact } from "../site.config";

export const SERVICE_EVENT = "haberry:service";

export function chooseService(id: ServiceId | null) {
  window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: id }));
}

/** Hero starter: tap what you need, then chat on WhatsApp with it pre-filled, call, or open the form. */
export default function Starter({ c }: { c: Content }) {
  const [sel, setSel] = useState<ServiceId | null>(null);

  useEffect(() => {
    const on = (e: Event) => setSel((e as CustomEvent<ServiceId | null>).detail ?? null);
    window.addEventListener(SERVICE_EVENT, on);
    return () => window.removeEventListener(SERVICE_EVENT, on);
  }, []);

  const svc = c.services.items.find((s) => s.id === sel);
  const msg = svc ? c.hero.whatsappMsg.replace("{service}", svc.short) : c.hero.whatsappMsgGeneric;
  const wa = hasContact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}` : "";

  return (
    <>
      <div className="actions">
        {wa && (
          <a className="btn btn--wa" href={wa} target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.9 13.6c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.300-3.700-4.400-3.900-.1-.2-1-1.400-1-2.600s.6-1.800.9-2.100c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4l.8 1.900c.1.200.1.400 0 .5l-.4.5-.3.400c-.1.2-.3.300-.1.600.2.300.7 1.100 1.500 1.800.9.800 1.800 1.100 2.100 1.300.3.100.4.100.6-.1l.9-1c.2-.2.3-.2.5-.1l1.800.9c.3.100.4.200.5.300.1.100.1.600-.1 1.200Z" />
            </svg>
            {c.hero.whatsapp}
          </a>
        )}
        {hasContact.phone && (
          <a className="btn btn--ghost" href={`tel:${site.contact.phone}`}>{c.hero.call}</a>
        )}
        <a className={`btn ${wa ? "btn--ghost" : "btn--wa"}`} href="#contact">{c.hero.request}</a>
      </div>
    </>
  );
}
