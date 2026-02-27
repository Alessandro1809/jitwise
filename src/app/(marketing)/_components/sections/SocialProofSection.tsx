 "use client";

import SpotlightCards from "@/components/kokonutui/spotlight-cards";
import { FiDollarSign, FiMessageSquare, FiTrendingUp, FiUserCheck } from "react-icons/fi";

const SocialProofSection = () => {
  return (
    <section className="relative z-10 py-20" id="social-proof">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jitcyan">
            Built for modern teams
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Built for modern independent developers and small teams.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Whether you're freelancing, running a small agency, or building
            products internally - Jitwise helps you:
          </p>
          <div className="mt-8">
            <SpotlightCards
              className="bg-white/5 px-6 pt-6 pb-6 dark:bg-white/5"
              eyebrow=""
              heading=""
              gridClassName="grid-cols-1 sm:grid-cols-2"
              items={[
                {
                  icon: FiTrendingUp,
                  title: "Protect margins",
                  color: "#34d399",
                },
                {
                  icon: FiUserCheck,
                  title: "Reduce scope creep",
                  color: "#60a5fa",
                },
                {
                  icon: FiDollarSign,
                  title: "Price with confidence",
                  color: "#f59e0b",
                },
                {
                  icon: FiMessageSquare,
                  title: "Communicate professionally",
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

export default SocialProofSection;
