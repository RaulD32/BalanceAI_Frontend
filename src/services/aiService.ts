// services/aiService.ts
import type { AIAnalysisResponse } from '@/types/aiAnalysis'

export async function fetchAIAnalysisData(marketContext: string): Promise<AIAnalysisResponse> {
  const res = await fetch('/api/analyze/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ market_context: marketContext }),
  })
  if (!res.ok) throw new Error('Error en análisis IA')
  return await res.json()
}
