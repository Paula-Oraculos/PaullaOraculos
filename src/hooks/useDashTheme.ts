import { useState, useEffect, useCallback } from 'react';

export type DashTheme = 'obsidian-gold' | 'copper-mystic' | 'olive-sacred';

export interface ThemeColors {
  background: string;
  card: string;
  cardHover: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentSecondary: string;
  success: string;
  error: string;
  border: string;
  chartGradientStart: string;
  chartGradientEnd: string;
}

const themes: Record<DashTheme, ThemeColors> = {
  'obsidian-gold': {
    background: '#0B0E11',
    card: '#12161C',
    cardHover: '#1A1F26',
    text: '#E6E6E6',
    textSecondary: '#9AA0A6',
    accent: '#C9A24D',
    accentSecondary: '#A8892F',
    success: '#2E7D32',
    error: '#8E2A2A',
    border: 'rgba(201, 162, 77, 0.15)',
    chartGradientStart: '#C9A24D',
    chartGradientEnd: '#12161C',
  },
  'copper-mystic': {
    background: '#0C0C0C',
    card: '#151515',
    cardHover: '#1C1C1C',
    text: '#F5F5F4',
    textSecondary: '#A8A29E',
    accent: '#B87333',
    accentSecondary: '#8B5A2B',
    success: '#3D7A4A',
    error: '#8B3A3A',
    border: 'rgba(184, 115, 51, 0.15)',
    chartGradientStart: '#B87333',
    chartGradientEnd: '#151515',
  },
  'olive-sacred': {
    background: '#0E0E0E',
    card: '#1A1A1A',
    cardHover: '#222222',
    text: '#EDEDED',
    textSecondary: '#B0B0B0',
    accent: '#8A9A5B',
    accentSecondary: '#D6CFC4',
    success: '#6B8E23',
    error: '#8B4513',
    border: 'rgba(138, 154, 91, 0.15)',
    chartGradientStart: '#8A9A5B',
    chartGradientEnd: '#1A1A1A',
  },
};

const themeNames: Record<DashTheme, string> = {
  'obsidian-gold': 'Obsidian Gold',
  'copper-mystic': 'Copper Mystic',
  'olive-sacred': 'Olive Sacred',
};

const STORAGE_KEY = 'paula-dash-theme';

export const useDashTheme = () => {
  const [theme, setThemeState] = useState<DashTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in themes) return saved as DashTheme;
    }
    return 'obsidian-gold';
  });

  const colors = themes[theme];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Apply theme to CSS variables for dashboard only
    const root = document.documentElement;
    root.style.setProperty('--dash-bg', colors.background);
    root.style.setProperty('--dash-card', colors.card);
    root.style.setProperty('--dash-card-hover', colors.cardHover);
    root.style.setProperty('--dash-text', colors.text);
    root.style.setProperty('--dash-text-secondary', colors.textSecondary);
    root.style.setProperty('--dash-accent', colors.accent);
    root.style.setProperty('--dash-accent-secondary', colors.accentSecondary);
    root.style.setProperty('--dash-success', colors.success);
    root.style.setProperty('--dash-error', colors.error);
    root.style.setProperty('--dash-border', colors.border);
    root.style.setProperty('--dash-chart-start', colors.chartGradientStart);
    root.style.setProperty('--dash-chart-end', colors.chartGradientEnd);
  }, [theme, colors]);

  const setTheme = useCallback((newTheme: DashTheme) => {
    setThemeState(newTheme);
  }, []);

  return {
    theme,
    setTheme,
    colors,
    themes,
    themeNames,
    allThemes: Object.keys(themes) as DashTheme[],
  };
};
