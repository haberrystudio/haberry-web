import type { Content } from "../content/types";
import { site, hasContact } from "../site.config";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import Approach from "./Approach";
import About from "./About";
import Roadmap from "./Roadmap";
import Faq from "./Faq";
import Contact from "./Contact";
import Footer from "./Footer";
import MobileBar from "./MobileBar";
import FloatingWa from "./FloatingWa";
import JsonLd from "./JsonLd";
import DirectoryLinks from "./DirectoryLinks";
import { locationsPath, primaryLocations } from "../content/locations";

export default function Page({ c }: { c: Content }) {
  return (
    <>
      <a className="skip" href="#main">{c.a11y.skip}</a>
      <Header c={c} />
      <main id="main">
        <Hero c={c} />
        <Services c={c} />
        <Approach c={c} />
        <About c={c} />
        <section className="sec sec--sand" aria-labelledby="locations-title">
          <div className="wrap">
            <h2 id="locations-title">Digital agency services across Kerala</h2>
            <p className="sec__intro">From our base in Kasaragod, we take projects across Kerala and welcome remote project enquiries from Dubai.</p>
            <DirectoryLinks items={[...primaryLocations, { name: "All locations", path: locationsPath }]} />
          </div>
        </section>
        <Roadmap c={c} />
        <Faq c={c} />
        <Contact c={c} />
      </main>
      <Footer c={c} />
      <MobileBar c={c} />
      <FloatingWa c={c} />
      <JsonLd c={c} site={site} has={hasContact} />
    </>
  );
}
