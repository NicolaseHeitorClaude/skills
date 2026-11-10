import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz", "SOFT"], variable: "--font-fraunces", display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bandadostiroleses.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "Banda dos Tiroleses — Musikkapelle Dreizehnlinden · Treze Tílias, desde 1933", template: "%s — Banda dos Tiroleses" },
  description: "Fundada em 1933 pelos imigrantes austríacos de Treze Tílias (SC), a Banda dos Tiroleses — Musikkapelle Dreizehnlinden — preserva a tradição musical do Tirol no Brasil.",
  openGraph: { type: "website", locale: "pt_BR", siteName: "Banda dos Tiroleses", url },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#192D26" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Banda dos Tiroleses",
  alternateName: "Musikkapelle Dreizehnlinden",
  foundingDate: "1933",
  foundingLocation: "Treze Tílias, Santa Catarina, Brasil",
  genre: ["Blasmusik", "Música tirolesa"],
  url,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Ativa os estados iniciais de animação só com JS e sem prefers-reduced-motion. */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
