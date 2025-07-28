// services/predictionRa.ts

import type { RangePredictionResult } from '@/types/predictionRa'

export async function fetchRangePrediction(startDate: string, endDate: string): Promise<RangePredictionResult> {
  const res = await fetch('/api/predict/range', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ start_date: startDate, end_date: endDate }),
  })

  if (!res.ok) {
    throw new Error('Error al obtener predicción de rango')
  }

  const data = await res.json()
  return data as RangePredictionResult
}
