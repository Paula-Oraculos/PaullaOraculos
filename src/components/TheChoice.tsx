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
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            O Chamado que Você Sente
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Os oráculos não escolhem qualquer pessoa. Agora, você tem duas cartas na mesa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Blue Card - Reject */}
            <Card className="p-6 bg-blue-950/30 border-blue-500/30 opacity-70 hover:opacity-80 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <X className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">A Carta Azul</h3>
                  <p className="text-slate-400">
                    Ignorar o chamado e continuar com dúvidas, sem segurança para atender, 
                    sentindo que algo falta mas sem saber o próximo passo.
                  </p>
                </div>
              </div>
            </Card>

            {/* Red Card - Accept */}
            <Card className="p-6 glassmorphism border-gold-mystic/50 glow-gold transition-all duration-300 hover:scale-[1.02] hover:glow-gold">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-cosmic-dark" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 gradient-text">A Carta Vermelha</h3>
                  <p className="text-slate-200">
                    Aceitar o despertar e viver da sua missão, com método comprovado, 
                    segurança para atender e prosperidade alinhada ao seu propósito.
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center pt-4">
              <p className="text-gold-bright font-medium">
                ✨ Você foi escolhida. A pergunta é: você aceita?
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden glassmorphism border border-gold-mystic/30">
              <img 
                src={paulaCards} 
                alt="Paula Oráculos segurando cartas vermelha e azul de Tarot"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-gold-mystic/20 to-purple-500/20 rounded-2xl blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
