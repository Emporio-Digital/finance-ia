'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import PeriodFilterComponent from '@/components/custom/period-filter';
import { Target, Plus, TrendingUp } from 'lucide-react';
import { PeriodFilter } from '@/lib/types';
import { filterByPeriod, getPeriodLabel } from '@/lib/period-utils';

interface Meta {
  id: string;
  nome: string;
  valorAlvo: number;
  valorAtual: number;
  prazo: string;
  categoria: string;
}

export default function MetasPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>('month');
  const [metas, setMetas] = useState<Meta[]>([
    { id: '1', nome: 'Viagem para Europa', valorAlvo: 15000, valorAtual: 8500, prazo: '2024-12-31', categoria: 'Viagem' },
    { id: '2', nome: 'Fundo de Emergência', valorAlvo: 20000, valorAtual: 12000, prazo: '2024-06-30', categoria: 'Reserva' },
    { id: '3', nome: 'Novo Notebook', valorAlvo: 5000, valorAtual: 3200, prazo: '2024-04-30', categoria: 'Tecnologia' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    valorAlvo: '',
    valorAtual: '',
    prazo: '',
    categoria: '',
  });

  const metasFiltradas = filterByPeriod(metas, selectedPeriod);

  const handleSave = () => {
    if (!formData.nome || !formData.valorAlvo || !formData.valorAtual || !formData.prazo || !formData.categoria) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const novaMeta: Meta = {
      id: Date.now().toString(),
      nome: formData.nome,
      valorAlvo: parseFloat(formData.valorAlvo),
      valorAtual: parseFloat(formData.valorAtual),
      prazo: formData.prazo,
      categoria: formData.categoria,
    };

    setMetas([...metas, novaMeta]);
    setFormData({ nome: '', valorAlvo: '', valorAtual: '', prazo: '', categoria: '' });
    setShowForm(false);
  };

  const isFormValid = formData.nome && formData.valorAlvo && formData.valorAtual && formData.prazo && formData.categoria;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1A1A2E] to-[#16213E]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                Metas Financeiras
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Acompanhe seus objetivos • {getPeriodLabel(selectedPeriod)}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <PeriodFilterComponent 
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-6 sm:py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 font-semibold text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Nova Meta</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl mb-4 sm:mb-6 animate-in slide-in-from-top duration-300">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Nova Meta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Nome da meta"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-gray-500"
              />
              <input
                type="number"
                placeholder="Valor alvo"
                value={formData.valorAlvo}
                onChange={(e) => setFormData({ ...formData, valorAlvo: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-gray-500"
              />
              <input
                type="number"
                placeholder="Valor atual"
                value={formData.valorAtual}
                onChange={(e) => setFormData({ ...formData, valorAtual: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-gray-500"
              />
              <input
                type="date"
                placeholder="Prazo"
                value={formData.prazo}
                onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
              <select 
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-[#1A1A2E] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2 text-white appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#1A1A2E] text-white">Categoria</option>
                <option value="Viagem" className="bg-[#1A1A2E] text-white">Viagem</option>
                <option value="Reserva" className="bg-[#1A1A2E] text-white">Reserva</option>
                <option value="Tecnologia" className="bg-[#1A1A2E] text-white">Tecnologia</option>
                <option value="Educação" className="bg-[#1A1A2E] text-white">Educação</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleSave}
                disabled={!isFormValid}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/30 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Criar Meta
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Metas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {metasFiltradas.map((meta) => {
            const progresso = (meta.valorAtual / meta.valorAlvo) * 100;
            const diasRestantes = Math.ceil((new Date(meta.prazo).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

            return (
              <div key={meta.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{meta.nome}</h3>
                    <span className="inline-block px-2 sm:px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full">
                      {meta.categoria}
                    </span>
                  </div>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="text-gray-400">Progresso</span>
                      <span className="font-semibold text-white">{progresso.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2.5 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progresso, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Atual</p>
                      <p className="text-base sm:text-lg font-bold text-white">
                        R$ {meta.valorAtual.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">Meta</p>
                      <p className="text-base sm:text-lg font-bold text-purple-400">
                        R$ {meta.valorAlvo.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-white/10">
                    <p className="text-xs sm:text-sm text-gray-400">
                      {diasRestantes > 0 ? (
                        <>
                          <span className="font-semibold text-white">{diasRestantes}</span> dias restantes
                        </>
                      ) : (
                        <span className="text-red-400 font-semibold">Prazo vencido</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
