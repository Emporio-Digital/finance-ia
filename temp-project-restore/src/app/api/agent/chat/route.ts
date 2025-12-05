import { NextRequest, NextResponse } from 'next/server';
import { financeAgent } from '@/lib/agent/finance-agent';

export async function POST(request: NextRequest) {
  try {
    const { userId, message, history } = await request.json();

    if (!userId || !message) {
      return NextResponse.json(
        { success: false, error: 'userId e message são obrigatórios' },
        { status: 400 }
      );
    }

    // Chamar o agente IA com Gemini
    const response = await financeAgent.chat(userId, message, history || []);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro na API de chat:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar mensagem', message: 'Desculpe, ocorreu um erro. Tente novamente.' },
      { status: 500 }
    );
  }
}
