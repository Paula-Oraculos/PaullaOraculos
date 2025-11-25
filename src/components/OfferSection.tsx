import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Shield, Zap, Gift, Clock } from "lucide-react";

const benefits = [
  "6 módulos completos em vídeo-aulas",
  "Método das 3 Camadas (exclusivo)",
  "Apostila completa em PDF",
  "Grupo VIP de prática e trocas",
  "Certificado de conclusão",
  "Acesso vitalício à plataforma",
  "Atualizações futuras incluídas",
  "Suporte direto da mentora",
];

const bonuses = [
  "Bonus 1: Ebook 'Rituais de Proteção para Oraculistas'",
  "Bonus 2: Planilha de Gestão de Atendimentos",
  "Bonus 3: Templates de Posts para Redes Sociais",
];

export const OfferSection = () => {
  const handleCheckout = () => {
    window.location.href = "https://payfast.greenn.com.br/144718";
  };

  const scrollToOffer = () => {
    const offerElement = document.getElementById('oferta');
    if (offerElement) {
      const yOffset = -100;
      const y = offerElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 relative" id="oferta">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-mystic/5 to-transparent" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">OFERTA POR TEMPO LIMITADO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Sua Transformação Começa Aqui
          </h2>
          <p className="text-xl text-slate-300">
            Tudo o que você precisa para se tornar uma Oraculista Profissional
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-8 md:p-12 glassmorphism border-gold-mystic/50 glow-gold transition-all duration-300 hover:scale-[1.01]">
            {/* Benefits List */}
            <div className="mb-8">
              <h3 className="text-2xl font-serif mb-6 gradient-text">Você vai receber:</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonuses */}
            <div className="mb-8 p-6 rounded-lg bg-purple-900/20 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-6 h-6 text-purple-400" />
                <h4 className="text-xl font-semibold text-purple-300">Bônus Exclusivos</h4>
              </div>
              <ul className="space-y-2">
                {bonuses.map((bonus, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    <span>{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div className="text-center mb-8">
              <p className="text-slate-400 line-through text-lg mb-2">De R$ 997,00</p>
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                12x de R$ 49,70
              </div>
              <p className="text-2xl text-slate-300">ou R$ 497,00 à vista</p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleCheckout}
              size="lg"
              className="w-full bg-gradient-to-r from-gold-mystic to-gold-bright text-cosmic-dark text-xl py-8 h-auto font-bold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 animate-pulse-glow mb-6"
            >
              <Zap className="w-6 h-6 mr-2" />
              QUERO ME TORNAR UMA ORACULISTA DESPERTA
            </Button>

            {/* Guarantee */}
            <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Garantia incondicional de 7 dias</span>
            </div>
          </Card>
        </motion.div>

        {/* Additional Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 glassmorphism border-gold-mystic/30 text-center h-full transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
              <Shield className="w-12 h-12 text-gold-bright mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Garantia Blindada</h4>
              <p className="text-sm text-slate-400">
                7 dias para testar. Não gostou? Devolvemos 100% do investimento.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 glassmorphism border-gold-mystic/30 text-center h-full transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
              <Zap className="w-12 h-12 text-gold-bright mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Acesso Imediato</h4>
              <p className="text-sm text-slate-400">
                Comece agora mesmo. Assim que confirmar o pagamento, tudo liberado.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 glassmorphism border-gold-mystic/30 text-center h-full transition-all duration-300 hover:scale-105 hover:border-gold-mystic/50">
              <Gift className="w-12 h-12 text-gold-bright mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Bônus Exclusivos</h4>
              <p className="text-sm text-slate-400">
                Materiais extras que vão acelerar sua jornada oracular.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 mb-2">🔒 Pagamento 100% seguro via Greenn</p>
          <p className="text-sm text-slate-500">
            Mais de 500 alunas já transformaram suas vidas
          </p>
        </motion.div>
      </div>
    </section>
  );
};
