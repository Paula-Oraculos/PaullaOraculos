import { useState, useEffect, useCallback, useRef } from 'react';

export interface LiveEntry {
  id: string;
  name: string;
  phone: string;
  photo: string;
  groupName: string;
  timestamp: Date;
}

const MOCK_NAMES = [
  'Maria Silva', 'João Santos', 'Ana Oliveira', 'Carlos Mendes', 'Julia Costa',
  'Pedro Lima', 'Fernanda Rocha', 'Lucas Pereira', 'Camila Souza', 'Rafael Almeida',
  'Beatriz Ferreira', 'Gabriel Santos', 'Larissa Martins', 'Matheus Ribeiro', 'Amanda Gomes',
];

const MOCK_GROUPS = [
  'Grupo VIP Energia Blindada',
  'Grupo Paula Oráculos',
  'Comunidade Oráculo',
  'Grupo VIP 01',
];

const generateMockEntry = (): LiveEntry => {
  const name = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
  const phone = `+55${Math.floor(Math.random() * 90 + 10)}9${Math.floor(Math.random() * 90000000 + 10000000)}`;
  const maskedPhone = phone.slice(0, 7) + '****' + phone.slice(-2);
  
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name,
    phone: maskedPhone,
    photo: `https://i.pravatar.cc/100?u=${Date.now()}`,
    groupName: MOCK_GROUPS[Math.floor(Math.random() * MOCK_GROUPS.length)],
    timestamp: new Date(),
  };
};

export const useLiveEntries = () => {
  const [entries, setEntries] = useState<LiveEntry[]>([]);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addEntry = useCallback((entry: LiveEntry) => {
    setEntries(prev => [entry, ...prev].slice(0, 50)); // Keep max 50 entries
  }, []);

  const toggleLiveMode = useCallback(() => {
    setIsLiveMode(prev => !prev);
  }, []);

  // Simulate live entries when live mode is on
  useEffect(() => {
    if (isLiveMode) {
      // Add initial entries
      const initialEntries = Array.from({ length: 5 }, () => generateMockEntry());
      setEntries(initialEntries);

      // Add new entries periodically
      intervalRef.current = setInterval(() => {
        addEntry(generateMockEntry());
      }, 3000 + Math.random() * 4000); // Random interval between 3-7 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLiveMode, addEntry]);

  return {
    entries,
    isLiveMode,
    toggleLiveMode,
    addEntry,
  };
};
