import type { Content } from "./types";

/**
 * English copy. Facts come only from the HABERRY investor pitch.
 * Service "gets" lists are plain-language drafts of what each service delivers:
 * the owner should confirm them before launch.
 */
export const en: Content = {
  lang: "en",
  locale: "en_IN",
  path: "/",
  meta: {
    title: "HABERRY | Websites, apps and branding for businesses in Kasaragod",
    description:
      "HABERRY is a technology and creative agency in Kasaragod, Kerala. Websites, mobile apps, custom software, digital marketing, branding and content for businesses.",
  },
  a11y: {
    skip: "Skip to content",
    menu: "Menu",
    closeMenu: "Close menu",
    primaryNav: "Main",
    language: "Language",
    lite: "Lite mode",
    liteHint: "Lite mode: no motion, lighter page",
    mobileActions: "Contact HABERRY",
  },
  nav: {
    services: "Services",
    approach: "How we work",
    about: "About",
    roadmap: "Roadmap",
    faq: "FAQ",
    contact: "Contact",
  },
  startCta: "Start a request",
  hero: {
    eyebrow: "Technology & creative agency · Kasaragod, Kerala",
    h1: "Websites, apps and branding for businesses in",
    h1Accent: "Kasaragod.",
    lede: "HABERRY designs and builds your website, app or software, and runs your digital marketing and content. Tell us what you need and we will get back to you.",
    chipsLabel: "What do you need?",
    whatsapp: "Chat on WhatsApp",
    call: "Call us",
    request: "Send a request",
    whatsappMsg: "Hi HABERRY, I need help with: {service}.",
    whatsappMsgGeneric: "Hi HABERRY, I would like to talk about a project.",
    trust: ["Replies on WhatsApp", "Based in Kasaragod", "Plain words, no jargon"],
  },
  why: {
    items: [
      { title: "Local, and easy to reach.", body: "Based in Kasaragod. Message us on WhatsApp, call, or send a short brief. We keep the words plain." },
      { title: "Start in one minute.", body: "Tap what you need and message us on WhatsApp. No long forms and no jargon." },
      { title: "Only what is true.", body: "No made-up numbers or fake client logos. If we show it, it is real." },
    ],
  },
  media: {
    hero: "",
    saas: "Concept image: a laptop and a phone showing a business app",
    edu: "Concept image: students working together at a campus hackathon",
    studio: "Concept image: a film and advertising production studio",
  },
  services: {
    label: "Services",
    title: "Six services, in plain words.",
    intro: "Each one is something you can ask for today. Under every service: what you actually get.",
    getsLabel: "You get",
    ask: "Ask about this",
    items: [
      {
        id: "marketing",
        short: "Digital marketing",
        name: "Digital marketing",
        summary:
          "People who search for what you sell can find you, and the ads you pay for reach the right people.",
        gets: [
          "Search (SEO) set-up, so customers find you on Google",
          "Paid ads on Google and social media",
          "A plan to grow your social media",
        ],
      },
      {
        id: "web",
        short: "Website",
        name: "Web development",
        summary:
          "A fast website that your customers can use on a phone, with an online shop or portal if you need one.",
        gets: [
          "A website built for mobile first",
          "An online store, if you sell online",
          "Web portals for bookings or accounts",
        ],
      },
      {
        id: "app",
        short: "Mobile app",
        name: "Mobile apps",
        summary: "An Android and iPhone app for your business.",
        gets: [
          "One app for Android and iPhone",
          "Design and build, from idea to finished app",
          "Help getting it onto the app stores",
        ],
      },
      {
        id: "software",
        short: "Custom software",
        name: "Custom software",
        summary:
          "Software shaped around how your business already works, instead of the other way round.",
        gets: [
          "Tools for your own day-to-day workflows",
          "ERP-style systems for stock, billing and staff",
          "Screens that your team finds easy to use",
        ],
      },
      {
        id: "branding",
        short: "Branding",
        name: "Branding & identity",
        summary: "A name, logo and look that make a business easy to recognise and trust.",
        gets: [
          "Logo and visual theme",
          "Brand strategy",
          "Guidelines for colours and fonts",
        ],
      },
      {
        id: "content",
        short: "Content",
        name: "Content creation",
        summary: "Posts, reels and writing that tell the story of your business.",
        gets: [
          "Reels and short videos",
          "Graphics for social media",
          "Copywriting and brand storytelling",
        ],
      },
    ],
  },
  approach: {
    label: "How we work",
    title: "How we think about the work.",
    items: [
      {
        title: "Start from the result you want.",
        body: "A website is not the goal. More enquiries, more orders or fewer phone calls is. We ask about that first.",
      },
      {
        title: "Make it easy for your customer.",
        body: "Most of your customers will visit on a phone, on mobile data. We design for that person.",
      },
      {
        title: "Build it properly.",
        body: "Fast pages, a clear structure, and code another developer can pick up later.",
      },
      {
        title: "Say what is true.",
        body: "We tell you what we can do and what we cannot. We do not promise results that are not in our hands.",
      },
    ],
  },
  about: {
    label: "About",
    title: "A technology and creative company from Kasaragod.",
    body: [
      "HABERRY is based in Kasaragod, Kerala. We help the businesses around us with websites, apps, software, branding and marketing.",
      "We work as the Haberry Innovation Hub: digital engineering, product design and young people building together. Our plan is to grow from here, starting in Kasaragod.",
    ],
    facts: [
      { k: "Based in", v: "Kasaragod, Kerala, India" },
      { k: "Today", v: "A Digital Agency with six services" },
      { k: "Hub", v: "Digital engineering, product design and youth collaboration" },
    ],
  },
  roadmap: {
    label: "Roadmap",
    title: "Where we are, and where we are going.",
    intro:
      "Today HABERRY is a Digital Agency. Everything after it is our plan, not something you can buy yet.",
    now: "Now",
    planned: "Planned",
    stages: [
      {
        name: "Digital Agency",
        status: "now",
        body: "Websites, mobile apps, custom software, digital marketing, branding and content for businesses in Kasaragod.",
      },
      {
        name: "SaaS products",
        status: "planned",
        body: "Subscription software that solves everyday business problems, built on what we learn from agency clients.",
      },
      {
        name: "Practical EdTech",
        status: "planned",
        body: "Job-ready skills for students: learning software, campus webinars, hackathons and merchandise.",
      },
      {
        name: "Ad & Production Studio",
        status: "planned",
        body: "Commercial shoots, brand films and media campaigns.",
      },
    ],
    regionsLabel: "Where we plan to work, in this order",
    regions: [
      { name: "Kasaragod", status: "base", note: "Where we are" },
      { name: "Kozhikode", status: "planned", note: "Planned" },
      { name: "Kochi", status: "planned", note: "Planned" },
      { name: "UAE & beyond", status: "planned", note: "Planned" },
    ],
  },
  faq: {
    label: "FAQ",
    title: "Questions people ask first.",
    items: [
      { q: "I do not know what I need. Where do I start?", a: "Fill in the 30-second brief below, or message us on WhatsApp. Tell us about your business and what you want to happen, and we will suggest what fits. You do not need technical words." },
      { q: "How can I contact you?", a: "Message us on WhatsApp, call, email, or fill in the 30-second brief below. Use whichever is easiest for you." },
      { q: "How much will it cost?", a: "It depends on what you need: a simple website and a custom app are very different jobs. Pick a budget range in the brief and we will tell you honestly what fits." },
      { q: "Do you only work in Kasaragod?", a: "Kasaragod is home and where we start. If you are somewhere else, send a request anyway and we will tell you honestly whether we can help. Our plan is to grow to Kozhikode and Kochi." },
      { q: "Are SaaS products, EdTech and the studio available now?", a: "No. Today HABERRY is a digital agency. Everything else is our plan." },
      { q: "Can I see your past work?", a: "We will only show real projects, with the client’s permission. Until they are ready, we would rather show nothing than made-up examples." },
    ],
  },
  contact: {
    label: "Contact",
    title: "Start your request.",
    lede: "Build your brief in about 30 seconds, or just message us. Either way, you do not need to know the technical words.",
    channels: { whatsapp: "WhatsApp", call: "Call", email: "Email" },
    brief: {
      legend: "Your brief",
      stepOf: "Step {n} of {total}",
      back: "Back",
      next: "Next",
      skip: "Skip",
      s1: { title: "What do you need?", hint: "Pick one or more.", notSure: "Not sure yet", error: "Pick at least one." },
      s2: { title: "What do you want to happen?", hint: "Pick the closest one.", options: ["Get more customers", "Sell online", "Look more professional", "Run my business better", "Not sure yet"] },
      s3: { title: "When do you want to start?", hint: "Roughly is fine.", options: ["As soon as possible", "In 1 to 3 months", "Just exploring"] },
      s4: { title: "Roughly what budget?", hint: "Optional. It helps us suggest what fits.", options: ["Under ₹25,000", "₹25,000 to ₹1 lakh", "₹1 lakh to ₹5 lakh", "Above ₹5 lakh", "Not sure yet"] },
      s5: {
        title: "How do we reach you?",
        name: "Your name",
        reach: "Phone, WhatsApp or email",
        reachHint: "98765 43210 or name@email.com…",
        note: "Anything else?",
        noteHint: "Optional. A line or two.",
        errors: { name: "Please enter your name.", reach: "Enter a phone number (10 digits) or an email address." },
      },
      summary: "Your brief",
      sendWa: "Send on WhatsApp",
      sendForm: "Send as a request",
      sending: "Sending…",
      waHello: "Hi HABERRY, this is {name}.",
      waLabels: { need: "I need", goal: "Goal", when: "Start", budget: "Budget", note: "Note", reach: "Reach me on" },
      ok: "Thank you. We have your request and will get back to you.",
      fail: "We could not send your request. Check your connection and try again, or contact us on WhatsApp or phone.",
      notConnected: "This form is not connected yet, so nothing was sent. Please use WhatsApp, phone or email.",
    },
  },
  footer: {
    line: "HABERRY. Technology & creative agency, Kasaragod, Kerala, India.",
    rights: "All rights reserved.",
    toTop: "Back to top",
    contactHeading: "Contact",
    followHeading: "Follow",
  },
};
