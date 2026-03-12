import type { AnalysisMetrics } from '../model/types'

interface SummaryRailProps {
  metrics: AnalysisMetrics
}

function usd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function SummaryRail({ metrics }: SummaryRailProps) {
  return (
    <aside className="summary-rail" aria-label="Live summary">
      <h2>Live Summary</h2>
      <dl>
        <div>
          <dt>Monthly Cash Flow</dt>
          <dd>{usd(metrics.monthlyCashFlow)}</dd>
        </div>
        <div>
          <dt>CoC Return</dt>
          <dd>{metrics.cashOnCashReturnPct.toFixed(1)}%</dd>
        </div>
        <div>
          <dt>NOI</dt>
          <dd>{usd(metrics.netOperatingIncome)}</dd>
        </div>
        <div>
          <dt>DSCR</dt>
          <dd>{metrics.dscr.toFixed(2)}</dd>
        </div>
      </dl>
    </aside>
  )
}
