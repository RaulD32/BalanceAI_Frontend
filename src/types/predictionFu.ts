export interface MonthlyPrediction {
  status: string
  year: number
  month: number
  month_name: string
  predicted_income: number
  confidence_level: string
  seasonal_factor: number
  comparison_to_average: string
  similar_historical_months: string[]  // <-- Cambiar esto
}
