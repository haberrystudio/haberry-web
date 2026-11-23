import "./globals.css";
import Script from "next/script";
import type { Viewport } from "next";
import { archivo } from "../lib/fonts";
import { LITE_SCRIPT } from "../lib/lite";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export const viewport: Viewport = { themeColor: "#0d0d0d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="LJIcy4i4my0btCRb9Vz3_g4YIXGH-iX58L71aFhAKgM" />
        <script dangerouslySetInnerHTML={{ __html: LITE_SCRIPT }} />
      </head>
      <body>
        {children}
        {GTM_ID && (
          <Script id="google-tag-manager" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
              const tag = document.createElement('script');
              tag.async = true;
              tag.src = ${JSON.stringify(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`)};
              document.head.appendChild(tag);
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
