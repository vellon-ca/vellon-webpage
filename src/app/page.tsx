import { Hero } from "@/components/home/Hero";
import { VerticalsGrid } from "@/components/home/VerticalsGrid";
import { Mission } from "@/components/home/Mission";
import { Values } from "@/components/home/Values";
import { Goals } from "@/components/home/Goals";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <VerticalsGrid />
      <Mission />
      <Values />
      <Goals />
      <CTA />
    </>
  );
}
