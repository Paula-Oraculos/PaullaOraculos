import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Compass, Users, Briefcase, Sparkles, TrendingUp } from "lucide-react";

const modules = [
  {
    number: "01",
    icon: Compass,
    title: "A Jornada do Louco",
    description: "Entenda a estrutura completa do Tarot e como cada arcano conta uma história de transformação.",
    topics: ["Estrutura do baralho", "Simbologia essencial", "Primeira leitura guiada"]
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Arcanos Maiores",
    description: "Mergulhe profundamente nos 22 arcanos maiores e desvende seus significados multidimensionais.",
    topics: ["Cada arcano em detalhes", "Combinações poderosas", "Interpretação intuitiva"]
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Método das 3 Camadas",
    description: "Aprenda o método exclusivo de leitura que combina razão, intuição e mensagens do inconsciente.",
    topics: ["Camada racional", "Camada intuitiva", "Camada espiritual"]
  },
  {
    number: "04",
    icon: Users,
    title: "Atendimento Profissional",
    description: "Desenvolva segurança para atender clientes reais com ética, limites e responsabilidade.",
    topics: ["Protocolo de atendimento", "Proteção energética", "Ética oracular"]
  },
  {
    number: "05",
    icon: Briefcase,
    title: "Marketing Autêntico",
    description: "Descubra como se posicionar de forma verdadeira e atrair clientes alinhados.",
    topics: ["Posicionamento único", "Redes sociais conscientes", "Comunicação magnética"]
  },
  {
    number: "06",
    icon: TrendingUp,
    title: "Prosperidade Oracular",
    description: "Construa um negócio sustentável que honra seu dom e gera abundância financeira.",
    topics: ["Precificação consciente", "Gestão de agenda", "Múltiplas fontes de renda"]
  }
];

export const TheMethod = () => {
  return (
    <section className="py-20 px-4" id="metodo">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            O Método Oraculista Desperta
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            6 módulos progressivos que te levam do zero à oraculista profissional em 45 dias
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AccordionItem 
                value={`item-${index}`}
                className="glassmorphism border-gold-mystic/30 rounded-lg px-6 hover:glow-gold hover:scale-[1.01] transition-all duration-300"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl font-bold text-cosmic-dark">{module.number}</span>
                    </div>
                    <div>
                      <div className="text-sm text-gold-bright mb-1">Módulo {module.number}</div>
                      <div className="text-xl font-semibold">{module.title}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2">
                  <p className="text-slate-300 mb-4 ml-16">{module.description}</p>
                  <ul className="space-y-2 ml-16">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-bright" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
