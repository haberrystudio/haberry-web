export type ServiceId = "marketing" | "web" | "app" | "software" | "branding" | "content";

export type Service = {
  id: ServiceId;
  /** Short label used on chips, in the form and in WhatsApp messages. */
  short: string;
  name: string;
  summary: string;
  gets: string[];
};

export type Content = {
  lang: "en";
  locale: string;
  /** Route of this language version, with trailing slash. */
  path: string;
  /** Shown as a visible banner when the copy is a draft. */
  reviewNote?: string;
  meta: { title: string; description: string };
  a11y: {
    skip: string;
    menu: string;
    closeMenu: string;
    primaryNav: string;
    language: string;
    lite: string;
    liteHint: string;
    mobileActions: string;
  };
  nav: { services: string; approach: string; about: string; roadmap: string; faq: string; contact: string };
  startCta: string;
  hero: {
    eyebrow: string;
    h1: string;
    h1Accent: string;
    lede: string;
    chipsLabel: string;
    whatsapp: string;
    call: string;
    request: string;
    /** {service} is replaced by the chosen service's short label. */
    whatsappMsg: string;
    whatsappMsgGeneric: string;
    trust: string[];
  };
  why: { items: { title: string; body: string }[] };
  /** Alt text for the concept images taken from the pitch deck. */
  media: { hero: string; saas: string; edu: string; studio: string };
  faq: { label: string; title: string; items: { q: string; a: string }[] };
  services: {
    label: string;
    title: string;
    intro: string;
    getsLabel: string;
    ask: string;
    items: Service[];
  };
  approach: { label: string; title: string; items: { title: string; body: string }[] };
  about: { label: string; title: string; body: string[]; facts: { k: string; v: string }[] };
  roadmap: {
    label: string;
    title: string;
    intro: string;
    now: string;
    planned: string;
    stages: { name: string; status: "now" | "planned"; body: string }[];
    regionsLabel: string;
    regions: { name: string; status: "base" | "planned"; note: string }[];
  };
  contact: {
    label: string;
    title: string;
    lede: string;
    channels: { whatsapp: string; call: string; email: string };
    brief: {
      legend: string;
      stepOf: string;
      back: string;
      next: string;
      skip: string;
      s1: { title: string; hint: string; notSure: string; error: string };
      s2: { title: string; hint: string; options: string[] };
      s3: { title: string; hint: string; options: string[] };
      s4: { title: string; hint: string; options: string[] };
      s5: {
        title: string;
        name: string;
        reach: string;
        reachHint: string;
        note: string;
        noteHint: string;
        errors: { name: string; reach: string };
      };
      summary: string;
      sendWa: string;
      sendForm: string;
      sending: string;
      waHello: string;
      waLabels: { need: string; goal: string; when: string; budget: string; note: string; reach: string };
      ok: string;
      fail: string;
      notConnected: string;
    };
  };
  footer: { line: string; rights: string; toTop: string; contactHeading: string; followHeading: string };
};
