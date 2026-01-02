import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Phone, User, Calendar, MessageSquare, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLeads, type Lead } from '@/hooks/useLeads';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const OraculoCRM = () => {
  const { leads, selectedLead, setSelectedLead, updateLead } = useLeads();
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setMobileShowDetail(true);
  };

  const nivelColors = { frio: 'bg-blue-500/20 text-blue-400', morno: 'bg-yellow-500/20 text-yellow-400', quente: 'bg-red-500/20 text-red-400' };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] flex flex-col md:flex-row gap-4">
      {/* Lead List */}
      <div className={`${mobileShowDetail ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 rounded-xl overflow-hidden`} style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-medium text-white">Oráculo CRM</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">{leads.length} leads</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {leads.map((lead) => (
            <button key={lead.id} onClick={() => handleSelectLead(lead)} className={`w-full p-4 flex items-center gap-3 border-b border-white/5 hover:bg-white/5 transition-colors text-left ${selectedLead?.id === lead.id ? 'bg-[#043927]/30' : ''}`}>
              <img src={lead.photo || `https://ui-avatars.com/api/?name=${lead.name}&background=043927&color=D4AF37`} alt={lead.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{lead.name}</p>
                <p className="text-gray-500 text-xs truncate">{lead.phone}</p>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full ${nivelColors[lead.nivelConsciencia]}`}>{lead.nivelConsciencia}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lead Detail */}
      <div className={`${!mobileShowDetail ? 'hidden md:flex' : 'flex'} flex-col flex-1 rounded-xl overflow-hidden`} style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
        {selectedLead ? (
          <>
            <div className="p-4 border-b border-white/5">
              <button onClick={() => setMobileShowDetail(false)} className="md:hidden flex items-center gap-2 text-gray-400 mb-3"><ArrowLeft className="w-4 h-4" /> Voltar</button>
              <div className="flex items-center gap-4">
                <img src={selectedLead.photo || `https://ui-avatars.com/api/?name=${selectedLead.name}&background=043927&color=D4AF37`} alt={selectedLead.name} className="w-16 h-16 rounded-full object-cover" style={{ border: '2px solid #D4AF37' }} />
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-white">{selectedLead.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedLead.phone}</p>
                </div>
                <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: '#25D366', color: 'white' }}>WhatsApp</a>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs text-gray-500">Signo / Elemento</label><Input value={selectedLead.signoElemento || ''} onChange={(e) => updateLead(selectedLead.id, { signoElemento: e.target.value })} className="mt-1 bg-black/20 border-gray-700 text-white" placeholder="Ex: Áries / Fogo" /></div>
                <div><label className="text-xs text-gray-500">Nível de Consciência</label><Select value={selectedLead.nivelConsciencia} onValueChange={(v) => updateLead(selectedLead.id, { nivelConsciencia: v as Lead['nivelConsciencia'] })}><SelectTrigger className="mt-1 bg-black/20 border-gray-700 text-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="frio">Frio</SelectItem><SelectItem value="morno">Morno</SelectItem><SelectItem value="quente">Quente</SelectItem></SelectContent></Select></div>
                <div><label className="text-xs text-gray-500">TikTok</label><Input value={selectedLead.tiktokUsername || ''} onChange={(e) => updateLead(selectedLead.id, { tiktokUsername: e.target.value })} className="mt-1 bg-black/20 border-gray-700 text-white" placeholder="@usuario" /></div>
                <div><label className="text-xs text-gray-500">Data de Nascimento</label><Input type="date" value={selectedLead.dataNascimento || ''} onChange={(e) => updateLead(selectedLead.id, { dataNascimento: e.target.value })} className="mt-1 bg-black/20 border-gray-700 text-white" /></div>
              </div>
              <div><label className="text-xs text-gray-500">Anotações da Paula</label><Textarea value={selectedLead.notas || ''} onChange={(e) => updateLead(selectedLead.id, { notas: e.target.value })} className="mt-1 bg-black/20 border-gray-700 text-white min-h-[100px]" placeholder="Adicione suas observações..." /></div>
              <div><label className="text-xs text-gray-500 mb-2 block">Histórico</label>
                <div className="space-y-2">{selectedLead.history.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-black/20">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5" />
                    <div><p className="text-white text-sm">{item.description}</p><p className="text-gray-600 text-xs">{format(new Date(item.date), "dd MMM yyyy 'às' HH:mm", { locale: ptBR })}</p></div>
                  </div>
                ))}</div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500"><User className="w-12 h-12 opacity-50" /><p className="ml-4">Selecione um lead</p></div>
        )}
      </div>
    </div>
  );
};
