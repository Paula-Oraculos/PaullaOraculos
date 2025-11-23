import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Inclusions } from "@/components/Inclusions";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Benefits />
      <Inclusions />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;