import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Shield, Clock, Sparkles } from "lucide-react";

export const Pricing = () => {
  const handleCheckout = () => {
    // Replace with actual checkout URL
    window.location.href = "#checkout";
  };

  return (
    <section id="offer" className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive font-semibold mb-6">
            <Clock className="w-4 h-4" />
            Oferta Por Tempo Limitado
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comece Hoje Por Apenas{" "}
            <span className="gradient-text">R$ 29,90</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Investimento único. Acesso vitalício. Retorno infinito.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-8 md:p-12 shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-muted-foreground line-through text-2xl">R$ 497,00</span>
                  <span className="px-2 py-1 bg-destructive/10 text-destructive text-sm font-semibold rounded">-94%</span>
                </div>
                <div className="text-5xl font-bold text-primary mb-2">R$ 29,90</div>
                <p className="text-muted-foreground">ou 4x de R$ 8,02 sem juros</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="font-medium">Acesso imediato e vitalício</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="font-medium">Todas as atualizações incluídas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="font-medium">Suporte prioritário</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="font-medium">Comunidade exclusiva</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={handleCheckout}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Garantir Minha Vaga Agora
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                Garantia de 7 dias - 100% do seu dinheiro de volta
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-muted/50 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Garantia Blindada</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Se você não ficar completamente satisfeito em 7 dias, devolvemos 
                      100% do seu investimento. Sem perguntas, sem burocracia.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/50 border-secondary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Acesso Imediato</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Após a confirmação do pagamento, você recebe acesso instantâneo 
                      a todo o conteúdo e pode começar em minutos.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/50 border-success/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Bônus Exclusivos</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Templates de alta conversão, scripts testados e acesso à 
                      comunidade de empreendedores de sucesso.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-muted-foreground mb-4">
            Mais de <span className="font-bold text-foreground">2.500 empreendedores</span> já transformaram seus negócios
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <span>✓ Pagamento 100% Seguro</span>
            <span>✓ Dados Criptografados</span>
            <span>✓ Ambiente Protegido</span>
          </div>
        </div>
      </div>
    </section>
  );
};