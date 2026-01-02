import { useState } from 'react';
import { Bot, Power, Clock, MessageSquare, Trash2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { useDashTheme } from '@/hooks/useDashTheme';
import { useGuardian } from '@/hooks/useGuardian';
import { MessageComposer } from '@/components/dashboard/MessageComposer';
import { EvolutionConnect } from '@/components/dashboard/EvolutionConnect';
import { useKanbanLeads } from '@/hooks/useKanbanLeads';

export const Guardiao = () => {
  const { colors } = useDashTheme();
  const { 
    isActive, 
    toggleGuardian, 
    evolutionStatus, 
    connectEvolution,
    simulateConnection,
    disconnect,
    isConnecting,
    messages,
    sendMessage,
    cancelScheduledMessage
  } = useGuardian();
  
  const { leads } = useKanbanLeads();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const handleSendMessage = (content: string, mode: 'individual' | 'group' | 'scheduled', scheduledTime?: string) => {
    sendMessage(content, mode, selectedLeads, scheduledTime);
    setSelectedLeads([]);
  };

  const toggleLeadSelection = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: colors.text }}>
            <Bot className="w-7 h-7" style={{ color: colors.accent }} />
            Guardião
          </h1>
          <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
            Automação de mensagens WhatsApp via n8n + Evolution API
          </p>
        </div>

        {/* Guardian Toggle */}
        <div 
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: colors.card,
            border: `1px solid ${isActive ? colors.accent : colors.border}`
          }}
        >
          <Power className="w-5 h-5" style={{ color: isActive ? colors.accent : colors.textSecondary }} />
          <span className="font-medium" style={{ color: colors.text }}>
            {isActive ? 'Guardião Ativo' : 'Guardião Inativo'}
          </span>
          <Switch
            checked={isActive}
            onCheckedChange={toggleGuardian}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Message Composer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Warning */}
          {!evolutionStatus.connected && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: '#F59E0B20',
                border: '1px solid #F59E0B40'
              }}
            >
              <span className="text-yellow-400">⚠️</span>
              <span style={{ color: '#FBBF24' }}>
                Conecte o WhatsApp para enviar mensagens
              </span>
            </motion.div>
          )}

          {/* Message Composer */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
              <MessageSquare className="w-5 h-5" style={{ color: colors.accent }} />
              Compor Mensagem
            </h2>
            <MessageComposer 
              onSend={handleSendMessage}
              disabled={!evolutionStatus.connected || !isActive}
            />
          </div>

          {/* Scheduled Messages */}
          {messages.filter(m => m.status === 'pending').length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: colors.text }}>
                <Clock className="w-5 h-5" style={{ color: colors.accent }} />
                Mensagens Agendadas
              </h2>
              <div className="space-y-2">
                {messages.filter(m => m.status === 'pending').map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 rounded-lg"
                    style={{
                      background: colors.card,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <div className="flex-1">
                      <p className="text-sm line-clamp-1" style={{ color: colors.text }}>
                        {msg.content}
                      </p>
                      <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                        Agendado para: {msg.scheduledTime}
                      </p>
                    </div>
                    <button
                      onClick={() => cancelScheduledMessage(msg.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Message History */}
          {messages.filter(m => m.status === 'sent').length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Histórico de Envios
              </h2>
              <div className="space-y-2">
                {messages.filter(m => m.status === 'sent').slice(0, 5).map(msg => (
                  <div
                    key={msg.id}
                    className="p-3 rounded-lg text-sm"
                    style={{
                      background: colors.card,
                      border: `1px solid ${colors.border}`
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#22C55E20', color: '#4ADE80' }}>
                        Enviado
                      </span>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        {msg.createdAt.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="line-clamp-2" style={{ color: colors.text }}>{msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Evolution Connect + Lead Selector */}
        <div className="space-y-6">
          {/* Evolution API Connection */}
          <EvolutionConnect
            status={evolutionStatus}
            onConnect={connectEvolution}
            onSimulate={simulateConnection}
            onDisconnect={disconnect}
            isConnecting={isConnecting}
          />

          {/* Lead Selector */}
          <div 
            className="rounded-xl p-4"
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`
            }}
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: colors.text }}>
              <Users className="w-5 h-5" style={{ color: colors.accent }} />
              Selecionar Destinatários
            </h3>
            <p className="text-xs mb-3" style={{ color: colors.textSecondary }}>
              {selectedLeads.length} selecionado(s)
            </p>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {leads.slice(0, 20).map(lead => (
                <label
                  key={lead.id}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={() => toggleLeadSelection(lead.id)}
                    className="rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate" style={{ color: colors.text }}>{lead.name}</p>
                    <p className="text-xs truncate" style={{ color: colors.textSecondary }}>{lead.phone}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
