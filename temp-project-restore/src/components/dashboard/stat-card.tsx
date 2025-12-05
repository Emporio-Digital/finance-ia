'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  href?: string;
  color: 'blue' | 'green' | 'red' | 'purple';
}

const colorClasses = {
  blue: {
    gradient: 'from-blue-500/10 to-blue-600/5',
    icon: 'bg-blue-500/10 text-blue-400',
    trend: 'text-blue-400',
    hover: 'hover:from-blue-500/15 hover:to-blue-600/10',
    border: 'border-blue-500/20',
  },
  green: {
    gradient: 'from-green-500/10 to-green-600/5',
    icon: 'bg-green-500/10 text-green-400',
    trend: 'text-green-400',
    hover: 'hover:from-green-500/15 hover:to-green-600/10',
    border: 'border-green-500/20',
  },
  red: {
    gradient: 'from-red-500/10 to-red-600/5',
    icon: 'bg-red-500/10 text-red-400',
    trend: 'text-red-400',
    hover: 'hover:from-red-500/15 hover:to-red-600/10',
    border: 'border-red-500/20',
  },
  purple: {
    gradient: 'from-purple-500/10 to-purple-600/5',
    icon: 'bg-purple-500/10 text-purple-400',
    trend: 'text-purple-400',
    hover: 'hover:from-purple-500/15 hover:to-purple-600/10',
    border: 'border-purple-500/20',
  },
};

export default function StatCard({ title, value, icon: Icon, trend, href, color }: StatCardProps) {
  const colors = colorClasses[color];
  
  const content = (
    <div className={`
      relative overflow-hidden
      bg-gradient-to-br ${colors.gradient}
      backdrop-blur-xl
      border ${colors.border}
      rounded-2xl p-6
      transition-all duration-300
      ${href ? `cursor-pointer ${colors.hover} hover:scale-[1.02] hover:shadow-2xl hover:shadow-${color}-500/20` : ''}
      group
    `}>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.icon} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 backdrop-blur-sm ${colors.trend}`}>
              {trend.positive ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              <span className="text-xs font-semibold">{trend.value}</span>
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{value}</p>
        </div>
      </div>

      {/* Hover indicator */}
      {href && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
