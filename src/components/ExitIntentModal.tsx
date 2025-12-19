import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ChevronDown } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { countries } from "@/lib/countries";

const formSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  phone: z.string().trim().min(10, "Telefone inválido").max(20, "Telefone muito longo"),
});

export const ExitIntentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", country: "Brasil" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const selectedCountry = countries.find(c => c.name === formData.country) || countries[0];

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!hasShown) {
          setIsOpen(true);
          setHasShown(true);
        }
      }, 60000); // 60 seconds
    };

    // Desktop: Mouse leave
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: Inactivity timer
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach(event => {
      document.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      events.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer);
      });
      clearTimeout(inactivityTimer);
    };
  }, [hasShown]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = formSchema.parse(formData);
      
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

      // Envia dados para o webhook do n8n
      await fetch('https://paulaoraculos-n8n.cloudfy.live/webhook/paulaoraculos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_unico: `em-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          Nome: validatedData.name,
          Whatsapp: `${selectedCountry?.ddi || '55'}${validatedData.phone.replace(/\D/g, '')}`,
          Status: "Novo",
          Data: formatarData(),
          Hora: obterHora(),
          Dia_Semana: obterDiaSemana(),
          Tag: "captura-pop-up",
          Origem: "Formulário Pop-up",
          Grupo: "Grupo Paula Oráculos",
          Pais: formData.country,
          DDI: selectedCountry?.ddi || '55',
          Dispositivo: obterDispositivo(),
          UTM_Source: obterUTM('utm_source'),
          UTM_Campaign: obterUTM('utm_campaign'),
          UTM_Medium: obterUTM('utm_medium'),
          URL: window.location.href,
        })
      }).catch(error => {
        console.error('Erro ao enviar para webhook:', error);
      });
      
      // Redirect to WhatsApp group
      window.location.href = "https://chat.whatsapp.com/HRKM7t5DY54Da7HUoFiIXi?mode=ems_copy_t";
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erro na validação",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md glassmorphism border-gold-mystic/50">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-mystic to-gold-bright flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-cosmic-dark" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-serif">
            Espere! Sente que ainda não é o momento?
          </DialogTitle>
          <DialogDescription className="text-center text-slate-300 text-base">
            Entre no nosso <span className="text-gold-bright font-semibold">Grupo Gratuito no WhatsApp</span> e 
            receba pílulas de sabedoria diárias antes de decidir.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name" className="text-slate-200">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-cosmic-dark/50 border-gold-mystic/30 text-slate-100 placeholder:text-slate-500"
              required
              maxLength={100}
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-slate-200">WhatsApp</Label>
            <div ref={dropdownRef} className="relative flex gap-0">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsDropdownOpen(false);
                  } else if (e.key === 'ArrowDown' && !isDropdownOpen) {
                    e.preventDefault();
                    setIsDropdownOpen(true);
                  } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsDropdownOpen(!isDropdownOpen);
                  }
                }}
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                aria-label={`País selecionado: ${selectedCountry.name}. Código +${selectedCountry.ddi}`}
                className="flex items-center gap-1.5 px-3 h-10 bg-cosmic-dark/50 border border-gold-mystic/30 border-r-0 rounded-l-lg text-slate-100 hover:bg-cosmic-dark/70 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-mystic"
              >
                <span className="text-lg" aria-hidden="true">{selectedCountry.flag}</span>
                <span className="text-sm font-medium">+{selectedCountry.ddi}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" aria-hidden="true" />
              </button>
              
              <Input
                id="phone"
                type="tel"
                placeholder="Número de telefone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                className="bg-cosmic-dark/50 border-gold-mystic/30 text-slate-100 placeholder:text-slate-500 rounded-l-none flex-1"
                required
                maxLength={20}
              />
              
              {isDropdownOpen && (
                <div 
                  role="listbox"
                  aria-label="Selecionar país"
                  className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-cosmic-dark border border-gold-mystic/30 rounded-lg shadow-lg"
                >
                  {countries.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      role="option"
                      aria-selected={formData.country === c.name}
                      onClick={() => {
                        setFormData({ ...formData, country: c.name });
                        setIsDropdownOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setFormData({ ...formData, country: c.name });
                          setIsDropdownOpen(false);
                        }
                      }}
                      className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-gold-mystic/10 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-gold-mystic focus:ring-inset ${
                        formData.country === c.name ? 'bg-gold-mystic/20' : ''
                      }`}
                    >
                      <span className="text-lg" aria-hidden="true">{c.flag}</span>
                      <span className="text-sm text-slate-100 flex-1">{c.name}</span>
                      <span className="text-xs text-slate-400">+{c.ddi}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-gold-mystic to-gold-bright text-cosmic-dark font-bold hover:opacity-90 transition-opacity h-12"
          >
            Entrar no Grupo Gratuito
          </Button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-4">
          Ao se inscrever, você receberá mensagens do nosso grupo no WhatsApp
        </p>
      </DialogContent>
    </Dialog>
  );
};
