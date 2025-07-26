<template>
  <div class="bg-green-50 min-h-screen flex flex-col">
    <HeaderComponent />
    
    <main class="flex-grow max-w-screen-xl mx-auto w-full px-4 py-10 flex flex-col gap-12">
      <HeroSection />

      
      <section class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <IngresosHistoricosComponent />
        <PrediccionesComponent />
        <IngresoEstimadoComponent />
        <GraficaPlaceholderComponent />
      </section>
    </main>
    
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import HeroSection from '@/components/layout/HeroComponent.vue'

import IngresosHistoricosComponent from '@/components/IngresosHistoricosComponent.vue'
import PrediccionesComponent from '@/components/PrediccionesComponent.vue'
import IngresoEstimadoComponent from '@/components/IngresoEstimadoComponent.vue'
import GraficaPlaceholderComponent from '@/components/GraficaPlaceholderComponent.vue'
</script>
