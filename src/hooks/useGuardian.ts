import { useState, useCallback } from 'react';

export interface ScheduledMessage {
  id: string;
  content: string;
  mode: 'individual' | 'group' | 'scheduled';
  scheduledTime?: string;
  recipients: string[];
  status: 'pending' | 'sent' | 'failed';
  createdAt: Date;
}

export interface EvolutionStatus {
  connected: boolean;
  instance?: string;
  phone?: string;
  qrCode?: string;
}

export const useGuardian = () => {
  const [isActive, setIsActive] = useState(() => {
    const stored = localStorage.getItem('guardian-active');
    return stored ? JSON.parse(stored) : false;
  });
  
  const [evolutionStatus, setEvolutionStatus] = useState<EvolutionStatus>({
    connected: false,
    qrCode: undefined
  });
  
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const toggleGuardian = useCallback(() => {
    setIsActive((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('guardian-active', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  const connectEvolution = useCallback(async () => {
    setIsConnecting(true);
    // Simulate QR code generation - in production this would call Evolution API
    setTimeout(() => {
      setEvolutionStatus({
        connected: false,
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EVOLUTION_DEMO_QR_CODE_PAULA_ORACULOS'
      });
      setIsConnecting(false);
    }, 1500);
  }, []);

  const simulateConnection = useCallback(() => {
    setEvolutionStatus({
      connected: true,
      instance: 'paula-oraculos',
      phone: '+55 11 99999-9999',
      qrCode: undefined
    });
  }, []);

  const disconnect = useCallback(() => {
    setEvolutionStatus({
      connected: false,
      qrCode: undefined
    });
  }, []);

  const sendMessage = useCallback((content: string, mode: 'individual' | 'group' | 'scheduled', recipients: string[], scheduledTime?: string) => {
    const newMessage: ScheduledMessage = {
      id: Date.now().toString(),
      content,
      mode,
      scheduledTime,
      recipients,
      status: mode === 'scheduled' ? 'pending' : 'sent',
      createdAt: new Date()
    };
    setMessages(prev => [newMessage, ...prev]);
    return newMessage;
  }, []);

  const cancelScheduledMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  }, []);

  return {
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
  };
};
