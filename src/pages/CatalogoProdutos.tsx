import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Sparkles, 
  Crown, 
  Check, 
  Play, 
  Heart, 
  Users, 
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Star
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { applyPhoneMask, validatePhone, getPhoneDigits, getPhoneConfig } from "@/lib/phoneUtils";
import { toast } from "sonner";
import paulaPortrait from "@/assets/paula-portrait.webp";

// Video testimonials
const videoTestimonials = [
  { id: "XtNgcifmpc4", title: "Depoimento de Transformação 1" },
  { id: "8YlGXQNCsxU", title: "Depoimento de Transformação 2" },
  { id: "9cBVtcxIPYA", title: "Depoimento de Transformação 3" },
  { id: "2Qe3N_RoA4k", title: "Depoimento de Transformação 4" },
  { id: "Q4D_iIitPq8", title: "Depoimento de Transformação 5" },
  { id: "Ciiwrnj2TC4", title: "Depoimento de Transformação 6" },
  { id: "iP2_zwxU1_E", title: "Depoimento de Transformação 7" },
  { id: "j8hLUl4v3G8", title: "Depoimento de Transformação 8" },
  { id: "YTDUeus_UJU", title: "Depoimento de Transformação 9" },
];

// Products data
const products = [
  {
    id: "energia-blindada",
    tag: "CURSO",
    title: "Energia Blindada",
    icon: Shield,
    description: "Aprenda a blindar sua energia, parar de absorver emoções alheias e recuperar sua vitalidade mental e espiritual.",
    benefits: [
      "Técnicas práticas de proteção energética",
      "Limpeza e renovação da sua aura",
      "Rituais diários de fortalecimento",
      "Acesso vitalício ao conteúdo"
    ],
    cta: "Saber Mais",
    link: "/wp-energiablindada",
    highlight: false
  },
  {
    id: "tarot-do-zero",
    tag: "WORKSHOP",
    title: "Tarot do Zero",
    icon: Sparkles,
    description: "Workshop prático e intensivo para aprender a ler Tarot mesmo sem experiência prévia. Do básico ao profissional.",
    benefits: [
      "Aprenda as 78 cartas do Tarot",
      "Prática com jogos e tiragens reais",
      "Material de apoio completo",
      "Certificado de conclusão"
    ],
    cta: "Saber Mais",
    link: "#",
    highlight: false
  },
  {
    id: "mentoria-oraculista",
    tag: "MENTORIA",
    title: "Oraculista Desperta",
    icon: Crown,
    description: "Mentoria completa de ensino e implementação do negócio oracular. Transforme seu dom espiritual em carreira de sucesso.",
    benefits: [
      "Método exclusivo de 3 camadas",
      "Acompanhamento personalizado",
      "Estratégias de captação de clientes",
      "Suporte e comunidade exclusiva"
    ],
    cta: "Garantir Minha Vaga",
    link: "https://payfast.greenn.com.br/144718",
    highlight: true
  }
];

