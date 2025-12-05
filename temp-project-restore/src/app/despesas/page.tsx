'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/sidebar';
import PeriodFilterComponent from '@/components/custom/period-filter';
import { TrendingDown, Plus, Search, Filter, Download, Calendar, CreditCard, ArrowRight } from 'lucide-react';
import { PeriodFilter } from '@/lib/types';
import { filterByPeriod, getPeriodLabel } from '@/lib/period-utils';

interface Despesa {
  id: string;
  descricao: string;
  valor: number;
  categoria: string;
  data: string;
  conta: string;
}

const categoryIcons: Record<string, string> = {
  'Alimentação': '🍔',
  'Moradia': '🏠',
  'Transporte': '🚗',
  'Entretenimento': '🎮',
};

export default function DespesasPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>('month');
  const [despesas, setDespesas] = useState<Despesa[]>([
    { id: '1', descricao: 'Supermercado', valor: 450.00, categoria: 'Alimentação', data: '2024-01-15', conta: 'Conta Corrente' },
    { id: '2', descricao: 'Aluguel', valor: 1200.00, categoria: 'Moradia', data: '2024-01-10', conta: 'Conta Corrente' },
    { id: '3', descricao: 'Uber', valor: 45.00, categoria: 'Transporte', data: '2024-01-14', conta: 'Cartão de Crédito' },
    { id: '4', descricao: 'Netflix', valor: 39.90, categoria: 'Entretenimento', data: '2024-01-12', conta: 'Cartão de Crédito' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    categoria: '',
    data: '',
    conta: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const despesasFiltradas = filterByPeriod(despesas, selectedPeriod);
  const totalDespesas = despesasFiltradas.reduce((acc, d) => acc + d.valor, 0);

  const handleSave = () => {
    if (!formData.descricao || !formData.valor || !formData.categoria || !formData.data || !formData.conta) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const novaDespesa: Despesa = {
      id: Date.now().toString(),
      descricao: formData.descricao,
      valor: parseFloat(formData.valor),
      categoria: formData.categoria,
      data: formData.data,
      conta: formData.conta,
    };

    setDespesas([...despesas, novaDespesa]);
    setFormData({ descricao: '', valor: '', categoria: '', data: '', conta: '' });
    setShowForm(false);
  };

  const isFormValid = formData.descricao && formData.valor && formData.categoria && formData.data && formData.conta;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1A1A2E] to-[#16213E]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                Despesas
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Gerencie seus gastos • {getPeriodLabel(selectedPeriod)}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <PeriodFilterComponent 
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-6 sm:py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl sm:rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 font-semibold text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Nova Despesa</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mb-4 sm:mb-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-transparent" />
              <div className="relative z-10">
                <p className="text-xs sm:text-sm font-semibold text-red-300 mb-1 sm:mb-2">Total do Período</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  R$ {totalDespesas.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="relative z-10">
                <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1 sm:mb-2">Média Diária</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  R$ {despesasFiltradas.length > 0 ? (totalDespesas / (selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 365)).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="relative z-10">
                <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1 sm:mb-2">Total de Despesas</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{despesasFiltradas.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar despesas..."
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none text-white placeholder:text-gray-500 transition-all duration-200"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200 text-white font-semibold">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200 text-white font-semibold">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl mb-4 sm:mb-6 animate-in slide-in-from-top duration-300">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5">Nova Despesa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Descrição"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none text-white placeholder:text-gray-500 transition-all duration-200"
              />
              <input
                type="number"
                placeholder="Valor"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none text-white placeholder:text-gray-500 transition-all duration-200"
              />
              <select 
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-[#1A1A2E] border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none text-white appearance-none cursor-pointer transition-all duration-200"
              >
                <option value="" className="bg-[#1A1A2E] text-white">Categoria</option>
                <option value="Alimentação" className="bg-[#1A1A2E] text-white">Alimentação</option>
                <option value="Moradia" className="bg-[#1A1A2E] text-white">Moradia</option>
                <option value="Transporte" className="bg-[#1A1A2E] text-white">Transporte</option>
                <option value="Entretenimento" className="bg-[#1A1A2E] text-white">Entretenimento</option>
              </select>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none text-white transition-all duration-200"
              />
              <select 
                value={formData.conta}
                onChange={(e) => setFormData({ ...formData, conta: e.target.value })}
                className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-[#1A1A2E] border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none text-white appearance-none cursor-pointer transition-all duration-200"
              >
                <option value="" className="bg-[#1A1A2E] text-white">Conta</option>
                <option value="Conta Corrente" className="bg-[#1A1A2E] text-white">Conta Corrente</option>
                <option value="Cartão de Crédito" className="bg-[#1A1A2E] text-white">Cartão de Crédito</option>
              </select>
              <input
                type="file"
                className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 outline-none text-white transition-all duration-200"
              />
            </div>
            <div className="flex gap-3 mt-4 sm:mt-5">
              <button 
                onClick={handleSave}
                disabled={!isFormValid}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/30 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="space-y-3 sm:space-y-4">
          {despesasFiltradas.map((despesa) => (
            <div
              key={despesa.id}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1 flex items-start gap-3 sm:gap-4">
                  <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[despesa.categoria] || '💰'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-red-400 transition-colors duration-200">
                      {despesa.descricao}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 font-medium">
                      <span>{despesa.categoria}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                        {despesa.conta}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg sm:text-2xl font-bold text-red-400 mb-1">
                    R$ {despesa.valor.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 font-medium">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {mounted ? new Date(despesa.data).toLocaleDateString('pt-BR') : ''}
                  </div>
                </div>
              </div>

              <ArrowRight className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-red-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
