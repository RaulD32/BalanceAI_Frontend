import type { AnnualPrediction } from '../types/predictionAn'

export async function fetchAnnualPrediction(year: number): Promise<AnnualPrediction> {
  const res = await fetch(`/api/predict/year/${year}`)
  if (!res.ok) throw new Error('Error al obtener predicción anual')
  return res.json()
}
