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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Pain Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Você não está sozinha nessa dúvida
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {pains.map((pain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 glassmorphism border-red-500/30 h-full transition-all duration-300 hover:scale-[1.02] hover:border-red-500/50">
                <pain.icon className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{pain.title}</h3>
                <p className="text-slate-300">{pain.description}</p>
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
          <Card className="p-12 glassmorphism border-gold-mystic/50 glow-gold max-w-3xl mx-auto transition-all duration-300 hover:scale-[1.02]">
            <Sparkles className="w-16 h-16 text-gold-bright mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif mb-6 gradient-text">
              A Verdade Sagrada
            </h2>
            <p className="text-xl text-slate-200 leading-relaxed mb-6">
              A intuição já está aí. Você já sente, já percebe os sinais.
            </p>
            <p className="text-2xl font-semibold text-gold-bright">
              O Método Oraculista Desperta é a chave que faltava.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
