export interface AIAnalysisResponse {
  status: string
  ai_analysis: {
    trend_analysis: string
    seasonal_patterns: string
    risk_factors: string
    strategic_recommendations: string
    improvement_opportunities: string
    critical_months: string
    overall_assessment: string
  }
  business_insights: {
    recomendaciones: {
      optimizacion_recursos_meses_bajos: string
      capitalizacion_meses_altos: string
      estrategias_flujo_caja: string
      planificacion_inversiones: string
      gestion_riesgos: string
    }
  }
  insights: {
    current_year_total: number
    predicted_year_total: number
    growth_percentage: number
    average_monthly_current: number
    average_monthly_predicted: number
    best_model: string
    months_with_data: number
  }
}
