import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnalisisIAView from '../views/AIAnalysisView.vue'
import DashboardView from '@/views/DashboardView.vue'
import PredicctionsView from '@/views/PredicctionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/analyze/ai',
      name: 'AnalisisIA',
      component: AnalisisIAView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/predictions',
      name: 'Predictions',
      component: PredicctionsView,
    }
  ],
})

export default router
