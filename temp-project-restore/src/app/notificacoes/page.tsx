'use client';

import { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'alerta' | 'sucesso';
  lida: boolean;
  data: string;
}

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([
    { id: '1', titulo: 'Meta atingida!', mensagem: 'Você atingiu 50% da meta "Viagem para Europa"', tipo: 'sucesso', lida: false, data: '2024-01-18' },
    { id: '2', titulo: 'Despesa alta detectada', mensagem: 'Seus gastos com alimentação estão 30% acima da média', tipo: 'alerta', lida: false, data: '2024-01-17' },
    { id: '3', titulo: 'Fatura do cartão', mensagem: 'Fatura do cartão de crédito vence em 3 dias', tipo: 'alerta', lida: true, data: '2024-01-15' },
    { id: '4', titulo: 'Receita registrada', mensagem: 'Salário de R$ 5.000,00 foi registrado', tipo: 'info', lida: true, data: '2024-01-05' },
  ]);

  const marcarComoLida = (id: string) => {
    setNotificacoes(notificacoes.map(n => n.id === id ? { ...n, lida: true } : n));
  };

  const remover = (id: string) => {
    setNotificacoes(notificacoes.filter(n => n.id !== id));
  };

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center relative">
              <Bell className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              {naoLidas > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {naoLidas}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notificações</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {naoLidas > 0 ? `${naoLidas} não lida${naoLidas > 1 ? 's' : ''}` : 'Todas as notificações lidas'}
              </p>
            </div>
          </div>
        </div>

        {/* Configurações */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configurações de Alertas</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 dark:text-gray-300">Alertas de gastos altos</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 dark:text-gray-300">Vencimento de contas</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 dark:text-gray-300">Progresso de metas</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-gray-700 dark:text-gray-300">Dicas financeiras</span>
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
            </label>
          </div>
        </div>

        {/* Lista de Notificações */}
        <div className="space-y-3">
          {notificacoes.map((notif) => (
            <div
              key={notif.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border transition-all ${
                notif.lida
                  ? 'border-gray-200 dark:border-gray-800'
                  : 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10'
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notif.tipo === 'sucesso'
                    ? 'bg-green-100 dark:bg-green-900/20'
                    : notif.tipo === 'alerta'
                    ? 'bg-yellow-100 dark:bg-yellow-900/20'
                    : 'bg-blue-100 dark:bg-blue-900/20'
                }`}>
                  <Bell className={`w-5 h-5 ${
                    notif.tipo === 'sucesso'
                      ? 'text-green-600 dark:text-green-400'
                      : notif.tipo === 'alerta'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{notif.titulo}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {new Date(notif.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{notif.mensagem}</p>
                  <div className="flex gap-2">
                    {!notif.lida && (
                      <button
                        onClick={() => marcarComoLida(notif.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        <Check className="w-3 h-3" />
                        Marcar como lida
                      </button>
                    )}
                    <button
                      onClick={() => remover(notif.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
