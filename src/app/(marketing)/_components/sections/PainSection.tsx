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
              Problem
            </p>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Estimates fail at the edges.
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Most underestimates don't come from bad math.
            </p>
            <p className="mt-4 text-lg text-white/70">
              They come from unclear scope, hidden dependencies, and "invisible"
              delivery work.
            </p>
            <p className="mt-6 text-lg font-semibold text-white">
              A single number hides uncertainty and creates scope fights later.
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
                  title: "Unclear scope",
                  color: "#60a5fa",
                },
                {
                  icon: FiGitBranch,
                  title: "Hidden dependencies",
                  color: "#f472b6",
                },
                {
                  icon: FiAlertTriangle,
                  title: "\"Invisible\" delivery work",
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
                    "A single number hides uncertainty and creates scope fights later.",
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
