import { z } from 'zod'

const nonNegative = z.number().min(0)
const percent = z.number().min(0).max(100)

export const rentalInputSchema = z.object({
  purchasePrice: nonNegative.min(10000),
  closingCosts: nonNegative,
  rehabCosts: nonNegative,
  downPaymentPct: percent.min(3),
  interestRatePct: percent.min(1),
  loanTermYears: z.number().int().min(5).max(40),
  rentMonthly: nonNegative,
  otherIncomeMonthly: nonNegative,
  vacancyRatePct: percent,
  taxesMonthly: nonNegative,
  insuranceMonthly: nonNegative,
  repairsPct: percent,
  managementPct: percent,
  hoaMonthly: nonNegative,
  utilitiesMonthly: nonNegative,
  reservesMonthly: nonNegative,
})

export type RentalInputSchema = z.infer<typeof rentalInputSchema>
