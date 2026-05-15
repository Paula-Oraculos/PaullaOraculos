import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Users, Search, X, Trash2, Plus,
  RefreshCw, TrendingUp, Star, Globe,
  CalendarDays, Tag, BookOpen, StickyNote, Clock,
  Inbox, Flame, MessageCircle, CheckCircle2, XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { FUNNEL_STAGES, type KanbanLead, type FunnelStage } from '@/hooks/useKanbanLeads';
import { useApiLeads } from '@/hooks/useApiLeads';
import { useTags } from '@/hooks/useTags';
import { KanbanLeadCard } from '@/components/dashboard/KanbanLeadCard';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DroppableColumn = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className="flex-1 p-2 overflow-y-auto space-y-2 min-h-[200px] transition-colors duration-150"
      style={{
        background: isOver ? 'rgba(167,139,250,0.06)' : 'transparent',
        borderRadius: '8px',
      }}
    >
      {children}
    </div>
  );
};

const STAT_CARDS = [
  { key: 'total', label: 'Total de Leads', icon: Users, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
  { key: 'hoje', label: 'Hoje', icon: TrendingUp, color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
  { key: 'novos', label: 'Novos', icon: Star, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
  { key: 'brasil', label: 'Do Brasil', icon: Globe, color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
];

export const OraculoCRM = () => {
  const {
    leads, stats, selectedLead, setSelectedLead, loading,
    moveToStage, updateLead, deleteLead,
    addTag, removeTag, addCourse, removeCourse, refetch,
  } = useApiLeads();
  const { tags, addTag: addTagToLibrary, updateTag: updateTagInLibrary, deleteTag: deleteTagFromLibrary } = useTags();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newCourse, setNewCourse] = useState('');
  const [showTagManager, setShowTagManager] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#a78bfa');
  const [editingTag, setEditingTag] = useState<{ id: string; name: string; color: string } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    // Dropped on a stage column (droppable or sortable context)
    const targetStage = FUNNEL_STAGES.find(s => s.id === (over.id as string));
    if (targetStage) {
      moveToStage(active.id as string, targetStage.id);
      return;
    }

    // Dropped on top of another card — move active to that card's stage
    const overLead = leads.find(l => l.id === (over.id as string));
    if (overLead) {
      const activeLead = leads.find(l => l.id === (active.id as string));
      if (activeLead && activeLead.stage !== overLead.stage) {
        moveToStage(active.id as string, overLead.stage);
      }
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

  return (
    <div className="h-full flex flex-col gap-4" style={{ color: '#e2e8f0' }}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)' }}>
            <Users className="w-5 h-5" style={{ color: '#a78bfa' }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: '#f1f5f9' }}>Oráculo CRM</h1>
            <p className="text-xs" style={{ color: '#64748b' }}>{leads.length} leads no funil</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#475569' }} />
            <Input
              placeholder="Buscar lead..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 w-56 text-sm border-0"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#e2e8f0' }}
            />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={refetch}
            className="h-9 w-9 p-0"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} style={{ color: '#64748b' }} />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STAT_CARDS.map(({ key, label, icon: Icon, color, bg }) => (
          <div
            key={key}
            className="rounded-xl p-3 flex items-center gap-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-bold leading-none" style={{ color }}>{(stats as any)[key] ?? 0}</p>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto pb-2">
          <div className="flex gap-3 h-full min-w-max">
            {FUNNEL_STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
              return (
                <div
                  key={stage.id}
                  className="w-64 flex-shrink-0 flex flex-col rounded-xl overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {/* Column Header */}
                  <div className="px-3 py-2.5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 flex items-center justify-center" style={{ color: stage.color }}>
                        {stage.id === 'novos' && <Inbox className="w-4 h-4" />}
                        {stage.id === 'engajados' && <Flame className="w-4 h-4" />}
                        {stage.id === 'negociacao' && <MessageCircle className="w-4 h-4" />}
                        {stage.id === 'convertidos' && <CheckCircle2 className="w-4 h-4" />}
                        {stage.id === 'perdidos' && <XCircle className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#cbd5e1' }}>{stage.label}</span>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${stage.color}18`, color: stage.color }}
                    >
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <SortableContext
                    items={stageLeads.map(l => l.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <DroppableColumn id={stage.id}>
                      <AnimatePresence mode="popLayout">
                        {stageLeads.map((lead) => (
                          <KanbanLeadCard
                            key={lead.id}
                            lead={lead}
                            onClick={() => setSelectedLead(lead)}
                          />
                        ))}
                      </AnimatePresence>
                      {stageLeads.length === 0 && (
                        <div
                          className="h-20 rounded-lg border border-dashed flex items-center justify-center text-xs"
                          style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#334155' }}
                        >
                          Arraste aqui
                        </div>
                      )}
                    </DroppableColumn>
                  </SortableContext>
                </div>
              );
            })}
          </div>
        </div>

        <DragOverlay>
          {activeLead && (
            <div
              className="rounded-xl p-3 shadow-2xl"
              style={{
                background: 'rgba(167,139,250,0.15)',
                border: '1px solid rgba(167,139,250,0.4)',
                transform: 'rotate(2deg)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(activeLead.name)}&background=7c3aed&color=fff&size=40`}
                  alt={activeLead.name}
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#f1f5f9' }}>{activeLead.name}</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>{activeLead.phone}</p>
                </div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Lead Detail Modal */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent
          className="max-w-lg w-full max-h-[85vh] p-0 overflow-hidden"
          style={{ background: '#0f0f17', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' }}
        >
          {selectedLead && (
            <div className="flex flex-col h-full max-h-[85vh]">
              {/* Modal Header */}
              <div className="p-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedLead.name)}&background=7c3aed&color=fff&size=64`}
                    alt={selectedLead.name}
                    className="w-14 h-14 rounded-full"
                    style={{ border: '2px solid rgba(167,139,250,0.4)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-base font-semibold truncate" style={{ color: '#f1f5f9' }}>
                      {selectedLead.name}
                    </DialogTitle>
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs mt-1 hover:underline w-fit"
                      style={{ color: '#4ade80' }}
                    >
                      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.528 5.838L.057 23.428a.5.5 0 00.609.609l5.684-1.485A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.24-1.375l-.374-.217-3.875 1.013 1.02-3.772-.232-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                      </svg>
                      {selectedLead.phone}
                    </a>
                    <p className="text-xs mt-1" style={{ color: '#475569' }}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      Cadastro: {format(new Date(selectedLead.createdAt), "dd 'de' MMM yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5 modal-scroll">

                {/* Campos editáveis */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Nome', field: 'name', type: 'text' },
                    { label: 'WhatsApp', field: 'phone', type: 'text' },
                    { label: 'Signo / Elemento', field: 'signoElemento', placeholder: 'Áries / Fogo', type: 'text' },
                    { label: 'TikTok', field: 'tiktokUsername', placeholder: '@usuario', type: 'text' },
                  ].map(({ label, field, placeholder, type }) => (
                    <div key={field}>
                      <label className="text-xs mb-1 block" style={{ color: '#475569' }}>{label}</label>
                      <Input
                        type={type}
                        value={(selectedLead as any)[field] || ''}
                        onChange={(e) => updateLead(selectedLead.id, { [field]: e.target.value })}
                        placeholder={placeholder}
                        className="h-8 text-sm border-0"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#e2e8f0' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Nível */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: '#475569' }}>Temperatura do Lead</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'frio', label: '❄️ Frio', color: '#60a5fa' },
                      { value: 'morno', label: '🌤️ Morno', color: '#fbbf24' },
                      { value: 'quente', label: '🔥 Quente', color: '#f87171' },
                    ].map(({ value, label, color }) => (
                      <button
                        key={value}
                        onClick={() => updateLead(selectedLead.id, { nivelConsciencia: value as any })}
                        className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background: selectedLead.nivelConsciencia === value ? `${color}25` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${selectedLead.nivelConsciencia === value ? color : 'rgba(255,255,255,0.08)'}`,
                          color: selectedLead.nivelConsciencia === value ? color : '#475569',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estágio */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: '#475569' }}>
                    <Tag className="w-3 h-3 inline mr-1" />
                    Estágio do Funil
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {FUNNEL_STAGES.map(stage => (
                      <button
                        key={stage.id}
                        onClick={() => moveToStage(selectedLead.id, stage.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background: selectedLead.stage === stage.id ? `${stage.color}25` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${selectedLead.stage === stage.id ? stage.color : 'rgba(255,255,255,0.08)'}`,
                          color: selectedLead.stage === stage.id ? stage.color : '#475569',
                        }}
                      >
                        {stage.icon} {stage.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs" style={{ color: '#475569' }}>
                      <Star className="w-3 h-3 inline mr-1" />
                      Tags
                    </label>
                    <button
                      onClick={() => { setShowTagManager(!showTagManager); setEditingTag(null); }}
                      className="text-xs px-2 py-0.5 rounded-md transition-colors"
                      style={{
                        color: showTagManager ? '#a78bfa' : '#475569',
                        background: showTagManager ? 'rgba(167,139,250,0.12)' : 'transparent',
                        border: `1px solid ${showTagManager ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      ⚙ Gerenciar
                    </button>
                  </div>

                  {/* Tags do lead */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selectedLead.tags.map(tag => {
                      const tagData = tags.find(t => t.name === tag);
                      return (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                          style={{ background: `${tagData?.color || '#a78bfa'}18`, color: tagData?.color || '#a78bfa', border: `1px solid ${tagData?.color || '#a78bfa'}30` }}
                        >
                          {tag}
                          <button onClick={() => removeTag(selectedLead.id, tag)}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>

                  {/* Adicionar tag ao lead */}
                  <Select value="" onValueChange={(v) => addTag(selectedLead.id, v)}>
                    <SelectTrigger className="h-8 text-xs border-0" style={{ background: 'rgba(255,255,255,0.05)', color: '#e2e8f0' }}>
                      <SelectValue placeholder="+ Adicionar tag ao lead" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.filter(t => !selectedLead.tags.includes(t.name)).map(tag => (
                        <SelectItem key={tag.id} value={tag.name}>
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: tag.color }} />
                            {tag.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Gerenciador de biblioteca de tags */}
                  {showTagManager && (
                    <div className="mt-3 p-3 rounded-xl space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-xs font-medium mb-1" style={{ color: '#64748b' }}>Biblioteca de Tags</p>

                      {tags.map(tag => (
                        editingTag?.id === tag.id ? (
                          <div key={tag.id} className="flex items-center gap-2">
                            <input
                              type="color"
                              value={editingTag.color}
                              onChange={(e) => setEditingTag({ ...editingTag, color: e.target.value })}
                              className="w-6 h-6 rounded cursor-pointer flex-shrink-0"
                              style={{ border: 'none', padding: 0, background: 'none' }}
                            />
                            <Input
                              value={editingTag.name}
                              onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                              className="h-7 text-xs border-0 flex-1"
                              style={{ background: 'rgba(255,255,255,0.08)', color: '#e2e8f0' }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') { updateTagInLibrary(tag.id, { name: editingTag.name, color: editingTag.color }); setEditingTag(null); }
                                if (e.key === 'Escape') setEditingTag(null);
                              }}
                            />
                            <button onClick={() => { updateTagInLibrary(tag.id, { name: editingTag.name, color: editingTag.color }); setEditingTag(null); }} style={{ color: '#22c55e', fontSize: '14px' }}>✓</button>
                            <button onClick={() => setEditingTag(null)} style={{ color: '#475569', fontSize: '12px' }}>✕</button>
                          </div>
                        ) : (
                          <div key={tag.id} className="flex items-center gap-2 group">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: tag.color }} />
                            <span className="text-xs flex-1" style={{ color: '#cbd5e1' }}>{tag.name}</span>
                            <button
                              onClick={() => setEditingTag({ id: tag.id, name: tag.name, color: tag.color })}
                              className="opacity-0 group-hover:opacity-100 text-xs transition-opacity"
                              style={{ color: '#94a3b8' }}
                            >✏</button>
                            <button
                              onClick={() => deleteTagFromLibrary(tag.id)}
                              className="opacity-0 group-hover:opacity-100 text-xs transition-opacity"
                              style={{ color: '#ef4444' }}
                            >🗑</button>
                          </div>
                        )
                      ))}

                      {/* Nova tag */}
                      <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <input
                          type="color"
                          value={newTagColor}
                          onChange={(e) => setNewTagColor(e.target.value)}
                          className="w-6 h-6 rounded cursor-pointer flex-shrink-0"
                          style={{ border: 'none', padding: 0, background: 'none' }}
                        />
                        <Input
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          placeholder="Nome da nova tag..."
                          className="h-7 text-xs border-0 flex-1"
                          style={{ background: 'rgba(255,255,255,0.08)', color: '#e2e8f0' }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newTagName.trim()) { addTagToLibrary(newTagName.trim(), newTagColor); setNewTagName(''); }
                          }}
                        />
                        <Button
                          size="sm"
                          className="h-7 w-7 p-0 flex-shrink-0"
                          style={{ background: 'rgba(167,139,250,0.2)', color: '#a78bfa' }}
                          onClick={() => { if (newTagName.trim()) { addTagToLibrary(newTagName.trim(), newTagColor); setNewTagName(''); } }}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cursos */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: '#475569' }}>
                    <BookOpen className="w-3 h-3 inline mr-1" />
                    Cursos / Produtos Associados
                  </label>

                  {selectedLead.courses.length === 0 && (
                    <p className="text-xs mb-2" style={{ color: '#334155' }}>Nenhum curso cadastrado ainda.</p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selectedLead.courses.map(course => (
                      <span
                        key={course}
                        className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                        style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}
                      >
                        {course}
                        <button
                          onClick={() => removeCourse(selectedLead.id, course)}
                          title="Remover curso"
                          style={{ color: '#a78bfa', opacity: 0.7 }}
                          className="hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 items-center">
                    <Input
                      value={newCourse}
                      onChange={(e) => setNewCourse(e.target.value)}
                      placeholder="Ex: Energia Blindada, Mentoria..."
                      className="h-8 text-xs border-0"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#e2e8f0' }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newCourse.trim()) { addCourse(selectedLead.id, newCourse.trim()); setNewCourse(''); }
                      }}
                    />
                    <Button
                      size="sm"
                      className="h-8 px-3 flex-shrink-0 text-xs font-medium"
                      style={{ background: 'rgba(167,139,250,0.2)', color: '#a78bfa' }}
                      onClick={() => { if (newCourse.trim()) { addCourse(selectedLead.id, newCourse.trim()); setNewCourse(''); } }}
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      Incluir
                    </Button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#334155' }}>Digite o nome e clique em Incluir (ou pressione Enter)</p>
                </div>

                {/* Notas */}
                <div>
                  <label className="text-xs mb-1 block" style={{ color: '#475569' }}>
                    <StickyNote className="w-3 h-3 inline mr-1" />
                    Anotações
                  </label>
                  <Textarea
                    value={selectedLead.notas || ''}
                    onChange={(e) => {
                      updateLead(selectedLead.id, { notas: e.target.value });
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    onFocus={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    placeholder="Observações sobre o lead..."
                    className="text-sm border-0 resize-none overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#e2e8f0', minHeight: '80px' }}
                  />
                </div>

                {/* Histórico */}
                {selectedLead.history.length > 0 && (
                  <div>
                    <label className="text-xs mb-2 block" style={{ color: '#475569' }}>
                      <CalendarDays className="w-3 h-3 inline mr-1" />
                      Histórico
                    </label>
                    <div className="space-y-2">
                      {selectedLead.history.map(item => (
                        <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#a78bfa' }} />
                          <div>
                            <p className="text-xs" style={{ color: '#cbd5e1' }}>{item.description}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#334155' }}>
                              {format(new Date(item.date), "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deletar */}
                <Button
                  variant="ghost"
                  className="w-full text-xs h-9"
                  style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.15)' }}
                  onClick={() => deleteLead(selectedLead.id)}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-2" />
                  Arquivar Lead
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
