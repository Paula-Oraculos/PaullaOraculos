import { NavLink, useLocation } from 'react-router-dom';
import { Radio, Sparkles, TrendingUp, Bot, Settings, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface DashSidebarProps {
  isAdmin: boolean;
}

const navItems = [
  { path: '/dash/live', label: 'Live', icon: Radio, description: 'Modo ao vivo' },
  { path: '/dash/crm', label: 'Oráculo CRM', icon: Sparkles, description: 'Gestão de leads' },
  { path: '/dash/colheita', label: 'Colheita', icon: TrendingUp, description: 'Vendas' },
  { path: '/dash/guardiao', label: 'Guardião', icon: Bot, description: 'Automação WhatsApp' },
  { path: '/dash/visao', label: 'Configurações', icon: Settings, description: 'Integrações' },
];

const adminItem = { path: '/dash/templo', label: 'Usuários', icon: Shield, description: 'Administração' };

export const DashSidebar = ({ isAdmin }: DashSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const items = isAdmin ? [...navItems, adminItem] : navItems;

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{
        background: 'linear-gradient(180deg, #1E1E1E 0%, #121212 100%)',
        borderRight: '1px solid rgba(212, 175, 55, 0.1)',
      }}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #043927 0%, #065f46 100%)',
                }}
              >
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h1 
                  className="text-sm font-serif font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #e8d4a0 0%, #D4AF37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Paula Oráculos
                </h1>
                <p className="text-[10px] text-gray-500">Dashboard</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-[#D4AF37]"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#043927]/50' 
                  : 'hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebarIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                  style={{ background: '#D4AF37' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <Icon 
                className={`w-5 h-5 flex-shrink-0 transition-colors ${
                  isActive ? 'text-[#D4AF37]' : 'text-gray-500 group-hover:text-gray-300'
                }`}
              />
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex-1 min-w-0"
                  >
                    <span 
                      className={`block text-sm font-medium truncate ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="block text-[10px] text-gray-600 truncate">
                      {item.description}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] text-gray-600 text-center"
            >
              Versão MVP 1.0
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};
