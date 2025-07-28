export interface MonthlyDetail {
  month: number
  month_name: string
  predicted_income: number
  seasonal_factor: number
}

export interface QuarterlyBreakdown {
  quarter: string
  total: number
  months: number[]
}

export interface SeasonalAnalysis {
  highest_month: string
  lowest_month: string
  variation_percentage: number
}

export interface AnnualPrediction {
  status: string
  year: number
  total_predicted: number
  average_monthly: number
  monthly_predictions: MonthlyDetail[]
  quarterly_breakdown: QuarterlyBreakdown[]
  seasonal_analysis: SeasonalAnalysis
  growth_projection: string
  best_months: string[]
  challenging_months: string[]
  recommendations: string[]
}


