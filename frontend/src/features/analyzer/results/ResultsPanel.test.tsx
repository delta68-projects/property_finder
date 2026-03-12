import { render, screen } from '@testing-library/react'
import type { AnalysisMetrics } from '../model/types'
import { ResultsPanel } from './ResultsPanel'

const metrics: AnalysisMetrics = {
  loanAmount: 135000,
  monthlyPrincipalInterest: 853,
  effectiveGrossIncome: 1900,
  totalOperatingExpenses: 690,
  netOperatingIncome: 1210,
  debtServiceMonthly: 853,
  monthlyCashFlow: 357,
  annualPretaxCashFlow: 4284,
  totalCashInvested: 60000,
  cashOnCashReturnPct: 7.14,
  dscr: 1.42,
  expenseRatioPct: 36,
  dealScore: 79,
}

test('shows cash flow, coc return, and deal score', () => {
  render(<ResultsPanel metrics={metrics} health="Balanced" />)
  expect(screen.getByText(/monthly cash flow/i)).toBeInTheDocument()
  expect(screen.getByText(/cash-on-cash return/i)).toBeInTheDocument()
  expect(screen.getByText(/deal score/i)).toBeInTheDocument()
})
