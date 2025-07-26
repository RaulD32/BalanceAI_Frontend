<template>
  <section class="p-6 bg-green-50 rounded shadow-md max-w-xl mx-auto mb-8">
    <h2 class="text-2xl font-bold mb-4 text-green-800">Consulta ingresos futuros</h2>
    <form @submit.prevent class="flex flex-col sm:flex-row gap-4 items-center">
      <input
        type="month"
        v-model="selectedMonth"
        class="border border-green-300 rounded px-4 py-2 w-full sm:w-auto"
        aria-label="Selecciona mes y año"
      />
      <button
        type="submit"
        class="bg-green-600 text-white font-semibold px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Calcular
      </button>
    </form>

    <p v-if="selectedMonth" class="mt-4 text-gray-700">
      Previsión para: <strong>{{ formattedMonth }}</strong>
    </p>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMonth = ref('')

const formattedMonth = computed(() => {
  if (!selectedMonth.value) return ''
  const [year, month] = selectedMonth.value.split('-')
  const date = new Date(year, month - 1)
  return date.toLocaleString('es-ES', { month: 'long', year: 'numeric' })
})
</script>
