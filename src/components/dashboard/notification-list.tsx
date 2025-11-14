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
  success: 'text-green-600 bg-green-50 dark:bg-green-900/20',
  warning: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
  info: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
};

export default function NotificationList() {
  const [mounted, setMounted] = useState(false);
  const recentNotifications = mockNotifications.slice(0, 3);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Notificações Recentes
        </h3>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {recentNotifications.map((notification) => {
          const Icon = iconMap[notification.type];
          
          return (
            <div
              key={notification.id}
              className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${colorMap[notification.type]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  {notification.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {notification.message}
                </p>
                {mounted && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {new Date(notification.date).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
