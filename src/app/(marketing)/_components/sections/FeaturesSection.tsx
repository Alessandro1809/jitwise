 "use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import { FiActivity, FiCode, FiFileText, FiLayers } from "react-icons/fi";

const FeaturesSection = () => {
  return (
    <section className="relative z-10 py-20" id="features">
      <div className="container mx-auto max-w-6xl px-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jitcyan">
            Features
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Built for developers who take estimation seriously.
          </h2>
        </div>
        <div className="mt-10">
          <SpotlightCards
            className="bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
            eyebrow=""
            heading=""
            gridClassName="grid-cols-1 sm:grid-cols-2"
            items={[
              {
                icon: FiLayers,
                title: "Scope-Based Engine",
                description:
                  "Every module carries weighted complexity. No more flat \"feature = 10 hours\" thinking.",
                color: "#60a5fa",
              },
              {
                icon: FiActivity,
                title: "Risk-Aware Modeling",
                description:
                  "Deadlines, uncertainty, and external dependencies affect output - as they should.",
                color: "#f59e0b",
              },
              {
                icon: FiFileText,
                title: "Defendable Client Summary",
                description:
                  "Automatically generate structured explanations you can send to clients. Because transparency builds trust.",
                color: "#34d399",
              },
              {
                icon: FiCode,
                title: "Engineering-First Approach",
                description:
                  "No buzzwords. No AI magic pricing. Just structured logic and clarity.",
                color: "#a78bfa",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
