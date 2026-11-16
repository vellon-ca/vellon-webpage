import { Hero } from "@/components/home/Hero";
import { VerticalsIndex } from "@/components/home/VerticalsIndex";
import { Mission } from "@/components/home/Mission";
import { Values } from "@/components/home/Values";
import { Ambitions } from "@/components/home/Ambitions";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";

/* Canonical per page, never in the root layout: a layout's canonical is
   inherited by every page that does not set its own. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <VerticalsIndex />
      <Mission />
      <Values />
      <Ambitions />
      <CTA />
    </>
  );
}
