 "use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import {
  FiAlertTriangle,
  FiGitBranch,
  FiLayers,
  FiTrendingDown,
} from "react-icons/fi";

const PainSection = () => {
  return (
    <section className="relative z-10 py-20" id="pain">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jityellow">
              The Pain
            </p>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Most estimates fail before they begin.
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Developers don't struggle with code - they struggle with undefined
              scope.
            </p>
            <p className="mt-4 text-lg text-white/70">
              Unclear requirements. Hidden complexity. Optimistic timelines.
              And when reality hits, margins shrink and trust erodes.
            </p>
            <p className="mt-6 text-lg font-semibold text-white">
              Estimating isn't guessing hours. It's structuring decisions.
            </p>
          </div>
          <div className="space-y-6">
            <SpotlightCards
              className="border border-white/10 bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
              eyebrow="Common failure points"
              heading=""
              gridClassName="grid-cols-1 sm:grid-cols-1"
              items={[
                {
                  icon: FiLayers,
                  title: "Scope without boundaries",
                  color: "#60a5fa",
                },
                {
                  icon: FiGitBranch,
                  title: "Dependencies ignored until late",
                  color: "#f472b6",
                },
                {
                  icon: FiAlertTriangle,
                  title: "Risk treated as a footnote",
                  color: "#f59e0b",
                },
              ]}
            />
            <SpotlightCards
              className="border border-white/10 bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
              eyebrow=""
              heading=""
              gridClassName="grid-cols-1 sm:grid-cols-1"
              items={[
                {
                  icon: FiTrendingDown,
                  title: "Result",
                  description:
                    "Teams enter negotiations with weak reasoning and lose control over price and scope.",
                  color: "#a78bfa",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainSection;
