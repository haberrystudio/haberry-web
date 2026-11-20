import "../globals.css";
import { archivo } from "../../lib/fonts";
import { LITE_SCRIPT } from "../../lib/lite";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d0d0d" />
        <script dangerouslySetInnerHTML={{ __html: LITE_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
