import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { GripVertical, Sparkles, Trash2, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCardQueue, type QueuePerson } from '@/hooks/useCardQueue';
import { useDashTheme } from '@/hooks/useDashTheme';
import { useState } from 'react';

interface CardReadingQueueProps {
  onAddToQueue?: (person: { name: string; phone: string; photo?: string }) => void;
}

export const CardReadingQueue = ({ onAddToQueue }: CardReadingQueueProps) => {
  const { queue, removeFromQueue, updateNotes, markAsServed, reorderQueue } = useCardQueue();
  const { colors } = useDashTheme();
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null);

  const handleReorder = (newOrder: QueuePerson[]) => {
    // Find what changed and update positions
    newOrder.forEach((person, index) => {
      if (person.position !== index + 1) {
        const oldIndex = queue.findIndex(p => p.id === person.id);
        if (oldIndex !== -1 && oldIndex !== index) {
          reorderQueue(oldIndex, index);
        }
      }
    });
  };

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return `wa.me/${digits}`;
  };

  return (
    <div 
      className="rounded-xl p-4 overflow-hidden"
      style={{ background: colors.card, border: `1px solid ${colors.border}` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: colors.accent }} />
          <h2 className="text-lg font-medium" style={{ color: colors.text }}>
            Fila de Cartas
          </h2>
          <span 
            className="text-xs px-2 py-1 rounded-full"
            style={{ background: `${colors.accent}20`, color: colors.accent }}
          >
            {queue.length} na fila
          </span>
        </div>
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-12" style={{ color: colors.textSecondary }}>
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhuma pessoa na fila para tirar cartas</p>
          <p className="text-sm mt-2">As pessoas aparecerão aqui quando entrarem durante a live</p>
        </div>
      ) : (
        <Reorder.Group 
          axis="y" 
          values={queue} 
          onReorder={handleReorder}
          className="space-y-2"
        >
          <AnimatePresence mode="popLayout">
            {queue.map((person) => (
              <Reorder.Item
                key={person.id}
                value={person}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-lg p-3 cursor-grab active:cursor-grabbing"
                style={{ 
                  background: colors.cardHover,
                  border: `1px solid ${colors.border}` 
                }}
              >
                <div className="flex items-center gap-3">
                  <GripVertical 
                    className="w-4 h-4 flex-shrink-0" 
                    style={{ color: colors.textSecondary }} 
                  />
                  
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background: colors.accent, color: colors.card }}
                  >
                    {person.position}º
                  </div>

                  <img 
                    src={person.photo || `https://ui-avatars.com/api/?name=${person.name}&background=${colors.accent.slice(1)}&color=fff`}
                    alt={person.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate" style={{ color: colors.text }}>
                      {person.name}
                    </p>
                    <a 
                      href={`https://${formatPhone(person.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1 hover:underline"
                      style={{ color: colors.textSecondary }}
                    >
                      <Phone className="w-3 h-3" />
                      {person.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setExpandedNotes(expandedNotes === person.id ? null : person.id)}
                      style={{ color: colors.textSecondary }}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => markAsServed(person.id)}
                      style={{ background: colors.accent, color: colors.card }}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      Tirar Cartas
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromQueue(person.id)}
                      className="hover:text-red-400"
                      style={{ color: colors.textSecondary }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedNotes === person.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 overflow-hidden"
                    >
                      <Textarea
                        value={person.notes}
                        onChange={(e) => updateNotes(person.id, e.target.value)}
                        placeholder="Anotações sobre esta pessoa..."
                        className="min-h-[80px] text-sm"
                        style={{ 
                          background: colors.card,
                          borderColor: colors.border,
                          color: colors.text 
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}
    </div>
  );
};
