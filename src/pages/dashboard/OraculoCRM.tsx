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
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Sparkles, Plus, Search, Filter, X, Phone, Calendar, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useKanbanLeads, FUNNEL_STAGES, type KanbanLead, type FunnelStage } from '@/hooks/useKanbanLeads';
import { useTags } from '@/hooks/useTags';
import { useDashTheme } from '@/hooks/useDashTheme';
import { KanbanLeadCard } from '@/components/dashboard/KanbanLeadCard';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const OraculoCRM = () => {
  const { 
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
    getLeadsByStage 
  } = useKanbanLeads();
  const { tags } = useTags();
  const { colors } = useDashTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');
  const [newCourse, setNewCourse] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const leadId = active.id as string;
    const overId = over.id as string;

    // Check if dropped on a column
    const targetStage = FUNNEL_STAGES.find(s => s.id === overId);
    if (targetStage) {
      moveToStage(leadId, targetStage.id);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

  const nivelColors = { 
    frio: { bg: '#3B82F620', text: '#60A5FA' }, 
    morno: { bg: '#F59E0B20', text: '#FBBF24' }, 
    quente: { bg: '#EF444420', text: '#F87171' } 
  };

  const formatPhone = (phone: string) => phone.replace(/\D/g, '');

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6" style={{ color: colors.accent }} />
          <h1 className="text-2xl font-serif" style={{ color: colors.text }}>Oráculo CRM</h1>
          <span 
            className="text-xs px-2 py-1 rounded-full"
            style={{ background: `${colors.accent}20`, color: colors.accent }}
          >
            {leads.length} leads
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.textSecondary }} />
          <Input
            placeholder="Buscar por nome ou telefone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full sm:w-64"
            style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
          />
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 h-full min-w-max pb-4">
            {FUNNEL_STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
              return (
                <div 
                  key={stage.id}
                  className="w-72 flex-shrink-0 rounded-xl flex flex-col"
                  style={{ background: colors.card, border: `1px solid ${colors.border}` }}
                >
                  {/* Column Header */}
                  <div 
                    className="p-3 border-b flex items-center justify-between"
                    style={{ borderColor: colors.border }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{stage.icon}</span>
                      <span className="font-medium text-sm" style={{ color: colors.text }}>
                        {stage.label}
                      </span>
                    </div>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${stage.color}20`, color: stage.color }}
                    >
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Column Content */}
                  <SortableContext 
                    items={stageLeads.map(l => l.id)} 
                    strategy={verticalListSortingStrategy}
                    id={stage.id}
                  >
                    <div 
                      className="flex-1 p-2 overflow-y-auto space-y-2 min-h-[200px]"
                      data-stage={stage.id}
                    >
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
                          className="h-24 rounded-lg border-2 border-dashed flex items-center justify-center text-sm"
                          style={{ borderColor: colors.border, color: colors.textSecondary }}
                        >
                          Arraste leads aqui
                        </div>
                      )}
                    </div>
                  </SortableContext>
                </div>
              );
            })}
          </div>
        </div>

        <DragOverlay>
          {activeLead && (
            <div 
              className="rounded-lg p-3 shadow-2xl"
              style={{ 
                background: colors.cardHover,
                border: `2px solid ${colors.accent}`,
                transform: 'rotate(3deg)',
              }}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={activeLead.photo || `https://ui-avatars.com/api/?name=${activeLead.name}`}
                  alt={activeLead.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p style={{ color: colors.text }}>{activeLead.name}</p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>{activeLead.phone}</p>
                </div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Lead Detail Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <SheetContent 
          className="w-full sm:max-w-lg overflow-y-auto"
          style={{ background: colors.background, borderColor: colors.border }}
        >
          {selectedLead && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedLead.photo || `https://ui-avatars.com/api/?name=${selectedLead.name}&background=${colors.accent.slice(1)}&color=fff`}
                    alt={selectedLead.name}
                    className="w-16 h-16 rounded-full object-cover"
                    style={{ border: `3px solid ${colors.accent}` }}
                  />
                  <div className="flex-1">
                    <SheetTitle style={{ color: colors.text }}>{selectedLead.name}</SheetTitle>
                    <a 
                      href={`https://wa.me/${formatPhone(selectedLead.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm hover:underline"
                      style={{ color: '#25D366' }}
                    >
                      <Phone className="w-4 h-4" />
                      {selectedLead.phone}
                    </a>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-6">
                {/* Editable Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>Nome</label>
                    <Input 
                      value={selectedLead.name}
                      onChange={(e) => updateLead(selectedLead.id, { name: e.target.value })}
                      style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>WhatsApp</label>
                    <Input 
                      value={selectedLead.phone}
                      onChange={(e) => updateLead(selectedLead.id, { phone: e.target.value })}
                      style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>Signo / Elemento</label>
                    <Input 
                      value={selectedLead.signoElemento || ''}
                      onChange={(e) => updateLead(selectedLead.id, { signoElemento: e.target.value })}
                      placeholder="Ex: Áries / Fogo"
                      style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>Nível</label>
                    <Select 
                      value={selectedLead.nivelConsciencia} 
                      onValueChange={(v: 'frio' | 'morno' | 'quente') => updateLead(selectedLead.id, { nivelConsciencia: v })}
                    >
                      <SelectTrigger style={{ background: colors.card, borderColor: colors.border, color: colors.text }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frio">❄️ Frio</SelectItem>
                        <SelectItem value="morno">🌤️ Morno</SelectItem>
                        <SelectItem value="quente">🔥 Quente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>TikTok</label>
                    <Input 
                      value={selectedLead.tiktokUsername || ''}
                      onChange={(e) => updateLead(selectedLead.id, { tiktokUsername: e.target.value })}
                      placeholder="@usuario"
                      style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>Data Nascimento</label>
                    <Input 
                      type="date"
                      value={selectedLead.dataNascimento || ''}
                      onChange={(e) => updateLead(selectedLead.id, { dataNascimento: e.target.value })}
                      style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
                    />
                  </div>
                </div>

                {/* Stage */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: colors.textSecondary }}>Estágio do Funil</label>
                  <div className="flex flex-wrap gap-2">
                    {FUNNEL_STAGES.map(stage => (
                      <button
                        key={stage.id}
                        onClick={() => moveToStage(selectedLead.id, stage.id)}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                        style={{ 
                          background: selectedLead.stage === stage.id ? stage.color : `${stage.color}20`,
                          color: selectedLead.stage === stage.id ? '#fff' : stage.color,
                        }}
                      >
                        {stage.icon} {stage.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: colors.textSecondary }}>Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedLead.tags.map(tag => {
                      const tagData = tags.find(t => t.name === tag);
                      return (
                        <span 
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                          style={{ background: `${tagData?.color || colors.accent}20`, color: tagData?.color || colors.accent }}
                        >
                          {tag}
                          <button onClick={() => removeTag(selectedLead.id, tag)}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <Select value="" onValueChange={(v) => { addTag(selectedLead.id, v); }}>
                      <SelectTrigger style={{ background: colors.card, borderColor: colors.border, color: colors.text }}>
                        <SelectValue placeholder="Adicionar tag..." />
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
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: colors.textSecondary }}>Cursos Associados</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedLead.courses.map(course => (
                      <span 
                        key={course}
                        className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                        style={{ background: `${colors.accent}20`, color: colors.accent }}
                      >
                        {course}
                        <button onClick={() => removeCourse(selectedLead.id, course)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newCourse}
                      onChange={(e) => setNewCourse(e.target.value)}
                      placeholder="Nome do curso..."
                      style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
                    />
                    <Button 
                      size="sm" 
                      onClick={() => { if (newCourse) { addCourse(selectedLead.id, newCourse); setNewCourse(''); } }}
                      style={{ background: colors.accent, color: colors.background }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs mb-1 block" style={{ color: colors.textSecondary }}>Anotações</label>
                  <Textarea 
                    value={selectedLead.notas || ''}
                    onChange={(e) => updateLead(selectedLead.id, { notas: e.target.value })}
                    placeholder="Observações sobre o lead..."
                    className="min-h-[100px]"
                    style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
                  />
                </div>

                {/* History */}
                <div>
                  <label className="text-xs mb-2 block" style={{ color: colors.textSecondary }}>Histórico</label>
                  <div className="space-y-2">
                    {selectedLead.history.map(item => (
                      <div 
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{ background: colors.card }}
                      >
                        <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: colors.accent }} />
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: colors.text }}>{item.description}</p>
                          <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                            {format(new Date(item.date), "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delete */}
                <Button 
                  variant="ghost" 
                  className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  onClick={() => { deleteLead(selectedLead.id); setSelectedLead(null); }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Lead
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
