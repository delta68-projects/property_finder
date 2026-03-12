interface DealScoreGaugeProps {
  score: number
}

export function DealScoreGauge({ score }: DealScoreGaugeProps) {
  return (
    <div className="deal-score">
      <p>Deal Score</p>
      <div className="deal-score-circle" aria-label={`Deal score ${score}`}>
        <span>{score}</span>
      </div>
      <small>Weighted blend of cash flow, CoC, DSCR, and expense ratio.</small>
    </div>
  )
}
