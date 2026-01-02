import { TrendingUp, DollarSign, Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSales } from '@/hooks/useSales';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Colheita = () => {
  const { sales, totalRevenue, salesByProduct, revenueOverTime, products, productFilter, setProductFilter } = useSales();

  const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`;
  const statusColors = { pendente: 'text-yellow-400 bg-yellow-500/20', aprovado: 'text-green-400 bg-green-500/20', cancelado: 'text-red-400 bg-red-500/20' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
          <h1 className="text-2xl font-serif text-white">Colheita</h1>
        </div>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger className="w-full sm:w-[200px] bg-[#1E1E1E] border-gray-700 text-white"><SelectValue placeholder="Filtrar produto" /></SelectTrigger>
          <SelectContent><SelectItem value="all">Todos os Produtos</SelectItem>{products.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <DollarSign className="w-5 h-5 text-[#D4AF37] mb-2" />
          <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-gray-500">Receita Total</p>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <Package className="w-5 h-5 text-[#D4AF37] mb-2" />
          <p className="text-2xl font-bold text-white">{sales.filter(s => s.status === 'aprovado').length}</p>
          <p className="text-xs text-gray-500">Vendas Aprovadas</p>
        </div>
        <div className="p-4 rounded-xl col-span-2 md:col-span-1" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue / (sales.filter(s => s.status === 'aprovado').length || 1))}</p>
          <p className="text-xs text-gray-500">Ticket Médio</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <h3 className="text-white font-medium mb-4">Receita ao Longo do Tempo</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueOverTime}>
                <defs><linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#043927" stopOpacity={0.8}/><stop offset="95%" stopColor="#043927" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" tick={{ fill: '#666', fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fill: '#666', fontSize: 10 }} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip contentStyle={{ background: '#1E1E1E', border: '1px solid #D4AF37', borderRadius: '8px' }} labelStyle={{ color: '#D4AF37' }} formatter={(value: number) => [formatCurrency(value), 'Receita']} />
                <Area type="monotone" dataKey="value" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-4 rounded-xl" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
          <h3 className="text-white font-medium mb-4">Vendas por Produto</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByProduct} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" tick={{ fill: '#666', fontSize: 10 }} tickFormatter={(v) => `${v/1000}k`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#666', fontSize: 10 }} width={100} />
                <Tooltip contentStyle={{ background: '#1E1E1E', border: '1px solid #D4AF37', borderRadius: '8px' }} formatter={(value: number) => [formatCurrency(value), 'Vendas']} />
                <Bar dataKey="value" fill="#043927" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#1E1E1E', border: '1px solid rgba(212,175,55,0.1)' }}>
        <div className="p-4 border-b border-white/5"><h3 className="text-white font-medium">Transações Recentes</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/5"><th className="text-left text-xs text-gray-500 p-3">Nome</th><th className="text-left text-xs text-gray-500 p-3">Produto</th><th className="text-left text-xs text-gray-500 p-3">Valor</th><th className="text-left text-xs text-gray-500 p-3">Status</th><th className="text-left text-xs text-gray-500 p-3">Data</th></tr></thead>
            <tbody>{sales.slice(0, 10).map((sale) => (
              <tr key={sale.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3 text-white text-sm">{sale.leadName}</td>
                <td className="p-3 text-gray-400 text-sm">{sale.product}</td>
                <td className="p-3 text-[#D4AF37] text-sm font-medium">{formatCurrency(sale.value)}</td>
                <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full ${statusColors[sale.status]}`}>{sale.status}</span></td>
                <td className="p-3 text-gray-500 text-sm">{sale.date}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
