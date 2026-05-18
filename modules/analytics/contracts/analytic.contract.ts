import { IconData } from '@gravity-ui/uikit'

export interface Analytic {
  users: number
  categories: number
  products: number
  inventoryMovements: number
}

export interface AnalyticService {
  getMany: () => Promise<Analytic>
}

export interface StatCard {
  title: string
  icon: IconData
  value: number
  route: string
}

export interface StatsList {
  stats: StatCard[]
}
