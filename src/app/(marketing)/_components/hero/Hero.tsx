import HeroCta from "../cta/HeroCta";
import Image from "next/image";
import ShapeHero from "@/components/kokonutui/shape-hero";

const Hero = () => {
  return (
    <section id="hero">
      <ShapeHero
      accent="assumptions"
      actions={<HeroCta />}
      subtitle="Scope-first inputs, risk multipliers, and a min/prob/max range - plus a client-ready summary."
      title="Estimate with"
      titleContinuation=", not hope."
      footer={
        <Image
          src="/Jitwise.svg"
          alt="Jitwise logo"
          width={1080}
          height={800}
          className="mx-auto px-4 md:px-0 md:mx-4"
          priority
        />
      }
      />
    </section>
  );
};

export default Hero;
