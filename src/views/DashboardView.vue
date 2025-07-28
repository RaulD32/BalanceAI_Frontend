<template>
    <HeaderComponent />
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-indigo-700 mb-10">📊 Panel de Ingresos</h1>

    <!-- Mostramos solo si hay datos -->
    <div v-if="dashboardData" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- Predicciones -->
      <div class="bg-yellow-50 p-6 rounded shadow-lg flex flex-col">
        <h3 class="text-2xl font-semibold text-yellow-700 mb-6 border-b border-yellow-300 pb-2">🔮 Predicciones</h3>
        <ul class="grid grid-cols-2 gap-3 text-yellow-900 text-lg">
          <li v-for="item in dashboardData.predictions" :key="item.month">
            {{ item.month }}: ${{ item.predicted_income.toFixed(2) }}
          </li>
        </ul>
      </div>

      <!-- Insights -->
      <div class="bg-blue-50 p-6 rounded shadow-lg flex flex-col">
        <h3 class="text-2xl font-semibold text-blue-700 mb-6 border-b border-blue-300 pb-2">📈 Perspectivas</h3>
        <ul class="text-blue-900 text-lg space-y-2">
          <li>💵 Ingreso total actual: ${{ dashboardData.insights.current_year_total.toFixed(2) }}</li>
          <!-- <li>📊 Ingreso promedio mensual: ${{ dashboardData.insights.average_monthly_income.toFixed(2) }}</li> -->
          <li>📈 Porcentaje de crecimiento: {{ dashboardData.insights.growth_percentage.toFixed(2) }}%</li>
        </ul>
      </div>

      <!-- Gráfica de predicciones -->
      <div class="bg-white p-6 rounded shadow-lg flex flex-col md:col-span-2">
        <h3 class="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">📉 Predicciones 2025</h3>
        <IncomeChart
          :labels="predictedLabels"
          :data="predictedData"
          title="Predicciones 2025"
          type="line"
          class="flex-grow"
        />
      </div>

      <!-- Datos históricos -->
      <div class="bg-gray-50 p-6 rounded shadow-lg flex flex-col md:col-span-2">
        <h3 class="text-2xl font-semibold text-gray-700 mb-6 border-b border-gray-300 pb-2">📚 Datos Históricos</h3>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-800 text-lg max-h-[360px] overflow-y-auto">
          <li v-for="item in dashboardData.historical_data" :key="item.month">
            {{ item.month }}: ${{ item.actual_income.toFixed(2) }}
          </li>
        </ul>
      </div>

    </div>

    <!-- Loader o fallback -->
    <div v-else class="text-center text-gray-500 text-xl">
      Cargando datos del dashboard...
    </div>
  </div>
  <FooterComponent />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { fetchDashboardData } from '@/services/dashboardService'
import type { DashboardData } from '@/types/dashboard'
import IncomeChart from '@/components/IncomeChart.vue'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue' 

const dashboardData = ref<DashboardData>()

onMounted(async () => {
  try {
    dashboardData.value = await fetchDashboardData()
  } catch (error) {
    console.error('Error al cargar datos del dashboard:', error)
  }
})

const predictedLabels = computed(() => {
  return dashboardData.value?.predictions.map(p => p.month) ?? []
})

const predictedData = computed(() => {
  return dashboardData.value?.predictions.map(p => p.predicted_income) ?? []
})
</script>

<style scoped>
/* Puedes añadir estilos adicionales aquí si lo necesitas */
</style>
