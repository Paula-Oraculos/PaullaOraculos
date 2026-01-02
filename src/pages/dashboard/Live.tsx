import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Users } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useLiveEntries } from '@/hooks/useLiveEntries';
import { LiveTickerCard } from '@/components/dashboard/LiveTickerCard';

export const Live = () => {
  const { entries, isLiveMode, toggleLiveMode } = useLiveEntries();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Radio className="w-6 h-6 text-[#D4AF37]" />
          <h1 className="text-2xl font-serif text-white">Modo Live</h1>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <span className="text-gray-400 text-sm">Modo Live</span>
          <Switch checked={isLiveMode} onCheckedChange={toggleLiveMode} />
          {isLiveMode && (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-3 h-3 rounded-full bg-green-500" style={{ boxShadow: '0 0 10px rgba(34,197,94,0.5)' }} />
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <Users className="w-5 h-5 text-[#D4AF37] mb-2" />
          <p className="text-2xl font-bold text-white">{entries.length}</p>
          <p className="text-xs text-gray-500">Entradas Recentes</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <p className="text-2xl font-bold text-white">{entries.filter(e => e.groupName.includes('VIP')).length}</p>
          <p className="text-xs text-gray-500">Grupos VIP</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <p className="text-2xl font-bold text-white">{entries.filter(e => e.groupName.includes('Oráculo')).length}</p>
          <p className="text-xs text-gray-500">Paula Oráculos</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <p className="text-2xl font-bold text-white">{isLiveMode ? 'ON' : 'OFF'}</p>
          <p className="text-xs text-gray-500">Status</p>
        </div>
      </div>

      {/* Ticker */}
      <div className="rounded-xl p-4" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
        <h2 className="text-lg font-medium text-white mb-4">Últimas Entradas</h2>
        
        {!isLiveMode ? (
          <div className="text-center py-12 text-gray-500">
            <Radio className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Ative o Modo Live para ver as entradas em tempo real</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {entries.map((entry, index) => (
                <LiveTickerCard key={entry.id} entry={entry} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
