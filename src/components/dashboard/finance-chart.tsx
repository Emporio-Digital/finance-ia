'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'Jan', receitas: 5000, despesas: 3200 },
  { month: 'Fev', receitas: 5200, despesas: 3500 },
  { month: 'Mar', receitas: 5500, despesas: 3100 },
  { month: 'Abr', receitas: 5300, despesas: 3800 },
  { month: 'Mai', receitas: 5800, despesas: 3400 },
  { month: 'Jun', receitas: 6000, despesas: 3600 },
];

export default function FinanceChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Receitas vs Despesas
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis 
            dataKey="month" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `R$ ${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
          />
          <Legend />
          <Bar dataKey="receitas" fill="#10B981" radius={[8, 8, 0, 0]} name="Receitas" />
          <Bar dataKey="despesas" fill="#EF4444" radius={[8, 8, 0, 0]} name="Despesas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
