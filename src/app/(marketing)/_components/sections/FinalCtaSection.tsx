import GradientButton from "@/components/kokonutui/gradient-button";

const FinalCtaSection = () => {
  return (
    <section className="relative z-10 py-20" id="final-cta">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-jitcyan/40 bg-jitblue/70 p-10 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jityellow">
            Get Started
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Stop guessing. Start scoping.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Build a defendable estimate in minutes - then refine it as
            requirements become real.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <GradientButton
              href="/get-started"
              label="Start estimating"
              variant="orange"
            />
            <GradientButton
              href="/demo"
              label="Open the estimator"
              variant="purple"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
