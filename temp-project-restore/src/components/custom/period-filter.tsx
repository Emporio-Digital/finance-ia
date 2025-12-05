'use client';

import { Calendar } from 'lucide-react';
import { PeriodFilter } from '@/lib/types';

interface PeriodFilterProps {
  selectedPeriod: PeriodFilter;
  onPeriodChange: (period: PeriodFilter) => void;
}

export default function PeriodFilterComponent({ selectedPeriod, onPeriodChange }: PeriodFilterProps) {
  const periods: { value: PeriodFilter; label: string }[] = [
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
    { value: 'year', label: 'Ano' },
  ];

  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-1">
      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-2" />
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
            selectedPeriod === period.value
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
