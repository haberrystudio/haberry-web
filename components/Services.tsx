import type { Content } from "../content/types";
import ServiceExplorer from "./ServiceExplorer";

export default function Services({ c }: { c: Content }) {
  const s = c.services;
  return (
    <section className="sec" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="sec__head sec__head--wide">
          <p className="label">01 / {s.label}</p>
          <h2 id="services-title">{s.title}</h2>
          <p className="sec__intro">{s.intro}</p>
        </div>
        <ServiceExplorer c={c} />
      </div>
    </section>
  );
}
