import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, Stars, ArrowRight, ChevronDown } from 'lucide-react';
import { countries } from '@/lib/countries';
import { applyPhoneMask, getPhoneConfig, validatePhone } from '@/lib/phoneUtils';

const FormCapturaWpp = () => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[number]>(countries[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const windowSizeRef = useRef({ width: 0, height: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    // Cache window dimensions
    windowSizeRef.current = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const handleResize = () => {
      windowSizeRef.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Cancel previous RAF if it exists
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use RAF to batch DOM updates and avoid forced reflows
      rafRef.current = requestAnimationFrame(() => {
        const { width, height } = windowSizeRef.current;
        setMousePosition({
          x: (e.clientX / width) * 20 - 10,
          y: (e.clientY / height) * 20 - 10
        });
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const phoneConfig = getPhoneConfig(selectedCountry.ddi);

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = applyPhoneMask(e.target.value, selectedCountry.ddi);
    setWhatsapp(maskedValue);
    const validation = validatePhone(maskedValue, selectedCountry.ddi);
    setPhoneError(validation.valid ? "" : validation.message);
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
      const phoneDigits = whatsapp.replace(/\D/g, '');
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

      await fetch('https://paulaoraculos-n8n.cloudfy.live/webhook/paulaoraculos', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_unico: `fw-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          Nome: name,
          Whatsapp: formattedPhone,
          DDI: selectedCountry.ddi,
          Status: 'Novo',
          Data: formatarData(),
          Hora: obterHora(),
          Dia_Semana: obterDiaSemana(),
          Tag: 'captura-wpp',
          Origem: 'Formulário Landing Page',
          Grupo: 'Grupo Paula Oráculos',
          Pais: selectedCountry.name,
          URL: window.location.href,
          UTM_Source: obterUTM('utm_source'),
          UTM_Campaign: obterUTM('utm_campaign'),
          UTM_Medium: obterUTM('utm_medium'),
          Dispositivo: obterDispositivo(),
        }),
      });
    } catch (error) {
      console.error('Webhook error:', error);
    }

    window.open('https://api.whatsapp.com/message/BIKYOKADPBMEF1?autoload=1&app_absent=0', '_blank');
    setIsSubmitting(false);
  };



  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Galaxy Background */}
      <div className="absolute inset-0">
        {/* Base gradient - tom mais escuro de noite */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black"></div>
        
        {/* Animated nebula effect */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(88, 28, 135, 0.5) 0%, transparent 50%)`,
          }}
        ></div>
        
        {/* Stars layer 1 - small stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={`star1-${i}`}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's',
                opacity: Math.random() * 0.7 + 0.3
              }}
            ></div>
          ))}
        </div>
        
        {/* Stars layer 2 - medium stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`star2-${i}`}
              className="absolute rounded-full bg-purple-200 animate-pulse"
              style={{
                width: Math.random() * 3 + 2 + 'px',
                height: Math.random() * 3 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 4 + 's',
                animationDuration: Math.random() * 4 + 3 + 's',
                opacity: Math.random() * 0.6 + 0.2
              }}
            ></div>
          ))}
        </div>

        {/* Shooting stars */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent animate-shooting-star"
              style={{
                width: '100px',
                top: Math.random() * 50 + '%',
                left: '-100px',
                animationDelay: Math.random() * 10 + 's',
                animationDuration: '3s',
                opacity: 0.8
              }}
            ></div>
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-purple-300 animate-float"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                animationDuration: Math.random() * 10 + 15 + 's',
                opacity: Math.random() * 0.3 + 0.1
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          {/* Logo/Brand */}
          <div className="text-center mb-6 sm:mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Moon className="h-8 w-8 md:h-10 md:w-10 text-purple-300 animate-pulse" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 animate-gradient-text">
                Paula Oráculos
              </h1>
              <Stars className="h-8 w-8 md:h-10 md:w-10 text-pink-300 animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-300">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              <p className="text-base sm:text-lg md:text-xl font-light tracking-wide">
                Desperte sua Consciência Espiritual
              </p>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
            </div>
          </div>

          {/* Main Card */}
          <div className="backdrop-blur-lg bg-white/10 border border-purple-400/30 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl animate-slide-up">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4 leading-tight">
              Junte-se ao Nosso Grupo Gratuito
            </h2>
            
            {/* Subtitle */}
            <p className="text-purple-200 text-center mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Receba mensagens diárias de orientação espiritual, tarot, oráculos e conexão com o universo místico
            </p>

            {/* Benefits */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[
                '🌙 Leituras exclusivas de tarot e oráculos',
                '✨ Rituais e simpatias para manifestação',
                '🔮 Previsões astrológicas semanais',
                '💜 Comunidade acolhedora e espiritual',
                '🌟 Conteúdo gratuito todos os dias'
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base md:text-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-purple-300/50 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-lg transition-all"
                />
              </div>

              <div>
                <div className="flex gap-2 w-full overflow-hidden">
                  <div ref={dropdownRef} className="relative w-28 sm:w-36 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-2 sm:px-3 py-4 rounded-2xl bg-white/20 border border-purple-300/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-base transition-all flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1">
                        <span className="text-xl">{selectedCountry.flag}</span>
                        <span className="text-sm">+{selectedCountry.ddi}</span>
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-purple-900 border border-purple-300/50 rounded-2xl shadow-lg backdrop-blur-sm">
                        {countries.map((c) => (
                          <button
                            key={`${c.ddi}-${c.name}`}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsDropdownOpen(false);
                              setWhatsapp('');
                            }}
                            className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-purple-400/20 transition-colors text-left ${
                              selectedCountry.name === c.name ? 'bg-purple-400/30' : ''
                            }`}
                          >
                            <span className="text-lg">{c.flag}</span>
                            <span className="text-sm text-white flex-1">{c.name}</span>
                            <span className="text-xs text-purple-200">+{c.ddi}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    placeholder={phoneConfig.placeholder}
                    value={whatsapp}
                    onChange={handleWhatsappChange}
                    className={`flex-1 min-w-0 px-4 sm:px-6 py-4 rounded-2xl bg-white/20 border text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-base sm:text-lg transition-all ${
                      phoneError ? 'border-red-400' : 'border-purple-300/50'
                    }`}
                  />
                </div>
                {phoneError ? (
                  <p className="text-red-400 text-xs mt-2 ml-2">{phoneError}</p>
                ) : (
                  <p className="text-purple-200 text-xs mt-2 ml-2">
                    {selectedCountry.flag} {selectedCountry.name} (+{selectedCountry.ddi})
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 hover:from-amber-500 hover:via-yellow-600 hover:to-amber-500 text-gray-900 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {/* Glow circulante animado */}
                <div className="absolute inset-0 rounded-2xl">
                  <div className="absolute inset-0 rounded-2xl animate-rotate-glow">
                    <div className="absolute top-0 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-white/80 blur-xl rounded-full"></div>
                  </div>
                </div>
                
                {/* Brilho pulsante de fundo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                
                {/* Conteúdo do botão */}
                <span className="relative z-10 drop-shadow-lg">
                  {isSubmitting ? 'Enviando...' : 'Entrar no Grupo WhatsApp'}
                </span>
                {!isSubmitting && <ArrowRight className="relative z-10 h-6 w-6 drop-shadow-lg" />}
                {isSubmitting && (
                  <div className="relative z-10 w-6 h-6 border-3 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-purple-200 text-sm mt-6">
              🔒 Seu número fica protegido • Grupo 100% gratuito • Sem spam
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FormCapturaWpp;
