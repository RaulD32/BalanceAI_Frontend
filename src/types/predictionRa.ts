export interface MonthlyData {
  date: string
  year: number
  month: number
  month_name: string
  predicted_income: number
}

export interface RangePredictionSummary {
  total_months: number
  date_range: string
  years_covered: number[]
}

export interface RangePredictionResult {
  status: string
  start_date: string
  end_date: string
  total_months: number
  total_predicted: number
  average_monthly: number
  monthly_data: MonthlyData[]
  summary: RangePredictionSummary
}
