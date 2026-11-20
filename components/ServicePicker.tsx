"use client";
import { useEffect, useState } from "react";
import type { Content, ServiceId } from "../content/types";
import { chooseService, SERVICE_EVENT } from "./Starter";

/** Simple line icons, one per service. Drawn to be recognised at a glance. */
const ICONS: Record<ServiceId, React.ReactNode> = {
  marketing: (
    <>
      <path d="M8 40V28M20 40V18M32 40V24" />
      <path d="M6 14l12-6 10 5 14-9" />
      <path d="M34 4h8v8" />
    </>
  ),
  web: (
    <>
      <rect x="4" y="8" width="40" height="32" rx="4" />
      <path d="M4 18h40" />
      <circle cx="10" cy="13" r="1" />
      <circle cx="16" cy="13" r="1" />
    </>
  ),
  app: (
    <>
      <rect x="14" y="4" width="20" height="40" rx="5" />
      <path d="M21 38h6" />
    </>
  ),
  software: (
    <>
      <path d="M18 14L6 24l12 10M30 14l12 10-12 10" />
      <path d="M27 10l-6 28" />
    </>
  ),
  branding: (
    <>
      <circle cx="18" cy="19" r="11" />
      <rect x="22" y="22" width="20" height="20" rx="3" />
    </>
  ),
  content: (
    <>
      <rect x="4" y="8" width="40" height="32" rx="6" />
      <path d="M20 17l12 7-12 7z" />
    </>
  ),
};

/** "What do you need?": big colour tiles, one per service. The choice goes to WhatsApp and the form. */
export default function ServicePicker({ c }: { c: Content }) {
  const [sel, setSel] = useState<ServiceId | null>(null);

  useEffect(() => {
    const on = (e: Event) => setSel((e as CustomEvent<ServiceId | null>).detail ?? null);
    window.addEventListener(SERVICE_EVENT, on);
    return () => window.removeEventListener(SERVICE_EVENT, on);
  }, []);

  return (
    <div className="picker">
      <p className="picker__label" id="picker-label">{c.hero.chipsLabel}</p>
      <div className="tiles" role="group" aria-labelledby="picker-label">
        {c.services.items.map((s) => (
          <button
            key={s.id}
            type="button"
            className="tile"
            data-k={s.id}
            aria-pressed={sel === s.id}
            onClick={() => chooseService(sel === s.id ? null : s.id)}
          >
            <svg className="tile__icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">{ICONS[s.id]}</svg>
            <span className="tile__name">{s.short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
