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
    <div className="bg-white dark:bg-[#111315] rounded-xl p-6 border border-[#E6E8EC] dark:border-[#272B30]">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-[#1A1D1F] dark:text-[#F7F8F9] mb-1">
          Receitas vs Despesas
        </h3>
        <p className="text-xs text-[#6F767E] dark:text-[#9A9FA5]">
          Comparativo mensal dos últimos 6 meses
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E6E8EC" opacity={0.5} vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#6F767E"
            style={{ fontSize: '12px', fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: '#E6E8EC' }}
          />
          <YAxis 
            stroke="#6F767E"
            style={{ fontSize: '12px', fontWeight: 500 }}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            tickLine={false}
            axisLine={{ stroke: '#E6E8EC' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF',
              border: '1px solid #E6E8EC',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              padding: '12px'
            }}
            labelStyle={{ 
              color: '#1A1D1F',
              fontWeight: 600,
              marginBottom: '8px'
            }}
            formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, '']}
            cursor={{ fill: '#F7F8F9', opacity: 0.3 }}
          />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '20px',
              fontSize: '13px',
              fontWeight: 500
            }}
            iconType="circle"
          />
          <Bar 
            dataKey="receitas" 
            fill="#00875A" 
            radius={[6, 6, 0, 0]} 
            name="Receitas"
            maxBarSize={40}
          />
          <Bar 
            dataKey="despesas" 
            fill="#DE350B" 
            radius={[6, 6, 0, 0]} 
            name="Despesas"
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
