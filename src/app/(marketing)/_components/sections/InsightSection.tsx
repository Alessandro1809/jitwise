 "use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import { FiCheckCircle, FiLayers, FiPieChart, FiTarget } from "react-icons/fi";

const InsightSection = () => {
  return (
    <section className="relative z-10 py-20" id="insight">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-white/10 bg-jitbluedark/80 p-10 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jitcyan">
            Insight / Reframe
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Estimation isn't a number. It's a system.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Good estimates are repeatable because the reasoning is visible:
          </p>
          <div className="mt-8">
            <SpotlightCards
              className="bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
              eyebrow=""
              heading=""
              gridClassName="grid-cols-1 sm:grid-cols-2"
              items={[
                {
                  icon: FiTarget,
                  title: "Scope boundaries",
                  color: "#60a5fa",
                },
                {
                  icon: FiLayers,
                  title: "Complexity choices",
                  color: "#f472b6",
                },
                {
                  icon: FiPieChart,
                  title: "Risk",
                  color: "#f59e0b",
                },
                {
                  icon: FiCheckCircle,
                  title: "Delivery responsibilities",
                  color: "#34d399",
                },
              ]}
            />
          </div>
          <p className="mt-8 text-lg text-white/70">
            Jitwise makes that reasoning explicit by default.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsightSection;
