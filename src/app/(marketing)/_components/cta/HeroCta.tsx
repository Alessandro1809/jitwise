import GradientButton from "@/components/kokonutui/gradient-button";
import { getTranslations } from "next-intl/server";

const HeroCta = async () => {
  const t = await getTranslations("heroCta");

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <GradientButton
        href="/login"
        label={t("startFree")}
        variant="emerald"
        rel="noopener noreferrer"
      />
      <GradientButton
        href="#example-output"
        label={t("seeExample")}
        variant="purple"
        rel="noopener noreferrer"
      />
    </div>
  );
};

export default HeroCta;
