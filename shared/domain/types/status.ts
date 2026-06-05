export type FilterStatus = 'all' | 'active' | 'desactive'

export interface StatusFiltersProps {
  onFilterChange: (filter: FilterStatus) => void
}
