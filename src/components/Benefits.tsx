import { MessageSquare, Clock, TrendingUp, Sparkles, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: MessageSquare,
    title: "Responde Como Humano",
    description: "IA treinada para conversar naturalmente, quebrando objeções e engajando clientes de forma autêntica."
  },
  {
    icon: Clock,
    title: "Disponível 24/7",
    description: "Nunca perca uma venda. Seu WhatsApp vende enquanto você dorme, viaja ou cuida de outros negócios."
  },
  {
    icon: TrendingUp,
    title: "Mais Conversões",
    description: "Respostas imediatas aumentam drasticamente suas taxas de conversão e fechamento de vendas."
  },
  {
    icon: Sparkles,
    title: "Sem Conhecimento Técnico",
    description: "Interface intuitiva e videoaulas práticas. Configure em 30 minutos, mesmo sendo iniciante."
  },
  {
    icon: Shield,
    title: "Testado e Aprovado",
    description: "Aplicado com sucesso em mais de 65 segmentos diferentes, de consultorias a e-commerces."
  },
  {
    icon: Zap,
    title: "Instalação Rápida",
    description: "Templates prontos de conversa persuasiva. Basta personalizar e começar a vender."
  }
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Por Que Sua Empresa Precisa Disso{" "}
            <span className="gradient-text">Agora</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Imagine seu cliente entrando no WhatsApp agora... e recebendo uma resposta 
            imediata, simpática, que quebra objeções e fecha vendas automaticamente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="group p-6 shadow-card-strong hover:shadow-card-hover hover:-translate-y-2 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 ease-in-out animate-fade-in border-border cursor-pointer bg-card/95 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};