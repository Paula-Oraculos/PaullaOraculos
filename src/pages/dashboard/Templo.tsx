import { useState } from 'react';
import { Shield, UserPlus, Trash2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUsers } from '@/hooks/useUsers';
import { useLeads } from '@/hooks/useLeads';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/hooks/useDashAuth';

export const Templo = () => {
  const { users, addUser, deleteUser } = useUsers();
  const { addLead } = useLeads();
  const { toast } = useToast();
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'paula' as UserRole });
  const [newLead, setNewLead] = useState({ name: '', phone: '', nivelConsciencia: 'frio' as 'frio' | 'morno' | 'quente' });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    addUser(newUser);
    setNewUser({ name: '', email: '', role: 'paula' });
    toast({ title: 'Usuário adicionado!' });
  };

  const handleDeleteUser = (id: string) => {
    if (deleteUser(id)) {
      toast({ title: 'Usuário removido!' });
    } else {
      toast({ title: 'Não é possível remover o admin principal', variant: 'destructive' });
    }
  };

  const handleAddLead = () => {
    if (!newLead.name || !newLead.phone) return;
    addLead(newLead);
    setNewLead({ name: '', phone: '', nivelConsciencia: 'frio' });
    toast({ title: 'Lead adicionado!' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-[#D4AF37]" />
        <h1 className="text-2xl font-serif text-white">Templo - Administração</h1>
      </div>

      {/* Users Section */}
      <div className="rounded-xl p-5" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          <UserCircle className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-lg font-medium text-white">Usuários do Sistema</h2>
        </div>

        <div className="mb-4 p-4 rounded-lg bg-black/20 space-y-3">
          <p className="text-sm text-gray-400">Adicionar Novo Usuário</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Nome" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="bg-[#121212] border-gray-700 text-white" />
            <Input placeholder="Email ou Telefone" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="bg-[#121212] border-gray-700 text-white" />
            <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v as UserRole })}>
              <SelectTrigger className="bg-[#121212] border-gray-700 text-white"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="paula">Paula</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent>
            </Select>
            <Button onClick={handleAddUser} style={{ background: '#D4AF37', color: '#121212' }}><UserPlus className="w-4 h-4 mr-2" /> Adicionar</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/10"><th className="text-left text-xs text-gray-500 p-3">Nome</th><th className="text-left text-xs text-gray-500 p-3">Email/Tel</th><th className="text-left text-xs text-gray-500 p-3">Role</th><th className="text-right text-xs text-gray-500 p-3">Ações</th></tr></thead>
            <tbody>{users.map((user) => (
              <tr key={user.id} className="border-b border-white/5">
                <td className="p-3 text-white">{user.name}</td>
                <td className="p-3 text-gray-400">{user.email}</td>
                <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${user.role === 'admin' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#043927]/50 text-green-400'}`}>{user.role}</span></td>
                <td className="p-3 text-right">{user.id !== '1' && <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-gray-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {/* Manual Lead Entry */}
      <div className="rounded-xl p-5" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5 text-[#D4AF37]" />
          <h2 className="text-lg font-medium text-white">Entrada Manual de Lead</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder="Nome" value={newLead.name} onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} className="bg-[#121212] border-gray-700 text-white" />
          <Input placeholder="WhatsApp" value={newLead.phone} onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} className="bg-[#121212] border-gray-700 text-white" />
          <Select value={newLead.nivelConsciencia} onValueChange={(v: 'frio' | 'morno' | 'quente') => setNewLead({ ...newLead, nivelConsciencia: v })}>
            <SelectTrigger className="bg-[#121212] border-gray-700 text-white"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="frio">Frio</SelectItem><SelectItem value="morno">Morno</SelectItem><SelectItem value="quente">Quente</SelectItem></SelectContent>
          </Select>
          <Button onClick={handleAddLead} style={{ background: '#043927', color: '#D4AF37' }}><UserPlus className="w-4 h-4 mr-2" /> Adicionar Lead</Button>
        </div>
      </div>
    </div>
  );
};
