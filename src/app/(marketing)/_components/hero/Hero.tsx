import HeroCta from "../cta/HeroCta";
import Image from "next/image";
import ShapeHero from "@/components/kokonutui/shape-hero";

const Hero = () => {
  return (
    <section id="hero">
      <ShapeHero
        accent="you quote "
        actions={<HeroCta />}
        subtitle="Turn messy requirements into a defendable effort estimation: time and cost estimate range (min/prob/max) plus client-ready scope, assumptions, and exclusions."
        title="Scope before"
        titleContinuation="."
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
