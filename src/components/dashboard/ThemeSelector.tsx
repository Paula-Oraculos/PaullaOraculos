import { Palette } from 'lucide-react';
import { useDashTheme, type DashTheme } from '@/hooks/useDashTheme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const ThemeSelector = () => {
  const { theme, setTheme, colors, allThemes, themeNames, themes } = useDashTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 gap-2 text-sm"
          style={{ color: colors.textSecondary }}
        >
          <div
            className="w-4 h-4 rounded-full border-2"
            style={{ 
              backgroundColor: colors.accent,
              borderColor: colors.accent 
            }}
          />
          <Palette className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 p-2"
        style={{ 
          background: colors.card, 
          borderColor: colors.border,
          border: `1px solid ${colors.border}`
        }}
      >
        {allThemes.map((t) => (
          <DropdownMenuItem
            key={t}
            onClick={() => setTheme(t)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors"
            style={{
              background: theme === t ? `${themes[t].accent}15` : 'transparent',
              color: themes[t].text,
            }}
          >
            <div 
              className="w-5 h-5 rounded-full border-2 shadow-sm"
              style={{ 
                backgroundColor: themes[t].accent,
                borderColor: theme === t ? themes[t].text : themes[t].accent 
              }}
            />
            <span className="text-sm font-medium">{themeNames[t]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
