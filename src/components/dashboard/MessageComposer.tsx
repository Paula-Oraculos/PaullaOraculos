import { useState } from 'react';
import { Send, Clock, Users, User, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useDashTheme } from '@/hooks/useDashTheme';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface MessageComposerProps {
  onSend: (content: string, mode: 'individual' | 'group' | 'scheduled', scheduledTime?: string) => void;
  disabled?: boolean;
}

const EMOJI_LIST = ['😊', '❤️', '🙏', '✨', '🌟', '🔮', '🌙', '💫', '🦋', '🌸', '💜', '🧿', '🕯️', '📿', '🌈', '💖', '🙌', '🤗', '💪', '🎯'];

const VARIABLES = ['{nome}', '{signo}', '{telefone}'];

export const MessageComposer = ({ onSend, disabled }: MessageComposerProps) => {
  const { colors } = useDashTheme();
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<'individual' | 'group' | 'scheduled'>('individual');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleSend = () => {
    if (!content.trim()) return;
    onSend(content, mode, mode === 'scheduled' ? scheduledTime : undefined);
    setContent('');
    setScheduledTime('');
  };

  const insertEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
  };

  const insertVariable = (variable: string) => {
    setContent(prev => prev + variable);
  };

  // Simple markdown preview
  const renderPreview = () => {
    let preview = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~(.*?)~/g, '<del>$1</del>')
      .replace(/\n/g, '<br/>');
    
    // Highlight variables
    VARIABLES.forEach(v => {
      preview = preview.replace(new RegExp(v.replace(/[{}]/g, '\\$&'), 'g'), 
        `<span style="color: ${colors.accent}; background: ${colors.accent}20; padding: 0 4px; border-radius: 2px;">${v}</span>`);
    });
    
    return preview;
  };

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <div className="flex gap-2">
        {[
          { value: 'individual', icon: User, label: 'Individual' },
          { value: 'group', icon: Users, label: 'Grupo' },
          { value: 'scheduled', icon: Clock, label: 'Agendar' }
        ].map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setMode(value as typeof mode)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm"
            style={{
              background: mode === value ? `${colors.accent}20` : colors.card,
              border: `1px solid ${mode === value ? colors.accent : colors.border}`,
              color: mode === value ? colors.accent : colors.textSecondary
            }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Scheduled Time */}
      {mode === 'scheduled' && (
        <Input
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          className="max-w-xs"
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
            color: colors.text
          }}
        />
      )}

      {/* Composer Area */}
      <div 
        className="rounded-xl p-4 space-y-3"
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`
        }}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8"
                style={{ color: colors.textSecondary }}
              >
                <Smile className="w-4 h-4 mr-1" />
                Emoji
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-2"
              style={{ background: colors.background, border: `1px solid ${colors.border}` }}
            >
              <div className="grid grid-cols-5 gap-1">
                {EMOJI_LIST.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => insertEmoji(emoji)}
                    className="p-2 hover:bg-white/10 rounded text-xl transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="h-4 w-px bg-white/20" />

          {VARIABLES.map(variable => (
            <button
              key={variable}
              onClick={() => insertVariable(variable)}
              className="px-2 py-1 text-xs rounded transition-colors hover:bg-white/10"
              style={{ 
                color: colors.accent,
                background: `${colors.accent}10`
              }}
            >
              {variable}
            </button>
          ))}
        </div>

        {/* Text Area */}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite sua mensagem... Use **negrito**, *itálico*, ~riscado~"
          className="min-h-[120px] resize-none"
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.text
          }}
        />

        {/* Preview */}
        {content && (
          <div 
            className="rounded-lg p-3 text-sm"
            style={{ 
              background: '#075E54',
              color: '#E9EDEF'
            }}
          >
            <p className="text-[10px] uppercase tracking-wide mb-1 opacity-60">Preview WhatsApp</p>
            <div dangerouslySetInnerHTML={{ __html: renderPreview() }} />
          </div>
        )}

        {/* Send Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSend}
            disabled={disabled || !content.trim() || (mode === 'scheduled' && !scheduledTime)}
            className="gap-2"
            style={{
              background: disabled ? colors.border : colors.accent,
              color: '#000'
            }}
          >
            <Send className="w-4 h-4" />
            {mode === 'scheduled' ? 'Agendar' : 'Enviar'}
          </Button>
        </div>
      </div>
    </div>
  );
};
