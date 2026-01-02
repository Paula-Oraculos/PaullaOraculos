import { NavLink, useLocation } from 'react-router-dom';
import { Radio, Sparkles, TrendingUp, Bot, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavProps {
  isAdmin: boolean;
}

const navItems = [
  { path: '/dash/live', label: 'Live', icon: Radio },
  { path: '/dash/crm', label: 'CRM', icon: Sparkles },
  { path: '/dash/colheita', label: 'Colheita', icon: TrendingUp },
  { path: '/dash/guardiao', label: 'Guardião', icon: Bot },
  { path: '/dash/visao', label: 'Config', icon: Settings },
];

export const MobileNav = ({ isAdmin: _isAdmin }: MobileNavProps) => {
  const location = useLocation();
  const items = navItems;

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: 'linear-gradient(to top, rgba(18, 18, 18, 0.98) 0%, rgba(18, 18, 18, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full"
                  style={{ background: '#D4AF37' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <Icon 
                className={`w-5 h-5 mb-1 transition-colors ${
                  isActive ? 'text-[#D4AF37]' : 'text-gray-500'
                }`} 
              />
              <span 
                className={`text-[10px] transition-colors ${
                  isActive ? 'text-[#D4AF37] font-medium' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
      
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" style={{ background: '#121212' }} />
    </nav>
  );
};
