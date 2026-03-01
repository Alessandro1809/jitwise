 "use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import { FiClipboard, FiShield, FiTarget } from "react-icons/fi";

const HowItWorksSection = () => {
  return (
    <section className="relative z-10 py-20" id="how-it-works">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jityellow">
              How It Works
            </p>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              From intake to estimate - fast.
            </h2>
          </div>
          <SpotlightCards
            className="bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
            eyebrow=""
            heading=""
            gridClassName="grid-cols-1 sm:grid-cols-3"
            items={[
              {
                icon: FiTarget,
                title: "Break scope into modules",
                description:
                  "Select what's included (auth, CRUDs, integrations, files, realtime, delivery). Choose basic vs complex.",
                color: "#60a5fa",
              },
              {
                icon: FiShield,
                title: "Score risk and constraints",
                description:
                  "Capture ambiguity, dependencies, change likelihood, and deadlines - then apply a risk-aware multiplier.",
                color: "#f59e0b",
              },
              {
                icon: FiClipboard,
                title: "Generate a defendable range",
                description:
                  "Get hours + cost ranges and a client-ready summary you can copy into a proposal or email.",
                color: "#34d399",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
