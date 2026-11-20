import type { Content } from "../content/types";

/** Four working principles as oversized rows on black. */
export default function Approach({ c }: { c: Content }) {
  const a = c.approach;
  return (
    <section className="sec sec--dark" id="approach" aria-labelledby="approach-title">
      <div className="wrap">
        <p className="label">02 / {a.label}</p>
        <h2 id="approach-title" className="approach__title">{a.title}</h2>
        <ol className="steps">
          {a.items.map((it, i) => (
            <li key={it.title} className="step">
              <span className="step__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
