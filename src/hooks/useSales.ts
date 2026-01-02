import { useState, useMemo } from 'react';

export interface Sale {
  id: string;
  leadName: string;
  product: string;
  value: number;
  status: 'pendente' | 'aprovado' | 'cancelado';
  date: string;
}

// Mock data for MVP
const MOCK_SALES: Sale[] = [
  { id: '1', leadName: 'Maria Silva', product: 'Mentoria Individual', value: 1497, status: 'aprovado', date: '2024-01-18' },
  { id: '2', leadName: 'Carla Mendes', product: 'Curso Tarot Completo', value: 697, status: 'aprovado', date: '2024-01-19' },
  { id: '3', leadName: 'João Santos', product: 'Mentoria Individual', value: 1497, status: 'pendente', date: '2024-01-20' },
  { id: '4', leadName: 'Ana Paula', product: 'Curso Energia Blindada', value: 297, status: 'aprovado', date: '2024-01-21' },
  { id: '5', leadName: 'Roberto Alves', product: 'Curso Tarot Completo', value: 697, status: 'cancelado', date: '2024-01-22' },
  { id: '6', leadName: 'Fernanda Costa', product: 'Mentoria Individual', value: 1497, status: 'aprovado', date: '2024-01-23' },
  { id: '7', leadName: 'Lucas Oliveira', product: 'Curso Energia Blindada', value: 297, status: 'aprovado', date: '2024-01-24' },
  { id: '8', leadName: 'Patricia Lima', product: 'Curso Tarot Completo', value: 697, status: 'aprovado', date: '2024-01-25' },
  { id: '9', leadName: 'Marcos Pereira', product: 'Mentoria Individual', value: 1497, status: 'pendente', date: '2024-01-26' },
  { id: '10', leadName: 'Julia Rocha', product: 'Curso Energia Blindada', value: 297, status: 'aprovado', date: '2024-01-27' },
];

export const useSales = () => {
  const [sales] = useState<Sale[]>(MOCK_SALES);
  const [productFilter, setProductFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '2024-01-01',
    end: '2024-12-31',
  });

  const filteredSales = useMemo(() => {
    return sales.filter(sale => {
      const matchesProduct = productFilter === 'all' || sale.product === productFilter;
      const matchesDate = sale.date >= dateRange.start && sale.date <= dateRange.end;
      return matchesProduct && matchesDate;
    });
  }, [sales, productFilter, dateRange]);

  const totalRevenue = useMemo(() => {
    return filteredSales
      .filter(sale => sale.status === 'aprovado')
      .reduce((acc, sale) => acc + sale.value, 0);
  }, [filteredSales]);

  const salesByProduct = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredSales
      .filter(sale => sale.status === 'aprovado')
      .forEach(sale => {
        grouped[sale.product] = (grouped[sale.product] || 0) + sale.value;
      });
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [filteredSales]);

  const revenueOverTime = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredSales
      .filter(sale => sale.status === 'aprovado')
      .forEach(sale => {
        grouped[sale.date] = (grouped[sale.date] || 0) + sale.value;
      });
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => ({ date, value }));
  }, [filteredSales]);

  const products = useMemo(() => {
    return [...new Set(sales.map(s => s.product))];
  }, [sales]);

  return {
    sales: filteredSales,
    totalRevenue,
    salesByProduct,
    revenueOverTime,
    products,
    productFilter,
    setProductFilter,
    dateRange,
    setDateRange,
  };
};
