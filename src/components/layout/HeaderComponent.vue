<template>
  <header :class="headerClass">
    <div class="mx-auto flex h-24 max-w-screen-xl items-center gap-8 px-6 sm:px-8 lg:px-12">
      <RouterLink to="/" class="text-green-900">
        <span class="sr-only">Home</span>
        <img src="/logoBl.png" alt="Logo BalanceAI" class="h-18 w-auto" />
      </RouterLink>

      <div class="flex flex-1 items-center justify-end md:justify-between text-green-900">
        <nav aria-label="Global" class="hidden md:block">
          <ul class="flex items-center gap-8 text-base font-semibold">
            <li v-for="item in menuItems" :key="item.name">
              <RouterLink :to="item.route" :class="linkClass">
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-6">
          <RouterLink
            to="/login"
            class="block rounded-md px-6 py-3 text-base font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors duration-300"
          >
            Iniciar Sesión
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const menuItems = [
  { name: 'Predecir', route: '/' },
  { name: 'Predecir', route: '/' },
  { name: 'Predecir', route: '/' },
  { name: 'Predecir', route: '/' },
  { name: 'Predecir', route: '/' },
  { name: 'Predecir', route: '/' }
]

const headerClass =
  'bg-green-50 text-green-900 shadow-md shadow-green-500 border-b-4 border-green-600'

const linkClass =
  'transition-colors duration-300 relative inline-block ' +
  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-900 ' +
  'after:transition-all after:duration-300 hover:after:w-full hover:text-green-700'
</script>
