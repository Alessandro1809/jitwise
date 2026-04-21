"use client";

import { useTranslations } from "next-intl";

const COLORS = [
  { text: "text-red-400", bg: "bg-red-500/5 border-red-500/20" },
  { text: "text-orange-400", bg: "bg-orange-500/5 border-orange-500/20" },
  { text: "text-yellow-400", bg: "bg-yellow-500/5 border-yellow-500/20" },
];

const PainSection = () => {
  const t = useTranslations("pain");
  const points = t.raw("points") as Array<{ title: string; body: string }>;

  return (
    <section className="relative z-10 py-20" id="pain">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jityellow">
            {t("label")}
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/60">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {points.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-6 ${COLORS[i].bg}`}
            >
              <span className={`text-2xl font-bold ${COLORS[i].text}`}>✗</span>
              <p className="mt-3 text-base font-semibold text-white">{p.title}</p>
              <p className="mt-2 text-sm text-white/60">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;
