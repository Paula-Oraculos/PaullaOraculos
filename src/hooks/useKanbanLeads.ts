import { useState, useCallback } from 'react';
import { Lead, LeadHistoryItem } from './useLeads';

export type FunnelStage = 'novos' | 'engajados' | 'negociacao' | 'convertidos' | 'perdidos';

export interface KanbanLead extends Lead {
  stage: FunnelStage;
  tags: string[];
  courses: string[];
}

const STORAGE_KEY = 'paula-kanban-leads';

const MOCK_LEADS: KanbanLead[] = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '+5511999887766',
    photo: 'https://i.pravatar.cc/150?img=1',
    tiktokUsername: '@mariasilva_tarot',
    signoElemento: 'Áries / Fogo',
    nivelConsciencia: 'quente',
    dataNascimento: '1985-03-21',
    notas: 'Muito interessada em mentoria.',
    createdAt: '2024-01-15T10:30:00Z',
    stage: 'convertidos',
    tags: ['VIP', 'Mentoria'],
    courses: ['Mentoria Individual'],
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo VIP', date: '2024-01-15T10:30:00Z' },
      { id: '2', type: 'compra', description: 'Comprou Mentoria', date: '2024-01-18T14:00:00Z' },
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
    stage: 'engajados',
    tags: ['TikTok'],
    courses: [],
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo', date: '2024-01-20T15:45:00Z' },
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
    stage: 'novos',
    tags: [],
    courses: [],
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
    notas: 'Terapeuta holística.',
    createdAt: '2024-01-23T11:00:00Z',
    stage: 'negociacao',
    tags: ['Interessado', 'Mentoria'],
    courses: [],
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo', date: '2024-01-23T11:00:00Z' },
      { id: '2', type: 'mensagem', description: 'Perguntou sobre mentoria', date: '2024-01-26T10:00:00Z' },
    ],
  },
  {
    id: '5',
    name: 'Roberto Alves',
    phone: '+5551955443322',
    photo: 'https://i.pravatar.cc/150?img=11',
    nivelConsciencia: 'morno',
    createdAt: '2024-01-24T16:30:00Z',
    stage: 'engajados',
    tags: ['Energia Blindada'],
    courses: [],
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo', date: '2024-01-24T16:30:00Z' },
    ],
  },
  {
    id: '6',
    name: 'Fernanda Lima',
    phone: '+5511988223344',
    photo: 'https://i.pravatar.cc/150?img=16',
    nivelConsciencia: 'frio',
    createdAt: '2024-01-25T09:00:00Z',
    stage: 'perdidos',
    tags: [],
    courses: [],
    history: [
      { id: '1', type: 'grupo_entrada', description: 'Entrou no Grupo', date: '2024-01-25T09:00:00Z' },
    ],
  },
];

const getStoredLeads = (): KanbanLead[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : MOCK_LEADS;
  } catch {
    return MOCK_LEADS;
  }
};

export const FUNNEL_STAGES: { id: FunnelStage; label: string; icon: string; color: string }[] = [
  { id: 'novos', label: 'Novos Leads', icon: '📥', color: '#3B82F6' },
  { id: 'engajados', label: 'Engajados', icon: '🔥', color: '#F59E0B' },
  { id: 'negociacao', label: 'Em Negociação', icon: '💬', color: '#8B5CF6' },
  { id: 'convertidos', label: 'Convertidos', icon: '✅', color: '#22C55E' },
  { id: 'perdidos', label: 'Perdidos', icon: '❌', color: '#EF4444' },
];

export const useKanbanLeads = () => {
  const [leads, setLeads] = useState<KanbanLead[]>(getStoredLeads);
  const [selectedLead, setSelectedLead] = useState<KanbanLead | null>(null);

  const saveLeads = (newLeads: KanbanLead[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLeads));
    setLeads(newLeads);
  };

  const moveToStage = useCallback((leadId: string, newStage: FunnelStage) => {
    const updated = leads.map(lead => {
      if (lead.id === leadId) {
        const historyItem: LeadHistoryItem = {
          id: Date.now().toString(),
          type: 'mensagem',
          description: `Movido para ${FUNNEL_STAGES.find(s => s.id === newStage)?.label}`,
          date: new Date().toISOString(),
        };
        return { 
          ...lead, 
          stage: newStage,
          history: [historyItem, ...lead.history]
        };
      }
      return lead;
    });
    saveLeads(updated);
    if (selectedLead?.id === leadId) {
      setSelectedLead(updated.find(l => l.id === leadId) || null);
    }
  }, [leads, selectedLead]);

  const updateLead = useCallback((leadId: string, updates: Partial<KanbanLead>) => {
    const updated = leads.map(lead => 
      lead.id === leadId ? { ...lead, ...updates } : lead
    );
    saveLeads(updated);
    if (selectedLead?.id === leadId) {
      setSelectedLead(updated.find(l => l.id === leadId) || null);
    }
  }, [leads, selectedLead]);

  const addTag = useCallback((leadId: string, tagName: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead && !lead.tags.includes(tagName)) {
      updateLead(leadId, { tags: [...lead.tags, tagName] });
    }
  }, [leads, updateLead]);

  const removeTag = useCallback((leadId: string, tagName: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      updateLead(leadId, { tags: lead.tags.filter(t => t !== tagName) });
    }
  }, [leads, updateLead]);

  const addCourse = useCallback((leadId: string, courseName: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead && !lead.courses.includes(courseName)) {
      updateLead(leadId, { courses: [...lead.courses, courseName] });
    }
  }, [leads, updateLead]);

  const removeCourse = useCallback((leadId: string, courseName: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      updateLead(leadId, { courses: lead.courses.filter(c => c !== courseName) });
    }
  }, [leads, updateLead]);

  const deleteLead = useCallback((leadId: string) => {
    saveLeads(leads.filter(l => l.id !== leadId));
    if (selectedLead?.id === leadId) {
      setSelectedLead(null);
    }
  }, [leads, selectedLead]);

  const addLead = useCallback((lead: Omit<KanbanLead, 'id' | 'createdAt' | 'history' | 'stage' | 'tags' | 'courses'>) => {
    const newLead: KanbanLead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      stage: 'novos',
      tags: [],
      courses: [],
      history: [{
        id: '1',
        type: 'grupo_entrada',
        description: 'Lead adicionado',
        date: new Date().toISOString(),
      }],
    };
    saveLeads([newLead, ...leads]);
    return newLead;
  }, [leads]);

  const getLeadsByStage = useCallback((stage: FunnelStage) => {
    return leads.filter(lead => lead.stage === stage);
  }, [leads]);

  return {
    leads,
    selectedLead,
    setSelectedLead,
    moveToStage,
    updateLead,
    addTag,
    removeTag,
    addCourse,
    removeCourse,
    deleteLead,
    addLead,
    getLeadsByStage,
  };
};
