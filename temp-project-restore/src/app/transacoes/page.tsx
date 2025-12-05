'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import PeriodFilterComponent from '@/components/custom/period-filter';
import { History, Search, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { PeriodFilter } from '@/lib/types';
import { filterByPeriod, getPeriodLabel } from '@/lib/period-utils';

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string;
  conta: string;
}

export default function TransacoesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>('month');
  const [transacoes] = useState<Transacao[]>([
    { id: '1', descricao: 'Salário', valor: 5000, tipo: 'receita', categoria: 'Salário', data: '2024-01-05', conta: 'Conta Corrente' },
    { id: '2', descricao: 'Aluguel', valor: 1200, tipo: 'despesa', categoria: 'Moradia', data: '2024-01-10', conta: 'Conta Corrente' },
    { id: '3', descricao: 'Freelance', valor: 1500, tipo: 'receita', categoria: 'Freelance', data: '2024-01-12', conta: 'Conta Corrente' },
    { id: '4', descricao: 'Supermercado', valor: 450, tipo: 'despesa', categoria: 'Alimentação', data: '2024-01-15', conta: 'Cartão de Crédito' },
    { id: '5', descricao: 'Netflix', valor: 39.90, tipo: 'despesa', categoria: 'Entretenimento', data: '2024-01-12', conta: 'Cartão de Crédito' },
  ]);

  const transacoesFiltradas = filterByPeriod(transacoes, selectedPeriod);
  const totalReceitas = transacoesFiltradas.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
  const totalDespesas = transacoesFiltradas.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1A1A2E] to-[#16213E]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                Histórico de Transações
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Todas as suas movimentações • {getPeriodLabel(selectedPeriod)}
              </p>
            </div>
            <PeriodFilterComponent 
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-xl border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <p className="text-sm text-green-300 font-semibold">Receitas</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                R$ {totalReceitas.toFixed(2)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <TrendingDown className="w-5 h-5 text-red-400" />
                <p className="text-sm text-red-300 font-semibold">Despesas</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                R$ {totalDespesas.toFixed(2)}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <p className="text-sm text-gray-400 font-semibold mb-2">Saldo do Período</p>
              <p className={`text-2xl sm:text-3xl font-bold ${saldo >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                R$ {saldo.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar transações..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white font-semibold">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/30 font-semibold">
            <Download className="w-5 h-5" />
            Exportar CSV
          </button>
        </div>

        {/* Transactions List */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">Data</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">Descrição</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">Categoria</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">Conta</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-white">Tipo</th>
                  <th className="px-4 sm:px-6 py-4 text-right text-sm font-semibold text-white">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {transacoesFiltradas.map((transacao) => (
                  <tr key={transacao.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-400">
                      {new Date(transacao.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-white font-medium">{transacao.descricao}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-400">{transacao.categoria}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-400">{transacao.conta}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        transacao.tipo === 'receita'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transacao.tipo === 'receita' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}
                      </span>
                    </td>
                    <td className={`px-4 sm:px-6 py-4 text-sm text-right font-semibold ${
                      transacao.tipo === 'receita'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
