'use client';

import { useState } from 'react';
import { History, Search, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';

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
  const [transacoes] = useState<Transacao[]>([
    { id: '1', descricao: 'Salário', valor: 5000, tipo: 'receita', categoria: 'Salário', data: '2024-01-05', conta: 'Conta Corrente' },
    { id: '2', descricao: 'Aluguel', valor: 1200, tipo: 'despesa', categoria: 'Moradia', data: '2024-01-10', conta: 'Conta Corrente' },
    { id: '3', descricao: 'Freelance', valor: 1500, tipo: 'receita', categoria: 'Freelance', data: '2024-01-12', conta: 'Conta Corrente' },
    { id: '4', descricao: 'Supermercado', valor: 450, tipo: 'despesa', categoria: 'Alimentação', data: '2024-01-15', conta: 'Cartão de Crédito' },
    { id: '5', descricao: 'Netflix', valor: 39.90, tipo: 'despesa', categoria: 'Entretenimento', data: '2024-01-12', conta: 'Cartão de Crédito' },
  ]);

  const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0);
  const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <History className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Histórico de Transações</h1>
              <p className="text-gray-600 dark:text-gray-400">Todas as suas movimentações</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Receitas</p>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              R$ {totalReceitas.toFixed(2)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Despesas</p>
            </div>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              R$ {totalDespesas.toFixed(2)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Saldo do Período</p>
            <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
              R$ {saldo.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar transações..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Download className="w-5 h-5" />
            Exportar CSV
          </button>
        </div>

        {/* Transactions List */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Data</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Descrição</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Categoria</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Conta</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Tipo</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {transacoes.map((transacao) => (
                  <tr key={transacao.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(transacao.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{transacao.descricao}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{transacao.categoria}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{transacao.conta}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        transacao.tipo === 'receita'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      }`}>
                        {transacao.tipo === 'receita' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm text-right font-semibold ${
                      transacao.tipo === 'receita'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
