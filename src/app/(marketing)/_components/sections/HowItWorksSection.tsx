"use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import { FiClipboard, FiShield, FiTarget } from "react-icons/fi";
import { useTranslations } from "next-intl";

const ICONS = [FiTarget, FiShield, FiClipboard];
const COLORS = ["#60a5fa", "#f59e0b", "#34d399"];

const HowItWorksSection = () => {
  const t = useTranslations("howItWorks");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section className="relative z-10 py-20" id="how-it-works">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jityellow">
              {t("label")}
            </p>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <SpotlightCards
            className="bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
            eyebrow=""
            heading=""
            gridClassName="grid-cols-1 sm:grid-cols-3"
            items={items.map((item, i) => ({
              icon: ICONS[i],
              title: item.title,
              description: item.description,
              color: COLORS[i],
            }))}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
