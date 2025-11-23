import { useState, useEffect } from "react";
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
import { Sparkles } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  phone: z.string().trim().min(10, "Telefone inválido").max(20, "Telefone muito longo"),
});

export const ExitIntentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = formSchema.parse(formData);
      
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
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-cosmic-dark/50 border-gold-mystic/30 text-slate-100 placeholder:text-slate-500"
              required
              maxLength={20}
            />
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
