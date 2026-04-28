"use client";

import { useTranslations } from "next-intl";

const SocialProofSection = () => {
  const t = useTranslations("socialProof");
  const testimonials = t.raw("testimonials") as Array<{
    quote: string;
    name: string;
    role: string;
  }>;

  return (
    <section className="relative z-10 py-20" id="social-proof">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-jitcyan">
            {t("label")}
          </p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            {t("title")}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm leading-relaxed text-white/80">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs text-white/50">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
