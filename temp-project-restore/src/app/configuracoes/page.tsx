'use client';

import { useState } from 'react';
import { Settings, User, Lock, Globe, Moon, Bell, Building2, Link as LinkIcon } from 'lucide-react';

export default function ConfiguracoesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [idioma, setIdioma] = useState('pt');
  const [showOpenFinanceModal, setShowOpenFinanceModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Configurações</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gerencie sua conta e preferências</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Perfil */}
          <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Perfil</h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  defaultValue="João Silva"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="joao.silva@email.com"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  defaultValue="(11) 98765-4321"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <button className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                Salvar Alterações
              </button>
            </div>
          </div>

          {/* Open Finance Integration */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 rounded-xl bg-green-500/20 backdrop-blur-sm">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  Open Finance
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  Conecte suas contas bancárias de forma segura através do Open Finance do Banco Central para sincronização automática de transações.
                </p>
                <button 
                  onClick={() => setShowOpenFinanceModal(true)}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                >
                  <LinkIcon className="w-4 h-4" />
                  Conectar Conta Bancária
                </button>
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Segurança</h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <button className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                Alterar Senha
              </button>
            </div>
          </div>

          {/* Preferências */}
          <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Preferências</h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                  Idioma
                </label>
                <select
                  value={idioma}
                  onChange={(e) => setIdioma(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="pt">Português (BR)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Modo Escuro</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ativar tema escuro</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Notificações Push</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receber alertas no navegador</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Plano */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Plano Premium</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              Aproveite todos os recursos sem limitações
            </p>
            <button className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
              Ver Planos
            </button>
          </div>
        </div>
      </div>

      {/* Open Finance Modal */}
      {showOpenFinanceModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Conectar Open Finance
              </h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Conecte suas contas bancárias de forma segura através do Open Finance do Banco Central.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Benefícios:</h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Sincronização automática de transações</li>
                  <li>• Dados sempre atualizados</li>
                  <li>• Conexão segura e criptografada</li>
                  <li>• Aprovado pelo Banco Central</li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                <p className="text-xs text-yellow-800 dark:text-yellow-400">
                  <strong>Importante:</strong> Você será redirecionado para o ambiente seguro do seu banco para autorizar o compartilhamento de dados.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowOpenFinanceModal(false)}
                className="flex-1 px-4 py-3 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  alert('Funcionalidade de integração Open Finance em desenvolvimento. Em breve você poderá conectar suas contas bancárias!');
                  setShowOpenFinanceModal(false);
                }}
                className="flex-1 px-4 py-3 text-sm bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
              >
                Conectar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
