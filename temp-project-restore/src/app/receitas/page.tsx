'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/sidebar';
import PeriodFilterComponent from '@/components/custom/period-filter';
import { Plus, Filter, Search, TrendingUp, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { mockTransactions, categoryLabels } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { PeriodFilter } from '@/lib/types';
import { filterByPeriod, getPeriodLabel } from '@/lib/period-utils';

interface Receita {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  account: string;
  type: 'income';
}

export default function ReceitasPage() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>('month');
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  const [receitas, setReceitas] = useState<Receita[]>(
    mockTransactions.filter(t => t.type === 'income') as Receita[]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const receitasFiltradas = filterByPeriod(receitas, selectedPeriod);
  const totalReceitas = receitasFiltradas.reduce((sum, t) => sum + t.amount, 0);

  const filteredReceitas = receitasFiltradas.filter(receita => {
    const matchesSearch = receita.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || receita.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const novaReceita: Receita = {
      id: Date.now().toString(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      account: 'Conta Corrente',
      type: 'income',
    };

    setReceitas([...receitas, novaReceita]);
    setFormData({ description: '', amount: '', category: '', date: '' });
    setShowForm(false);
  };

  const isFormValid = formData.description && formData.amount && formData.category && formData.date;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1A1A2E] to-[#16213E]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                Receitas
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Gerencie suas fontes de renda • {getPeriodLabel(selectedPeriod)}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <PeriodFilterComponent 
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-6 sm:py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl sm:rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 font-semibold text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Nova Receita</span>
              </button>
            </div>
          </div>

          {/* Total Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-xl border border-green-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl shadow-green-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 rounded-xl bg-green-500/20 backdrop-blur-sm">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-green-300">Total de Receitas • {getPeriodLabel(selectedPeriod)}</span>
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">{formatCurrency(totalReceitas)}</p>
              <p className="text-xs sm:text-sm text-green-300/80 font-medium">{filteredReceitas.length} transações</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl mb-4 sm:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar receitas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none text-white placeholder:text-gray-500 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm bg-[#1A1A2E] border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none text-white appearance-none cursor-pointer transition-all duration-200"
              >
                <option value="all" className="bg-[#1A1A2E] text-white">Todas as categorias</option>
                <option value="salary" className="bg-[#1A1A2E] text-white">Salário</option>
                <option value="freelance" className="bg-[#1A1A2E] text-white">Freelance</option>
                <option value="investment" className="bg-[#1A1A2E] text-white">Investimentos</option>
                <option value="other" className="bg-[#1A1A2E] text-white">Outros</option>
              </select>
            </div>
          </div>
        </div>

        {/* Receitas List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredReceitas.map((receita) => (
            <div
              key={receita.id}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1 flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-green-500/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-green-400 transition-colors duration-200">
                      {receita.description}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                      {categoryLabels[receita.category]} • {receita.account}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg sm:text-2xl font-bold text-green-400 mb-1">
                    {formatCurrency(receita.amount)}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 font-medium">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {mounted ? formatDate(receita.date) : ''}
                  </div>
                </div>
              </div>

              <ArrowRight className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6">
                Nova Receita
              </h2>
              <form onSubmit={handleSave} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                    Valor
                  </label>
                  <input
                    type="number"
                    placeholder="R$ 0,00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none text-white placeholder:text-gray-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                    Descrição
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Salário mensal"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none text-white placeholder:text-gray-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                    Categoria
                  </label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-[#1A1A2E] border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none text-white appearance-none cursor-pointer transition-all duration-200"
                  >
                    <option value="" className="bg-[#1A1A2E] text-white">Selecione</option>
                    <option value="salary" className="bg-[#1A1A2E] text-white">Salário</option>
                    <option value="freelance" className="bg-[#1A1A2E] text-white">Freelance</option>
                    <option value="investment" className="bg-[#1A1A2E] text-white">Investimentos</option>
                    <option value="other" className="bg-[#1A1A2E] text-white">Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none text-white transition-all duration-200"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-200 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-500/30 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
