import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TheChoice } from "@/components/TheChoice";
import { PainVsSolution } from "@/components/PainVsSolution";
import { TheMethod } from "@/components/TheMethod";
import { AboutMentor } from "@/components/AboutMentor";
import { Testimonials } from "@/components/Testimonials";
import { OfferSection } from "@/components/OfferSection";
import { FooterSection } from "@/components/FooterSection";
import { ExitIntentModal } from "@/components/ExitIntentModal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TheChoice />
      <PainVsSolution />
      <TheMethod />
      <AboutMentor />
      <Testimonials />
      <OfferSection />
      <FooterSection />
      <ExitIntentModal />
    </div>
  );
};

export default Index;
