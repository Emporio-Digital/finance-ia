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
    <div className="flex min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1A1A2E] to-[#16213E]">
      <Sidebar />
      
      <main className="flex-1 lg:ml-72 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
            Visão Geral
          </h1>
          <p className="text-sm text-gray-400 font-medium">
            Acompanhe suas finanças em tempo real
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8">
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
            color="purple"
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
