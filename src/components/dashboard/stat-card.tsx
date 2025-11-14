'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  href: string;
  color: 'blue' | 'green' | 'red' | 'orange';
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
  orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
};

export default function StatCard({ title, value, icon: Icon, trend, href, color }: StatCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700">
        {/* Gradient background on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {value}
              </p>
              {trend && (
                <div className="flex items-center gap-1">
                  <span className={`text-sm font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.positive ? '↑' : '↓'} {trend.value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">vs. mês anterior</span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
