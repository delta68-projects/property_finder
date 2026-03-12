import type { AssumptionHealth } from '../model/types'

interface AssumptionHealthBadgeProps {
  health: AssumptionHealth
}

export function AssumptionHealthBadge({ health }: AssumptionHealthBadgeProps) {
  return <span className="assumption-badge">{health}</span>
}
