import "../globals.css";
import Script from "next/script";
import { archivo } from "../../lib/fonts";
import { LITE_SCRIPT } from "../../lib/lite";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d0d0d" />
        <meta name="google-site-verification" content="LJIcy4i4my0btCRb9Vz3_g4YIXGH-iX58L71aFhAKgM" />
        <script dangerouslySetInnerHTML={{ __html: LITE_SCRIPT }} />
        <Script
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
