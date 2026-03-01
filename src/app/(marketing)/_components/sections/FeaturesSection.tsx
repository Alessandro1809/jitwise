 "use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import {
  FiActivity,
  FiBarChart2,
  FiCheckSquare,
  FiCode,
  FiFileText,
  FiLayers,
} from "react-icons/fi";

const FeaturesSection = () => {
  return (
    <section className="relative z-10 py-20" id="features">
      <div className="container mx-auto max-w-6xl px-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jitcyan">
            Features
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Built for real-world quoting.
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
                icon: FiCheckSquare,
                title: "Scope-first checklist",
                description:
                  "Prompts that prevent under-scoping early and improve scope management.",
                color: "#60a5fa",
              },
              {
                icon: FiLayers,
                title: "Complexity-aware modules",
                description:
                  "Basic vs complex changes the estimate transparently for a clear requirements breakdown.",
                color: "#f472b6",
              },
              {
                icon: FiActivity,
                title: "Risk multipliers",
                description:
                  "Uncertainty is priced in with a risk buffer, not ignored.",
                color: "#f59e0b",
              },
              {
                icon: FiBarChart2,
                title: "Range output",
                description:
                  "Min / probable / max time and cost estimate range - no false precision.",
                color: "#34d399",
              },
              {
                icon: FiFileText,
                title: "Client-ready summary",
                description:
                  "Scope + assumptions + exclusions, ready for a project quote or proposal.",
                color: "#a78bfa",
              },
              {
                icon: FiCode,
                title: "Developer-friendly",
                description:
                  "Works as a workflow now; extensible to an estimation template, engine + CLI later.",
                color: "#22c55e",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
