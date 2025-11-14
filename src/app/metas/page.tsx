'use client';

import { useState } from 'react';
import { Target, Plus, TrendingUp } from 'lucide-react';

interface Meta {
  id: string;
  nome: string;
  valorAlvo: number;
  valorAtual: number;
  prazo: string;
  categoria: string;
}

export default function MetasPage() {
  const [metas] = useState<Meta[]>([
    { id: '1', nome: 'Viagem para Europa', valorAlvo: 15000, valorAtual: 8500, prazo: '2024-12-31', categoria: 'Viagem' },
    { id: '2', nome: 'Fundo de Emergência', valorAlvo: 20000, valorAtual: 12000, prazo: '2024-06-30', categoria: 'Reserva' },
    { id: '3', nome: 'Novo Notebook', valorAlvo: 5000, valorAtual: 3200, prazo: '2024-04-30', categoria: 'Tecnologia' },
  ]);

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Metas Financeiras</h1>
              <p className="text-gray-600 dark:text-gray-400">Acompanhe seus objetivos</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nova Meta
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nova Meta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome da meta"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Valor alvo"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Valor atual"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Prazo"
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2">
                <option>Categoria</option>
                <option>Viagem</option>
                <option>Reserva</option>
                <option>Tecnologia</option>
                <option>Educação</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                Criar Meta
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

        {/* Metas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metas.map((meta) => {
            const progresso = (meta.valorAtual / meta.valorAlvo) * 100;
            const diasRestantes = Math.ceil((new Date(meta.prazo).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

            return (
              <div key={meta.id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{meta.nome}</h3>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full">
                      {meta.categoria}
                    </span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{progresso.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progresso, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Atual</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        R$ {meta.valorAtual.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Meta</p>
                      <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        R$ {meta.valorAlvo.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {diasRestantes > 0 ? (
                        <>
                          <span className="font-semibold text-gray-900 dark:text-white">{diasRestantes}</span> dias restantes
                        </>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 font-semibold">Prazo vencido</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
