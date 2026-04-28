import { getTranslations } from "next-intl/server";

const FooterMini = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="relative z-10 border-t border-white/10 py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Jitwise
            </div>
            <p className="max-w-md text-sm text-white/60">
              {t("tagline")}
            </p>
            <p className="text-xs text-white/40">
              {t("smallPrint")}
            </p>
          </div>
          <div className="space-y-3 text-sm text-white/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {t("product")}
            </p>
            <a className="block transition hover:text-white" href="/#how-it-works">
              {t("howItWorks")}
            </a>
            <a className="block transition hover:text-white" href="/#example-output">
              {t("demo")}
            </a>
            <a className="block transition hover:text-white" href="/#pricing">
              {t("pricing")}
            </a>
          </div>
          <div className="space-y-3 text-sm text-white/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {t("getStarted")}
            </p>
            <a className="block transition hover:text-white" href="/login">
              {t("tryJitwise")}
            </a>
            <a className="block transition hover:text-white" href="/contact">
              {t("contact")}
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center">
          <span>{t("copyright")}</span>
          <div className="flex flex-wrap gap-4">
            <a className="transition hover:text-white" href="/privacy">
              {t("privacy")}
            </a>
            <a className="transition hover:text-white" href="/terms">
              {t("terms")}
            </a>
            <a className="transition hover:text-white" href="https://github.com">
              {t("github")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMini;
