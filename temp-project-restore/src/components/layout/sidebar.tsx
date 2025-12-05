'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  History, 
  MessageCircle, 
  LineChart, 
  Bell, 
  GraduationCap, 
  Settings, 
  Menu,
  X,
  Shield
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Receitas', href: '/receitas', icon: TrendingUp },
  { name: 'Despesas', href: '/despesas', icon: TrendingDown },
  { name: 'Metas', href: '/metas', icon: Target },
  { name: 'Transações', href: '/transacoes', icon: History },
  { name: 'Assistente', href: '/assistente', icon: MessageCircle },
  { name: 'Simulador', href: '/simulador', icon: LineChart },
  { name: 'Notificações', href: '/notificacoes', icon: Bell },
  { name: 'Educação', href: '/educacao', icon: GraduationCap },
  { name: 'Configurações', href: '/configuracoes', icon: Settings },
  { name: 'Admin', href: '/admin', icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-5 left-5 z-50 p-3 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white shadow-2xl hover:scale-105 transition-transform duration-200"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-72 
          bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F1419]
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-purple-500/30">
                <LayoutDashboard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Finance AI</h1>
                <p className="text-xs text-gray-400 font-medium">Gestão inteligente</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    group flex items-center gap-3 px-4 py-3.5 rounded-xl 
                    transition-all duration-200 relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-lg shadow-purple-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                  <span className="relative z-10 font-medium text-sm">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-200 cursor-pointer group">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-200">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">João Silva</p>
                <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Plano Premium
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
