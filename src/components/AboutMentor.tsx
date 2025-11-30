import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Users } from "lucide-react";
import paulaPortrait from "@/assets/paula-portrait.jpg";

export const AboutMentor = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-purple-900/10" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 leading-tight">
            Sobre a Mentora
          </h2>
        </motion.div>

        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-serif gradient-text">
              Paula Oráculos
            </h3>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Oraculista profissional com vasta experiência, Paula desenvolveu o Método 
              Oraculista Desperta após atender milhares de consulentes e perceber que 
              o verdadeiro poder não está em "prever o futuro", mas em ativar a sabedoria 
              interior de cada pessoa.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <Card className="p-4 sm:p-5 glassmorphism border-gold-mystic/30 transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Criadora do Método</p>
                    <p className="text-xs sm:text-sm text-slate-400">Sistema exclusivo de 3 camadas</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-5 glassmorphism border-gold-mystic/30 transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">+500 alunas formadas</p>
                    <p className="text-xs sm:text-sm text-slate-400">Oraculistas ativas em todo Brasil</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-5 glassmorphism border-gold-mystic/30 transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-cosmic-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Missão de ativar curadoras</p>
                    <p className="text-xs sm:text-sm text-slate-400">Despertar a nova geração oracular</p>
                  </div>
                </div>
              </Card>
            </div>

            <p className="text-sm sm:text-base text-slate-400 italic border-l-2 border-gold-mystic pl-3 sm:pl-4">
              "Minha missão é provar que você não precisa nascer com o dom. 
              Você só precisa acordar para ele."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden glassmorphism border border-gold-mystic/30">
              <img 
                src={paulaPortrait} 
                alt="Paula Oráculos - Mentora e Criadora do Método Oraculista Desperta"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-gold-mystic/20 to-purple-500/20 rounded-2xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
