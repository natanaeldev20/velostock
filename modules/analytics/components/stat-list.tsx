import type { StatsList } from '../contracts/analytic.contract'
import { StatCard } from './stat-card'

export async function StatList({ stats }: StatsList) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          route={stat.route}
        />
      ))}
    </div>
  )
}
