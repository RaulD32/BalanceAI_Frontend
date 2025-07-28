<template>
  <div class="bg-green-50 min-h-screen flex flex-col">
    <Header />

    <main class="flex-grow max-w-screen-xl mx-auto w-full px-4 py-10 flex flex-col gap-12">
      <HeroSection />

      <section class="grid grid-cols-1 md:grid-cols-2 gap-10">
     
      </section>
    </main>

    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/HeaderComponent.vue'
import FooterComponent from '@/components/layout/FooterComponent.vue'
import HeroSection from '@/components/layout/HeroComponent.vue'

// import Prediccion2025 from '@/components/Prediccion2025.vue'
// import PrediccionMes from '@/components/PrediccionMes.vue'
// import PrediccionRango from '@/components/PrediccionRango.vue'
// import AnalisisIA from '@/components/AnalisisIA.vue'
// import Dashboard from '@/components/Dashboard.vue'
</script>
