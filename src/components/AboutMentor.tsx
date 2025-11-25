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
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Sobre a Mentora
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden glassmorphism border border-gold-mystic/30">
              <img 
                src={paulaPortrait} 
                alt="Paula Oráculos - Mentora e Criadora do Método Oraculista Desperta"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-gold-mystic/20 to-purple-500/20 rounded-2xl blur-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-serif gradient-text">
              Paula Oráculos
            </h3>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              Oraculista profissional há mais de uma década, Paula desenvolveu o Método 
              Oraculista Desperta após atender milhares de consulentes e perceber que 
              o verdadeiro poder não está em "prever o futuro", mas em ativar a sabedoria 
              interior de cada pessoa.
            </p>

            <div className="space-y-4">
              <Card className="p-4 glassmorphism border-gold-mystic/30 transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cosmic-dark" />
                  </div>
                  <div>
                    <p className="font-semibold">Criadora do Método</p>
                    <p className="text-sm text-slate-400">Sistema exclusivo de 3 camadas</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 glassmorphism border-gold-mystic/30 transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center">
                    <Users className="w-5 h-5 text-cosmic-dark" />
                  </div>
                  <div>
                    <p className="font-semibold">+500 alunas formadas</p>
                    <p className="text-sm text-slate-400">Oraculistas ativas em todo Brasil</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 glassmorphism border-gold-mystic/30 transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center">
                    <Heart className="w-5 h-5 text-cosmic-dark" />
                  </div>
                  <div>
                    <p className="font-semibold">Missão de ativar curadoras</p>
                    <p className="text-sm text-slate-400">Despertar a nova geração oracular</p>
                  </div>
                </div>
              </Card>
            </div>

            <p className="text-slate-400 italic border-l-2 border-gold-mystic pl-4">
              "Minha missão é provar que você não precisa nascer com o dom. 
              Você só precisa acordar para ele."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
