import { supabaseAdmin } from '@/lib/supabase';

// ==================== TRANSAÇÕES ====================

export async function list_transactions(user_id: string) {
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function list_expenses(user_id: string) {
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .eq('user_id', user_id)
    .eq('type', 'expense')
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function list_incomes(user_id: string) {
  const { data, error } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .eq('user_id', user_id)
    .eq('type', 'income')
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
}

// ==================== METAS ====================

export async function list_goals(user_id: string) {
  const { data, error } = await supabaseAdmin
    .from('goals')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function create_goal(
  user_id: string,
  title: string,
  value: number,
  deadline: string
) {
  const { data, error } = await supabaseAdmin
    .from('goals')
    .insert({
      user_id,
      title,
      target_amount: value,
      current_amount: 0,
      deadline,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function update_goal_progress(goal_id: string, progress: number) {
  const { data, error } = await supabaseAdmin
    .from('goals')
    .update({ current_amount: progress })
    .eq('id', goal_id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==================== ALERTAS ====================

export async function create_alert(
  user_id: string,
  title: string,
  message: string,
  severity: 'low' | 'medium' | 'high'
) {
  const { data, error } = await supabaseAdmin
    .from('alerts')
    .insert({
      user_id,
      title,
      message,
      severity,
      read: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==================== HISTÓRICO / PREVISÕES ====================

export async function get_monthly_summary(user_id: string) {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const { data: transactions, error } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .eq('user_id', user_id)
    .gte('date', firstDay.toISOString())
    .lte('date', lastDay.toISOString());

  if (error) throw error;

  const expenses = transactions?.filter((t) => t.type === 'expense') || [];
  const incomes = transactions?.filter((t) => t.type === 'income') || [];

  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncomes = incomes.reduce((sum, t) => sum + t.amount, 0);

  return {
    month: now.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
    total_expenses: totalExpenses,
    total_incomes: totalIncomes,
    balance: totalIncomes - totalExpenses,
    transactions_count: transactions?.length || 0,
  };
}

export async function predict_month_end_balance(user_id: string) {
  const summary = await get_monthly_summary(user_id);
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();

  // Projeção simples baseada na média diária
  const dailyExpenseAvg = summary.total_expenses / currentDay;
  const projectedExpenses = dailyExpenseAvg * daysInMonth;

  const predictedBalance = summary.total_incomes - projectedExpenses;

  return {
    current_balance: summary.balance,
    predicted_end_balance: predictedBalance,
    days_remaining: daysInMonth - currentDay,
    daily_expense_avg: dailyExpenseAvg,
  };
}

// ==================== ANÁLISE DE PADRÕES ====================

export async function analyze_spending_patterns(user_id: string) {
  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Última semana
  const { data: lastWeekData } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .eq('user_id', user_id)
    .eq('type', 'expense')
    .gte('date', lastWeek.toISOString());

  // Semana anterior
  const { data: previousWeekData } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .eq('user_id', user_id)
    .eq('type', 'expense')
    .gte('date', twoWeeksAgo.toISOString())
    .lt('date', lastWeek.toISOString());

  const lastWeekTotal = lastWeekData?.reduce((sum, t) => sum + t.amount, 0) || 0;
  const previousWeekTotal = previousWeekData?.reduce((sum, t) => sum + t.amount, 0) || 0;

  const percentageChange =
    previousWeekTotal > 0 ? ((lastWeekTotal - previousWeekTotal) / previousWeekTotal) * 100 : 0;

  return {
    last_week_total: lastWeekTotal,
    previous_week_total: previousWeekTotal,
    percentage_change: percentageChange,
    is_above_normal: percentageChange > 35,
  };
}
