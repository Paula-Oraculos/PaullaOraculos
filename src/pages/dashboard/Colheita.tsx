import { useState } from 'react';
import { TrendingUp, DollarSign, Package, ShoppingCart, Search, Phone, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useSales } from '@/hooks/useSales';
import { useDashTheme } from '@/hooks/useDashTheme';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartView = 'revenue' | 'sales' | 'ticket';

export const Colheita = () => {
  const { sales, totalRevenue, salesByProduct, revenueOverTime, products, productFilter, setProductFilter } = useSales();
  const { colors } = useDashTheme();
  const [activeChart, setActiveChart] = useState<ChartView>('revenue');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`;
  
  const approvedSales = sales.filter(s => s.status === 'aprovado');
  const averageTicket = approvedSales.length > 0 ? totalRevenue / approvedSales.length : 0;

  // Filter transactions
  const filteredSales = sales.filter(sale => {
    const matchesSearch = !searchQuery || 
      sale.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.leadPhone?.includes(searchQuery);
    const matchesDate = !dateFilter || sale.date.includes(dateFilter);
    return matchesSearch && matchesDate;
  });

  // Calculate ticket evolution for the chart
  const ticketOverTime = revenueOverTime.map((item, index) => ({
    ...item,
    ticket: index > 0 ? item.value / (index + 1) : item.value
  }));

  const statusColors: Record<string, { bg: string; text: string }> = { 
    pendente: { bg: '#F59E0B20', text: '#FBBF24' }, 
    aprovado: { bg: '#22C55E20', text: '#4ADE80' }, 
    cancelado: { bg: '#EF444420', text: '#F87171' } 
  };

  const cards = [
    { 
      id: 'revenue' as ChartView, 
      icon: DollarSign, 
      value: formatCurrency(totalRevenue), 
      label: 'Receita Total',
      description: 'Gráfico de receita ao longo do tempo'
    },
    { 
      id: 'sales' as ChartView, 
      icon: Package, 
      value: approvedSales.length.toString(), 
      label: 'Vendas Aprovadas',
      description: 'Vendas por produto'
    },
    { 
      id: 'ticket' as ChartView, 
      icon: ShoppingCart, 
      value: formatCurrency(averageTicket), 
      label: 'Ticket Médio',
      description: 'Evolução do ticket médio'
    },
  ];

  const renderChart = () => {
    const chartGradientId = `chart-gradient-${activeChart}`;
    
    switch (activeChart) {
      case 'revenue':
        return (
          <AreaChart data={revenueOverTime}>
            <defs>
              <linearGradient id={chartGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.chartGradientStart} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={colors.chartGradientEnd} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="date" tick={{ fill: colors.textSecondary, fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fill: colors.textSecondary, fontSize: 10 }} tickFormatter={(v) => `${v/1000}k`} />
            <Tooltip 
              contentStyle={{ 
                background: colors.card, 
                border: `1px solid ${colors.accent}`, 
                borderRadius: '8px',
                color: colors.text 
              }} 
              labelStyle={{ color: colors.accent }} 
              formatter={(value: number) => [formatCurrency(value), 'Receita']} 
            />
            <Area type="monotone" dataKey="value" stroke={colors.accent} strokeWidth={2} fillOpacity={1} fill={`url(#${chartGradientId})`} />
          </AreaChart>
        );
      case 'sales':
        return (
          <BarChart data={salesByProduct} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis type="number" tick={{ fill: colors.textSecondary, fontSize: 10 }} tickFormatter={(v) => `${v/1000}k`} />
            <YAxis type="category" dataKey="name" tick={{ fill: colors.textSecondary, fontSize: 10 }} width={100} />
            <Tooltip 
              contentStyle={{ 
                background: colors.card, 
                border: `1px solid ${colors.accent}`, 
                borderRadius: '8px',
                color: colors.text 
              }} 
              formatter={(value: number) => [formatCurrency(value), 'Vendas']} 
            />
            <Bar dataKey="value" fill={colors.accent} radius={[0, 4, 4, 0]} />
          </BarChart>
        );
      case 'ticket':
        return (
          <LineChart data={ticketOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="date" tick={{ fill: colors.textSecondary, fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fill: colors.textSecondary, fontSize: 10 }} tickFormatter={(v) => `${v/1000}k`} />
            <Tooltip 
              contentStyle={{ 
                background: colors.card, 
                border: `1px solid ${colors.accent}`, 
                borderRadius: '8px',
                color: colors.text 
              }} 
              labelStyle={{ color: colors.accent }} 
              formatter={(value: number) => [formatCurrency(value), 'Ticket']} 
            />
            <Line type="monotone" dataKey="ticket" stroke={colors.accent} strokeWidth={2} dot={{ fill: colors.accent }} />
          </LineChart>
        );
    }
  };

  return (
    <div className="space-y-6" style={{ color: colors.text }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6" style={{ color: colors.accent }} />
          <h1 className="text-2xl font-serif">Colheita</h1>
        </div>
        <Select value={productFilter} onValueChange={setProductFilter}>
          <SelectTrigger 
            className="w-full sm:w-[200px]"
            style={{ background: colors.card, borderColor: colors.border, color: colors.text }}
          >
            <SelectValue placeholder="Filtrar produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Produtos</SelectItem>
            {products.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Clickable Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isActive = activeChart === card.id;
          return (
            <button
              key={card.id}
              onClick={() => setActiveChart(card.id)}
              className="p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
              style={{ 
                background: colors.card, 
                border: isActive ? `2px solid ${colors.accent}` : `1px solid ${colors.border}`,
                boxShadow: isActive ? `0 0 20px ${colors.accent}30` : 'none'
              }}
            >
              <Icon className="w-5 h-5 mb-2" style={{ color: colors.accent }} />
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs" style={{ color: colors.textSecondary }}>{card.label}</p>
              {isActive && (
                <p className="text-[10px] mt-1" style={{ color: colors.accent }}>{card.description}</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Chart */}
      <div 
        className="p-4 rounded-xl"
        style={{ background: colors.card, border: `1px solid ${colors.border}` }}
      >
        <h3 className="font-medium mb-4">
          {activeChart === 'revenue' && 'Receita ao Longo do Tempo'}
          {activeChart === 'sales' && 'Vendas por Produto'}
          {activeChart === 'ticket' && 'Evolução do Ticket Médio'}
        </h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table with Filters */}
      <div 
        className="rounded-xl overflow-hidden"
        style={{ background: colors.card, border: `1px solid ${colors.border}` }}
      >
        <div className="p-4 border-b flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between" style={{ borderColor: colors.border }}>
          <h3 className="font-medium">Transações Recentes</h3>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.textSecondary }} />
              <Input
                placeholder="Buscar nome ou telefone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                style={{ background: colors.cardHover, borderColor: colors.border, color: colors.text }}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.textSecondary }} />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-9"
                style={{ background: colors.cardHover, borderColor: colors.border, color: colors.text }}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                <th className="text-left text-xs p-3" style={{ color: colors.textSecondary }}>Nome</th>
                <th className="text-left text-xs p-3" style={{ color: colors.textSecondary }}>Telefone</th>
                <th className="text-left text-xs p-3" style={{ color: colors.textSecondary }}>Produto</th>
                <th className="text-left text-xs p-3" style={{ color: colors.textSecondary }}>Valor</th>
                <th className="text-left text-xs p-3" style={{ color: colors.textSecondary }}>Status</th>
                <th className="text-left text-xs p-3" style={{ color: colors.textSecondary }}>Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.slice(0, 15).map((sale) => (
                <tr key={sale.id} style={{ borderBottom: `1px solid ${colors.border}` }} className="hover:bg-white/5">
                  <td className="p-3 text-sm">{sale.leadName}</td>
                  <td className="p-3 text-sm">
                    {sale.leadPhone ? (
                      <a 
                        href={`https://wa.me/${sale.leadPhone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                        style={{ color: '#25D366' }}
                      >
                        <Phone className="w-3 h-3" />
                        {sale.leadPhone}
                      </a>
                    ) : '-'}
                  </td>
                  <td className="p-3 text-sm" style={{ color: colors.textSecondary }}>{sale.product}</td>
                  <td className="p-3 text-sm font-medium" style={{ color: colors.accent }}>{formatCurrency(sale.value)}</td>
                  <td className="p-3">
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        background: statusColors[sale.status].bg,
                        color: statusColors[sale.status].text
                      }}
                    >
                      {sale.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm" style={{ color: colors.textSecondary }}>{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
