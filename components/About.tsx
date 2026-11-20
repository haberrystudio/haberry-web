import type { Content } from "../content/types";

/** A big statement on the left; the three promises on the right. */
export default function About({ c }: { c: Content }) {
  const a = c.about;
  return (
    <section className="sec" id="about" aria-labelledby="about-title">
      <div className="wrap g">
        <div className="about__head">
          <p className="label">03 / {a.label}</p>
          <h2 id="about-title">{a.title}</h2>
          <div className="about__text">
            {a.body.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <ol className="promises">
          {c.why.items.map((it, i) => (
            <li key={it.title} className="promise">
              <span className="promise__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
