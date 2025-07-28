
import type { MonthlyPrediction } from '@/types/predictionFu'

export async function fetchMonthlyPrediction(year: number, month: number): Promise<MonthlyPrediction> {
  const res = await fetch(`/api/predict/month/${year}/${month}`)
  if (!res.ok) throw new Error('Error al obtener predicción mensual')
  return res.json()
}
