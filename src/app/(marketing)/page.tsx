import Hero from "./_components/hero/Hero";
import ExampleOutputSection from "./_components/sections/ExampleOutputSection";
import FeaturesSection from "./_components/sections/FeaturesSection";
import FinalCtaSection from "./_components/sections/FinalCtaSection";
import FooterMini from "./_components/sections/FooterMini";
import HowItWorksSection from "./_components/sections/HowItWorksSection";
import InsightSection from "./_components/sections/InsightSection";
import PainSection from "./_components/sections/PainSection";
import SocialProofSection from "./_components/sections/SocialProofSection";


export default function Landing() {
  return (
    <>
    
      <Hero />
      <PainSection />
      <InsightSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ExampleOutputSection />
      <SocialProofSection />
      <FinalCtaSection />
      <FooterMini />
    
    </>
  );
}
