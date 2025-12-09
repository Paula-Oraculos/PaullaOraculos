import { Helmet } from "react-helmet";

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const EnergiaBlindadaObrigado = () => {
  const whatsappLink = "https://chat.whatsapp.com/L8GzY29UNAvBHq1VXR2XHK?mode=hqrc";

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
        <title>Obrigado | Energia Blindada - Paula Oráculos</title>
        <meta
          name="description"
          content="Sua solicitação foi realizada! Siga as instruções para acessar o grupo VIP Energia Blindada."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-['Inter',sans-serif] flex items-center justify-center px-4 py-12">
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

        <div className="relative z-10 max-w-lg w-full">
          {/* Main Card */}
          <div
            className="rounded-[20px] p-8 sm:p-10 overflow-hidden animate-[fadeInUp_0.8s_ease-out]"
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

            {/* Success Icon */}
            <div className="text-center mb-6">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 animate-[glow-gold_3s_ease-in-out_infinite]"
                style={{
                  background: "linear-gradient(135deg, rgba(201,163,82,0.2), rgba(201,163,82,0.1))",
                  border: "2px solid #c9a352",
                }}
              >
                <span className="text-3xl">✓</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center mb-6">
              <span
                className="block text-[#c9a352] font-bold text-xl mb-2"
              >
                Atenção:
              </span>
              <span className="block text-white text-lg font-normal leading-relaxed">
                Sua solicitação foi realizada!
                <br />
                O link <em className="text-[#e8d4a0]">será enviado</em> no seu{" "}
                <em className="text-[#e8d4a0]">WhatsApp</em> em breve.
              </span>
            </h1>

            {/* Instructions Box */}
            <div
              className="rounded-xl p-5 mb-6"
              style={{
                background: "rgba(201, 163, 82, 0.08)",
                border: "1px solid rgba(201, 163, 82, 0.2)",
              }}
            >
              <div className="flex items-start gap-2 mb-4">
                <span className="text-[#c9a352] text-base">ℹ️</span>
                <p className="text-white/90 text-sm leading-relaxed">
                  Para acessar <strong className="text-[#e8d4a0]">imediatamente</strong> siga as instruções abaixo:
                </p>
              </div>

              <ol className="space-y-4 text-white/90 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(201,163,82,0.2)] text-[#c9a352] flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </span>
                  <span className="leading-relaxed">
                    Clique nos <strong className="text-[#e8d4a0]">três pontinhos</strong> no canto superior direito dessa janela 📱
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(201,163,82,0.2)] text-[#c9a352] flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </span>
                  <span className="leading-relaxed">
                    Em seguida clique na opção <strong className="text-[#e8d4a0]">"Abrir com o navegador"</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(201,163,82,0.2)] text-[#c9a352] flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </span>
                  <span className="leading-relaxed">
                    Depois de abrir com o navegador, <strong className="text-[#e8d4a0]">clique no botão abaixo</strong>
                  </span>
                </li>
              </ol>
            </div>

            {/* WhatsApp CTA Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl text-base font-bold uppercase tracking-wider text-white flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(37,211,102,0.4)]"
              style={{
                background: "#25D366",
                boxShadow: "0 15px 40px rgba(37, 211, 102, 0.3)",
              }}
            >
              <WhatsAppIcon />
              Acessar Imediatamente
            </a>

            {/* Trust Badge */}
            <div className="text-center mt-5 text-[0.8rem] text-[#c5c5c5] flex items-center justify-center gap-2">
              <span className="text-[#c9a352]">🔒</span>
              <span>Grupo exclusivo e gratuito</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnergiaBlindadaObrigado;
