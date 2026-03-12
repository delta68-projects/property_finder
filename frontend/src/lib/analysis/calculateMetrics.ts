import type { AnalysisMetrics, RentalInputs } from '../../features/analyzer/model/types'
import { scoreDeal } from './scoreDeal'

function round(value: number) {
  return Math.round(value * 100) / 100
}

function monthlyPayment(principal: number, annualRatePct: number, years: number) {
  const monthlyRate = annualRatePct / 1200
  const periods = years * 12
  if (monthlyRate === 0) {
    return principal / periods
  }
  const factor = Math.pow(1 + monthlyRate, periods)
  return (principal * monthlyRate * factor) / (factor - 1)
}

export function calculateMetrics(input: RentalInputs): AnalysisMetrics {
  const downPayment = input.purchasePrice * (input.downPaymentPct / 100)
  const loanAmount = input.purchasePrice - downPayment
  const monthlyPrincipalInterest = monthlyPayment(loanAmount, input.interestRatePct, input.loanTermYears)
  const grossIncome = input.rentMonthly + input.otherIncomeMonthly
  const effectiveGrossIncome = grossIncome * (1 - input.vacancyRatePct / 100)
  const repairs = input.rentMonthly * (input.repairsPct / 100)
  const management = input.rentMonthly * (input.managementPct / 100)

  const totalOperatingExpenses =
    input.taxesMonthly +
    input.insuranceMonthly +
    repairs +
    management +
    input.hoaMonthly +
    input.utilitiesMonthly +
    input.reservesMonthly

  const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses
  const debtServiceMonthly = monthlyPrincipalInterest
  const monthlyCashFlow = netOperatingIncome - debtServiceMonthly
  const annualPretaxCashFlow = monthlyCashFlow * 12
  const totalCashInvested = downPayment + input.closingCosts + input.rehabCosts
  const cashOnCashReturnPct = (annualPretaxCashFlow / Math.max(1, totalCashInvested)) * 100
  const dscr = netOperatingIncome / Math.max(1, debtServiceMonthly)
  const expenseRatioPct = (totalOperatingExpenses / Math.max(1, effectiveGrossIncome)) * 100

  const dealScore = scoreDeal({
    monthlyCashFlow,
    cashOnCashReturnPct,
    dscr,
    expenseRatioPct,
  })

  return {
    loanAmount: round(loanAmount),
    monthlyPrincipalInterest: round(monthlyPrincipalInterest),
    effectiveGrossIncome: round(effectiveGrossIncome),
    totalOperatingExpenses: round(totalOperatingExpenses),
    netOperatingIncome: round(netOperatingIncome),
    debtServiceMonthly: round(debtServiceMonthly),
    monthlyCashFlow: round(monthlyCashFlow),
    annualPretaxCashFlow: round(annualPretaxCashFlow),
    totalCashInvested: round(totalCashInvested),
    cashOnCashReturnPct: round(cashOnCashReturnPct),
    dscr: round(dscr),
    expenseRatioPct: round(expenseRatioPct),
    dealScore,
  }
}
