/**
 * Everything the site needs from the owner lives here (or in .env.local).
 * An empty value means "not supplied yet": that channel is hidden, never faked.
 * See README.md.
 */
const env = (v: string | undefined) => (v ?? "").trim();

function siteOrigin(): string {
  const value = env(process.env.NEXT_PUBLIC_SITE_URL);
  if (!value) return "";
  const url = new URL(value);
  if (url.protocol !== "https:" || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin, such as https://example.com");
  }
  return url.origin;
}

export const site = {
  name: "HABERRY",
  /** Public HTTPS origin used by indexing metadata. */
  url: siteOrigin(),
  contact: {
    /** Digits only, with country code, e.g. "919xxxxxxxxx". */
    whatsapp: (env(process.env.NEXT_PUBLIC_WHATSAPP) || "918590186881").replace(/\D/g, ""),
    /** Dialable, e.g. "+919xxxxxxxxx". */
    phone: (env(process.env.NEXT_PUBLIC_PHONE) || "+918590186881").replace(/[^\d+]/g, ""),
    email: env(process.env.NEXT_PUBLIC_EMAIL) || "haberrydigital@gmail.com",
  },
  social: {
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM),
    linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN),
    youtube: env(process.env.NEXT_PUBLIC_YOUTUBE),
  },
  /** POST endpoint that accepts JSON (Formspree, Web3Forms, own server). Empty = form says it is not connected. */
  formEndpoint: env(process.env.NEXT_PUBLIC_FORM_ENDPOINT),
} as const;

/** "+918590186881" -> "+91 85901 86881"; other formats are shown as given. */
export function formatPhone(raw: string): string {
  const d = raw.replace(/[^\d]/g, "");
  return d.length === 12 && d.startsWith("91") ? `+91 ${d.slice(2, 7)} ${d.slice(7)}` : raw.startsWith("+") ? raw : `+${raw}`;
}

export const hasContact = {
  whatsapp: site.contact.whatsapp.length > 0,
  phone: site.contact.phone.length > 0,
  email: site.contact.email.length > 0,
};
