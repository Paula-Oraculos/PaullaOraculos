import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginModalProps {
  onLogin: (identifier: string, password: string) => { success: boolean; error?: string };
}

export const LoginModal = ({ onLogin }: LoginModalProps) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = onLogin(identifier, password);
    
    if (!result.success) {
      setError(result.error || 'Erro ao fazer login');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]">
      {/* Background effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(4, 57, 39, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        <div 
          className="relative rounded-2xl p-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(18, 18, 18, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Top gold line */}
          <div 
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            }}
          />

          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #043927 0%, #065f46 100%)',
                boxShadow: '0 0 30px rgba(4, 57, 39, 0.5)',
              }}
            >
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>
          </div>

          <h1 
            className="text-2xl font-serif text-center mb-2"
            style={{
              background: 'linear-gradient(135deg, #e8d4a0 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Paula Oráculos
          </h1>
          <p className="text-center text-gray-400 text-sm mb-8">
            Dashboard Místico
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="identifier" className="text-gray-300 text-sm">
                Email ou Telefone
              </Label>
              <Input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="seu@email.com"
                className="mt-1.5 bg-[#1E1E1E] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 text-sm">
                Senha
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#1E1E1E] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center bg-red-500/10 py-2 px-4 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #043927 0%, #065f46 100%)',
                color: '#D4AF37',
              }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
