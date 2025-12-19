import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { countries } from "@/lib/countries";
import { applyPhoneMask, getPhoneConfig, validatePhone } from "@/lib/phoneUtils";
import { ChevronDown } from "lucide-react";

const EnergiaBlindada = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[number]>(countries[0]); // Brasil
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const phoneConfig = getPhoneConfig(selectedCountry.ddi);

  // Dynamic phone mask based on country
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyPhoneMask(e.target.value, selectedCountry.ddi);
    setWhatsapp(maskedValue);
    
    // Valida em tempo real
    const validation = validatePhone(maskedValue, selectedCountry.ddi);
    setPhoneError(validation.valid ? "" : validation.message);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsCountryDropdownOpen(false);
    }
  };

  // Add event listener for click outside
  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  // Mouse tracking effect for form card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    formCardRef.current.style.setProperty("--mouse-x", `${x}%`);
    formCardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Valida telefone antes de enviar
    const validation = validatePhone(whatsapp, selectedCountry.ddi);
    if (!validation.valid) {
      setPhoneError(validation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone: remove mask and add country code
      const phoneDigits = whatsapp.replace(/\D/g, "");
      const formattedPhone = `${selectedCountry.ddi}${phoneDigits}`;
      
      // Funções para formatar data
      const formatarData = () => {
        const agora = new Date();
        const dia = agora.getDate().toString().padStart(2, '0');
        const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
        const ano = agora.getFullYear();
        const horas = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        const segundos = agora.getSeconds().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
      };

      const obterDiaSemana = () => {
        const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        return diasSemana[new Date().getDay()];
      };

      const obterHora = () => {
        const hora = new Date().getHours();
        if (hora >= 5 && hora < 12) return 'manhã';
        if (hora >= 12 && hora < 18) return 'tarde';
        return 'noite';
      };

      const obterDispositivo = () => {
        const ua = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
        if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
        return 'desktop';
      };

      const obterUTM = (param: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) || '';
      };

      await fetch("https://paulaoraculos-n8n.cloudfy.live/webhook/paulaoraculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_unico: `eb-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          Nome: name,
          Whatsapp: formattedPhone,
          Status: "Novo",
          Data: formatarData(),
          Hora: obterHora(),
          Dia_Semana: obterDiaSemana(),
          Tag: "energia-blindada",
          Origem: "Formulário Energia Blindada",
          Grupo: "VIP Energia Blindada",
          Pais: selectedCountry.name,
          DDI: selectedCountry.ddi,
          Dispositivo: obterDispositivo(),
          UTM_Source: obterUTM('utm_source'),
          UTM_Campaign: obterUTM('utm_campaign'),
          UTM_Medium: obterUTM('utm_medium'),
          URL: window.location.href,
        }),
      });
    } catch (error) {
      console.error("Webhook error:", error);
    }

    navigate("/wp-energiablindada/obrigado");
  };

  // Generate particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 4 + 6,
  }));

  return (
    <>
      <Helmet>
        <title>Energia Blindada | Pare de Ter Sua Energia Drenada e Recupere Sua Vitalidade</title>
        <meta
          name="description"
          content="Descubra técnicas práticas para proteger sua energia, deixar de absorver emoções alheias e recuperar sua vitalidade. Grupo VIP exclusivo com Paula Oráculos."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-['Inter',sans-serif]">
        {/* Gradient Background */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(201, 163, 82, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(201, 163, 82, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(201, 163, 82, 0.05) 0%, transparent 40%)
            `,
          }}
        />

        {/* Floating Particles */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-[3px] h-[3px] bg-[#c9a352] rounded-full opacity-0"
              style={{
                left: `${particle.left}%`,
                animation: `float-gold-particle ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-12 md:py-20 min-h-screen items-center">
            {/* Hero Content */}
            <div className="animate-[fadeInLeft_1s_ease-out]">
              {/* Animated Logo */}
              <div className="w-10 h-14 mb-5 relative animate-[glow-gold_3s_ease-in-out_infinite]">
                <div 
                  className="w-full h-full border-2 border-[#c9a352] rounded-sm bg-[rgba(201,163,82,0.05)] relative"
                  style={{ boxShadow: "0 0 20px rgba(201, 163, 82, 0.3)" }}
                >
                  <div className="absolute inset-1.5 border border-[#c9a352]/50 rounded-sm flex items-center justify-center">
                    <span className="text-[#c9a352] text-xl">✦</span>
                  </div>
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#c9a352]/70" />
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#c9a352]/70" />
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#c9a352]/70" />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#c9a352]/70" />
                </div>
              </div>

              <h1
                className="font-['Playfair_Display',serif] text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] font-bold leading-[1.2] mb-5"
                style={{
                  background: "linear-gradient(135deg, #e8d4a0 0%, #c9a352 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.5px",
                }}
              >
                Pare de Ser a{" "}
                <span className="block text-[1.15em] mt-2">Lixeira Emocional dos Outros</span>
              </h1>

              <p className="text-[1.1rem] md:text-[1.15rem] text-white font-normal leading-[1.7] mb-6">
                Aqui você aprende de forma prática como proteger sua energia, deixar de
                absorver as emoções dos outros e recuperar sua vitalidade.
              </p>

              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[rgba(201,163,82,0.1)] border border-[rgba(201,163,82,0.2)] rounded-[30px] text-[0.85rem] text-[#c5c5c5] mb-6">
                <span>✨</span>
                <span>
                  Com <strong className="text-[#e8d4a0] font-semibold">Paula Oráculos</strong>
                </span>
              </div>

              <ul className="list-none mb-4 space-y-2.5">
                {[
                  "Pare de absorver as emoções e problemas dos outros",
                  "Recupere sua energia e vitalidade",
                  "Crie uma blindagem energética poderosa",
                  "Sua mente limpa, seus pensamentos em ordem",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="text-base text-white/90 pl-7 relative leading-[1.6]"
                  >
                    <span className="absolute left-0 text-[#c9a352] font-bold text-[1.2rem]">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form Card */}
            <div className="animate-[fadeInRight_1s_ease-out]">
              <div
                ref={formCardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  if (formCardRef.current) {
                    formCardRef.current.style.setProperty("--mouse-x", "50%");
                    formCardRef.current.style.setProperty("--mouse-y", "50%");
                  }
                }}
                className="relative rounded-[20px] p-8 sm:p-10 lg:p-11 overflow-hidden transition-all duration-400 hover:-translate-y-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                  backdropFilter: "blur(30px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                }}
              >
                {/* Top gradient line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                  style={{
                    background: "linear-gradient(90deg, transparent, #c9a352, transparent)",
                  }}
                />

                <p className="text-center text-[0.75rem] uppercase tracking-[2px] text-[#c9a352] mb-3 font-semibold">
                  🔒 Acesso Exclusivo
                </p>

                <h2
                  className="font-['Playfair_Display',serif] text-[1.75rem] lg:text-[1.9rem] text-center mb-2 font-semibold leading-[1.3]"
                  style={{
                    background: "linear-gradient(135deg, #e8d4a0 0%, #c9a352 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Grupo VIP
                  <br />
                  Energia Blindada
                </h2>

                <p className="text-center text-[0.9rem] text-[#c5c5c5] mb-7 font-light leading-[1.5]">
                  Esteja entre quem vai blindar sua energia primeiro
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[0.85rem] text-white mb-2 uppercase tracking-[1px] font-medium"
                    >
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Qual seu nome?"
                      required
                      className="w-full px-[18px] py-4 rounded-xl text-base text-white placeholder-white/35 transition-all duration-300 focus:outline-none focus:ring-[4px]"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "2px solid rgba(255,255,255,0.15)",
                      }}
                      onFocus={(e) => {
                        e.target.style.background = "rgba(255,255,255,0.06)";
                        e.target.style.borderColor = "#c9a352";
                        e.target.style.boxShadow = "0 0 0 4px rgba(201, 163, 82, 0.4)";
                      }}
                      onBlur={(e) => {
                        e.target.style.background = "rgba(255,255,255,0.04)";
                        e.target.style.borderColor = "rgba(255,255,255,0.15)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-[0.85rem] text-white mb-2 uppercase tracking-[1px] font-medium"
                    >
                      Seu WhatsApp
                    </label>
                    <div className="flex gap-2 items-stretch">
                      {/* Country Selector */}
                      <div ref={dropdownRef} className="relative flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                          className="h-full flex items-center gap-1.5 px-3 rounded-xl text-base text-white transition-all duration-300 whitespace-nowrap min-h-[56px]"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "2px solid rgba(255,255,255,0.15)",
                          }}
                        >
                          <span className="text-xl">{selectedCountry.flag}</span>
                          <span className="text-sm text-white/70">+{selectedCountry.ddi}</span>
                          <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown */}
                        {isCountryDropdownOpen && (
                          <div 
                            className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto rounded-xl z-50"
                            style={{
                              background: "rgba(20, 20, 20, 0.98)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(201, 163, 82, 0.3)",
                              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                            }}
                          >
                            {countries.map((country) => (
                              <button
                                key={`${country.ddi}-${country.name}`}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsCountryDropdownOpen(false);
                                  setWhatsapp(""); // Reset phone when changing country
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-[rgba(201,163,82,0.15)] ${
                                  selectedCountry.name === country.name ? 'bg-[rgba(201,163,82,0.2)]' : ''
                                }`}
                              >
                                <span className="text-xl">{country.flag}</span>
                                <span className="text-white text-sm flex-1">{country.name}</span>
                                <span className="text-white/50 text-sm">+{country.ddi}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <input
                          type="tel"
                          id="whatsapp"
                          value={whatsapp}
                          onChange={handleWhatsappChange}
                          placeholder={phoneConfig.placeholder}
                          required
                          className="w-full px-[18px] py-4 rounded-xl text-base text-white placeholder-white/35 transition-all duration-300 focus:outline-none min-h-[56px]"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: phoneError ? "2px solid #ef4444" : "2px solid rgba(255,255,255,0.15)",
                          }}
                          onFocus={(e) => {
                            e.target.style.background = "rgba(255,255,255,0.06)";
                            if (!phoneError) {
                              e.target.style.borderColor = "#c9a352";
                              e.target.style.boxShadow = "0 0 0 4px rgba(201, 163, 82, 0.4)";
                            }
                          }}
                          onBlur={(e) => {
                            e.target.style.background = "rgba(255,255,255,0.04)";
                            if (!phoneError) {
                              e.target.style.borderColor = "rgba(255,255,255,0.15)";
                            }
                            e.target.style.boxShadow = "none";
                          }}
                        />
                        {phoneError && (
                          <span className="text-red-400 text-xs mt-1">{phoneError}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-[18px] rounded-xl text-base font-bold uppercase tracking-[1.5px] text-[#050505] mt-2 relative overflow-hidden transition-all duration-400 hover:-translate-y-[3px] disabled:opacity-70"
                    style={{
                      background: "linear-gradient(135deg, #c9a352, #e8d4a0)",
                      boxShadow: "0 15px 40px rgba(201, 163, 82, 0.4)",
                    }}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Enviando..." : "Quero Blindar Minha Energia"}
                    </span>
                  </button>
                </form>

                <div className="text-center mt-4 text-[0.8rem] text-[#c5c5c5] flex items-center justify-center gap-2">
                  <span className="text-[#c9a352] text-[1.1rem]">🔒</span>
                  <span>Seus dados estão 100% seguros</span>
                </div>
              </div>
            </div>
          </section>

          {/* Pain Section */}
          <section className="py-16 md:py-20">
            <h2 className="font-['Playfair_Display',serif] text-[2rem] md:text-[2.5rem] text-center mb-10 text-white/95 font-semibold leading-[1.3] px-2 animate-[slideUpFade_0.8s_ease-out_forwards]">
              Se você sente isso, você precisa estar aqui...
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              {[
                {
                  emoji: "😓",
                  title: "Cansaço que nunca acaba.",
                  text: "Você acorda sem energia, vai dormir sem energia. É como se algo estivesse te drenando 24 horas por dia, sugando toda sua vitalidade.",
                },
                {
                  emoji: "🌧️",
                  title: "Você sente TUDO.",
                  text: "As emoções das outras pessoas, os ambientes pesados, as energias densas. É como se você fosse uma esponja que absorve tudo ao seu redor.",
                },
                {
                  emoji: "⚡",
                  title: "Você carrega o peso do mundo.",
                  text: "Todos os problemas parecem seus. Você atrai pessoas que te usam como muleta emocional e você não consegue dizer não.",
                },
                {
                  emoji: "😞",
                  title: "Ninguém te entende.",
                  text: 'Eles acham que é frescura, que você está inventando. Mas você SABE que é real e não aguenta mais se sentir só nisso.',
                },
              ].map((card, index) => (
                <article
                  key={index}
                  className="rounded-[18px] p-6 relative overflow-hidden transition-all duration-400 hover:-translate-y-2.5 cursor-pointer group"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    backdropFilter: "blur(30px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    animationDelay: `${0.2 * (index + 1)}s`,
                  }}
                >
                  {/* Top gradient line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-50"
                    style={{
                      background: "linear-gradient(90deg, transparent, #c9a352, transparent)",
                    }}
                  />

                  <span className="text-[2.2rem] mb-3 block">{card.emoji}</span>
                  <p className="text-base leading-[1.7] text-white/90">
                    <strong className="text-[#e8d4a0] font-semibold">{card.title}</strong>{" "}
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default EnergiaBlindada;
