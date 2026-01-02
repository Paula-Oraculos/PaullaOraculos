import { motion } from 'framer-motion';
import { Phone, X, MessageSquare } from 'lucide-react';
import { useDashTheme } from '@/hooks/useDashTheme';
import { useTags } from '@/hooks/useTags';
import type { KanbanLead } from '@/hooks/useKanbanLeads';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface KanbanLeadCardProps {
  lead: KanbanLead;
  onClick: () => void;
}

export const KanbanLeadCard = ({ lead, onClick }: KanbanLeadCardProps) => {
  const { colors } = useDashTheme();
  const { tags: allTags } = useTags();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const nivelColors = { 
    frio: { bg: '#3B82F620', text: '#60A5FA' }, 
    morno: { bg: '#F59E0B20', text: '#FBBF24' }, 
    quente: { bg: '#EF444420', text: '#F87171' } 
  };

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return `https://wa.me/${digits}`;
  };

  const getTagColor = (tagName: string) => {
    const tag = allTags.find(t => t.name === tagName);
    return tag?.color || colors.accent;
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onClick}
      className="rounded-lg p-3 cursor-pointer hover:scale-[1.02] transition-transform"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="rounded-lg p-3"
        style={{ 
          background: colors.cardHover, 
          border: `1px solid ${colors.border}`,
          boxShadow: isDragging ? `0 8px 32px ${colors.accent}40` : 'none'
        }}
      >
        <div className="flex items-start gap-3">
          <img 
            src={lead.photo || `https://ui-avatars.com/api/?name=${lead.name}&background=${colors.accent.slice(1)}&color=fff`}
            alt={lead.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            style={{ border: `2px solid ${colors.accent}` }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate text-sm" style={{ color: colors.text }}>
              {lead.name}
            </p>
            <a 
              href={formatPhone(lead.phone)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs flex items-center gap-1 hover:underline mt-0.5"
              style={{ color: '#25D366' }}
            >
              <Phone className="w-3 h-3" />
              WhatsApp
            </a>
          </div>
          <span 
            className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
            style={{ 
              background: nivelColors[lead.nivelConsciencia].bg,
              color: nivelColors[lead.nivelConsciencia].text
            }}
          >
            {lead.nivelConsciencia}
          </span>
        </div>

        {lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {lead.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="text-[9px] px-1.5 py-0.5 rounded-full"
                style={{ 
                  background: `${getTagColor(tag)}20`,
                  color: getTagColor(tag)
                }}
              >
                {tag}
              </span>
            ))}
            {lead.tags.length > 3 && (
              <span 
                className="text-[9px] px-1.5 py-0.5 rounded-full"
                style={{ color: colors.textSecondary }}
              >
                +{lead.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {lead.notas && (
          <div className="flex items-center gap-1 mt-2" style={{ color: colors.textSecondary }}>
            <MessageSquare className="w-3 h-3" />
            <p className="text-[10px] truncate">{lead.notas}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
