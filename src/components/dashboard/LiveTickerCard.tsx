import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { LiveEntry } from '@/hooks/useLiveEntries';

interface LiveTickerCardProps {
  entry: LiveEntry;
  index: number;
}

export const LiveTickerCard = ({ entry, index }: LiveTickerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ 
        type: 'spring',
        stiffness: 500,
        damping: 30,
        delay: index * 0.05,
      }}
      className="relative p-4 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(18, 18, 18, 0.95) 100%)',
        border: '1px solid rgba(212, 175, 55, 0.15)',
        boxShadow: index === 0 ? '0 0 30px rgba(212, 175, 55, 0.2)' : 'none',
      }}
    >
      {/* New entry glow effect */}
      {index === 0 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%)',
          }}
        />
      )}

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={entry.photo}
            alt={entry.name}
            className="w-12 h-12 rounded-full object-cover"
            style={{ border: '2px solid rgba(212, 175, 55, 0.3)' }}
          />
          {index === 0 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 2 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500"
              style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate">{entry.name}</h4>
          <p className="text-gray-500 text-sm truncate">{entry.phone}</p>
        </div>

        {/* Group & Time */}
        <div className="text-right flex-shrink-0">
          <p className="text-[#D4AF37] text-sm font-medium truncate max-w-[150px]">
            {entry.groupName}
          </p>
          <p className="text-gray-600 text-xs">
            {formatDistanceToNow(entry.timestamp, { addSuffix: true, locale: ptBR })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
