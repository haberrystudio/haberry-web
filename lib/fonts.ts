import { Archivo } from "next/font/google";

/** One variable Latin font (weight + width axes), self-hosted at build time.
 *  The fallback stack for other scripts is in --font-sans (globals.css). */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
