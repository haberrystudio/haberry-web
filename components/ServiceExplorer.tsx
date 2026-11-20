"use client";
import { useState } from "react";
import type { Content, ServiceId } from "../content/types";
import AskLink from "./AskLink";
import ServiceArt from "./ServiceArt";

/**
 * Services as a browser: pick a name, see what you get. On wide screens the names sit on the left and
 * one panel stays on the right; on phones each name opens its own panel underneath it.
 * All panels are in the HTML (closed ones are just hidden), so nothing is lost for search engines.
 */
export default function ServiceExplorer({ c }: { c: Content }) {
  const s = c.services;
  const [open, setOpen] = useState<ServiceId>(s.items[0].id);

  return (
    <div className="xp">
      {s.items.map((it, i) => {
        const active = open === it.id;
        return (
          <div className="xp__item" key={it.id} id={`svc-${it.id}`} data-active={active}>
            <button
              type="button"
              className="xp__tab"
              aria-expanded={active}
              aria-controls={`panel-${it.id}`}
              onClick={() => setOpen(it.id)}
            >
              <span className="xp__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="xp__name">{it.name}</span>
              <span className="xp__arrow" aria-hidden="true">→</span>
            </button>
            <div className="xp__panel" id={`panel-${it.id}`} role="region" aria-label={it.name} hidden={!active}>
              <div className="xp__art"><ServiceArt id={it.id} /></div>
              <p className="xp__sum">{it.summary}</p>
              <p className="label xp__label">{s.getsLabel}</p>
              <ul className="xp__gets">
                {it.gets.map((g) => <li key={g}>{g}</li>)}
              </ul>
              <AskLink id={it.id} label={s.ask} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
