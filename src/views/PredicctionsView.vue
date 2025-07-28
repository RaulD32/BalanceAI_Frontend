<script setup lang="ts">
import { ref } from 'vue'
import { fetchAnnualPrediction } from '@/services/predictionAnual'
import { fetchMonthlyPrediction } from '@/services/predictionService'
import { fetchRangePrediction } from '@/services/predictionRange'
import type { AnnualPrediction } from '@/types/predictionAn'
import type { MonthlyPrediction } from '@/types/predictionFu'
import type { RangePredictionResult } from '@/types/predictionRa'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import ChartComponent from '@/components/IncomeChart.vue'

const selectedYear = ref(new Date().getFullYear())
const annualData = ref<AnnualPrediction | null>(null)
const selectedMonth = ref('')
const monthlyData = ref<MonthlyPrediction | null>(null)
const startDate = ref('')
const endDate = ref('')
const rangeData = ref<RangePredictionResult | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const lastPredictionType = ref<'anual' | 'mensual' | 'rango' | null>(null)

async function fetchAnnual() {
  try {
    loading.value = true
    error.value = null
    annualData.value = await fetchAnnualPrediction(Number(selectedYear.value))
    lastPredictionType.value = 'anual' // ✅ nuevo
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Error inesperado'
  } finally {
    loading.value = false
  }
}

async function fetchMonthly() {
  try {
    loading.value = true
    error.value = null
    const [year, month] = selectedMonth.value.split('-')
    monthlyData.value = await fetchMonthlyPrediction(Number(year), Number(month))
    lastPredictionType.value = 'mensual' // ✅ nuevo
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Error inesperado'
  } finally {
    loading.value = false
  }
}

