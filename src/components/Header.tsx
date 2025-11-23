import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Header = () => {
  const scrollToOffer = () => {
    document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cosmic-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-gold-bright" />
          <h1 className="text-2xl font-serif gradient-text">Paula Oráculos</h1>
        </div>
        <Button 
          onClick={scrollToOffer}
          className="bg-gradient-to-r from-gold-mystic to-gold-bright text-cosmic-dark font-semibold hover:opacity-90 transition-opacity"
        >
          Garantir minha vaga
        </Button>
      </div>
    </header>
  );
};
