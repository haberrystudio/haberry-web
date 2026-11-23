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

const coreServices = en.services.items.map((service) => ({
  ...service,
  ...details[service.id],
  path: servicePath(service.id),
}));

const specialistServices = [
  {
    id: "marketing", slug: "local-seo", name: "Local SEO",
    heading: "Local SEO Services in Kerala",
    description: "Improve how customers find and contact your business through local search. Explore technical SEO, useful location content and search reporting with Haberry Studio.",
    summary: "Make it easier for searchers to find the right service, business hours, contact information and branch details.",
    gets: ["Review of indexing, canonical URLs, redirects and mobile page performance", "A page plan based on real services and locations", "Search Console reporting for service and location searches"],
    planning: "Share your site, existing Search Console access status and the locations you genuinely serve. Bring examples of enquiries that are valuable to your business, so reporting can focus on qualified leads.",
  },
  {
    id: "web", slug: "ecommerce-development", name: "E-commerce Development",
    heading: "E-commerce Website Development in Kerala",
    description: "Plan a mobile-first online store with product categories, checkout, fulfilment and order support for your Kerala business.",
    summary: "Give customers a clear path from choosing a product to paying for it, with delivery information visible before checkout.",
    gets: ["Product categories and mobile-friendly product pages", "Checkout and order flows shaped around your business", "Delivery, returns and stock information at the points buyers need them"],
    planning: "Bring a sample catalogue with variants and prices. Clarify your delivery zones, payment methods, stock updates and what happens when an order needs to be cancelled or changed.",
  },
  {
    id: "software", slug: "erp-and-workflow-software", name: "ERP and Workflow Software",
    heading: "ERP and Workflow Software Development in Kerala",
    description: "Plan custom tools for inventory, billing, employee workflows and reporting with Haberry Studio, based in Kasaragod.",
    summary: "Bring separate spreadsheets and routine approvals into a workflow your team can follow and report on.",
    gets: ["Process mapping for stock, billing or staff operations", "Screens for team roles, approvals and records", "Reports shaped around the decisions your team makes"],
    planning: "Identify the spreadsheet or handoff causing the most repeated work. Share sample records, staff roles and any existing systems the new workflow needs to read from or update.",
  },
] satisfies {
  id: ServiceId; slug: string; name: string; heading: string; description: string;
  summary: string; gets: string[]; planning: string;
}[];

export const servicePages = [
  ...coreServices,
  ...specialistServices.map((service) => ({ ...service, path: `/services/${service.slug}/` })),
];
