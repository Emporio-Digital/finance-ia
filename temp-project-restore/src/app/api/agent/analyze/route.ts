import { NextRequest, NextResponse } from 'next/server';
import { financeAgent } from '@/lib/agent/finance-agent';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 }
      );
    }

    const response = await financeAgent.runAutonomousAnalysis(userId);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro na análise autônoma:', error);
    return NextResponse.json(
      { error: 'Erro ao executar análise autônoma' },
      { status: 500 }
    );
  }
}

// Endpoint GET para cron jobs
export async function GET(request: NextRequest) {
  try {
    // Aqui você pode buscar todos os usuários ativos e executar análise para cada um
    // Por enquanto, retorna sucesso para configuração do cron
    return NextResponse.json({
      success: true,
      message: 'Endpoint de análise autônoma ativo',
    });
  } catch (error) {
    console.error('Erro no endpoint GET:', error);
    return NextResponse.json(
      { error: 'Erro no endpoint' },
      { status: 500 }
    );
  }
}