async function fetchRange() {
  try {
    loading.value = true
    error.value = null
    rangeData.value = await fetchRangePrediction(startDate.value, endDate.value)
    lastPredictionType.value = 'rango' // ✅ nuevo
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Error inesperado'
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <HeaderComponent />

  <section
    class="min-h-screen bg-gradient-to-tr from-gray-100 via-gray-50 to-white py-16 px-8 flex flex-col items-center"
  >
    <h1 class="mb-16 text-4xl font-semibold text-gray-900 tracking-wide text-center max-w-4xl">
      Predicciones Inteligentes
    </h1>

    <div class="flex flex-col sm:flex-row justify-center gap-10 w-full max-w-7xl">
      <!-- Formulario Anual -->
      <section class="flex flex-col items-center flex-1 max-w-xs">
        <h2
          class="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2 w-full text-center"
        >
          Predicción Anual
        </h2>
        <form @submit.prevent="fetchAnnual" class="w-full">
          <input
            type="number"
            v-model="selectedYear"
            min="2000"
            max="2100"
            aria-label="Año"
            placeholder="Año"
            class="w-full px-5 py-3 rounded-md border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 transition"
          />
          <button
            type="submit"
            class="mt-4 w-full bg-gray-800 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Consultar
          </button>
        </form>
      </section>

      <!-- Formulario Mensual -->
      <section class="flex flex-col items-center flex-1 max-w-xs">
        <h2
          class="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2 w-full text-center"
        >
          Predicción Mensual
        </h2>
        <form @submit.prevent="fetchMonthly" class="w-full">
          <input
            type="month"
            v-model="selectedMonth"
            aria-label="Mes"
            class="w-full px-5 py-3 rounded-md border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 transition"
          />
          <button
            type="submit"
            class="mt-4 w-full bg-gray-800 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Calcular
          </button>
        </form>
      </section>

      <!-- Formulario Rango -->
      <section class="flex flex-col items-center flex-1 max-w-xs">
        <h2
          class="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2 w-full text-center"
        >
          Predicción por Rango
        </h2>
        <form @submit.prevent="fetchRange" class="flex gap-4 w-full">
          <input
            type="date"
            v-model="startDate"
            aria-label="Fecha inicial"
            class="flex-1 px-5 py-3 rounded-md border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 transition"
          />
          <input
            type="date"
            v-model="endDate"
            aria-label="Fecha final"
            class="flex-1 px-5 py-3 rounded-md border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 transition"
          />
        </form>
        <button
          @click.prevent="fetchRange"
          class="mt-4 w-full bg-gray-800 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-900 transition"
        >
          Calcular
        </button>
      </section>
    </div>

    <!-- Resultados -->
    <section
      v-if="annualData || monthlyData || rangeData"
      class="mt-16 w-full max-w-7xl flex flex-wrap justify-center gap-10 text-gray-800 text-base font-normal"
    >
      <p
        v-if="lastPredictionType"
        class="text-center text-lg font-semibold w-full text-green-700 mb-6"
      >
        Se generó correctamente tu predicción
        <span v-if="lastPredictionType === 'anual'">anual</span>
        <span v-else-if="lastPredictionType === 'mensual'">mensual</span>
        <span v-else>por rango</span>. Consulta los resultados a continuación:
      </p>

      <!-- Resultado Anual -->
      <div
        v-if="annualData"
        class="flex flex-col flex-grow min-w-[320px] p-6 border rounded-lg shadow-sm bg-white"
      >
        <h3 class="text-center font-semibold mb-4 text-lg">Resultado Anual</h3>
        <p class="mb-2">
          <strong>Total predicho:</strong> ${{ annualData.total_predicted.toLocaleString() }}
        </p>
        <p class="mb-2">
          <strong>Promedio mensual:</strong> ${{ annualData.average_monthly.toFixed(2) }}
        </p>
        <p class="mb-2"><strong>Crecimiento:</strong> {{ annualData.growth_projection }}</p>
        <p class="mb-2">
          <strong>Meses destacados:</strong> {{ annualData.best_months.join(', ') }}
        </p>
        <p class="mb-2">
          <strong>Meses desafiantes:</strong> {{ annualData.challenging_months.join(', ') }}
        </p>
        <p class="mb-6">
          <strong>Recomendaciones:</strong> {{ annualData.recommendations.join('; ') }}
        </p>
        <ChartComponent
          :labels="annualData.monthly_predictions.map((m) => m.month_name)"
          :data="annualData.monthly_predictions.map((m) => m.predicted_income)"
          title="Ingresos por mes"
          type="bar"
          class="flex-grow"
        />
      </div>

      <!-- Resultado Mensual -->
      <div
        v-if="monthlyData"
        class="flex flex-col flex-grow min-w-[320px] p-6 border rounded-lg shadow-sm bg-white"
      >
        <h3 class="text-center font-semibold mb-4 text-lg">Resultado Mensual</h3>
        <p class="mb-2">
          <strong>Mes:</strong> {{ monthlyData.month_name }} {{ monthlyData.year }}
        </p>
        <p class="mb-2">
          <strong>Ingreso estimado:</strong> ${{ monthlyData.predicted_income.toFixed(2) }}
        </p>
        <p class="mb-2"><strong>Confianza:</strong> {{ monthlyData.confidence_level }}</p>
        <p class="mb-2"><strong>Estacionalidad:</strong> x{{ monthlyData.seasonal_factor }}</p>
        <p class="mb-2">
          <strong>Comparación promedio:</strong> {{ monthlyData.comparison_to_average }}
        </p>
        <p class="mb-2">
          <strong>Históricos similares:</strong> {{ monthlyData.similar_historical_months }}
        </p>
      </div>

      <!-- Resultado Rango -->
      <div
        v-if="rangeData"
        class="flex flex-col flex-grow min-w-[320px] p-6 border rounded-lg shadow-sm bg-white text-center"
      >
        <h3 class="font-semibold mb-4 text-lg">Resultado por Rango</h3>
        <p class="mb-2"><strong>Rango:</strong> {{ rangeData.summary.date_range }}</p>
        <p class="mb-2"><strong>Meses totales:</strong> {{ rangeData.summary.total_months }}</p>
        <p class="mb-2">
          <strong>Años incluidos:</strong> {{ rangeData.summary.years_covered.join(', ') }}
        </p>
        <p class="mb-2">
          <strong>Total estimado:</strong> ${{ rangeData.total_predicted.toFixed(2) }}
        </p>
        <p class="mb-6">
          <strong>Promedio mensual:</strong> ${{ rangeData.average_monthly.toFixed(2) }}
        </p>
        <ChartComponent
          :labels="rangeData.monthly_data.map((m) => `${m.month_name} ${m.year}`)"
          :data="rangeData.monthly_data.map((m) => m.predicted_income)"
          title="Predicción personalizada"
          type="line"
          class="flex-grow"
        />
      </div>
    </section>

    <div
      v-if="loading"
      class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white font-semibold px-8 py-3 rounded-full shadow-lg animate-pulse select-none z-50"
    >
      Cargando predicciones...
    </div>

    <div
      v-if="error"
      class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg select-none z-50"
    >
      {{ error }}
    </div>
  </section>

  <FooterComponent />
</template>
