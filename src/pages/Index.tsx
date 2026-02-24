import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TheChoice } from "@/components/TheChoice";
import { PainVsSolution } from "@/components/PainVsSolution";
import { TheMethod } from "@/components/TheMethod";
import { AboutMentor } from "@/components/AboutMentor";
import { Testimonials } from "@/components/Testimonials";
import { OfferSection } from "@/components/OfferSection";
import { FooterSection } from "@/components/FooterSection";


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
      
    </div>
  );
};

export default Index;
