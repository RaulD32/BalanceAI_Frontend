<template>
  <footer class="bg-green-200 text-green-900 py-12">
    <div
      class="container mx-auto px-6 flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex items-center justify-center md:justify-start gap-4 select-none">
        <img
          src="/logoBl.png"
          alt="Logo BalanceAI"
          class="w-18 h-18 object-contain"
        />
        <span class="text-2xl font-bold">
          BalanceAI
        </span>
      </div>

      <nav
        class="flex flex-col items-center gap-4 text-base font-semibold md:flex-row md:gap-8"
        aria-label="Enlaces legales"
      >
        <a href="#" class="hover:text-green-700 transition-colors duration-300">
          Aviso de privacidad
        </a>
        <a href="#" class="hover:text-green-700 transition-colors duration-300">
          Términos y condiciones
        </a>
      </nav>
    </div>

    <div class="mt-10 border-t border-green-300"></div>

    <div class="container mx-auto px-6 mt-6 text-center">
      <p class="text-sm text-green-800 select-text">
        &copy; 2025 BalanceAI. Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<script >
export default {
  name: "FooterComponent",
};
</script>
