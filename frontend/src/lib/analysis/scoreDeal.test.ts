import { scoreDeal } from './scoreDeal'

test('scores stronger deals higher', () => {
  const weak = scoreDeal({ monthlyCashFlow: -50, cashOnCashReturnPct: 2, dscr: 0.9, expenseRatioPct: 65 })
  const strong = scoreDeal({ monthlyCashFlow: 350, cashOnCashReturnPct: 11, dscr: 1.25, expenseRatioPct: 45 })
  expect(strong).toBeGreaterThan(weak)
})
