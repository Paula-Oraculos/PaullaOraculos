import { Button } from "@/components/ui/button";
import logoPaula from "@/assets/logo-paula.webp";

export const Header = () => {
  const scrollToOffer = () => {
    const offerElement = document.getElementById('oferta');
    if (offerElement) {
      const headerHeight = 80;
      const extraMargin = 40;
      const yOffset = -(headerHeight + extraMargin);
      const y = offerElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cosmic-dark/70 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <img 
            src={logoPaula} 
            alt="Paula Oráculos"
            width="500"
            height="447"
            className="h-10 md:h-12 w-auto drop-shadow-[0_0_8px_rgba(218,165,32,0.5)] hover:drop-shadow-[0_0_12px_rgba(218,165,32,0.7)] transition-all duration-300" 
          />
          <h1 className="text-lg md:text-xl font-serif gradient-text hidden sm:block">Paulla Oráculos</h1>
        </div>
        <Button 
          onClick={scrollToOffer}
          className="bg-gradient-to-r from-gold-mystic to-gold-bright text-cosmic-dark font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto"
        >
          <span className="hidden sm:inline">Garantir minha vaga</span>
          <span className="sm:hidden">Garantir vaga</span>
        </Button>
      </div>
    </header>
  );
};
