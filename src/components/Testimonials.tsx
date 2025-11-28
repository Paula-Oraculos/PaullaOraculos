import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Play, Zap } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Mariana Silva",
    role: "Oraculista Profissional",
    content: "Transformei completamente minha prática oracular. Hoje tenho uma agenda cheia de clientes que valorizam meu trabalho e pagam o que é justo. O método me deu a estrutura que eu precisava!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    rating: 5,
    isVideo: false
  },
  {
    id: 2,
    name: "Juliana Costa",
    role: "Taróloga",
    content: "Comecei do zero e em 45 dias já estava atendendo com segurança e confiança. O suporte da Paula e o método são incríveis. Sinto que finalmente encontrei meu propósito!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    rating: 5,
    isVideo: true
  },
  {
    id: 3,
    name: "Camila Rodrigues",
    role: "Oraculista Iniciante",
    content: "Nunca imaginei que conseguiria viver do Tarot. Hoje tenho clientes alinhados que respeitam meu trabalho e minha energia. Foi a melhor decisão que tomei!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    rating: 5,
    isVideo: false
  }
];

export const Testimonials = () => {
  const scrollToOffer = () => {
    const offerSection = document.getElementById('oferta');
    offerSection?.scrollIntoView({ behavior: 'smooth' });
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
          <h2 className="text-3xl md:text-5xl font-serif mb-4 md:mb-6 px-4">
            Histórias de Transformação
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Veja o que nossas alunas estão alcançando com o Método Oraculista Desperta
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 glassmorphism border-primary/20 h-full flex flex-col hover:border-primary/40 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    {testimonial.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/20 rounded-full backdrop-blur-sm">
                        <Play className="w-6 h-6 text-primary-foreground" fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{testimonial.role}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                  "{testimonial.content}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <div className="glassmorphism border border-primary/30 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-serif mb-4 gradient-text">
              Você quer ter clientes alinhados e valorizando seu trabalho?
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Mesmo começando agora, com esse acompanhamento eu te ajudo a ter esse nível 
              de satisfação com teu propósito e a prosperar fazendo a diferença na vida das pessoas.
            </p>
            
            <Button 
              onClick={scrollToOffer}
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-gold-mystic to-gold-bright text-cosmic-dark text-base md:text-lg px-8 md:px-12 py-4 md:py-6 h-auto font-bold hover:opacity-90 hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
              <Zap className="w-5 h-5 mr-2" />
              Quero Me Tornar Uma Oraculista Desperta
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
