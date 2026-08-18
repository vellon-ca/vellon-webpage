import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vellon — intelligent software for how the world works",
    template: "%s — Vellon",
  },
  /* Kept under ~155 characters: past that, search results truncate it
     mid-sentence and the last clause is never read. */
  description:
    "Vellon builds AI-native software for people, organisations and institutions — turning complex work into systems that are simpler and more capable.",
  keywords: [
    "Vellon",
    "AI-native software",
    "applied AI",
    "operational software",
    "enterprise software",
    "healthcare software",
    "government technology",
    "Canada",
  ],
  metadataBase: new URL("https://vellon.ca"),
  openGraph: {
    title: "Vellon — intelligent software for how the world works",
    description:
      "AI-native software for people, organisations and institutions.",
    url: "https://vellon.ca",
    siteName: "Vellon",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
