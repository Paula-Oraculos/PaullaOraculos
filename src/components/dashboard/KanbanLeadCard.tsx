import { motion } from 'framer-motion';
import { MessageCircle, Flame, Snowflake, Sun } from 'lucide-react';
import { useTags } from '@/hooks/useTags';
import type { KanbanLead } from '@/hooks/useKanbanLeads';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface KanbanLeadCardProps {
  lead: KanbanLead;
  onClick: () => void;
}

const NivelIcon = ({ nivel }: { nivel: string }) => {
  if (nivel === 'quente') return <Flame className="w-3 h-3" style={{ color: '#f87171' }} />;
  if (nivel === 'morno') return <Sun className="w-3 h-3" style={{ color: '#fbbf24' }} />;
  return <Snowflake className="w-3 h-3" style={{ color: '#60a5fa' }} />;
};

export const KanbanLeadCard = ({ lead, onClick }: KanbanLeadCardProps) => {
  const { tags: allTags } = useTags();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const getTagColor = (tagName: string) => {
    const tag = allTags.find(t => t.name === tagName);
    return tag?.color || '#a78bfa';
  };

  const initials = lead.name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const avatarColors = ['#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];
  const avatarColor = avatarColors[lead.name.charCodeAt(0) % avatarColors.length];

  const timeAgo = (() => {
    try {
      return formatDistanceToNow(new Date(lead.createdAt), { locale: ptBR, addSuffix: true });
    } catch {
      return '';
    }
  })();

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onClick}
      whileHover={{ y: -1, scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
    >
      <div
        className="rounded-xl p-3 transition-all duration-200"
        style={{
          background: isDragging
            ? 'rgba(124,58,237,0.15)'
            : 'rgba(255,255,255,0.04)',
          border: isDragging
            ? '1px solid rgba(124,58,237,0.5)'
            : '1px solid rgba(255,255,255,0.07)',
          boxShadow: isDragging ? '0 16px 40px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Top row */}
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: `${avatarColor}22`, color: avatarColor, border: `1px solid ${avatarColor}33` }}
          >
            {initials}
          </div>

          {/* Name + time */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate leading-tight" style={{ color: '#e2e8f0' }}>
              {lead.name}
            </p>
            {timeAgo && (
              <p className="text-[10px] leading-tight mt-0.5" style={{ color: '#334155' }}>
                {timeAgo}
              </p>
            )}
          </div>

          {/* Temp indicator */}
          <NivelIcon nivel={lead.nivelConsciencia} />
        </div>

        {/* Tags */}
        {lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {lead.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded-md font-medium"
                style={{
                  background: `${getTagColor(tag)}15`,
                  color: getTagColor(tag),
                  border: `1px solid ${getTagColor(tag)}25`,
                }}
              >
                {tag}
              </span>
            ))}
            {lead.tags.length > 2 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md" style={{ color: '#334155', background: 'rgba(255,255,255,0.04)' }}>
                +{lead.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Note preview */}
        {lead.notas && (
          <div className="flex items-center gap-1.5 mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <MessageCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#334155' }} />
            <p className="text-[10px] truncate" style={{ color: '#475569' }}>{lead.notas}</p>
          </div>
        )}

        {/* WhatsApp link */}
        <div className="mt-2">
          <a
            href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] font-medium hover:underline"
            style={{ color: '#4ade80' }}
          >
            {lead.phone || 'Sem número'}
          </a>
        </div>
      </div>
    </motion.div>
  );
};
