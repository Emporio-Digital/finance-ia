// Types for Finance AI

export type TransactionType = 'income' | 'expense';
export type TransactionCategory = 'salary' | 'freelance' | 'investment' | 'food' | 'transport' | 'health' | 'entertainment' | 'bills' | 'other';
export type InvestmentMode = 'fixed' | 'funds' | 'crypto';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  description: string;
  date: string;
  account: string;
  attachment?: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface InvestmentSimulation {
  initialAmount: number;
  monthlyContribution: number;
  rate: number;
  months: number;
  mode: InvestmentMode;
}

export interface Price {
  id: string;
  monthly_price: number;
  annual_price: number;
  currency: string;
  active: boolean;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_cpf: string;
  referred_cpf: string;
  status: 'pending' | 'completed' | 'rejected';
  reward: string;
  created_at: string;
}
