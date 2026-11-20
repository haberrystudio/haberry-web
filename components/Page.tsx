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
