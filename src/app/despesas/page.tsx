'use client';

import { useState } from 'react';
import { TrendingDown, Plus, Search, Filter, Download } from 'lucide-react';

interface Despesa {
  id: string;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
  conta: string;
}

export default function DespesasPage() {
  const [despesas] = useState<Despesa[]>([
    { id: '1', descricao: 'Supermercado', valor: 450.00, categoria: 'Alimentação', data: '2024-01-15', conta: 'Conta Corrente' },
    { id: '2', descricao: 'Aluguel', valor: 1200.00, categoria: 'Moradia', data: '2024-01-10', conta: 'Conta Corrente' },
    { id: '3', descricao: 'Uber', valor: 45.00, categoria: 'Transporte', data: '2024-01-14', conta: 'Cartão de Crédito' },
    { id: '4', descricao: 'Netflix', valor: 39.90, categoria: 'Entretenimento', data: '2024-01-12', conta: 'Cartão de Crédito' },
  ]);

  const [showForm, setShowForm] = useState(false);

  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Despesas</h1>
              <p className="text-gray-600 dark:text-gray-400">Gerencie seus gastos</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total do Mês</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              R$ {totalDespesas.toFixed(2)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Média Diária</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              R$ {(totalDespesas / 30).toFixed(2)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total de Despesas</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{despesas.length}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nova Despesa
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar despesas..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nova Despesa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Descrição"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Valor"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Categoria</option>
                <option>Alimentação</option>
                <option>Moradia</option>
                <option>Transporte</option>
                <option>Entretenimento</option>
              </select>
              <input
                type="date"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Conta</option>
                <option>Conta Corrente</option>
                <option>Cartão de Crédito</option>
              </select>
              <input
                type="file"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                Salvar
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Descrição</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Categoria</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Data</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Conta</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {despesas.map((despesa) => (
                  <tr key={despesa.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{despesa.descricao}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{despesa.categoria}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(despesa.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{despesa.conta}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-red-600 dark:text-red-400">
                      R$ {despesa.valor.toFixed(2)}
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
