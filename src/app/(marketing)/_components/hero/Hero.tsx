import HeroCta from "../cta/HeroCta";
import Image from "next/image";
import ShapeHero from "@/components/kokonutui/shape-hero";
import { getTranslations } from "next-intl/server";

const Hero = async () => {
  const t = await getTranslations("hero");

  return (
    <section id="hero">
      <ShapeHero
        accent={t("accent")}
        actions={<HeroCta />}
        subtitle={t("subtitle")}
        title={t("title")}
        titleContinuation={t("titleContinuation")}
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
