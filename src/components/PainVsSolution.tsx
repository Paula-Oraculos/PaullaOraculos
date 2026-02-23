import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AlertCircle, Sparkles, Lock, HelpCircle } from "lucide-react";

const pains = [
  {
    icon: HelpCircle,
    title: "Medo de não saber interpretar",
    description: "Você sente que não consegue captar as mensagens corretamente"
  },
  {
    icon: Lock,
    title: "Sente o chamado mas trava",
    description: "A intuição está ali, mas você não confia o suficiente para agir"
  },
  {
    icon: AlertCircle,
    title: "Acha que precisa de dom de berço",
    description: "Acredita que oráculos nascem prontos, mas a verdade é outra"
  }
];

export const PainVsSolution = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-base/10 to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Pain Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 sm:mb-6 leading-tight">
            Você não está sozinha nessa dúvida
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {pains.map((pain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-4 sm:p-6 glassmorphism border-red-500/30 h-full transition-all duration-300 hover:scale-[1.02] hover:border-red-500/50">
                <pain.icon className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{pain.title}</h3>
                <p className="text-sm sm:text-base text-slate-300">{pain.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card className="p-6 sm:p-8 glassmorphism border-gold-mystic/50 glow-gold max-w-3xl mx-auto transition-all duration-300 hover:scale-[1.02]">
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-gold-bright mx-auto mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif mb-4 sm:mb-6 gradient-text leading-tight">
              A Verdade Sagrada
            </h2>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-4 sm:mb-6">
              A intuição já está aí. Você já sente, já percebe os sinais.
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-gold-bright">
              O Método Oraculista Desperta é a chave que faltava.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
