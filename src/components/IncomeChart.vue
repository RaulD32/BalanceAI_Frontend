<script setup lang="ts">
import { computed, defineProps } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'
import type { ChartOptions } from 'chart.js'

// Registrar componentes necesarios
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
)

// Props del componente
const props = defineProps<{
  labels: string[]
  data: number[]
  title?: string
  type?: 'bar' | 'line'
}>()

// Datos del gráfico
const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.title || 'Ingresos',
      backgroundColor: 'rgba(34,197,94,0.6)',
      borderColor: 'rgba(21,128,61,1)',
      borderWidth: 1,
      fill: props.type !== 'line',
      data: props.data,
      tension: 0.3,
      pointRadius: 4,
    },
  ],
}))

// Opciones del gráfico (tipado dinámico según tipo)
const chartOptions = computed<ChartOptions<'bar' | 'line'>>(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: !!props.title,
      text: props.title || '',
      color: '#166534',
      font: {
        size: 18,
        weight: 'bold',
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number | string) =>
          `$${Number(value).toLocaleString()}`,
      },
    },
  },
}))
</script>

<template>
  <div class="w-full max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow-md">
    <Bar v-if="props.type !== 'line'" :data="chartData" :options="chartOptions" />
    <Line v-else :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
/* Puedes agregar estilos extra si quieres mejorar el diseño aún más */
</style>
