import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";

const videoTestimonials = [
  { id: "XtNgcifmpc4", title: "Depoimento de Transformação 1" },
  { id: "8YlGXQNCsxU", title: "Depoimento de Transformação 2" },
  { id: "9cBVtcxIPYA", title: "Depoimento de Transformação 3" },
  { id: "2Qe3N_RoA4k", title: "Depoimento de Transformação 4" },
  { id: "Q4D_iIitPq8", title: "Depoimento de Transformação 5" },
  { id: "Ciiwrnj2TC4", title: "Depoimento de Transformação 6" },
  { id: "iP2_zwxU1_E", title: "Depoimento de Transformação 7" },
  { id: "j8hLUl4v3G8", title: "Depoimento de Transformação 8" },
  { id: "YTDUeus_UJU", title: "Depoimento de Transformação 9" },
];

export const Testimonials = () => {
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
    <section className="py-16 md:py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Shooting Stars Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <ShootingStars
          starColor="hsl(var(--primary))"
          trailColor="hsl(var(--chart-2))"
          minSpeed={10}
          maxSpeed={25}
          minDelay={2000}
          maxDelay={4000}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-3 sm:mb-4 md:mb-6 px-4 leading-tight">
            Histórias de Transformação
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Veja o que nossas alunas estão alcançando com o Método Oraculista Desperta
          </p>
          <p className="text-xs sm:text-sm text-gold-bright/80 mt-2 px-4 md:hidden">
            👉 Deslize para ver mais depoimentos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {videoTestimonials.map((video, index) => (
                <CarouselItem 
                  key={video.id} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="glassmorphism border-primary/20 hover:border-primary/40 overflow-hidden transition-all duration-300 shadow-lg hover:shadow-primary/20">
                      <div className="aspect-[9/16] w-full bg-secondary/20">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          className="w-full h-full"
                        />
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="mt-4 sm:mt-6" />
            <CarouselPrevious className="hidden sm:flex -left-12 bg-primary/20 hover:bg-primary/40 border-primary/30" />
            <CarouselNext className="hidden sm:flex -right-12 bg-primary/20 hover:bg-primary/40 border-primary/30" />
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <div className="glassmorphism border border-primary/30 rounded-2xl p-5 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif mb-3 sm:mb-4 gradient-text leading-tight">
              Você quer ter clientes alinhados e valorizando seu trabalho?
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-5 sm:mb-6">
              Mesmo começando agora, com esse acompanhamento eu te ajudo a ter esse nível 
              de satisfação com teu propósito e a prosperar fazendo a diferença na vida das pessoas.
            </p>
            
            <Button 
              onClick={scrollToOffer}
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-gold-mystic to-gold-bright text-cosmic-dark text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 h-auto font-bold hover:opacity-90 hover:scale-105 transition-all duration-300 animate-pulse-glow leading-tight"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Quero Me Tornar Uma Oraculista Desperta</span>
              <span className="sm:hidden">Garantir Minha Vaga</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
