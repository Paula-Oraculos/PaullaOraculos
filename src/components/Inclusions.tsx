import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import dashboardImage from "@/assets/dashboard-stats.jpg";

const inclusions = [
  "Instalação completa da IA no seu WhatsApp",
  "Acesso a videoaulas práticas e rápidas",
  "Templates prontos de conversa persuasiva",
  "Suporte com especialista em IA",
  "Acesso vitalício + atualizações gratuitas",
  "Script de vendas otimizado por IA",
  "Treinamento para quebra de objeções",
  "Integração com múltiplos números"
];

export const Inclusions = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            O Que Você Recebe{" "}
            <span className="gradient-text">Hoje</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tudo que você precisa para transformar seu WhatsApp em uma máquina 
            de vendas automatizada em apenas 30 minutos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-4 animate-fade-in">
            {inclusions.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-success-foreground" />
                </div>
                <p className="text-lg font-medium">{item}</p>
              </div>
            ))}
          </div>

          <Card className="p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <img 
              src={dashboardImage}
              alt="Dashboard de Resultados"
              className="w-full rounded-lg mb-6 shadow-lg"
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                <span className="font-semibold">Taxa de Resposta</span>
                <span className="text-2xl font-bold text-success">98%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                <span className="font-semibold">Tempo de Setup</span>
                <span className="text-2xl font-bold text-primary">30min</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
                <span className="font-semibold">Disponibilidade</span>
                <span className="text-2xl font-bold text-secondary">24/7</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};