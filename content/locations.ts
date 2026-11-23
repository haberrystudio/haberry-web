import type { ServiceId } from "./types";

type Market = {
  slug: string;
  name: string;
  title?: string;
  description: string;
  focus: string;
  brief: string;
  services: readonly ServiceId[];
};

const markets: Market[] = [
  {
    slug: "kerala", name: "Kerala",
    description: "Plan websites, SEO, branding and custom software for Kerala businesses with Haberry Studio, a digital agency based in Kasaragod.",
    focus: "When you serve customers across Kerala, decide which enquiries should go to a central team and which should go to a branch. A site can show each branch’s real services and hours while sending enquiries to the right person.",
    brief: "List your branches, the languages customers use, and the information each team needs to see in a lead or order.",
    services: ["marketing", "web", "software"],
  },
  {
    slug: "kasaragod", name: "Kasaragod",
    description: "Work with a Kasaragod-based digital agency for business websites, local SEO, branding and custom software. Also serving businesses in Kasargod and Kanhangad.",
    focus: "For a shop or service business in Kasaragod or Kanhangad, start with what a customer needs before calling: an up-to-date service list, clear directions and a WhatsApp enquiry option. Tell us which languages you use with customers so the site can reflect that.",
    brief: "Bring your service list, business hours and the questions callers ask most often. We can use those to map the pages and enquiry flow.",
    services: ["web", "marketing", "branding"],
  },
  {
    slug: "kozhikode", name: "Kozhikode",
    description: "Explore digital marketing, website development and branding for Kozhikode and Calicut businesses with Kasaragod-based Haberry Studio.",
    focus: "A Kozhikode business with separate showroom and online enquiries can give each customer a clear next step. A searchable catalogue can answer questions before a visit and show when buyers should request a quote.",
    brief: "Share your catalogue, showroom locations and the product details customers need before they can choose.",
    services: ["marketing", "web", "branding"],
  },
  {
    slug: "kochi", name: "Kochi",
    description: "Plan websites, mobile apps and custom software for businesses in Kochi, Ernakulam and Kakkanad with Haberry Studio.",
    focus: "A Kochi B2B team can use a public website to explain its offer and a separate portal to collect files, show project status or handle repeat orders. Define which information each customer role needs before designing the portal.",
    brief: "Map the journey from enquiry to client login, including who grants access and which information is confidential.",
    services: ["software", "web", "app"],
  },
  {
    slug: "thiruvananthapuram", name: "Thiruvananthapuram",
    description: "Explore website design, mobile app development and custom software for Thiruvananthapuram and Trivandrum organisations.",
    focus: "For a multi-step registration or appointment service, start with the longest form people currently complete. Identify what customers can submit on a phone and what staff must review in a dashboard.",
    brief: "Share the current form and the approval steps. Flag any documents that require restricted staff access.",
    services: ["app", "software", "web"],
  },
  {
    slug: "thrissur", name: "Thrissur",
    description: "Plan branding, websites and content for Thrissur retailers and service businesses with Haberry Studio in Kerala.",
    focus: "For a retailer that updates collections seasonally, reusable catalogue photography and page templates make it easier to keep products current across the website and social channels.",
    brief: "Bring a sample collection and your next release date so we can work out who publishes product photos, prices and availability.",
    services: ["branding", "web", "content"],
  },
  {
    slug: "kannur", name: "Kannur",
    description: "Haberry Studio helps Kannur businesses plan product websites, brand identity and digital content for customers and wholesale buyers.",
    focus: "A maker with retail and wholesale customers can publish the same product range with distinct next steps. Retail buyers might need price and delivery information, while stockists need quantities, lead times and a trade enquiry form.",
    brief: "Share your most requested products and the information buyers need to place a first wholesale order.",
    services: ["web", "branding", "content"],
  },
  {
    slug: "kollam", name: "Kollam",
    description: "Explore websites, local marketing and business software for Kollam businesses with Haberry Studio.",
    focus: "A service company covering several towns around Kollam can ask for the customer’s area and preferred time before assigning a job. Keep the website’s stated coverage aligned with the schedule your team can fulfil.",
    brief: "Share the areas you cover, the typical booking windows and how your team assigns a new job today.",
    services: ["web", "software", "marketing"],
  },
  {
    slug: "alappuzha", name: "Alappuzha",
    description: "Plan a website, brand and digital content for Alappuzha and Alleppey hospitality or local service businesses.",
    focus: "For an Alappuzha stay or experience, a direct enquiry page can answer what’s included, how arrival works and which dates are available. Show policies and actual photos before asking visitors to book.",
    brief: "Bring your room or experience types, cancellation terms and the questions guests ask before paying a deposit.",
    services: ["web", "content", "branding"],
  },
  {
    slug: "kottayam", name: "Kottayam",
    description: "Explore website design, custom software and digital marketing for Kottayam businesses and training providers.",
    focus: "A training provider can give each course a clear page with entry requirements, dates and fees. A shared dashboard can help staff follow up on interest before an intake closes.",
    brief: "Share an upcoming intake schedule and describe how you track applications, payments and waitlists today.",
    services: ["web", "software", "marketing"],
  },
  {
    slug: "palakkad", name: "Palakkad",
    description: "Plan custom software, product websites and branding for Palakkad manufacturers, distributors and other businesses.",
    focus: "A distributor can publish specifications and pack sizes while routing repeat buyers to an account workflow. If stock is tracked separately, decide whether the website needs availability or a request-for-quote form.",
    brief: "Bring a sample product sheet and purchase order. Identify which stock data can be shared with buyers.",
    services: ["software", "web", "branding"],
  },
  {
    slug: "malappuram", name: "Malappuram",
    description: "Explore digital marketing, mobile-friendly websites and content creation for Malappuram and nearby Kerala businesses.",
    focus: "For a business receiving most enquiries through social media, a landing page can answer pricing and service questions before sending people to WhatsApp. Campaign links can help attribute enquiries to individual offers.",
    brief: "Pick one upcoming campaign and share how your team handles a message from first contact to a confirmed sale.",
    services: ["marketing", "web", "content"],
  },
  {
    slug: "pathanamthitta", name: "Pathanamthitta",
    description: "Explore websites, local search and workflow software for businesses in Pathanamthitta and the surrounding area.",
    focus: "An appointment-based business can reduce calls by publishing service hours, preparation instructions and rescheduling details. Decide when a request should be confirmed by staff and when customers can book immediately.",
    brief: "Share your appointment types, typical durations and the availability rules the booking flow must enforce.",
    services: ["web", "marketing", "software"],
  },
  {
    slug: "thodupuzha", name: "Thodupuzha",
    description: "Haberry Studio offers website, branding and content project enquiries for businesses in Thodupuzha and across Idukki.",
    focus: "An Idukki producer selling online can organise products around pack size, origin and shipping options. Provide traceable details and photos that help buyers recognise what will arrive.",
    brief: "Share product variants, order cutoffs and the areas you can deliver to so the catalogue and checkout make the same promises.",
    services: ["web", "branding", "content"],
  },
  {
    slug: "kalpetta", name: "Kalpetta",
    description: "Plan hospitality websites, content and digital marketing for Kalpetta and Wayanad businesses with Haberry Studio.",
    focus: "A Wayanad property or tour operator can help visitors compare experiences using accurate travel times, access details and seasonal availability. A clear enquiry form can ask for group size and travel dates.",
    brief: "Bring your itinerary, check-in details and the policies guests should see before requesting a quote.",
    services: ["web", "content", "marketing"],
  },
  {
    slug: "dubai", name: "Dubai", title: "Remote Digital Agency & Software Projects for Dubai",
    description: "Discuss remote website, SEO and software projects for a Dubai business with Haberry Studio, a digital agency based in Kasaragod, Kerala.",
    focus: "If your Dubai team is commissioning a site or client portal remotely, establish who approves content, which languages the first release needs, and how leads should reach your UAE team. Haberry takes project enquiries from its Kasaragod base.",
    brief: "Include your UAE contact number with the country code, preferred meeting hours and any Arabic content or design requirements so we can confirm scope and availability.",
    services: ["web", "software", "marketing"],
  },
];

export const locationsPath = "/locations/";
export const locations = markets.map((market) => ({
  ...market,
  heading: market.title ?? `Digital Agency & Software Development in ${market.name}`,
  path: `${locationsPath}${market.slug}/`,
}));

export const primaryLocations = locations.filter(({ slug }) =>
  ["kasaragod", "kozhikode", "kerala", "dubai"].includes(slug),
);
