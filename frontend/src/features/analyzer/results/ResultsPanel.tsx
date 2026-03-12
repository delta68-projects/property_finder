import type { AnalysisMetrics, AssumptionHealth } from '../model/types'
import { AssumptionHealthBadge } from './AssumptionHealthBadge'
import { DealScoreGauge } from './DealScoreGauge'
import { MetricCard } from './MetricCard'

interface ResultsPanelProps {
  metrics: AnalysisMetrics
  health: AssumptionHealth
}

function usd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function ResultsPanel({ metrics, health }: ResultsPanelProps) {
  return (
    <section className="results-panel" aria-label="Analysis results">
      <header>
        <h2>Review & Results</h2>
        <AssumptionHealthBadge health={health} />
      </header>
      <div className="results-grid">
        <MetricCard
          label="Monthly Cash Flow"
          value={usd(metrics.monthlyCashFlow)}
          detail="Income left after operations and debt service."
        />
        <MetricCard
          label="Cash-on-Cash Return"
          value={`${metrics.cashOnCashReturnPct.toFixed(1)}%`}
          detail="Annual pre-tax cash flow divided by total cash invested."
        />
        <DealScoreGauge score={metrics.dealScore} />
      </div>
    </section>
  )
}
