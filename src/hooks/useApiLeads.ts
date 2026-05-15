import { useState, useEffect, useCallback } from 'react';
import { KanbanLead, FunnelStage, FUNNEL_STAGES } from './useKanbanLeads';

const API_URL = 'https://bk.paulaoraculos.com.br';
const STORAGE_KEY = 'paula-kanban-stages';

interface ApiLead {
  id: number;
  nome: string;
  whatsapp: string;
  status: string;
  origem: string;
  pais: string;
  do_brasil: string;
  tag: string | null;
  hora_periodo: string | null;
  dia_semana: string | null;
  created_at: string;
  updated_at: string;
  tipo_lead: string;
  courses: string[];
  kanban_stage: string | null;
}

interface LeadStats {
  total: number;
  novos: number;
  reengajamento: number;
  hoje: number;
  brasil: number;
}

const mapApiLeadToKanban = (lead: ApiLead, stageMap: Record<string, FunnelStage>): KanbanLead => ({
  id: String(lead.id),
  name: lead.nome || 'Sem nome',
  phone: lead.whatsapp || '',
  // Prioridade: localStorage (movimentos manuais) > banco (movimentos automáticos via Greenn) > padrão
  stage: stageMap[String(lead.id)] || (lead.kanban_stage as FunnelStage) || (lead.tipo_lead === 'reengajamento' ? 'engajados' : 'novos'),
  tags: lead.tag ? [lead.tag] : [],
  courses: Array.isArray(lead.courses) ? lead.courses : [],
  notas: '',
  nivelConsciencia: 'frio',
  createdAt: lead.created_at,
  history: [
    {
      id: '1',
      type: 'grupo_entrada',
      description: lead.tipo_lead === 'reengajamento' ? 'Lead re-engajado' : 'Novo lead captado',
      date: lead.created_at,
    }
  ],
});

const getStageMap = (): Record<string, FunnelStage> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

const saveStageMap = (map: Record<string, FunnelStage>) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
};

export const useApiLeads = () => {
  const [leads, setLeads] = useState<KanbanLead[]>([]);
  const [stats, setStats] = useState<LeadStats>({ total: 0, novos: 0, reengajamento: 0, hoje: 0, brasil: 0 });
  const [selectedLead, setSelectedLead] = useState<KanbanLead | null>(null);
  const [loading, setLoading] = useState(true);
  const [stageMap, setStageMap] = useState<Record<string, FunnelStage>>(getStageMap);

  const fetchLeads = useCallback(async () => {
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/leads?limit=500`),
        fetch(`${API_URL}/leads/stats`),
      ]);
      const { leads: apiLeads } = await leadsRes.json();
      const statsData = await statsRes.json();
      setLeads(apiLeads.map((l: ApiLead) => mapApiLeadToKanban(l, stageMap)));
      setStats(statsData);
    } catch (err) {
      console.error('Erro ao buscar leads:', err);
    } finally {
      setLoading(false);
    }
  }, [stageMap]);

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  const moveToStage = useCallback((leadId: string, newStage: FunnelStage) => {
    const newMap = { ...stageMap, [leadId]: newStage };
    setStageMap(newMap);
    saveStageMap(newMap);
    setLeads(prev => prev.map(l => l.id === leadId ? {
      ...l,
      stage: newStage,
      history: [{
        id: Date.now().toString(),
        type: 'mensagem',
        description: `Movido para ${FUNNEL_STAGES.find(s => s.id === newStage)?.label}`,
        date: new Date().toISOString(),
      }, ...l.history]
    } : l));
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, stage: newStage } : null);
    }
  }, [stageMap, selectedLead]);

  const updateLead = useCallback((leadId: string, updates: Partial<KanbanLead>) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, ...updates } : l));
    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedLead]);

  const deleteLead = useCallback(async (leadId: string) => {
    try {
      await fetch(`${API_URL}/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Arquivado' }),
      });
    } catch {}
    setLeads(prev => prev.filter(l => l.id !== leadId));
    if (selectedLead?.id === leadId) setSelectedLead(null);
  }, [selectedLead]);

  const addTag = useCallback((leadId: string, tagName: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead && !lead.tags.includes(tagName)) updateLead(leadId, { tags: [...lead.tags, tagName] });
  }, [leads, updateLead]);

  const removeTag = useCallback((leadId: string, tagName: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) updateLead(leadId, { tags: lead.tags.filter(t => t !== tagName) });
  }, [leads, updateLead]);

  const addCourse = useCallback(async (leadId: string, courseName: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead || lead.courses.includes(courseName)) return;
    const newCourses = [...lead.courses, courseName];
    updateLead(leadId, { courses: newCourses });
    try {
      await fetch(`${API_URL}/leads/${leadId}/courses`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', course: courseName }),
      });
    } catch {}
  }, [leads, updateLead]);

  const removeCourse = useCallback(async (leadId: string, courseName: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    updateLead(leadId, { courses: lead.courses.filter(c => c !== courseName) });
    try {
      await fetch(`${API_URL}/leads/${leadId}/courses`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove', course: courseName }),
      });
    } catch {}
  }, [leads, updateLead]);

  const getLeadsByStage = useCallback((stage: FunnelStage) => {
    return leads.filter(l => l.stage === stage);
  }, [leads]);

  return {
    leads, stats, selectedLead, setSelectedLead, loading,
    moveToStage, updateLead, deleteLead,
    addTag, removeTag, addCourse, removeCourse,
    getLeadsByStage, refetch: fetchLeads,
  };
};
