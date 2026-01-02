import { LogOut, User } from 'lucide-react';
import type { DashUser } from '@/hooks/useDashAuth';

interface DashHeaderProps {
  user: DashUser;
  onLogout: () => void;
}

export const DashHeader = ({ user, onLogout }: DashHeaderProps) => {
  return (
    <header 
      className="sticky top-0 z-40 px-4 md:px-6 py-3 flex items-center justify-between"
      style={{
        background: 'linear-gradient(to bottom, rgba(18, 18, 18, 0.98) 0%, rgba(18, 18, 18, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #043927 0%, #065f46 100%)',
            }}
          >
            <span className="text-[#D4AF37] text-sm">✦</span>
          </div>
          <span 
            className="text-sm font-serif font-semibold"
            style={{
              background: 'linear-gradient(135deg, #e8d4a0 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Paula Oráculos
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300 hidden sm:inline">{user.name}</span>
          <span 
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: user.role === 'admin' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(4, 57, 39, 0.3)',
              color: user.role === 'admin' ? '#D4AF37' : '#10b981',
            }}
          >
            {user.role === 'admin' ? 'Admin' : 'Paula'}
          </span>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
};
