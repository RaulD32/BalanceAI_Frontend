<template>
  <div class="bg-green-50 min-h-screen flex flex-col">
    <HeaderComponent />

    <main class="flex-grow max-w-screen-xl mx-auto w-full px-4 py-10">
      <section class="p-6 bg-white rounded shadow-md max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-green-800 text-center">
          Análisis Inteligente con IA
        </h2>

        <!-- FORMULARIO -->
        <form @submit.prevent="fetchAIAnalysis" class="flex flex-col gap-4 mb-6">
          <label class="text-green-800 font-semibold">
            Contexto de mercado:
            <input
              type="text"
              v-model="marketContext"
              placeholder="Ej. Empresa fintech en México"
              class="border border-green-300 rounded px-4 py-2 w-full mt-1"
            />
          </label>
          <button
            type="submit"
            class="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700 transition self-start"
          >
            Analizar
          </button>
        </form>

        <p v-if="loading" class="mt-4 text-green-700">Analizando...</p>
        <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>

        <!-- RESULTADO -->
        <div v-if="analysis" class="mt-8 space-y-8 text-green-900">
          <!-- Sección Insights Numéricos -->
          <div>
            <h3 class="text-lg font-bold mb-2">📊 Insights Numéricos</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Ingreso total actual:</strong> {{ formatCurrency(analysis.insights.current_year_total) }}</li>
              <li><strong>Ingreso total proyectado:</strong> {{ formatCurrency(analysis.insights.predicted_year_total) }}</li>
              <li><strong>Crecimiento estimado:</strong> {{ analysis.insights.growth_percentage.toFixed(2) }}%</li>
              <li><strong>Promedio mensual actual:</strong> {{ formatCurrency(analysis.insights.average_monthly_current) }}</li>
              <li><strong>Promedio mensual proyectado:</strong> {{ formatCurrency(analysis.insights.average_monthly_predicted) }}</li>
              <li><strong>Mejor modelo:</strong> {{ analysis.insights.best_model }}</li>
              <li><strong>Meses con datos:</strong> {{ analysis.insights.months_with_data }}</li>
            </ul>
          </div>

          <!-- Análisis de IA -->
          <div>
            <h3 class="text-lg font-bold mb-2">🧠 Análisis de IA</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Tendencias:</strong> {{ analysis.ai_analysis.trend_analysis }}</div>
              <div><strong>Patrones estacionales:</strong> {{ analysis.ai_analysis.seasonal_patterns }}</div>
              <div><strong>Factores de riesgo:</strong> {{ analysis.ai_analysis.risk_factors }}</div>
              <div><strong>Meses críticos:</strong> {{ analysis.ai_analysis.critical_months }}</div>
              <div class="md:col-span-2"><strong>Oportunidades de mejora:</strong> {{ analysis.ai_analysis.improvement_opportunities }}</div>
              <div class="md:col-span-2"><strong>Recomendaciones estratégicas:</strong> {{ analysis.ai_analysis.strategic_recommendations }}</div>
              <div class="md:col-span-2"><strong>Evaluación general:</strong> {{ analysis.ai_analysis.overall_assessment }}</div>
            </div>
          </div>

          <!-- Recomendaciones de negocio -->
          <div>
            <h3 class="text-lg font-bold mb-2">💼 Recomendaciones de Negocio</h3>
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Optimización en meses bajos:</strong> {{ analysis.business_insights.recomendaciones.optimizacion_recursos_meses_bajos }}</li>
              <li><strong>Capitalización de meses altos:</strong> {{ analysis.business_insights.recomendaciones.capitalizacion_meses_altos }}</li>
              <li><strong>Estrategias de flujo de caja:</strong> {{ analysis.business_insights.recomendaciones.estrategias_flujo_caja }}</li>
              <li><strong>Planificación de inversiones:</strong> {{ analysis.business_insights.recomendaciones.planificacion_inversiones }}</li>
              <li><strong>Gestión de riesgos:</strong> {{ analysis.business_insights.recomendaciones.gestion_riesgos }}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AIAnalysisResponse } from '@/types/aiAnalysis'
import { fetchAIAnalysisData } from '@/services/aiService'

import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'

const marketContext = ref('')
const analysis = ref<AIAnalysisResponse | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchAIAnalysis() {
  if (!marketContext.value.trim()) return
  loading.value = true
  error.value = null
  analysis.value = null

  try {
    analysis.value = await fetchAIAnalysisData(marketContext.value)
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Ocurrió un error inesperado'
    }
  } finally {
    loading.value = false
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(value)
}
</script>
