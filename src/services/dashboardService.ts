// src/services/dashboardService.ts
import type { DashboardData } from '@/types/dashboard'

export async function fetchDashboardData(): Promise<DashboardData> {
  const res = await fetch('/api/dashboard')
  if (!res.ok) {
    throw new Error('Error al obtener datos del dashboard')
  }
  return await res.json()
}
