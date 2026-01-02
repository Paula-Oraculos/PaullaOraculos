import { useState, useCallback } from 'react';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  photo?: string;
  tiktokUsername?: string;
  signoElemento?: string;
  nivelConsciencia: 'frio' | 'morno' | 'quente';
  dataNascimento?: string;
  notas?: string;
  createdAt: string;
  history: LeadHistoryItem[];
}

export interface LeadHistoryItem {
  id: string;
  type: 'grupo_entrada' | 'compra' | 'comentario' | 'live' | 'mensagem';
  description: string;
  date: string;
}

// Mock data for MVP
const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '+5511999887766',
    photo: 'https://i.pravatar.cc/150?img=1',
    tiktokUsername: '@mariasilva_tarot',
    signoElemento: 'Áries / Fogo',
    nivelConsciencia: 'quente',
    dataNascimento: '1985-03-21',
    notas: 'Muito interessada em mentoria. Já pratica tarot há 2 anos.',
    createdAt: '2024-01-15T10:30:00Z',
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo VIP Energia Blindada', date: '2024-01-15T10:30:00Z' },
      { id: '2', type: 'live', description: 'Participou da Live sobre Proteção Energética', date: '2024-01-16T20:00:00Z' },
      { id: '3', type: 'compra', description: 'Comprou Mentoria Individual', date: '2024-01-18T14:00:00Z' },
    ],
  },
  {
    id: '2',
    name: 'João Santos',
    phone: '+5521988776655',
    photo: 'https://i.pravatar.cc/150?img=3',
    signoElemento: 'Escorpião / Água',
    nivelConsciencia: 'morno',
    createdAt: '2024-01-20T15:45:00Z',
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo Paula Oráculos', date: '2024-01-20T15:45:00Z' },
      { id: '2', type: 'comentario', description: 'Comentou na postagem sobre signos', date: '2024-01-21T09:00:00Z' },
    ],
  },
  {
    id: '3',
    name: 'Ana Oliveira',
    phone: '+5531977665544',
    photo: 'https://i.pravatar.cc/150?img=5',
    tiktokUsername: '@ana.tarot',
    nivelConsciencia: 'frio',
    createdAt: '2024-01-22T08:20:00Z',
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo VIP', date: '2024-01-22T08:20:00Z' },
    ],
  },
  {
    id: '4',
    name: 'Carla Mendes',
    phone: '+5541966554433',
    photo: 'https://i.pravatar.cc/150?img=9',
    signoElemento: 'Libra / Ar',
    nivelConsciencia: 'quente',
    dataNascimento: '1990-10-05',
    notas: 'Trabalha como terapeuta holística. Quer expandir para tarot.',
    createdAt: '2024-01-23T11:00:00Z',
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo Energia Blindada', date: '2024-01-23T11:00:00Z' },
      { id: '2', type: 'live', description: 'Participou de 3 lives consecutivas', date: '2024-01-25T20:00:00Z' },
      { id: '3', type: 'mensagem', description: 'Enviou mensagem perguntando sobre mentoria', date: '2024-01-26T10:00:00Z' },
    ],
  },
  {
    id: '5',
    name: 'Roberto Alves',
    phone: '+5551955443322',
    photo: 'https://i.pravatar.cc/150?img=11',
    nivelConsciencia: 'morno',
    createdAt: '2024-01-24T16:30:00Z',
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo Paula Oráculos', date: '2024-01-24T16:30:00Z' },
    ],
  },
];

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const updateLead = useCallback((id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedLead]);

  const addLead = useCallback((lead: Omit<Lead, 'id' | 'createdAt' | 'history'>) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      history: [
        {
          id: '1',
          type: 'grupo_entrada',
          description: 'Lead adicionado manualmente',
          date: new Date().toISOString(),
        },
      ],
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  }, []);

  const getLeadsByNivel = useCallback((nivel: Lead['nivelConsciencia']) => {
    return leads.filter(lead => lead.nivelConsciencia === nivel);
  }, [leads]);

  return {
    leads,
    selectedLead,
    setSelectedLead,
    updateLead,
    addLead,
    getLeadsByNivel,
  };
};
