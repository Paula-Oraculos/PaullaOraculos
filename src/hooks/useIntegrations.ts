import { useState, useEffect, useCallback } from 'react';

export interface Webhook {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  tag: string;
  lastTested?: string;
}

export interface MCP {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  notes?: string;
  lastSync?: string;
}

export interface PixelConfig {
  id: string;
  name: string;
  platform: 'google_analytics' | 'meta_pixel' | 'tiktok_pixel' | 'gtm';
  pixelId: string;
  isActive: boolean;
}

interface IntegrationsState {
  webhooks: Webhook[];
  mcps: MCP[];
  pixels: PixelConfig[];
}

const STORAGE_KEY = 'dash_integrations';

const DEFAULT_PIXELS: PixelConfig[] = [
  { id: 'ga', name: 'Google Analytics', platform: 'google_analytics', pixelId: '', isActive: false },
  { id: 'meta', name: 'Meta Pixel', platform: 'meta_pixel', pixelId: '', isActive: false },
  { id: 'tiktok', name: 'TikTok Pixel', platform: 'tiktok_pixel', pixelId: '', isActive: false },
  { id: 'gtm', name: 'Google Tag Manager', platform: 'gtm', pixelId: '', isActive: false },
];

const DEFAULT_WEBHOOKS: Webhook[] = [
  {
    id: '1',
    name: 'N8N Principal',
    url: 'https://paulaoraculos-n8n.cloudfy.live/webhook/paulaoraculos',
    isActive: true,
    tag: 'leads',
  },
];

export const useIntegrations = () => {
  const [state, setState] = useState<IntegrationsState>({
    webhooks: DEFAULT_WEBHOOKS,
    mcps: [],
    pixels: DEFAULT_PIXELS,
  });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as IntegrationsState;
        setState({
          webhooks: parsed.webhooks || DEFAULT_WEBHOOKS,
          mcps: parsed.mcps || [],
          pixels: parsed.pixels || DEFAULT_PIXELS,
        });
      } catch {
        // Use defaults
      }
    }
  }, []);

  // Save to localStorage
  const saveState = useCallback((newState: IntegrationsState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
  }, []);

  // Webhook operations
  const addWebhook = useCallback((webhook: Omit<Webhook, 'id'>) => {
    const newWebhook: Webhook = { ...webhook, id: Date.now().toString() };
    saveState({ ...state, webhooks: [...state.webhooks, newWebhook] });
    return newWebhook;
  }, [state, saveState]);

  const updateWebhook = useCallback((id: string, updates: Partial<Webhook>) => {
    saveState({
      ...state,
      webhooks: state.webhooks.map(w => w.id === id ? { ...w, ...updates } : w),
    });
  }, [state, saveState]);

  const deleteWebhook = useCallback((id: string) => {
    saveState({
      ...state,
      webhooks: state.webhooks.filter(w => w.id !== id),
    });
  }, [state, saveState]);

  const testWebhook = useCallback(async (id: string) => {
    const webhook = state.webhooks.find(w => w.id === id);
    if (!webhook) return { success: false, error: 'Webhook não encontrado' };

    try {
      await fetch(webhook.url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          message: 'Teste de conexão do Dashboard Paula Oráculos',
        }),
      });
      
      updateWebhook(id, { lastTested: new Date().toISOString() });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao testar webhook' };
    }
  }, [state.webhooks, updateWebhook]);

  // MCP operations
  const addMCP = useCallback((mcp: Omit<MCP, 'id'>) => {
    const newMCP: MCP = { ...mcp, id: Date.now().toString() };
    saveState({ ...state, mcps: [...state.mcps, newMCP] });
    return newMCP;
  }, [state, saveState]);

  const updateMCP = useCallback((id: string, updates: Partial<MCP>) => {
    saveState({
      ...state,
      mcps: state.mcps.map(m => m.id === id ? { ...m, ...updates } : m),
    });
  }, [state, saveState]);

  const deleteMCP = useCallback((id: string) => {
    saveState({
      ...state,
      mcps: state.mcps.filter(m => m.id !== id),
    });
  }, [state, saveState]);

  // Pixel operations
  const updatePixel = useCallback((id: string, updates: Partial<PixelConfig>) => {
    saveState({
      ...state,
      pixels: state.pixels.map(p => p.id === id ? { ...p, ...updates } : p),
    });
  }, [state, saveState]);

  return {
    webhooks: state.webhooks,
    mcps: state.mcps,
    pixels: state.pixels,
    addWebhook,
    updateWebhook,
    deleteWebhook,
    testWebhook,
    addMCP,
    updateMCP,
    deleteMCP,
    updatePixel,
  };
};
