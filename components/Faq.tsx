import type { Content } from "../content/types";

/** Native <details>: works without JavaScript, keyboard and screen-reader friendly. */
export default function Faq({ c }: { c: Content }) {
  const f = c.faq;
  return (
    <section className="sec sec--faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap g">
        <div className="faq__head">
          <p className="label">05 / {f.label}</p>
          <h2 id="faq-title">{f.title}</h2>
        </div>
        <div className="faq__list">
          {f.items.map((it, i) => (
            <details className="qa" key={it.q} {...(i === 0 ? { open: true } : {})}>
              <summary>
                <span>{it.q}</span>
                <span className="qa__icon" aria-hidden="true" />
              </summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
