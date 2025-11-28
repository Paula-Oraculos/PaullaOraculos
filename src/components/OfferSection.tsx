import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Shield, Zap, Gift, Clock, ShoppingCart } from "lucide-react";
const benefits = ["6 módulos completos em vídeo-aulas", "Método das 3 Camadas (exclusivo)", "Apostila completa em PDF", "Grupo VIP de prática e trocas", "Certificado de conclusão", "Acesso vitalício à plataforma", "Atualizações futuras incluídas", "Suporte direto da mentora"];
const bonuses = ["Bonus 1: Ebook 'Rituais de Proteção para Oraculistas'", "Bonus 2: Planilha de Gestão de Atendimentos", "Bonus 3: Templates de Posts para Redes Sociais"];
export const OfferSection = () => {
  const handleCheckout = () => {
    window.location.href = "https://payfast.greenn.com.br/144718";
  };
  const scrollToOffer = () => {
    const offerElement = document.getElementById('oferta');
    if (offerElement) {
      const headerHeight = 80;
      const extraMargin = 40;
      const yOffset = -(headerHeight + extraMargin);
      const y = offerElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  return <section className="py-12 px-4 relative" id="oferta">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-mystic/5 to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 mb-3 sm:mb-4">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-semibold">OFERTA POR TEMPO LIMITADO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3 sm:mb-4 leading-tight">
            Sua Transformação Começa Aqui
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Tudo o que você precisa para se tornar uma Oraculista Profissional
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }}>
          <Card className="p-5 sm:p-6 md:p-8 lg:p-10 glassmorphism border-gold-mystic/50 glow-gold">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 sm:gap-8 lg:gap-10">
              {/* Coluna Direita - Área de Preço Destacada (PRIMEIRO NO MOBILE) */}
              <div className="order-first lg:order-last lg:sticky lg:top-24 h-fit">
                <div className="bg-gradient-to-br from-gold-mystic/10 via-purple-500/5 to-gold-mystic/10 rounded-2xl p-5 sm:p-6 md:p-8 border-2 border-gold-mystic/60 shadow-[0_0_40px_rgba(218,165,32,0.3)] relative overflow-hidden">
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-bright/5 to-transparent animate-pulse" />
                  
                  <div className="relative z-10 space-y-4 sm:space-y-6">
                    {/* Urgency Badge */}
                    <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 mx-auto w-fit">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs font-bold uppercase">Oferta Limitada</span>
                    </div>

                    {/* Pricing */}
                    <div className="text-center space-y-2 sm:space-y-3">
                      <p className="text-slate-400 line-through text-base sm:text-lg">De R$ 997,00</p>
                      <div className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text leading-tight">
                        12x de R$ 51,10
                      </div>
                      <p className="text-xl sm:text-2xl text-slate-200 font-semibold">ou R$ 497,00 à vista</p>
                    </div>

                    {/* CTA Button */}
                    <Button onClick={handleCheckout} size="lg" className="w-full bg-gradient-to-r from-gold-mystic to-gold-bright text-cosmic-dark py-5 md:py-6 h-auto font-bold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_30px_rgba(218,165,32,0.4)] hover:shadow-[0_0_40px_rgba(218,165,32,0.6)]">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-xs md:text-sm font-extrabold whitespace-normal text-center leading-tight">GARANTIR MINHA VAGA AGORA</span>
                    </Button>

                    {/* Guarantee */}
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-300 pt-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="font-medium">Garantia incondicional de 7 dias</span>
                    </div>

                    {/* Security Badge */}
                    <ShoppingCart className="text-center pt-3 sm:pt-4 border-t border-white/10">
                      <p className="text-slate-400 text-xs sm:text-sm">🔒 Pagamento 100% seguro via Greenn</p>
                    </ShoppingCart>
                  </div>
                </div>
              </div>

              {/* Coluna Esquerda - Benefícios e Bônus (SEGUNDO NO MOBILE) */}
              <div className="space-y-5 sm:space-y-6 order-last lg:order-first">
                {/* Benefits List */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif mb-4 sm:mb-5 gradient-text">Você vai receber:</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {benefits.map((benefit, index) => <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-1" />
                        <span className="text-slate-200 text-sm sm:text-base leading-relaxed">{benefit}</span>
                      </li>)}
                  </ul>
                </div>

                {/* Bonuses */}
                <div className="p-4 sm:p-5 rounded-xl bg-purple-900/20 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    <h4 className="text-lg sm:text-xl font-semibold text-purple-300">Bônus Exclusivos</h4>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {bonuses.map((bonus, index) => <li key={index} className="flex items-start gap-2 sm:gap-3 text-slate-300 text-sm sm:text-base">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                        <span>{bonus}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>;
};