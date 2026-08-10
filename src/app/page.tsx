import { Hero } from "@/components/home/Hero";
import { VerticalsIndex } from "@/components/home/VerticalsIndex";
import { Mission } from "@/components/home/Mission";
import { Values } from "@/components/home/Values";
import { Ambitions } from "@/components/home/Ambitions";
import { CTA } from "@/components/CTA";

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
