// Mock data for Finance AI

import { Transaction, Goal, Notification, ChatMessage } from './types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    category: 'salary',
    description: 'Salário mensal',
    date: '2024-01-15',
    account: 'Conta Corrente',
  },
  {
    id: '2',
    type: 'expense',
    amount: 150,
    category: 'food',
    description: 'Supermercado',
    date: '2024-01-16',
    account: 'Cartão de Crédito',
  },
  {
    id: '3',
    type: 'expense',
    amount: 80,
    category: 'transport',
    description: 'Combustível',
    date: '2024-01-17',
    account: 'Conta Corrente',
  },
  {
    id: '4',
    type: 'income',
    amount: 800,
    category: 'freelance',
    description: 'Projeto freelance',
    date: '2024-01-18',
    account: 'Conta Corrente',
  },
];

export const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Viagem de férias',
    targetAmount: 5000,
    currentAmount: 2300,
    deadline: '2024-12-31',
    category: 'Lazer',
  },
  {
    id: '2',
    title: 'Reserva de emergência',
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: '2024-06-30',
    category: 'Segurança',
  },
  {
    id: '3',
    title: 'Novo notebook',
    targetAmount: 4000,
    currentAmount: 1200,
    deadline: '2024-08-15',
    category: 'Tecnologia',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Meta atingida!',
    message: 'Você alcançou 65% da sua meta "Reserva de emergência"',
    type: 'success',
    date: '2024-01-18',
    read: false,
  },
  {
    id: '2',
    title: 'Despesa alta detectada',
    message: 'Seus gastos com alimentação estão 20% acima da média',
    type: 'warning',
    date: '2024-01-17',
    read: false,
  },
  {
    id: '3',
    title: 'Lembrete de pagamento',
    message: 'Fatura do cartão vence em 3 dias',
    type: 'info',
    date: '2024-01-16',
    read: true,
  },
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Quanto gastei com alimentação este mês?',
    timestamp: '2024-01-18T10:30:00',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Você gastou R$ 450 com alimentação neste mês, o que representa 15% do seu orçamento total.',
    timestamp: '2024-01-18T10:30:05',
  },
];

export const calculateBalance = (transactions: Transaction[]) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    balance: income - expenses,
    income,
    expenses,
  };
};

export const categoryLabels: Record<string, string> = {
  salary: 'Salário',
  freelance: 'Freelance',
  investment: 'Investimentos',
  food: 'Alimentação',
  transport: 'Transporte',
  health: 'Saúde',
  entertainment: 'Entretenimento',
  bills: 'Contas',
  other: 'Outros',
};
