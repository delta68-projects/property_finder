export interface RentalInputs {
  purchasePrice: number
  closingCosts: number
  rehabCosts: number
  downPaymentPct: number
  interestRatePct: number
  loanTermYears: number
  rentMonthly: number
  otherIncomeMonthly: number
  vacancyRatePct: number
  taxesMonthly: number
  insuranceMonthly: number
  repairsPct: number
  managementPct: number
  hoaMonthly: number
  utilitiesMonthly: number
  reservesMonthly: number
}

export interface AnalysisMetrics {
  loanAmount: number
  monthlyPrincipalInterest: number
  effectiveGrossIncome: number
  totalOperatingExpenses: number
  netOperatingIncome: number
  debtServiceMonthly: number
  monthlyCashFlow: number
  annualPretaxCashFlow: number
  totalCashInvested: number
  cashOnCashReturnPct: number
  dscr: number
  expenseRatioPct: number
  dealScore: number
}

export type AssumptionHealth = 'Conservative' | 'Balanced' | 'Aggressive assumptions'
