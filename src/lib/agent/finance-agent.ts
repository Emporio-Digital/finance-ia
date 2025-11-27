import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  list_transactions,
  list_expenses,
  list_incomes,
  list_goals,
  create_goal,
  update_goal_progress,
  create_alert,
  get_monthly_summary,
  predict_month_end_balance,
  analyze_spending_patterns,
} from './tools';

// Inicializar Gemini com a chave da env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Definição das ferramentas disponíveis para o agente
const tools = [
  {
    name: 'list_transactions',
    description: 'Lista todas as transações do usuário',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'list_expenses',
    description: 'Lista apenas as despesas do usuário',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'list_incomes',
    description: 'Lista apenas as receitas do usuário',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'list_goals',
    description: 'Lista as metas financeiras do usuário',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'create_goal',
    description: 'Cria uma nova meta financeira',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
        title: { type: 'string', description: 'Título da meta' },
        value: { type: 'number', description: 'Valor alvo da meta' },
        deadline: { type: 'string', description: 'Data limite (ISO format)' },
      },
      required: ['user_id', 'title', 'value', 'deadline'],
    },
  },
  {
    name: 'update_goal_progress',
    description: 'Atualiza o progresso de uma meta',
    parameters: {
      type: 'object',
      properties: {
        goal_id: { type: 'string', description: 'ID da meta' },
        progress: { type: 'number', description: 'Novo valor de progresso' },
      },
      required: ['goal_id', 'progress'],
    },
  },
  {
    name: 'create_alert',
    description: 'Cria um alerta para o usuário',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
        title: { type: 'string', description: 'Título do alerta' },
        message: { type: 'string', description: 'Mensagem do alerta' },
        severity: {
          type: 'string',
          enum: ['low', 'medium', 'high'],
          description: 'Nível de severidade',
        },
      },
      required: ['user_id', 'title', 'message', 'severity'],
    },
  },
  {
    name: 'get_monthly_summary',
    description: 'Obtém resumo financeiro do mês atual',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'predict_month_end_balance',
    description: 'Prevê o saldo no final do mês',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
      },
      required: ['user_id'],
    },
  },
  {
    name: 'analyze_spending_patterns',
    description: 'Analisa padrões de gastos semanais',
    parameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string', description: 'ID do usuário' },
      },
      required: ['user_id'],
    },
  },
];

// Mapa de funções executáveis
const functionMap: Record<string, Function> = {
  list_transactions,
  list_expenses,
  list_incomes,
  list_goals,
  create_goal,
  update_goal_progress,
  create_alert,
  get_monthly_summary,
  predict_month_end_balance,
  analyze_spending_patterns,
};

export interface AgentMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class FinanceAIAgent {
  private model;
  private systemPrompt = `Você é o FinanceAI-Agent, um assistente financeiro inteligente e autônomo.

PERSONALIDADE:
- Responda de forma curta, natural e objetiva
- Use linguagem simples e humana
- Seja proativo e útil
- Baseie todas as respostas em dados reais do usuário

CAPACIDADES:
- Analisar receitas, despesas e metas
- Prever saldos futuros
- Detectar padrões de gastos anormais
- Criar alertas automáticos
- Sugerir ações financeiras

REGRAS DE AUTONOMIA:
1. Se gastos semanais aumentarem +35%, crie alerta automático
2. Se prever saldo negativo no fim do mês, alerte e sugira ações
3. Se meta estiver atrasada, sugira ajustes
4. Se detectar padrões estranhos, alerte o usuário

IMPORTANTE:
- SEMPRE responda todas as mensagens do usuário
- NUNCA deixe mensagens sem resposta
- Se não tiver dados, explique e sugira o que o usuário pode fazer
- Seja conversacional e amigável

Sempre use as ferramentas disponíveis para acessar dados reais antes de responder.`;

