"use client";
import { useEffect, useRef, useState } from "react";
import type { Content, ServiceId } from "../content/types";
import { site, hasContact } from "../site.config";
import { SERVICE_EVENT } from "./Starter";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOTAL = 5;
type Status = "idle" | "sending" | "ok" | "error" | "unconfigured";

function isReachable(v: string): boolean {
  const t = v.trim();
  if (EMAIL.test(t)) return true;
  const digits = t.replace(/[\s\-().]/g, "");
  return /^(\+?91|0)?[6-9]\d{9}$/.test(digits) || /^\+\d{8,15}$/.test(digits);
}

/**
 * The 30-second brief: five short steps (what, goal, timing, budget, contact), then send it on
 * WhatsApp (opens WhatsApp with the brief written) or as a request to the form endpoint.
 * Success is reported only after a real 2xx response.
 */
export default function ContactForm({ c, endpoint }: { c: Content; endpoint: string }) {
  const b = c.contact.brief;
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<ServiceId[]>([]);
  const [unsure, setUnsure] = useState(false);
  const [goal, setGoal] = useState<number | null>(null);
  const [timing, setTiming] = useState<number | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [reach, setReach] = useState("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<{ step1?: string; name?: string; reach?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const titleRef = useRef<HTMLLegendElement>(null);
  const first = useRef(true);

  // A service chosen in the hero or in the services list pre-fills step 1.
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<ServiceId | null>).detail;
      setServices(id ? [id] : []);
      setUnsure(false);
      setErrors({});
    };
    window.addEventListener(SERVICE_EVENT, on);
    return () => window.removeEventListener(SERVICE_EVENT, on);
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    titleRef.current?.focus();
  }, [step]);

  const picked = c.services.items.filter((s) => services.includes(s.id));
  const needText = unsure || picked.length === 0 ? b.s1.notSure : picked.map((s) => s.short).join(", ");
  const lines: [string, string][] = [[b.waLabels.need, needText]];
  if (goal !== null) lines.push([b.waLabels.goal, b.s2.options[goal]]);
  if (timing !== null) lines.push([b.waLabels.when, b.s3.options[timing]]);
  if (budget !== null) lines.push([b.waLabels.budget, b.s4.options[budget]]);
  if (note.trim()) lines.push([b.waLabels.note, note.trim()]);
  if (reach.trim()) lines.push([b.waLabels.reach, reach.trim()]);
  const waText = [b.waHello.replace("{name}", name.trim() || "…"), ...lines.map(([k, v]) => `${k}: ${v}`)].join("\n");
  const waHref = hasContact.whatsapp ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(waText)}` : "";

  function toggleService(id: ServiceId) {
    setUnsure(false);
    setErrors((p) => ({ ...p, step1: undefined }));
    setServices((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }
  function toggleUnsure() {
    setErrors((p) => ({ ...p, step1: undefined }));
    setUnsure((v) => !v);
    setServices([]);
  }

  function next() {
    if (step === 1 && services.length === 0 && !unsure) {
      setErrors({ step1: b.s1.error });
      return;
    }
    setStep((s) => Math.min(TOTAL, s + 1));
  }

  function validateContact(): boolean {
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = b.s5.errors.name;
    if (!isReachable(reach)) e.reach = b.s5.errors.reach;
    setErrors(e);
    if (e.name) { document.getElementById("f-name")?.focus(); return false; }
    if (e.reach) { document.getElementById("f-reach")?.focus(); return false; }
    return true;
  }

  async function sendForm() {
    if (website || status === "sending") return;
    if (!validateContact()) return;
    if (!endpoint) { setStatus("unconfigured"); return; }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: reach.trim(),
          services: needText,
          goal: goal !== null ? b.s2.options[goal] : null,
          timing: timing !== null ? b.s3.options[timing] : null,
          budget_band: budget !== null ? b.s4.options[budget] : null,
          note: note.trim() || null,
          message: waText,
          language: c.lang,
          _subject: "HABERRY website request",
        }),
      });
      let ok = res.ok;
      try {
        const data = await res.clone().json();
        if (data && (data.success === false || data.ok === false || data.error)) ok = false;
      } catch { /* a non-JSON success body is fine */ }
      setStatus(ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStep(1); setServices([]); setUnsure(false); setGoal(null); setTiming(null); setBudget(null);
    setName(""); setReach(""); setNote(""); setErrors({}); setStatus("idle");
  }

  if (status === "ok") {
    return (
      <div className="form form--done" role="status" aria-live="polite">
        <p className="form__ok">{b.ok}</p>
        <button type="button" className="btn btn--line" onClick={reset}>{b.back}</button>
      </div>
    );
  }

  const radio = (nameAttr: string, options: string[], value: number | null, set: (n: number | null) => void) => (
    <div className="opts">
      {options.map((o, i) => (
        <label className="opt" key={o}>
          <input type="radio" name={nameAttr} className="sr" checked={value === i} onChange={() => set(i)} onClick={() => value === i && set(null)} />
          <span className="opt__box">{o}</span>
        </label>
      ))}
    </div>
  );

  const stepTitle = [b.s1.title, b.s2.title, b.s3.title, b.s4.title, b.s5.title][step - 1];
  const stepHint = [b.s1.hint, b.s2.hint, b.s3.hint, b.s4.hint, ""][step - 1];

  return (
    <form
      className="form"
      noValidate
      aria-labelledby="brief-title"
      onSubmit={(e) => { e.preventDefault(); if (step < TOTAL) next(); else sendForm(); }}
    >
      <div className="form__top">
        <h3 id="brief-title" className="form__legend">{b.legend}</h3>
        <p className="form__step" aria-live="polite">{b.stepOf.replace("{n}", String(step)).replace("{total}", String(TOTAL))}</p>
      </div>
      <ol className="progress" aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, i) => <li key={i} data-done={i < step} />)}
      </ol>

      <fieldset className="fs" key={step}>
        <legend className="fs__title" ref={titleRef} tabIndex={-1}>{stepTitle}</legend>
        {stepHint && <p className="fs__hint">{stepHint}</p>}

        {step === 1 && (
          <>
            <div className="opts">
              {c.services.items.map((s) => (
                <label className="opt" key={s.id}>
                  <input type="checkbox" className="sr" checked={services.includes(s.id)} onChange={() => toggleService(s.id)} />
                  <span className="opt__box">{s.short}</span>
                </label>
              ))}
              <label className="opt">
                <input type="checkbox" className="sr" checked={unsure} onChange={toggleUnsure} />
                <span className="opt__box">{b.s1.notSure}</span>
              </label>
            </div>
            {errors.step1 && <p className="err" role="alert">{errors.step1}</p>}
          </>
        )}
        {step === 2 && radio("goal", b.s2.options, goal, setGoal)}
        {step === 3 && radio("timing", b.s3.options, timing, setTiming)}
        {step === 4 && radio("budget", b.s4.options, budget, setBudget)}

        {step === 5 && (
          <div className="fields">
            <div className="field">
              <label htmlFor="f-name">{b.s5.name}</label>
              <input id="f-name" name="name" type="text" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "err-name" : undefined} />
              {errors.name && <p className="err" id="err-name">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="f-reach">{b.s5.reach}</label>
              <input id="f-reach" name="reach" type="text" inputMode="text" autoComplete="email tel" spellCheck={false} autoCapitalize="none" placeholder={b.s5.reachHint} value={reach}
                onChange={(e) => { setReach(e.target.value); setErrors((p) => ({ ...p, reach: undefined })); }}
                aria-invalid={errors.reach ? true : undefined} aria-describedby={errors.reach ? "err-reach" : undefined} />
              {errors.reach && <p className="err" id="err-reach">{errors.reach}</p>}
            </div>
            <div className="field">
              <label htmlFor="f-note">{b.s5.note}</label>
              <textarea id="f-note" name="note" rows={3} placeholder={b.s5.noteHint} value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-website">Website</label>
              <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div className="summary">
              <p className="label">{b.summary}</p>
              <dl>
                {lines.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </fieldset>

      <div className="form__nav">
        {step > 1 && <button type="button" className="btn btn--line" onClick={() => setStep((s) => s - 1)}>{b.back}</button>}
        {step < TOTAL && (
          <button type="submit" className="btn btn--wa">
            {step >= 2 && ((step === 2 && goal === null) || (step === 3 && timing === null) || (step === 4 && budget === null)) ? b.skip : b.next}
          </button>
        )}
      </div>

      {step === TOTAL && (
        <div className="form__send">
          {waHref && (
            <a
              className="btn btn--wa"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (!validateContact()) e.preventDefault(); }}
            >
              {b.sendWa}
            </a>
          )}
          <button type="submit" className="btn btn--line" disabled={status === "sending"}>
            {status === "sending" ? b.sending : b.sendForm}
          </button>
        </div>
      )}

      <div className="form__status" role="status" aria-live="polite">
        {status === "error" && <p className="form__fail">{b.fail}</p>}
        {status === "unconfigured" && <p className="form__fail">{b.notConnected}</p>}
      </div>
    </form>
  );
}
