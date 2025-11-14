'use client';

import Sidebar from '@/components/layout/sidebar';
import StatCard from '@/components/dashboard/stat-card';
import FinanceChart from '@/components/dashboard/finance-chart';
import NotificationList from '@/components/dashboard/notification-list';
import { Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { mockTransactions, calculateBalance } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function Dashboard() {
  const { balance, income, expenses } = calculateBalance(mockTransactions);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bem-vindo ao Finance AI — organize suas finanças com clareza.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Saldo Total"
            value={formatCurrency(balance)}
            icon={Wallet}
            trend={{ value: '12%', positive: true }}
            href="/transacoes"
            color="blue"
          />
          <StatCard
            title="Receitas"
            value={formatCurrency(income)}
            icon={TrendingUp}
            trend={{ value: '8%', positive: true }}
            href="/receitas"
            color="green"
          />
          <StatCard
            title="Despesas"
            value={formatCurrency(expenses)}
            icon={TrendingDown}
            trend={{ value: '5%', positive: false }}
            href="/despesas"
            color="red"
          />
          <StatCard
            title="Metas Ativas"
            value="3"
            icon={Target}
            href="/metas"
            color="orange"
          />
        </div>

        {/* Charts and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FinanceChart />
          </div>
          <div>
            <NotificationList />
          </div>
        </div>
      </main>
    </div>
  );
}
