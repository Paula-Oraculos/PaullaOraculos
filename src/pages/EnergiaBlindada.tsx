import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const EnergiaBlindada = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formCardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Phone mask for Brazilian format
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    }

    setWhatsapp(value);
  };

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

    setIsSubmitting(true);

    try {
      await fetch("https://editor.parmabr.digital/webhook/paulaoraculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          nome: name,
          whatsapp: whatsapp,
          data_cadastro: new Date().toISOString(),
          origem: "Energia Blindada",
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
        <title>Energia Blindada | Pare de Ser Drenada e Recupere Sua Vitalidade</title>
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
              <div className="w-11 h-11 mb-5 relative animate-[glow-gold_3s_ease-in-out_infinite]">
                <div
                  className="w-full h-full border-[1.5px] border-[#c9a352] rounded-full relative animate-[rotate-logo_20s_linear_infinite]"
                >
                  <div
                    className="absolute w-1.5 h-1.5 bg-[#c9a352] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ boxShadow: "0 0 20px rgba(201, 163, 82, 0.4)" }}
                  />
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
                Pare de Ser uma{" "}
                <span className="block text-[1.15em] mt-2">Esponja Emocional</span>
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
                  "Volte a se sentir VIVA novamente",
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
                  Junte-se a milhares de mulheres que transformaram sua energia
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
                      placeholder="Como você gostaria de ser chamada?"
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
                    <input
                      type="tel"
                      id="whatsapp"
                      value={whatsapp}
                      onChange={handleWhatsappChange}
                      placeholder="(00) 00000-0000"
                      required
                      className="w-full px-[18px] py-4 rounded-xl text-base text-white placeholder-white/35 transition-all duration-300 focus:outline-none"
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
                  text: "Você acorda exausta, vai dormir exausta. É como se algo estivesse te drenando 24 horas por dia, sugando toda sua energia vital.",
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
                  text: 'Eles acham que é frescura, que você está inventando. Mas você SABE que é real e está cansada de se sentir sozinha nisso.',
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
