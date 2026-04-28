import GradientButton from "@/components/kokonutui/gradient-button";
import { getTranslations } from "next-intl/server";

const FinalCtaSection = async () => {
  const t = await getTranslations("finalCta");

  return (
    <section className="relative z-10 py-20" id="final-cta">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-jitcyan/40 bg-jitblue/70 p-10 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jityellow">
            {t("label")}
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-white/70">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <GradientButton
              href="/login"
              label={t("cta")}
              variant="orange"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
