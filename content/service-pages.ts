import { en } from "./en";
import type { ServiceId } from "./types";

const details = {
  marketing: {
    slug: "digital-marketing",
    heading: "Digital Marketing in Kasaragod",
    description: "Reach customers in Kasaragod and beyond with search engine optimisation, Google and social ads, and social media planning from HABERRY.",
    planning: "Tell us where customers currently find you, which products or services you want to promote, and what counts as a lead or sale. That gives us a starting point for choosing channels and setting a budget.",
  },
  web: {
    slug: "web-development",
    heading: "Website Design and Development in Kasaragod",
    description: "HABERRY builds mobile-friendly business websites, online stores and booking or account portals for businesses in Kasaragod, Kerala.",
    planning: "Start with what visitors should be able to do, such as request a quote, book an appointment or buy online. If you already have a site, share its address and describe where customers get stuck.",
  },
  app: {
    slug: "mobile-app-development",
    heading: "Mobile App Development in Kasaragod",
    description: "Plan, design and build an Android and iPhone app for your business with HABERRY, including help preparing it for the app stores.",
    planning: "Describe who will use the app, which task they need to complete first, and whether they need to sign in or connect to an existing system. We can use those details to define a first release.",
  },
  software: {
    slug: "custom-software",
    heading: "Custom Software Development in Kasaragod",
    description: "HABERRY builds custom business software for workflows such as stock, billing and staff management in Kasaragod, Kerala.",
    planning: "Pick a workflow that takes too much time and show us how your team handles it today. Sample spreadsheets, reports or forms can help identify which steps and records the software needs to support.",
  },
  branding: {
    slug: "branding-and-identity",
    heading: "Branding and Visual Identity in Kasaragod",
    description: "Develop your brand strategy, logo and visual identity with HABERRY, including colour and typography guidelines for your team.",
    planning: "Share who you want to reach and where the identity will appear, such as packaging, signage, social media or a website. If you are refreshing an existing brand, tell us which elements customers already recognise.",
  },
  content: {
    slug: "content-creation",
    heading: "Content Creation in Kasaragod",
    description: "HABERRY creates reels, short videos, social media graphics and brand copy for businesses in Kasaragod, Kerala.",
    planning: "Tell us which platforms you use, what your audience should take away, and what material you already have. Share any campaign dates and the languages your audience prefers.",
  },
} satisfies Record<ServiceId, { slug: string; heading: string; description: string; planning: string }>;

export function servicePath(id: ServiceId) {
  return `/services/${details[id].slug}/`;
}

export const servicePages = en.services.items.map((service) => ({
  ...service,
  ...details[service.id],
  path: servicePath(service.id),
}));
