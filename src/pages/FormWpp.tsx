import React, { useState, useEffect } from 'react';
import { Sparkles, Moon, Stars, ArrowRight } from 'lucide-react';

const FormCapturaWpp = () => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleJoinGroup = async () => {
    if (name.trim() && whatsapp.trim()) {
      setIsSubmitting(true);
      
      try {
        // Envia dados para o webhook do n8n
        const response = await fetch('https://editor.parmabr.digital/webhook/paulaoraculos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: name.trim(),
            whatsapp: whatsapp.replace(/\D/g, ''), // Remove formatação, envia só números
            data_cadastro: new Date().toISOString(),
            origem: 'Landing Page Paula Oráculos',
            tag: 'captura-wpp'
          })
        });

        if (response.ok) {
          // Sucesso - redireciona para o grupo
          console.log('Cadastro realizado com sucesso!');
          window.open('https://api.whatsapp.com/message/BIKYOKADPBMEF1?autoload=1&app_absent=0', '_blank');
          
          // Limpa os campos
          setName('');
          setWhatsapp('');
        } else {
          throw new Error('Erro ao enviar dados');
        }
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Houve um erro ao processar seu cadastro. Mas vamos te levar ao grupo mesmo assim! 😊');
        // Mesmo com erro, redireciona para o grupo
        window.open('https://api.whatsapp.com/message/BIKYOKADPBMEF1?autoload=1&app_absent=0', '_blank');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Por favor, preencha seu nome e WhatsApp');
    }
  };

  const formatWhatsApp = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Formata: (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
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
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Moon className="h-10 w-10 text-purple-300 animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 animate-gradient-text">
                Paula Oráculos
              </h1>
              <Stars className="h-10 w-10 text-pink-300 animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-300">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <p className="text-lg md:text-xl font-light tracking-wide">
                Desperte sua Consciência Espiritual
              </p>
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
          </div>

          {/* Main Card */}
          <div className="backdrop-blur-lg bg-white/10 border border-purple-400/30 rounded-3xl p-8 md:p-12 shadow-2xl animate-slide-up">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Junte-se ao Nosso Grupo Gratuito
            </h2>
            
            {/* Subtitle */}
            <p className="text-purple-200 text-center mb-8 text-lg leading-relaxed">
              Receba mensagens diárias de orientação espiritual, tarot, oráculos e conexão com o universo místico
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                '🌙 Leituras exclusivas de tarot e oráculos',
                '✨ Rituais e simpatias para manifestação',
                '🔮 Previsões astrológicas semanais',
                '💜 Comunidade acolhedora e espiritual',
                '🌟 Conteúdo gratuito todos os dias'
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 text-white text-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="space-y-4">
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
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={whatsapp}
                  onChange={handleWhatsAppChange}
                  maxLength={15}
                  className="w-full px-6 py-4 rounded-2xl bg-white/20 border border-purple-300/50 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm text-lg transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinGroup()}
                />
              </div>

              <button
                onClick={handleJoinGroup}
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
            </div>

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
