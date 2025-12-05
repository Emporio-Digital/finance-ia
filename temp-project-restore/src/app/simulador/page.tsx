'use client';

import { useState } from 'react';
import { LineChart, TrendingUp, Calculator } from 'lucide-react';

export default function SimuladorPage() {
  const [modo, setModo] = useState<'renda-fixa' | 'fundos' | 'cripto'>('renda-fixa');
  const [valorInicial, setValorInicial] = useState('10000');
  const [aporteMensal, setAporteMensal] = useState('500');
  const [taxa, setTaxa] = useState('10');
  const [tempo, setTempo] = useState('12');
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    const vInicial = parseFloat(valorInicial) || 0;
    const aporte = parseFloat(aporteMensal) || 0;
    const taxaAnual = parseFloat(taxa) || 0;
    const meses = parseInt(tempo) || 0;

    const taxaMensal = taxaAnual / 12 / 100;
    
    let montante = vInicial;
    for (let i = 0; i < meses; i++) {
      montante = montante * (1 + taxaMensal) + aporte;
    }

    setResultado(montante);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <LineChart className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Simulador de Investimentos</h1>
              <p className="text-gray-600 dark:text-gray-400">Projete seus rendimentos</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Configurar Simulação</h3>

            {/* Modo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tipo de Investimento
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setModo('renda-fixa')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    modo === 'renda-fixa'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Renda Fixa
                </button>
                <button
                  onClick={() => setModo('fundos')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    modo === 'fundos'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Fundos
                </button>
                <button
                  onClick={() => setModo('cripto')}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    modo === 'cripto'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Cripto
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Valor Inicial (R$)
                </label>
                <input
                  type="number"
                  value={valorInicial}
                  onChange={(e) => setValorInicial(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aporte Mensal (R$)
                </label>
                <input
                  type="number"
                  value={aporteMensal}
                  onChange={(e) => setAporteMensal(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Taxa Anual (%)
                </label>
                <input
                  type="number"
                  value={taxa}
                  onChange={(e) => setTaxa(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Período (meses)
                </label>
                <input
                  type="number"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={calcular}
              className="w-full mt-6 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calcular Projeção
            </button>
          </div>

          {/* Result */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resultado da Simulação</h3>

            {resultado !== null ? (
              <div className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Valor Final Projetado</p>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                    R$ {resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      +{((resultado / (parseFloat(valorInicial) + parseFloat(aporteMensal) * parseInt(tempo)) - 1) * 100).toFixed(2)}% de rendimento
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Valor Investido</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      R$ {(parseFloat(valorInicial) + parseFloat(aporteMensal) * parseInt(tempo)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rendimento Total</span>
                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                      R$ {(resultado - (parseFloat(valorInicial) + parseFloat(aporteMensal) * parseInt(tempo))).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-sm text-blue-900 dark:text-blue-300">
                    💡 <strong>Dica:</strong> Investimentos em {modo === 'renda-fixa' ? 'renda fixa' : modo === 'fundos' ? 'fundos' : 'criptomoedas'} 
                    {modo === 'cripto' ? ' são mais voláteis. Diversifique seus investimentos.' : ' são mais seguros para objetivos de curto prazo.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <Calculator className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Preencha os campos e clique em "Calcular Projeção" para ver os resultados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
