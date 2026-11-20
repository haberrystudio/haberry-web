import type { Content } from "../content/types";

/**
 * The plan as image-led rows. The first row is the Digital Agency (the only thing that exists today);
 * the planned stages use concept images from the pitch deck, shown in black and white until they are real.
 */
export default function Roadmap({ c }: { c: Content }) {
  const r = c.roadmap;
  const media = [null, { k: "saas", alt: c.media.saas }, { k: "edu", alt: c.media.edu }, { k: "studio", alt: c.media.studio }];
  return (
    <section className="sec sec--sand" id="roadmap" aria-labelledby="roadmap-title">
      <div className="wrap">
        <p className="label">04 / {r.label}</p>
        <h2 id="roadmap-title">{r.title}</h2>
        <p className="sec__intro roadmap__intro">{r.intro}</p>

        <ol className="rm">
          {r.stages.map((s, i) => {
            const m = media[i];
            return (
              <li className="rm__row" key={s.name} data-status={s.status} data-flip={i % 2 === 1}>
                {m ? (
                  <img
                    className="rm__img"
                    src={`/media/${m.k}-1376.jpg`}
                    srcSet={`/media/${m.k}-800.jpg 800w, /media/${m.k}-1376.jpg 1376w`}
                    sizes="(max-width: 960px) 100vw, 50vw"
                    width={1376}
                    height={768}
                    alt={m.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="rm__now" aria-hidden="true">
                    <ul>
                      {c.services.items.map((it) => <li key={it.id}>{it.short}</li>)}
                    </ul>
                  </div>
                )}
                <div className="rm__body">
                  <div className="stage__tag">
                    <span className="stage__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`pill pill--${s.status}`}>{s.status === "now" ? r.now : r.planned}</span>
                  </div>
                  <h3>{s.name}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="label regions__label">{r.regionsLabel}</p>
        <ol className="regions">
          {r.regions.map((g) => (
            <li key={g.name} data-status={g.status}>
              <span className="regions__name">{g.name}</span>
              <span className="regions__note">{g.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