  constructor() {
    this.model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: this.systemPrompt,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });
  }

  async chat(userId: string, message: string, history: AgentMessage[] = []) {
    try {
      console.log('[FinanceAI-Agent] Recebendo mensagem:', message);
      
      // Converte histórico para formato do Gemini
      const chatHistory = history.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      const chat = this.model.startChat({
        history: chatHistory,
      });

      // Adiciona contexto do usuário à mensagem
      const contextualMessage = `[USER_ID: ${userId}]\n${message}`;

      console.log('[FinanceAI-Agent] Enviando para Gemini...');
      const result = await chat.sendMessage(contextualMessage);
      const response = result.response.text();
      
      console.log('[FinanceAI-Agent] Resposta recebida:', response);

      return {
        success: true,
        message: response,
      };
    } catch (error: any) {
      console.error('[FinanceAI-Agent] Erro no chat do agente:', error);
      
      // Retornar resposta de fallback em caso de erro
      return {
        success: true,
        message: 'Olá! Sou seu assistente financeiro. No momento estou com dificuldades técnicas, mas posso ajudá-lo com informações gerais sobre finanças. Como posso ajudar?',
      };
    }
  }

  async runAutonomousAnalysis(userId: string) {
    try {
      console.log(`[FinanceAI-Agent] Iniciando análise autônoma para usuário ${userId}`);

      // 1. Analisar padrões de gastos
      const patterns = await analyze_spending_patterns(userId);
      if (patterns.is_above_normal) {
        await create_alert(
          userId,
          'Atenção aos gastos',
          `Você gastou ${patterns.percentage_change.toFixed(1)}% acima do seu padrão semanal.`,
          'medium'
        );
        console.log(`[FinanceAI-Agent] Alerta criado: gastos acima do normal`);
      }

      // 2. Prever saldo final do mês
      const prediction = await predict_month_end_balance(userId);
      if (prediction.predicted_end_balance < 0) {
        await create_alert(
          userId,
          'Risco de saldo negativo',
          `Seu saldo pode ficar negativo no fim do mês. Considere reduzir gastos em R$ ${Math.abs(prediction.predicted_end_balance).toFixed(2)}.`,
          'high'
        );
        console.log(`[FinanceAI-Agent] Alerta criado: risco de saldo negativo`);
      }

      // 3. Verificar metas atrasadas
      const goals = await list_goals(userId);
      const now = new Date();

      for (const goal of goals) {
        const deadline = new Date(goal.deadline);
        const daysUntilDeadline = Math.ceil(
          (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );
        const progress = (goal.current_amount / goal.target_amount) * 100;
        const expectedProgress = Math.max(
          0,
          100 - (daysUntilDeadline / 30) * 100
        ); // Assume meta de 30 dias

        if (progress < expectedProgress - 20 && daysUntilDeadline > 0) {
          await create_alert(
            userId,
            'Meta atrasada',
            `Sua meta "${goal.title}" está ${(expectedProgress - progress).toFixed(0)}% abaixo do esperado.`,
            'medium'
          );
          console.log(`[FinanceAI-Agent] Alerta criado: meta atrasada - ${goal.title}`);
        }
      }

      // 4. Detectar despesas repetidas fora de padrão
      const expenses = await list_expenses(userId);
      const recentExpenses = expenses.slice(0, 10);
      const categoryCount: Record<string, number> = {};

      recentExpenses.forEach((expense) => {
        categoryCount[expense.category] = (categoryCount[expense.category] || 0) + 1;
      });

      for (const [category, count] of Object.entries(categoryCount)) {
        if (count >= 3) {
          const totalCategory = recentExpenses
            .filter((e) => e.category === category)
            .reduce((sum, e) => sum + e.amount, 0);

          await create_alert(
            userId,
            'Padrão de gastos detectado',
            `Você fez ${count} compras recentes em "${category}" totalizando R$ ${totalCategory.toFixed(2)}.`,
            'low'
          );
          console.log(`[FinanceAI-Agent] Alerta criado: padrão detectado - ${category}`);
        }
      }

      console.log(`[FinanceAI-Agent] Análise autônoma concluída para usuário ${userId}`);

      return {
        success: true,
        message: 'Análise autônoma concluída',
      };
    } catch (error) {
      console.error('[FinanceAI-Agent] Erro na análise autônoma:', error);
      return {
        success: false,
        message: 'Erro ao executar análise autônoma',
      };
    }
  }
}

export const financeAgent = new FinanceAIAgent();
