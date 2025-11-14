'use client';

import { useState } from 'react';
import { GraduationCap, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';

interface Aula {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  concluida: boolean;
  categoria: string;
}

export default function EducacaoPage() {
  const [aulas] = useState<Aula[]>([
    { id: '1', titulo: 'Introdução ao Planejamento Financeiro', descricao: 'Aprenda os conceitos básicos de finanças pessoais', duracao: '15 min', concluida: true, categoria: 'Básico' },
    { id: '2', titulo: 'Como Criar um Orçamento Eficiente', descricao: 'Técnicas para organizar suas receitas e despesas', duracao: '20 min', concluida: true, categoria: 'Básico' },
    { id: '3', titulo: 'Investimentos para Iniciantes', descricao: 'Conheça os principais tipos de investimento', duracao: '25 min', concluida: false, categoria: 'Intermediário' },
    { id: '4', titulo: 'Diversificação de Carteira', descricao: 'Como distribuir seus investimentos de forma inteligente', duracao: '30 min', concluida: false, categoria: 'Intermediário' },
    { id: '5', titulo: 'Planejamento de Aposentadoria', descricao: 'Prepare-se para o futuro com segurança', duracao: '35 min', concluida: false, categoria: 'Avançado' },
  ]);

  const [dicas] = useState([
    'Guarde pelo menos 10% da sua renda mensal',
    'Evite dívidas com juros altos',
    'Tenha um fundo de emergência de 6 meses',
    'Diversifique seus investimentos',
    'Revise seu orçamento mensalmente',
  ]);

  const progresso = (aulas.filter(a => a.concluida).length / aulas.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Educação Financeira</h1>
              <p className="text-gray-600 dark:text-gray-400">Aprenda a gerenciar melhor seu dinheiro</p>
            </div>
          </div>
        </div>

        {/* Progresso */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Seu Progresso</h3>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{progresso.toFixed(0)}%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {aulas.filter(a => a.concluida).length} de {aulas.length} aulas concluídas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Aulas */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Micro-aulas</h2>
            {aulas.map((aula) => (
              <div
                key={aula.id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    aula.concluida
                      ? 'bg-green-100 dark:bg-green-900/20'
                      : 'bg-purple-100 dark:bg-purple-900/20'
                  }`}>
                    {aula.concluida ? (
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <PlayCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{aula.titulo}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{aula.descricao}</p>
                      </div>
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full whitespace-nowrap">
                        {aula.categoria}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{aula.duracao}</span>
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        aula.concluida
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}>
                        {aula.concluida ? 'Revisar' : 'Iniciar'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Dicas */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dicas Rápidas</h3>
              </div>
              <ul className="space-y-3">
                {dicas.map((dica, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span>{dica}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Checklist */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Checklist de Poupança</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Criar orçamento mensal</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Definir metas financeiras</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Montar fundo de emergência</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Começar a investir</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Revisar gastos mensalmente</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
