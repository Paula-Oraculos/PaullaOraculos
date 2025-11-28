import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const HeroSection = () => {
  const scrollToOffer = () => {
    const offerElement = document.getElementById('oferta');
    if (offerElement) {
      const headerHeight = 80;
      const extraMargin = 40;
      const yOffset = -(headerHeight + extraMargin);
      const y = offerElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.15),transparent_50%)]" />
      
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism text-gold-bright"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Junte-se a centenas de oraculistas despertas</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
            Transforme seu dom espiritual em{" "}
            <span className="gradient-text">prosperidade consciente</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Aprenda Tarot do zero, atenda clientes com segurança e construa uma carreira oracular autêntica em apenas 45 dias.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button 
              size="lg"
              onClick={scrollToOffer}
              className="bg-gradient-to-r from-gold-mystic to-gold-bright text-cosmic-dark text-lg px-12 py-8 h-auto font-bold hover:opacity-90 hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
              QUERO DIZER SIM AO MEU CHAMADO
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-bright rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};
