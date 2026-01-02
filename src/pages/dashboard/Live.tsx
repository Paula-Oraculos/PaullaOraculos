import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Users, Sparkles, Phone, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLiveEntries } from '@/hooks/useLiveEntries';
import { useCardQueue } from '@/hooks/useCardQueue';
import { useDashTheme } from '@/hooks/useDashTheme';
import { LiveTickerCard } from '@/components/dashboard/LiveTickerCard';
import { CardReadingQueue } from '@/components/dashboard/CardReadingQueue';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const Live = () => {
  const { entries, isLiveMode, toggleLiveMode } = useLiveEntries();
  const { queue, addToQueue } = useCardQueue();
  const { colors } = useDashTheme();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', phone: '' });

  const handleAddToQueue = () => {
    if (!newPerson.name || !newPerson.phone) return;
    addToQueue(newPerson);
    setNewPerson({ name: '', phone: '' });
    setAddDialogOpen(false);
  };

  const handleAddFromEntry = (entry: { name: string; phone: string }) => {
    addToQueue({ name: entry.name, phone: entry.phone });
  };

  return (
    <div className="space-y-6" style={{ color: colors.text }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Radio className="w-6 h-6" style={{ color: colors.accent }} />
          <h1 className="text-2xl font-serif">Modo Live</h1>
        </div>

        <div 
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{ background: colors.card, border: `1px solid ${colors.border}` }}
        >
          <span className="text-sm" style={{ color: colors.textSecondary }}>Modo Live</span>
          <Switch checked={isLiveMode} onCheckedChange={toggleLiveMode} />
          {isLiveMode && (
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 1, repeat: Infinity }} 
              className="w-3 h-3 rounded-full"
              style={{ background: colors.success, boxShadow: `0 0 10px ${colors.success}80` }}
            />
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          className="p-4 rounded-xl"
          style={{ background: colors.card, border: `1px solid ${colors.border}` }}
        >
          <Users className="w-5 h-5 mb-2" style={{ color: colors.accent }} />
          <p className="text-2xl font-bold">{entries.length}</p>
          <p className="text-xs" style={{ color: colors.textSecondary }}>Entradas Recentes</p>
        </div>
        <div 
          className="p-4 rounded-xl"
          style={{ background: colors.card, border: `1px solid ${colors.border}` }}
        >
          <Sparkles className="w-5 h-5 mb-2" style={{ color: colors.accent }} />
          <p className="text-2xl font-bold">{queue.length}</p>
          <p className="text-xs" style={{ color: colors.textSecondary }}>Na Fila de Cartas</p>
        </div>
        <div 
          className="p-4 rounded-xl"
          style={{ background: colors.card, border: `1px solid ${colors.border}` }}
        >
          <p className="text-2xl font-bold">{entries.filter(e => e.groupName.includes('VIP')).length}</p>
          <p className="text-xs" style={{ color: colors.textSecondary }}>Grupos VIP</p>
        </div>
        <div 
          className="p-4 rounded-xl"
          style={{ background: colors.card, border: `1px solid ${colors.border}` }}
        >
          <p className="text-2xl font-bold" style={{ color: isLiveMode ? colors.success : colors.textSecondary }}>
            {isLiveMode ? 'ON' : 'OFF'}
          </p>
          <p className="text-xs" style={{ color: colors.textSecondary }}>Status</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entries Ticker */}
        <div 
          className="rounded-xl p-4"
          style={{ background: colors.card, border: `1px solid ${colors.border}` }}
        >
          <h2 className="text-lg font-medium mb-4">Últimas Entradas</h2>
          
          {!isLiveMode ? (
            <div className="text-center py-12" style={{ color: colors.textSecondary }}>
              <Radio className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Ative o Modo Live para ver as entradas em tempo real</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: colors.cardHover, border: `1px solid ${colors.border}` }}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${entry.name}&background=${colors.accent.slice(1)}&color=fff`}
                        alt={entry.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{entry.name}</p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          {entry.groupName} • {entry.timestamp}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAddFromEntry(entry)}
                      style={{ color: colors.accent }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Fila
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Card Reading Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Fila de Cartas</h2>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" style={{ background: colors.accent, color: colors.background }}>
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </DialogTrigger>
              <DialogContent style={{ background: colors.card, borderColor: colors.border }}>
                <DialogHeader>
                  <DialogTitle style={{ color: colors.text }}>Adicionar à Fila</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>Nome</label>
                    <Input
                      value={newPerson.name}
                      onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                      placeholder="Nome da pessoa"
                      style={{ background: colors.cardHover, borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>WhatsApp</label>
                    <Input
                      value={newPerson.phone}
                      onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                      placeholder="+55 11 99999-9999"
                      style={{ background: colors.cardHover, borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleAddToQueue}
                    style={{ background: colors.accent, color: colors.background }}
                  >
                    Adicionar à Fila
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <CardReadingQueue />
        </div>
      </div>
    </div>
  );
};
