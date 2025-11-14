'use client';

import { useState } from 'react';
import { Shield, Users, Gift, Download, AlertTriangle } from 'lucide-react';

interface Indicacao {
  id: string;
  nomeIndicado: string;
  emailIndicado: string;
  status: 'pendente' | 'ativo' | 'cancelado';
  dataIndicacao: string;
  brinde: string;
}

export default function AdminPage() {
  const [indicacoes] = useState<Indicacao[]>([
    { id: '1', nomeIndicado: 'Maria Santos', emailIndicado: 'maria@email.com', status: 'ativo', dataIndicacao: '2024-01-15', brinde: 'Camiseta Premium' },
    { id: '2', nomeIndicado: 'Pedro Oliveira', emailIndicado: 'pedro@email.com', status: 'pendente', dataIndicacao: '2024-01-18', brinde: 'Caneca Personalizada' },
    { id: '3', nomeIndicado: 'Ana Costa', emailIndicado: 'ana@email.com', status: 'ativo', dataIndicacao: '2024-01-10', brinde: 'Mochila' },
  ]);

  const [brindes] = useState([
    { id: '1', nome: 'Camiseta Premium', estoque: 50, valor: 'R$ 79,90' },
    { id: '2', nome: 'Caneca Personalizada', estoque: 100, valor: 'R$ 29,90' },
    { id: '3', nome: 'Mochila', estoque: 30, valor: 'R$ 149,90' },
    { id: '4', nome: 'Garrafa Térmica', estoque: 75, valor: 'R$ 59,90' },
  ]);

  const totalIndicacoes = indicacoes.length;
  const indicacoesAtivas = indicacoes.filter(i => i.status === 'ativo').length;
  const indicacoesPendentes = indicacoes.filter(i => i.status === 'pendente').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Painel Admin</h1>
              <p className="text-gray-600 dark:text-gray-400">Gerenciar indicações e brindes</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Indicações</p>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalIndicacoes}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Indicações Ativas</p>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{indicacoesAtivas}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Pendentes</p>
            </div>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{indicacoesPendentes}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Indicações */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Indicações</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Nome</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Data</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Brinde</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {indicacoes.map((indicacao) => (
                      <tr key={indicacao.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{indicacao.nomeIndicado}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{indicacao.emailIndicado}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(indicacao.dataIndicacao).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{indicacao.brinde}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            indicacao.status === 'ativo'
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                              : indicacao.status === 'pendente'
                              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                              : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                          }`}>
                            {indicacao.status === 'ativo' ? 'Ativo' : indicacao.status === 'pendente' ? 'Pendente' : 'Cancelado'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Brindes */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Brindes</h3>
              </div>
              <div className="space-y-3">
                {brindes.map((brinde) => (
                  <div key={brinde.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{brinde.nome}</p>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{brinde.valor}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Estoque: <span className="font-semibold">{brinde.estoque}</span> unidades
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors">
                Gerenciar Brindes
              </button>
            </div>

            {/* Regras Anti-Fraude */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Anti-Fraude</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Validação de CPF obrigatória</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Limite de 5 indicações/mês</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Verificação de email único</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 dark:text-red-400">•</span>
                  <span>Logs LGPD ativos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
