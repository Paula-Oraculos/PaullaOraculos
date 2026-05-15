import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { countries } from "@/lib/countries";
import { applyPhoneMask, getPhoneConfig, validatePhone } from "@/lib/phoneUtils";
import { ChevronDown } from "lucide-react";
import paullaAvatar from "@/assets/paulla-avatar.jpeg";

const EnergiaBlindada = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[number]>(countries[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const phoneConfig = getPhoneConfig(selectedCountry.ddi);

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyPhoneMask(e.target.value, selectedCountry.ddi);
    setWhatsapp(maskedValue);
    const validation = validatePhone(maskedValue, selectedCountry.ddi);
    setPhoneError(validation.valid ? "" : validation.message);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsCountryDropdownOpen(false);
    }
  };

  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!formCardRef.current) return;
    const rect = formCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    formCardRef.current.style.setProperty("--mouse-x", `${x}%`);
    formCardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validatePhone(whatsapp, selectedCountry.ddi);
    if (!validation.valid) {
      setPhoneError(validation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const phoneDigits = whatsapp.replace(/\D/g, "");
      const formattedPhone = `${selectedCountry.ddi}${phoneDigits}`;

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

      await fetch("https://bk.paulaoraculos.com.br/webhook/paulaoraculos", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_unico: `ga-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          Nome: name,
          Whatsapp: formattedPhone,
          DDI: selectedCountry.ddi,
          Status: "Novo",
          Data: formatarData(),
          Hora: obterHora(),
          Dia_Semana: obterDiaSemana(),
          Tag: "aguadeiro-gratuito",
          Origem: "Formulário Paulla Oráculos",
          Grupo: "Grupo Gratuito Aguadeiro",
          Pais: selectedCountry.name,
          URL: window.location.href,
          UTM_Source: obterUTM('utm_source'),
          UTM_Campaign: obterUTM('utm_campaign'),
          UTM_Medium: obterUTM('utm_medium'),
          Dispositivo: obterDispositivo()
        })
      });
    } catch (error) {
      console.error("Webhook error:", error);
    }

    navigate("/wp-gratuito/obrigado");
  };

  // Enhanced particles: 25 mixed green + gold
  const particles = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 5 + 6,
    size: Math.random() * 2 + 2,
    color: i % 3 === 0 ? '#D4AF37' : '#2FAE66',
    opacity: Math.random() * 0.4 + 0.3,
  })), []);

  // Constellation stars: stable positions
  const constellationStars = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${(i * 2.7 + 1.5) % 100}%`,
    top: `${(i * 3.1 + 2.3) % 100}%`,
    size: Math.random() > 0.5 ? 2 : 1,
    color: i % 4 === 0 ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.3)',
    duration: 3 + (i % 4) * 1,
    delay: (i % 7) * 0.6,
  })), []);

  return (
    <>
      <Helmet>
        <title>Grupo Gratuito Paulla Oráculos | Clareza, Paz e Evolução</title>
        <meta
          name="description"
          content="Onde a sua confusão vira clareza. Entre para o grupo gratuito de Paulla Oráculos e receba ferramentas práticas para limpar sua energia e colocar sua vida nos trilhos." />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet" />
        <style>{`
          @keyframes border-rotate {
            0% { --border-angle: 0deg; }
            100% { --border-angle: 360deg; }
          }
          @keyframes title-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @property --border-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
          }
          @keyframes aura-float-1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(80px, 60px) scale(1.1); }
            50% { transform: translate(-40px, 100px) scale(0.95); }
            75% { transform: translate(60px, -30px) scale(1.05); }
          }
          @keyframes aura-float-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-70px, -50px) scale(1.08); }
            50% { transform: translate(50px, -80px) scale(0.92); }
            75% { transform: translate(-30px, 70px) scale(1.03); }
          }
          @keyframes aura-float-3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(60px, -40px) scale(1.06); }
            66% { transform: translate(-50px, 50px) scale(0.97); }
          }
          @keyframes star-pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.6; }
          }
          @keyframes light-ray {
            0% { transform: translateX(-100%) rotate(35deg); }
            100% { transform: translateX(200%) rotate(35deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            .aura-blob, .star-dot, .light-beam, .bg-particle { animation: none !important; }
          }
        `}</style>
      </Helmet>

      <div className="min-h-screen bg-[#0A1F15] text-white overflow-x-hidden font-['Inter',sans-serif]">
        {/* Layer 1 — Auric Nebulas */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="aura-blob absolute rounded-full"
            style={{
              width: 700, height: 700, top: '10%', left: '15%',
              background: 'radial-gradient(circle, rgba(31,143,90,0.12) 0%, transparent 70%)',
              filter: 'blur(150px)',
              animation: 'aura-float-1 25s ease-in-out infinite',
            }}
          />
          <div
            className="aura-blob absolute rounded-full"
            style={{
              width: 500, height: 500, top: '50%', right: '10%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
              filter: 'blur(120px)',
              animation: 'aura-float-2 35s ease-in-out infinite',
            }}
          />
          <div
            className="aura-blob absolute rounded-full"
            style={{
              width: 600, height: 600, bottom: '5%', left: '40%',
              background: 'radial-gradient(circle, rgba(126,180,124,0.10) 0%, transparent 70%)',
              filter: 'blur(140px)',
              animation: 'aura-float-3 30s ease-in-out infinite',
            }}
          />
        </div>

        {/* Layer 2 — Constellation Stars */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {constellationStars.map((star) => (
            <div
              key={star.id}
              className="star-dot absolute rounded-full"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                backgroundColor: star.color,
                animation: `star-pulse ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Layer 3 — Golden Light Rays */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="light-beam absolute"
            style={{
              width: '200%', height: 80, top: '30%', left: '-50%',
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.04), rgba(212,175,55,0.07), rgba(212,175,55,0.04), transparent)',
              transform: 'rotate(35deg)',
              animation: 'light-ray 50s linear infinite',
            }}
          />
          <div
            className="light-beam absolute"
            style={{
              width: '200%', height: 50, top: '60%', left: '-50%',
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.03), rgba(212,175,55,0.05), rgba(212,175,55,0.03), transparent)',
              transform: 'rotate(35deg)',
              animation: 'light-ray 60s linear infinite',
              animationDelay: '15s',
            }}
          />
        </div>

        {/* Layer 4 — Enhanced Floating Particles */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="bg-particle absolute rounded-full opacity-0"
              style={{
                left: `${particle.left}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                animation: `float-gold-particle ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-12 md:py-20 min-h-screen items-center">
            {/* Hero Content */}
            <div className="animate-[fadeInLeft_1s_ease-out]">
              {/* Animated Logo */}
              {/* Paulla Avatar with animated gold border */}
              <div className="mb-5">
                <div
                  className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full p-[3px]"
                  style={{
                    background: `conic-gradient(from var(--border-angle, 0deg), transparent 30%, #D4AF37 45%, #E8D4A0 50%, #D4AF37 55%, transparent 70%)`,
                    animation: "border-rotate 12s linear infinite",
                    boxShadow: "0 0 25px rgba(212, 175, 55, 0.3)"
                  }}>
                  <img
                    src={paullaAvatar}
                    alt="Paulla Oráculos"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Title with gold gradient + shimmer animation */}
              <h1
                className="font-['Playfair_Display',serif] text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] font-bold leading-[1.2] mb-5"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #E8D4A0 25%, #D4AF37 50%, #A18F5A 75%, #D4AF37 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.5px",
                  animation: "title-shimmer 6s ease-in-out infinite"
                }}>
                Grupo Gratuito Paulla Oráculos
              </h1>

              <p className="text-[1.1rem] md:text-[1.15rem] text-white font-normal leading-[1.7] mb-6">
                Onde a sua confusão vira clareza. Chega de se sentir perdido(a) e com a mente pesada. Entre para o nosso grupo gratuito e receba ferramentas práticas para limpar sua energia e colocar sua vida nos trilhos.
              </p>

              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[rgba(47,174,102,0.1)] border border-[rgba(47,174,102,0.2)] rounded-[30px] text-[0.85rem] text-[#c5c5c5] mb-6">
                <span>🌿</span>
                <span>
                  Com <strong className="text-[#7EB47C] font-semibold">Paulla Oráculos</strong>
                </span>
              </div>

              <ul className="list-none mb-4 space-y-2.5">
                {[
                  "Alívio para o peso emocional — técnicas simples para tirar o cansaço das costas e recuperar sua paz",
                  "Pare de repetir os mesmos erros — entenda por que você trava e como destravar sua mente de vez",
                  "Sua caixa de ferramentas de bem-estar — aprenda a se cuidar e transformar sua realidade todos os dias",
                  "Você não está mais sozinho(a) — comunidade que entende o que você sente e busca a mesma evolução"
                ].map((item, index) =>
                  <li key={index} className="text-base text-white/90 pl-7 relative leading-[1.6]">
                    <span className="absolute left-0 text-[#2FAE66] font-bold text-[1.2rem]">✓</span>
                    {item}
                  </li>
                )}
              </ul>
            </div>

            {/* Form Card with animated gold border */}
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
                className="relative rounded-[20px] p-[1px] overflow-hidden transition-all duration-400 hover:-translate-y-2"
                style={{
                  background: `conic-gradient(from var(--border-angle, 0deg), transparent 40%, #D4AF37 48%, #E8D4A0 50%, #D4AF37 52%, transparent 60%)`,
                  animation: "border-rotate 8s linear infinite",
                }}>
                {/* Inner card */}
                <div
                  className="relative rounded-[19px] p-8 sm:p-10 lg:p-11 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(10,31,21,0.97) 0%, rgba(10,31,21,0.99) 100%)",
                    backdropFilter: "blur(30px)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.5)"
                  }}>

                  <p className="text-center text-[0.75rem] uppercase tracking-[2px] text-[#A18F5A] mb-3 font-semibold">
                    🌿 Acesso 100% Gratuito
                  </p>

                  <h2
                    className="font-['Playfair_Display',serif] text-[1.75rem] lg:text-[1.9rem] text-center mb-2 font-semibold leading-[1.3]"
                    style={{
                      background: "linear-gradient(135deg, #7EB47C 0%, #1F8F5A 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}>
                    Grupo Gratuito Aguadeiro
                  </h2>

                  <p className="text-center text-[0.9rem] text-[#c5c5c5] mb-7 font-light leading-[1.5]">
                    Entre para a comunidade que vai transformar sua realidade
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-[0.85rem] text-white mb-2 uppercase tracking-[1px] font-medium">
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
                          border: "2px solid rgba(255,255,255,0.15)"
                        }}
                        onFocus={(e) => {
                          e.target.style.background = "rgba(255,255,255,0.06)";
                          e.target.style.borderColor = "#2FAE66";
                          e.target.style.boxShadow = "0 0 0 4px rgba(47, 174, 102, 0.4)";
                        }}
                        onBlur={(e) => {
                          e.target.style.background = "rgba(255,255,255,0.04)";
                          e.target.style.borderColor = "rgba(255,255,255,0.15)";
                          e.target.style.boxShadow = "none";
                        }} />
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-[0.85rem] text-white mb-2 uppercase tracking-[1px] font-medium">
                        Seu WhatsApp
                      </label>
                      <div className="flex gap-2 items-stretch">
                        {/* Country Selector with code */}
                        <div ref={dropdownRef} className="relative flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            className="h-full flex items-center gap-1.5 px-3 rounded-xl text-base text-white transition-all duration-300 whitespace-nowrap min-h-[56px]"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "2px solid rgba(255,255,255,0.15)"
                            }}>
                            <img src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} alt={selectedCountry.name} className="w-5 h-[15px] rounded-sm object-cover" />
                            <span className="text-sm text-white/70">+{selectedCountry.ddi}</span>
                            <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isCountryDropdownOpen &&
                            <div
                              className="absolute top-full left-0 mt-2 w-72 max-h-60 overflow-y-auto rounded-xl z-50"
                              style={{
                                background: "rgba(10, 31, 21, 0.98)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(47, 174, 102, 0.3)",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
                              }}>
                              {countries.map((country) =>
                                <button
                                  key={`${country.ddi}-${country.name}`}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setIsCountryDropdownOpen(false);
                                    setWhatsapp("");
                                  }}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-[rgba(47,174,102,0.15)] ${
                                    selectedCountry.name === country.name ? 'bg-[rgba(47,174,102,0.2)]' : ''}`}>
                                  <img src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} alt={country.name} className="w-5 h-[15px] rounded-sm object-cover" />
                                  <span className="text-white text-sm flex-1">{country.name}</span>
                                  <span className="text-white/50 text-sm">+{country.ddi}</span>
                                </button>
                              )}
                            </div>
                          }
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
                              border: phoneError ? "2px solid #ef4444" : "2px solid rgba(255,255,255,0.15)"
                            }}
                            onFocus={(e) => {
                              e.target.style.background = "rgba(255,255,255,0.06)";
                              if (!phoneError) {
                                e.target.style.borderColor = "#2FAE66";
                                e.target.style.boxShadow = "0 0 0 4px rgba(47, 174, 102, 0.4)";
                              }
                            }}
                            onBlur={(e) => {
                              e.target.style.background = "rgba(255,255,255,0.04)";
                              if (!phoneError) {
                                e.target.style.borderColor = "rgba(255,255,255,0.15)";
                              }
                              e.target.style.boxShadow = "none";
                            }} />
                          {phoneError &&
                            <span className="text-red-400 text-xs mt-1">{phoneError}</span>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Gold gradient CTA button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-[18px] rounded-xl text-base font-bold uppercase tracking-[1.5px] text-[#0A1F15] mt-2 relative overflow-hidden transition-all duration-400 hover:-translate-y-[3px] disabled:opacity-70"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37 0%, #E8D4A0 40%, #D4AF37 70%, #A18F5A 100%)",
                        boxShadow: "0 15px 40px rgba(212, 175, 55, 0.35), 0 0 20px rgba(212, 175, 55, 0.15)"
                      }}>
                      <span className="relative z-10">
                        {isSubmitting ? "Enviando..." : "Quero Fazer Parte"}
                      </span>
                    </button>
                  </form>

                  <div className="text-center mt-4 text-[0.8rem] text-[#c5c5c5] flex items-center justify-center gap-2">
                    <span className="text-[#2FAE66] text-[1.1rem]">🔒</span>
                    <span>Seus dados estão 100% seguros</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default EnergiaBlindada;
