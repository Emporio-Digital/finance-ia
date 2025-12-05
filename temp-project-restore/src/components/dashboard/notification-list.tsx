'use client';

import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { mockNotifications } from '@/lib/mock-data';
import { useState, useEffect } from 'react';

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: {
    bg: 'bg-[#E7F7EF] dark:bg-[#00875A]/10',
    icon: 'text-[#00875A]',
    dot: 'bg-[#00875A]'
  },
  warning: {
    bg: 'bg-[#FFF4E6] dark:bg-[#FF991F]/10',
    icon: 'text-[#FF991F]',
    dot: 'bg-[#FF991F]'
  },
  info: {
    bg: 'bg-[#E8F3FF] dark:bg-[#0066CC]/10',
    icon: 'text-[#0066CC]',
    dot: 'bg-[#0066CC]'
  },
};

export default function NotificationList() {
  const [mounted, setMounted] = useState(false);
  const recentNotifications = mockNotifications.slice(0, 3);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white dark:bg-[#111315] rounded-xl p-6 border border-[#E6E8EC] dark:border-[#272B30]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#1A1D1F] dark:text-[#F7F8F9] mb-1">
            Notificações
          </h3>
          <p className="text-xs text-[#6F767E] dark:text-[#9A9FA5]">
            Atualizações recentes
          </p>
        </div>
        <div className="relative">
          <Bell className="w-5 h-5 text-[#6F767E] dark:text-[#9A9FA5]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#DE350B] rounded-full"></span>
        </div>
      </div>

      <div className="space-y-3">
        {recentNotifications.map((notification) => {
          const Icon = iconMap[notification.type];
          const colors = colorMap[notification.type];
          
          return (
            <div
              key={notification.id}
              className="group flex gap-3 p-4 rounded-lg bg-[#F7F8F9] dark:bg-[#1A1D1F] hover:bg-[#EFEFEF] dark:hover:bg-[#272B30] transition-all duration-200 cursor-pointer border border-transparent hover:border-[#E6E8EC] dark:hover:border-[#33383F]"
            >
              <div className={`flex-shrink-0 p-2 rounded-lg ${colors.bg} transition-transform duration-200 group-hover:scale-105`}>
                <Icon className={`w-4 h-4 ${colors.icon}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-[#1A1D1F] dark:text-[#F7F8F9] leading-snug">
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full ${colors.dot} mt-1`} />
                  )}
                </div>
                <p className="text-xs text-[#6F767E] dark:text-[#9A9FA5] line-clamp-2 leading-relaxed mb-2">
                  {notification.message}
                </p>
                {mounted && (
                  <p className="text-xs text-[#9A9FA5] dark:text-[#6F767E] font-medium">
                    {new Date(notification.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-2.5 text-sm font-medium text-[#6F767E] dark:text-[#9A9FA5] hover:text-[#1A1D1F] dark:hover:text-[#F7F8F9] transition-colors">
        Ver todas as notificações
      </button>
    </div>
  );
}
