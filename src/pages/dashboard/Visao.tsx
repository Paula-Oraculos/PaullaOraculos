import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Webhook, Network, BarChart3, Plus, Trash2, Copy, CheckCircle, XCircle, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useIntegrations } from '@/hooks/useIntegrations';
import { useToast } from '@/hooks/use-toast';

export const Visao = () => {
  const { webhooks, pixels, addWebhook, updateWebhook, deleteWebhook, testWebhook, updatePixel } = useIntegrations();
  const { toast } = useToast();
  const [newWebhook, setNewWebhook] = useState({ name: '', url: '', tag: '' });
  const [showAddWebhook, setShowAddWebhook] = useState(false);

  const handleAddWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) return;
    addWebhook({ ...newWebhook, isActive: true });
    setNewWebhook({ name: '', url: '', tag: '' });
    setShowAddWebhook(false);
    toast({ title: 'Webhook adicionado!' });
  };

  const handleTestWebhook = async (id: string) => {
    const result = await testWebhook(id);
    toast({ title: result.success ? 'Teste enviado!' : 'Erro no teste', variant: result.success ? 'default' : 'destructive' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copiado!' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Eye className="w-6 h-6 text-[#D4AF37]" />
        <h1 className="text-2xl font-serif text-white">Visão - Integrações</h1>
      </div>

      {/* Webhooks */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl p-5" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Webhook className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-medium text-white">Webhooks</h2>
          </div>
          <Button size="sm" onClick={() => setShowAddWebhook(!showAddWebhook)} style={{ background: '#043927', color: '#D4AF37' }}>
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </Button>
        </div>

        {showAddWebhook && (
          <div className="mb-4 p-4 rounded-lg bg-black/20 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder="Nome" value={newWebhook.name} onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })} className="bg-[#121212] border-gray-700 text-white" />
              <Input placeholder="URL" value={newWebhook.url} onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })} className="bg-[#121212] border-gray-700 text-white" />
              <Input placeholder="Tag" value={newWebhook.tag} onChange={(e) => setNewWebhook({ ...newWebhook, tag: e.target.value })} className="bg-[#121212] border-gray-700 text-white" />
            </div>
            <Button onClick={handleAddWebhook} className="w-full" style={{ background: '#D4AF37', color: '#121212' }}>Salvar</Button>
          </div>
        )}

        <div className="space-y-3">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="flex items-center gap-3 p-3 rounded-lg bg-black/20">
              <Switch checked={webhook.isActive} onCheckedChange={(checked) => updateWebhook(webhook.id, { isActive: checked })} />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{webhook.name}</p>
                <p className="text-gray-500 text-xs truncate">{webhook.url}</p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded bg-[#043927]/50 text-[#D4AF37]">{webhook.tag}</span>
              <button onClick={() => copyToClipboard(webhook.url)} className="p-2 text-gray-500 hover:text-white"><Copy className="w-4 h-4" /></button>
              <button onClick={() => handleTestWebhook(webhook.id)} className="p-2 text-gray-500 hover:text-green-400"><TestTube className="w-4 h-4" /></button>
              <button onClick={() => deleteWebhook(webhook.id)} className="p-2 text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Pixels */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl p-5" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-lg font-medium text-white">Pixels & Tags</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pixels.map((pixel) => (
            <div key={pixel.id} className="p-4 rounded-lg bg-black/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{pixel.name}</span>
                <Switch checked={pixel.isActive} onCheckedChange={(checked) => updatePixel(pixel.id, { isActive: checked })} />
              </div>
              <Input placeholder={pixel.platform === 'gtm' ? 'GTM-XXXXXX' : pixel.platform === 'google_analytics' ? 'G-XXXXXXXXXX' : 'Pixel ID'} value={pixel.pixelId} onChange={(e) => updatePixel(pixel.id, { pixelId: e.target.value })} className="bg-[#121212] border-gray-700 text-white text-sm" />
              <div className="flex items-center gap-2">
                {pixel.isActive && pixel.pixelId ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-gray-600" />}
                <span className="text-xs text-gray-500">{pixel.isActive && pixel.pixelId ? 'Ativo' : 'Inativo'}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
