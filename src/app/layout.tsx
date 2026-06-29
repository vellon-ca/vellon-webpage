import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vellon — AI infrastructure for the modern world",
    template: "%s — Vellon",
  },
  description:
    "Vellon is a global AI-first technology company. We build intelligent software for individuals, enterprises, healthcare systems, and governments — infrastructure the world can rely on.",
  keywords: [
    "Vellon",
    "AI",
    "artificial intelligence",
    "enterprise AI",
    "healthcare AI",
    "government technology",
  ],
  metadataBase: new URL("https://vellon.ca"),
  openGraph: {
    title: "Vellon — AI infrastructure for the modern world",
    description:
      "Intelligent software for individuals, enterprises, healthcare systems, and governments.",
    url: "https://vellon.ca",
    siteName: "Vellon",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
