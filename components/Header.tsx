"use client";
import { useEffect, useState } from "react";
import type { Content } from "../content/types";

export default function Header({ c }: { c: Content }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const links = [
    ["#services", c.nav.services],
    ["#approach", c.nav.approach],
    ["#about", c.nav.about],
    ["#roadmap", c.nav.roadmap],
    ["#faq", c.nav.faq],
  ] as const;

  // Transparent over the hero photo, solid black once the page has scrolled.
  useEffect(() => {
    let raf = 0;
    const update = () => { raf = 0; setSolid(window.scrollY > 24); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="hdr" id="top" data-solid={solid || open}>
      <div className="wrap hdr__in">
        <a className="mark" href="#top" aria-label="HABERRY" translate="no">haberry</a>
        <nav className="hdr__nav" aria-label={c.a11y.primaryNav} id="menu" data-open={open}>
          {links.map(([href, label]) => (
            <a key={href} href={href} className="ulink" onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#contact" className="ulink hdr__contact-link" onClick={() => setOpen(false)}>{c.nav.contact}</a>
        </nav>
        <div className="hdr__end">
          <a className="btn btn--sm hdr__cta" href="#contact">{c.startCta}</a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-btn__bars" aria-hidden="true" />
            <span className="sr">{open ? c.a11y.closeMenu : c.a11y.menu}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
