import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
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
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
