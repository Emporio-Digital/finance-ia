import { PeriodFilter } from './types';

/**
 * Filtra dados por período (semana/mês/ano)
 */
export function filterByPeriod<T extends { data?: string; date?: string }>(
  items: T[],
  period: PeriodFilter
): T[] {
  const now = new Date();
  const startOfPeriod = getStartOfPeriod(now, period);

  return items.filter((item) => {
    const itemDate = new Date(item.data || item.date || '');
    return itemDate >= startOfPeriod && itemDate <= now;
  });
}

/**
 * Retorna a data de início do período selecionado
 */
function getStartOfPeriod(date: Date, period: PeriodFilter): Date {
  const result = new Date(date);

  switch (period) {
    case 'week':
      // Início da semana (domingo)
      result.setDate(date.getDate() - date.getDay());
      result.setHours(0, 0, 0, 0);
      break;
    case 'month':
      // Início do mês
      result.setDate(1);
      result.setHours(0, 0, 0, 0);
      break;
    case 'year':
      // Início do ano
      result.setMonth(0, 1);
      result.setHours(0, 0, 0, 0);
      break;
  }

  return result;
}

/**
 * Retorna o label do período em português
 */
export function getPeriodLabel(period: PeriodFilter): string {
  const labels: Record<PeriodFilter, string> = {
    week: 'Esta Semana',
    month: 'Este Mês',
    year: 'Este Ano',
  };
  return labels[period];
}
