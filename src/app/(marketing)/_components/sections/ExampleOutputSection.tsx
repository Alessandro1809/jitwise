 "use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import {
  FiBarChart2,
  FiFileText,
  FiShield,
} from "react-icons/fi";

const ExampleOutputSection = () => {
  return (
    <section className="relative z-10 py-20" id="example-output">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jityellow">
              Example Output
            </p>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              What you get in one click.
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Effort: min / probable / max hours
            </p>
            <div className="mt-6">
              <SpotlightCards
                className="bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
                eyebrow=""
                heading=""
                gridClassName="grid-cols-1 sm:grid-cols-2"
                items={[
                  {
                    icon: FiBarChart2,
                    title: "Pricing: min / probable / max cost (your rate)",
                    color: "#f59e0b",
                  },
                  {
                    icon: FiFileText,
                    title: "Included scope: modules selected",
                    color: "#60a5fa",
                  },
                  {
                    icon: FiShield,
                    title:
                      "Assumptions + exclusions: written in plain English",
                    color: "#a78bfa",
                  },
                ]}
              />
            </div>
            <p className="mt-6 text-lg text-white/80">
              So the estimate is explainable - not just "a number."
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Estimate Summary</span>
              <span className="rounded-full border border-jitcyan/40 px-3 py-1 text-xs text-jitcyan">
                Sample
              </span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="text-xs text-white/60">Min</div>
                <div className="mt-2 text-lg font-semibold text-white">120h</div>
              </div>
              <div className="rounded-2xl border border-jitcyan/40 bg-black/40 p-4">
                <div className="text-xs text-white/60">Probable</div>
                <div className="mt-2 text-lg font-semibold text-white">170h</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="text-xs text-white/60">Max</div>
                <div className="mt-2 text-lg font-semibold text-white">230h</div>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                Modules: Auth, Billing, Reporting
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                Risk weight: Medium (1.35x)
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                Constraints: Launch in 8 weeks
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleOutputSection;
