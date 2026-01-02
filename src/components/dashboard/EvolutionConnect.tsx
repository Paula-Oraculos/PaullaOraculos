import { Wifi, WifiOff, RefreshCw, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashTheme } from '@/hooks/useDashTheme';
import { motion, AnimatePresence } from 'framer-motion';

interface EvolutionConnectProps {
  status: {
    connected: boolean;
    instance?: string;
    phone?: string;
    qrCode?: string;
  };
  onConnect: () => void;
  onSimulate: () => void;
  onDisconnect: () => void;
  isConnecting: boolean;
}

export const EvolutionConnect = ({ 
  status, 
  onConnect, 
  onSimulate,
  onDisconnect,
  isConnecting 
}: EvolutionConnectProps) => {
  const { colors } = useDashTheme();

  return (
    <div 
      className="rounded-xl p-6"
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2" style={{ color: colors.text }}>
          <Phone className="w-5 h-5" style={{ color: colors.accent }} />
          Conexão Evolution API
        </h3>
        <div 
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
          style={{
            background: status.connected ? '#22C55E20' : '#EF444420',
            color: status.connected ? '#4ADE80' : '#F87171'
          }}
        >
          {status.connected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {status.connected ? 'Conectado' : 'Desconectado'}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status.connected ? (
          <motion.div
            key="connected"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4 p-4 rounded-lg" style={{ background: '#22C55E10' }}>
              <CheckCircle2 className="w-10 h-10 text-green-400" />
              <div>
                <p className="font-medium" style={{ color: colors.text }}>
                  {status.phone || '+55 11 99999-9999'}
                </p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Instância: {status.instance || 'paula-oraculos'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={onDisconnect}
              className="w-full"
              style={{ borderColor: '#EF4444', color: '#F87171' }}
            >
              <WifiOff className="w-4 h-4 mr-2" />
              Desconectar
            </Button>
          </motion.div>
        ) : status.qrCode ? (
          <motion.div
            key="qrcode"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center space-y-4"
          >
            <p className="text-sm text-center" style={{ color: colors.textSecondary }}>
              Escaneie o QR Code com seu WhatsApp
            </p>
            <div className="p-4 bg-white rounded-xl">
              <img 
                src={status.qrCode} 
                alt="QR Code Evolution API" 
                className="w-48 h-48"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onConnect}
                style={{ borderColor: colors.border, color: colors.textSecondary }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Novo QR
              </Button>
              <Button
                onClick={onSimulate}
                style={{ background: colors.accent, color: '#000' }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Simular Conexão
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="disconnected"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Conecte o WhatsApp Business via Evolution API para enviar mensagens automáticas.
            </p>
            <Button
              onClick={onConnect}
              disabled={isConnecting}
              className="w-full gap-2"
              style={{ background: colors.accent, color: '#000' }}
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Gerando QR Code...
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4" />
                  Conectar WhatsApp
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
