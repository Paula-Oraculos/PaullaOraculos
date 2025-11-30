import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { X, Check } from "lucide-react";
import paulaCards from "@/assets/paula-cards.png";

export const TheChoice = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 leading-tight">
            O Chamado que Você Sente
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Os oráculos não escolhem qualquer pessoa. Agora, você tem duas cartas na mesa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative order-first md:order-last"
          >
            <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden glassmorphism border border-gold-mystic/30">
              <img 
                src={paulaCards} 
                alt="Paula Oráculos segurando cartas vermelha e azul de Tarot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-gold-mystic/20 to-purple-500/20 rounded-2xl blur-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Blue Card - Reject */}
            <Card className="p-4 sm:p-6 bg-blue-950/50 border-blue-500/40 opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,191,255,0.5)]">
              <div className="flex flex-wrap sm:flex-nowrap items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 min-w-[2.5rem] sm:w-12 sm:h-12 sm:min-w-[3rem] rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-200 break-words">A Carta Azul</h3>
                  <p className="text-sm sm:text-base text-slate-300 break-words">
                    Ignorar o chamado e continuar com dúvidas, sem segurança para atender, 
                    sentindo que algo falta mas sem saber o próximo passo.
                  </p>
                </div>
              </div>
            </Card>

            {/* Red Card - Accept */}
            <Card className="p-4 sm:p-6 glassmorphism border-gold-mystic/50 glow-gold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(220,20,60,0.6)]">
              <div className="flex flex-wrap sm:flex-nowrap items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 min-w-[2.5rem] sm:w-12 sm:h-12 sm:min-w-[3rem] rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-cosmic-dark" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 gradient-text break-words">A Carta Vermelha</h3>
                  <p className="text-sm sm:text-base text-slate-200 break-words">
                    Aceitar o despertar e viver da sua missão, com método comprovado, 
                    segurança para atender e prosperidade alinhada ao seu propósito.
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center pt-2 sm:pt-4">
              <p className="text-gold-bright font-medium text-sm sm:text-base">
                ✨ Você foi escolhida. A pergunta é: você aceita?
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