const CatalogoProdutos = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("55");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Floating particles with stable random values
  const particles = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${(i * 7 + 3) % 100}%`,
      delay: (i * 0.8) % 12,
      duration: 15 + (i % 5) * 3,
      size: 2 + (i % 3)
    })), []
  );

  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePhoneChange = (value: string) => {
    const masked = applyPhoneMask(value, selectedCountry);
    setPhone(masked);
    
    if (masked) {
      const validation = validatePhone(masked, selectedCountry);
      setPhoneError(validation.valid ? "" : validation.message);
    } else {
      setPhoneError("");
    }
  };

  const handleCountryChange = (ddi: string) => {
    setSelectedCountry(ddi);
    setPhone("");
    setPhoneError("");
  };

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Por favor, informe seu nome");
      return;
    }

    const validation = validatePhone(phone, selectedCountry);
    if (!validation.valid) {
      setPhoneError(validation.message);
      toast.error(validation.message);
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const country = countries.find(c => c.ddi === selectedCountry);
    const phoneDigits = getPhoneDigits(phone);
    const fullPhone = `+${selectedCountry}${phoneDigits}`;
    const urlParams = new URLSearchParams(window.location.search);

    const payload = {
      id_unico: generateUniqueId(),
      Nome: name.trim(),
      Whatsapp: fullPhone,
      DDI: selectedCountry,
      Status: "Novo",
      Data: now.toLocaleString("pt-BR"),
      Hora: now.toLocaleTimeString("pt-BR"),
      Dia_Semana: weekDays[now.getDay()],
      Tag: "oraculo-diario",
      Origem: "Formulário Catálogo Produtos",
      Grupo: "Oráculo Diário",
      Pais: country?.name || "Brasil",
      URL: window.location.href,
      UTM_Source: urlParams.get("utm_source") || "",
      UTM_Campaign: urlParams.get("utm_campaign") || "",
      UTM_Medium: urlParams.get("utm_medium") || "",
      Dispositivo: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop"
    };

    try {
      await fetch("https://paulaoraculos-n8n.cloudfy.live/webhook/paulaoraculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors"
      });

      toast.success("Cadastro realizado com sucesso!");
      window.location.href = "https://chat.whatsapp.com/HRKM7t5DY54Da7HUoFiIXi";
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao enviar. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  const selectedCountryData = countries.find(c => c.ddi === selectedCountry);
  const phoneConfig = getPhoneConfig(selectedCountry);

  return (
    <>
      <Helmet>
        <title>Paula Oráculos | Cursos, Workshops e Mentoria para Oraculistas</title>
        <meta name="description" content="Transforme seu dom espiritual em prosperidade. Conheça os cursos e mentorias de Paula Oráculos para se tornar uma oraculista profissional." />
      </Helmet>

      <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-[#c9a352]"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                animation: `float-gold-particle ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
                opacity: 0.6
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-[#c9a352]/20">
          <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-serif bg-gradient-to-r from-[#e8d4a0] to-[#c9a352] bg-clip-text text-transparent">
              Paula Oráculos
            </h1>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <button onClick={scrollToProducts} className="text-white/70 hover:text-[#c9a352] transition-colors">
                Produtos
              </button>
              <a href="#depoimentos" className="text-white/70 hover:text-[#c9a352] transition-colors">
                Depoimentos
              </a>
              <a href="#sobre" className="text-white/70 hover:text-[#c9a352] transition-colors">
                Sobre
              </a>
            </nav>
            <Button 
              onClick={scrollToForm}
              className="bg-gradient-to-r from-[#c9a352] to-[#e8d4a0] text-[#050505] font-semibold hover:opacity-90 transition-opacity text-sm px-4 py-2"
            >
              Grupo Gratuito
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-[#c9a352]/5 via-transparent to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a352]/30 bg-[#c9a352]/10 mb-6">
              <Star className="w-4 h-4 text-[#c9a352]" />
              <span className="text-sm text-[#c9a352]">Oraculista e Mentora de Oraculistas</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#e8d4a0] to-[#c9a352] bg-clip-text text-transparent">
                Desperte Seu
              </span>
              <br />
              <span className="text-white">Poder Oracular</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Conheça os caminhos para transformar seu dom espiritual em prosperidade consciente e uma carreira de sucesso
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToProducts}
                size="lg"
                className="bg-gradient-to-r from-[#c9a352] to-[#e8d4a0] text-[#050505] font-bold hover:opacity-90 text-lg px-8 py-6 h-auto"
              >
                Conhecer Produtos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={scrollToForm}
                variant="outline"
                size="lg"
                className="border-[#c9a352]/50 text-[#c9a352] hover:bg-[#c9a352]/10 text-lg px-8 py-6 h-auto"
              >
                Grupo Gratuito
                <MessageCircle className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12"
            >
              <ChevronDown className="w-8 h-8 text-[#c9a352]/50 mx-auto" />
            </motion.div>
          </motion.div>
        </section>

        {/* Products Section */}
        <section id="produtos" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">
                <span className="bg-gradient-to-r from-[#e8d4a0] to-[#c9a352] bg-clip-text text-transparent">
                  Trilhas de Transformação
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Escolha o caminho ideal para o seu momento na jornada oracular
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className={`
                    relative h-full p-6 lg:p-8 bg-white/[0.03] backdrop-blur-sm 
                    border transition-all duration-300 hover:scale-[1.02]
                    ${product.highlight 
                      ? 'border-[#c9a352] shadow-[0_0_30px_rgba(201,163,82,0.2)]' 
                      : 'border-[#c9a352]/20 hover:border-[#c9a352]/40'
                    }
                  `}>
                    {product.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#c9a352] to-[#e8d4a0] rounded-full">
                        <span className="text-xs font-bold text-[#050505]">MAIS COMPLETO</span>
                      </div>
                    )}
                    
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#c9a352]/20 text-[#c9a352] rounded-full mb-4">
                          {product.tag}
                        </span>
                        
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c9a352] to-[#e8d4a0] flex items-center justify-center mb-4">
                          <product.icon className="w-7 h-7 text-[#050505]" />
                        </div>
                        
                        <h3 className="text-2xl font-serif text-white mb-3">
                          {product.title}
                        </h3>
                        
                        <p className="text-white/60 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="flex-grow">
                        <ul className="space-y-3 mb-6">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-[#c9a352] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-white/70">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <a 
                        href={product.link}
                        className={`
                          block w-full text-center py-4 rounded-lg font-semibold transition-all duration-300
                          ${product.highlight 
                            ? 'bg-gradient-to-r from-[#c9a352] to-[#e8d4a0] text-[#050505] hover:opacity-90' 
                            : 'border border-[#c9a352]/50 text-[#c9a352] hover:bg-[#c9a352]/10'
                          }
                        `}
                      >
                        {product.cta}
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="py-20 px-4 relative bg-gradient-to-b from-transparent via-[#c9a352]/5 to-transparent">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">
                <span className="bg-gradient-to-r from-[#e8d4a0] to-[#c9a352] bg-clip-text text-transparent">
                  Transformações Reais
                </span>
              </h2>
              <p className="text-lg text-white/60">
                Veja o que nossas alunas estão alcançando
              </p>
              <p className="text-sm text-[#c9a352]/70 mt-2 md:hidden">
                👉 Deslize para ver mais
              </p>
            </motion.div>

            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {videoTestimonials.map((video, index) => (
                  <CarouselItem 
                    key={video.id} 
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/[0.03] border-[#c9a352]/20 hover:border-[#c9a352]/40 overflow-hidden transition-all duration-300">
                        <div className="aspect-[9/16] w-full bg-[#0a0a0a] relative">
                          {activeVideo === video.id ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${video.id}?rel=0&autoplay=1`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          ) : (
                            <div 
                              className="w-full h-full cursor-pointer relative group"
                              onClick={() => setActiveVideo(video.id)}
                            >
                              <img
                                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-[#c9a352] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                  <Play className="w-7 h-7 text-[#050505] ml-1" fill="#050505" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots className="mt-6" />
              <CarouselPrevious className="hidden sm:flex -left-12 bg-[#c9a352]/20 hover:bg-[#c9a352]/40 border-[#c9a352]/30 text-[#c9a352]" />
              <CarouselNext className="hidden sm:flex -right-12 bg-[#c9a352]/20 hover:bg-[#c9a352]/40 border-[#c9a352]/30 text-[#c9a352]" />
            </Carousel>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#c9a352]/5 to-transparent" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
                <span className="bg-gradient-to-r from-[#e8d4a0] to-[#c9a352] bg-clip-text text-transparent">
                  Sua Guia Nesta Jornada
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-2 md:order-1"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#c9a352]/30">
                  <img 
                    src={paulaPortrait} 
                    alt="Paula Oráculos - Mentora e Criadora do Método Oraculista Desperta" 
                    className="w-full h-full object-cover object-[center_35%]"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#c9a352]/20 to-[#c9a352]/10 rounded-2xl blur-2xl -z-10" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 order-1 md:order-2"
              >
                <h3 className="text-3xl font-serif bg-gradient-to-r from-[#e8d4a0] to-[#c9a352] bg-clip-text text-transparent">
                  Paula Oráculos
                </h3>
                
                <p className="text-lg text-white/70 leading-relaxed">
                  Oraculista profissional e mentora de oraculistas, Paula desenvolveu o Método 
                  Oraculista Desperta após atender milhares de consulentes e perceber que 
                  o verdadeiro poder não está em "prever o futuro", mas em ativar a sabedoria 
                  interior de cada pessoa.
                </p>

                <div className="space-y-4">
                  <Card className="p-5 bg-white/[0.03] border-[#c9a352]/30 transition-all duration-300 hover:scale-[1.02] hover:border-[#c9a352]/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a352] to-[#e8d4a0] flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-[#050505]" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Criadora do Método</p>
                        <p className="text-sm text-white/50">Sistema exclusivo de 3 camadas</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 bg-white/[0.03] border-[#c9a352]/30 transition-all duration-300 hover:scale-[1.02] hover:border-[#c9a352]/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a352] to-[#e8d4a0] flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-[#050505]" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">+50 alunas formadas</p>
                        <p className="text-sm text-white/50">Oraculistas ativas em todo Brasil</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 bg-white/[0.03] border-[#c9a352]/30 transition-all duration-300 hover:scale-[1.02] hover:border-[#c9a352]/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a352] to-[#e8d4a0] flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-[#050505]" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Missão de ativar curadoras</p>
                        <p className="text-sm text-white/50">Despertar a nova geração oracular</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <p className="text-white/50 italic border-l-2 border-[#c9a352] pl-4">
                  "Minha missão é provar que você não precisa nascer com o dom. 
                  Você só precisa acordar para ele."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="formulario" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#c9a352]/10 via-transparent to-transparent" />
          
          <div className="container mx-auto max-w-xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 sm:p-10 bg-white/[0.03] backdrop-blur-sm border-[#c9a352]/30">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a352] to-[#e8d4a0] flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-[#050505]" />
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-serif mb-2">
                    <span className="bg-gradient-to-r from-[#e8d4a0] to-[#c9a352] bg-clip-text text-transparent">
                      Oráculo Diário
                    </span>
                  </h2>
                  
                  <p className="text-white/60">
                    Entre no nosso grupo gratuito e receba sabedoria diária
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-14 bg-white/5 border-[#c9a352]/30 text-white placeholder:text-white/40 focus:border-[#c9a352]"
                    />
                  </div>

                  <div className="flex items-stretch gap-2 min-h-[56px]">
                    <Select value={selectedCountry} onValueChange={handleCountryChange}>
                      <SelectTrigger className="w-[100px] h-14 bg-white/5 border-[#c9a352]/30 text-white">
                        <SelectValue>
                          {selectedCountryData && (
                            <span className="flex items-center gap-1">
                              <span>{selectedCountryData.flag}</span>
                              <span className="text-white/70">+{selectedCountryData.ddi}</span>
                            </span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0a] border-[#c9a352]/30 max-h-[300px]">
                        {countries.map((country) => (
                          <SelectItem 
                            key={`${country.ddi}-${country.name}`} 
                            value={country.ddi}
                            className="text-white hover:bg-[#c9a352]/20"
                          >
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.name}</span>
                              <span className="text-white/50">+{country.ddi}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="tel"
                      placeholder={phoneConfig.placeholder}
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`flex-1 h-14 min-w-0 bg-white/5 border-[#c9a352]/30 text-white placeholder:text-white/40 focus:border-[#c9a352] ${phoneError ? 'border-red-500' : ''}`}
                    />
                  </div>
                  
                  {phoneError && (
                    <p className="text-red-400 text-sm">{phoneError}</p>
                  )}

                  <div className="space-y-2 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#c9a352]" />
                      <span>Mensagens diárias de sabedoria oracular</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#c9a352]" />
                      <span>Conteúdos exclusivos e meditações guiadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#c9a352]" />
                      <span>Comunidade de apoio e acolhimento</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-[#c9a352] to-[#e8d4a0] text-[#050505] font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? "Entrando..." : "QUERO FAZER PARTE"}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-[#c9a352]/20">
          <div className="container mx-auto max-w-6xl text-center">
            <p className="text-sm text-white/40">
              © 2025 Paula Oráculos - Todos os direitos reservados
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CatalogoProdutos;
