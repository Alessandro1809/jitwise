"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiClock, FiDollarSign, FiLayers, FiTrendingUp } from "react-icons/fi";
import { useTranslations } from "next-intl";

type ModuleKey = "authentication" | "dashboardAnalytics" | "billing" | "apiIntegration" | "notifications";
type Complexity = "Low" | "Medium" | "High";

const MODULES: Array<{
  key: ModuleKey;
  complexity: Complexity;
  points: number;
  pct: number;
  probHrs: number;
  minHrs: number;
  maxHrs: number;
}> = [
  { key: "authentication", complexity: "Medium", points: 8, pct: 16, probHrs: 26, minHrs: 19, maxHrs: 35 },
  { key: "dashboardAnalytics", complexity: "High", points: 16, pct: 32, probHrs: 51, minHrs: 37, maxHrs: 69 },
  { key: "billing", complexity: "High", points: 13, pct: 26, probHrs: 42, minHrs: 30, maxHrs: 56 },
  { key: "apiIntegration", complexity: "Medium", points: 8, pct: 16, probHrs: 26, minHrs: 19, maxHrs: 35 },
  { key: "notifications", complexity: "Low", points: 5, pct: 10, probHrs: 16, minHrs: 12, maxHrs: 22 },
];

function useCountUp(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

const complexityColor: Record<Complexity, string> = {
  Low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  High: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

export default function ExampleOutputSection() {
  const t = useTranslations("demo");
  const [activeTab, setActiveTab] = useState<"overview" | "scope" | "brief">("overview");
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const TABS = [
    { key: "overview" as const, label: t("tabs.overview") },
    { key: "scope" as const, label: t("tabs.scope") },
    { key: "brief" as const, label: t("tabs.brief") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const probHrs = useCountUp(202, 1400, animated);
  const minHrs = useCountUp(143, 1200, animated);
  const maxHrs = useCountUp(273, 1600, animated);
  const probCost = useCountUp(20200, 1400, animated);

  const summaryText = t("summaryText");

  const statCards = [
    {
      icon: FiClock,
      label: t("overview.cards.effort.label"),
      value: `${probHrs}h`,
      sub: `${minHrs}h – ${maxHrs}h`,
      accent: "jitcyan",
    },
    {
      icon: FiDollarSign,
      label: t("overview.cards.cost.label"),
      value: `$${probCost.toLocaleString()}`,
      sub: t("overview.cards.cost.sub"),
      accent: "jityellow",
    },
    {
      icon: FiTrendingUp,
      label: t("overview.cards.risk.label"),
      value: "1.35×",
      sub: t("overview.cards.risk.sub"),
      accent: "amber",
    },
    {
      icon: FiLayers,
      label: t("overview.cards.scope.label"),
      value: "50 pts",
      sub: t("overview.cards.scope.sub"),
      accent: "purple",
    },
  ];

  return (
    <section className="relative z-10 py-24" id="example-output">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jityellow">
            {t("label")}
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg text-white/60">
            {t("subtitle")}
          </p>
        </div>

        {/* App window mockup */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f] shadow-2xl shadow-black/60"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-white/8 bg-white/3 px-5 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40">
              <span>{t("windowLabel")}</span>
            </div>
            <span className="rounded-full border border-jitcyan/30 px-2.5 py-0.5 text-xs text-jitcyan">
              {t("sampleBadge")}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-white/8 px-5 pt-3">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-t-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-jitcyan text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {statCards.map((card, i) => (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={animated ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <card.icon className="mb-2 h-4 w-4 text-white/40" />
                        <div className="text-xs text-white/50">{card.label}</div>
                        <div className="mt-1 text-xl font-bold text-white tabular-nums">
                          {card.value}
                        </div>
                        <div className="mt-0.5 text-xs text-white/40">{card.sub}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Module table */}
                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/8">
                    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-px bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/30">
                      <span>{t("overview.table.module")}</span>
                      <span className="hidden text-right sm:block">{t("overview.table.points")}</span>
                      <span className="text-right">{t("overview.table.pct")}</span>
                      <span className="text-right">{t("overview.table.probHrs")}</span>
                      <span className="hidden text-right sm:block">{t("overview.table.range")}</span>
                    </div>
                    {MODULES.map((mod, i) => (
                      <motion.div
                        key={mod.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={animated ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.07, duration: 0.3 }}
                        className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-px border-t border-white/5 px-4 py-3 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-white/80">{t(`modules.${mod.key}`)}</span>
                          <span
                            className={`hidden rounded-full border px-2 py-0.5 text-xs sm:inline ${complexityColor[mod.complexity]}`}
                          >
                            {t(`complexity.${mod.complexity}`)}
                          </span>
                        </div>
                        <span className="hidden text-right text-white/50 tabular-nums sm:block">
                          {mod.points}
                        </span>
                        <span className="text-right text-white/50 tabular-nums">
                          {mod.pct}%
                        </span>
                        <span className="text-right font-semibold text-white tabular-nums">
                          {mod.probHrs}h
                        </span>
                        <span className="hidden text-right text-xs text-white/35 tabular-nums sm:block">
                          {mod.minHrs}–{mod.maxHrs}h
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "scope" && (
                <motion.div
                  key="scope"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-3"
                >
                  {MODULES.map((mod, i) => (
                    <motion.div
                      key={mod.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-5 py-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{t(`modules.${mod.key}`)}</span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-xs ${complexityColor[mod.complexity]}`}
                          >
                            {t(`complexity.${mod.complexity}`)}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-white/40">
                          {mod.points} {t("scope.scopePoints")} · {mod.pct}% {t("scope.ofTotal")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">{mod.probHrs}h</div>
                        <div className="text-xs text-white/35">
                          {mod.minHrs}–{mod.maxHrs}h
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="mt-2 grid grid-cols-3 gap-3 rounded-2xl border border-white/8 bg-white/3 px-5 py-4 text-center text-sm">
                    <div>
                      <div className="text-xs text-white/40">{t("scope.basePoints")}</div>
                      <div className="mt-1 font-bold text-white">50 pts</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40">{t("scope.riskUrgency")}</div>
                      <div className="mt-1 font-bold text-amber-400">1.35 × 1.2</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/40">{t("scope.multipliedHrs")}</div>
                      <div className="mt-1 font-bold text-jitcyan">{t("scope.probableValue")}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "brief" && (
                <motion.div
                  key="brief"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-2xl border border-white/8 bg-white/3 px-6 py-5"
                >
                  <div className="prose prose-sm prose-invert max-w-none">
                    {summaryText.split("\n").map((line, i) => {
                      if (line.startsWith("## "))
                        return (
                          <h2 key={i} className="mb-2 mt-0 text-lg font-bold text-white">
                            {line.replace("## ", "")}
                          </h2>
                        );
                      if (line.startsWith("### "))
                        return (
                          <h3 key={i} className="mb-1 mt-4 text-sm font-semibold text-white/80">
                            {line.replace("### ", "")}
                          </h3>
                        );
                      if (line.startsWith("> "))
                        return (
                          <blockquote
                            key={i}
                            className="mt-3 border-l-2 border-jitcyan/50 pl-4 text-sm italic text-white/50"
                          >
                            {line.replace("> ", "")}
                          </blockquote>
                        );
                      if (line === "") return <div key={i} className="h-2" />;
                      const parsed = line
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>");
                      return (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-white/60"
                          dangerouslySetInnerHTML={{ __html: parsed }}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
