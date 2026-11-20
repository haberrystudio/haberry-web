import type { Content } from "../content/types";
import ServicePicker from "./ServicePicker";
import Starter from "./Starter";

/**
 * Full-screen photo hero (the HABERRY hub image from the pitch deck), with the headline on the left
 * and a "start in 30 seconds" card on the right. The photo is a mood image: the page text says everything.
 */
export default function Hero({ c }: { c: Content }) {
  return (
    <section className="hero hero2" aria-labelledby="hero-title">
      <img
        className="hero2__bg"
        src="/media/hero-1376.jpg"
        srcSet="/media/hero-800.jpg 800w, /media/hero-1376.jpg 1376w"
        sizes="100vw"
        width={1376}
        height={768}
        alt=""
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero2__shade" aria-hidden="true" />
      <div className="wrap hero2__grid">
        <div className="hero2__text">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            {c.hero.eyebrow}
          </p>
          <h1 id="hero-title">{c.hero.h1} <em>{c.hero.h1Accent}</em></h1>
          <p className="lede">{c.hero.lede}</p>
        </div>
        <div className="startcard">
          <ServicePicker c={c} />
          <div className="startcard__actions">
            <Starter c={c} />
          </div>
          <ul className="trust">
            {c.hero.trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
