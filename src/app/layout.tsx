import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    default: "Vellon — software for the work underneath",
    template: "%s — Vellon",
  },
  description:
    "Vellon builds operational software for the organisations that keep things moving — from individuals to enterprises, healthcare systems and government.",
  keywords: [
    "Vellon",
    "operational software",
    "enterprise software",
    "healthcare software",
    "government technology",
    "Canada",
  ],
  metadataBase: new URL("https://vellon.ca"),
  openGraph: {
    title: "Vellon — software for the work underneath",
    description:
      "Operational software for the organisations that keep things moving.",
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
      </body>
    </html>
  );
}
