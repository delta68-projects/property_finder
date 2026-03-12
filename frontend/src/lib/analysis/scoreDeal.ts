interface ScoreInput {
  monthlyCashFlow: number
  cashOnCashReturnPct: number
  dscr: number
  expenseRatioPct: number
}

function bandScore(value: number, min: number, max: number) {
  if (value <= min) {
    return 0
  }
  if (value >= max) {
    return 100
  }
  return ((value - min) / (max - min)) * 100
}

export function scoreDeal(input: ScoreInput) {
  const cashFlowScore = bandScore(input.monthlyCashFlow, -100, 500)
  const cocScore = bandScore(input.cashOnCashReturnPct, 2, 15)
  const dscrScore = bandScore(input.dscr, 0.9, 1.35)
  const expenseScore = Math.max(0, 100 - bandScore(input.expenseRatioPct, 35, 70))

  const weighted =
    cashFlowScore * 0.4 + cocScore * 0.35 + dscrScore * 0.15 + expenseScore * 0.1

  return Math.max(0, Math.min(100, Math.round(weighted)))
}
