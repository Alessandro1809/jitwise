"use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import { FiCheckCircle, FiLayers, FiPieChart, FiTarget } from "react-icons/fi";
import { useTranslations } from "next-intl";

const ICONS = [FiTarget, FiLayers, FiPieChart, FiCheckCircle];
const COLORS = ["#60a5fa", "#f472b6", "#f59e0b", "#34d399"];

const InsightSection = () => {
  const t = useTranslations("insight");
  const items = t.raw("items") as Array<{ title: string }>;

  return (
    <section className="relative z-10 py-20" id="insight">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-white/10 bg-jitbluedark/80 p-10 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jitcyan">
            {t("label")}
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-white/70">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <SpotlightCards
              className="bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
              eyebrow=""
              heading=""
              gridClassName="grid-cols-1 sm:grid-cols-2"
              items={items.map((item, i) => ({
                icon: ICONS[i],
                title: item.title,
                color: COLORS[i],
              }))}
            />
          </div>
          <p className="mt-8 text-lg text-white/70">
            {t("footer")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
