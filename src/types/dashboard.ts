// src/types/dashboard.ts
export interface HistoricalData {
  month: string
  actual_income: number
}

export interface Prediction {
  month: string
  predicted_income: number
}

export interface Insights {
  current_year_total: number
  predicted_year_total: number
  growth_percentage: number
  average_monthly_current: number
  average_monthly_predicted: number
  best_model: string
  months_with_data: number
}

export interface Summary {
  total_historical: number
  total_predicted: number
  months_with_data: number
  growth_projection: number
}

export interface DashboardData {
  status: string
  historical_data: HistoricalData[]
  predictions: Prediction[]
  insights: Insights
  summary: Summary
}
