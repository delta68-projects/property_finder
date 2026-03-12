import type { RentalInputs, AssumptionHealth } from '../../features/analyzer/model/types'

export function assumptionHealth(inputs: RentalInputs): AssumptionHealth {
  const fixedExpenses =
    inputs.taxesMonthly +
    inputs.insuranceMonthly +
    inputs.hoaMonthly +
    inputs.utilitiesMonthly +
    inputs.reservesMonthly

  const ratio = fixedExpenses / Math.max(1, inputs.rentMonthly)

  if (inputs.vacancyRatePct <= 6 && ratio >= 0.3) {
    return 'Conservative'
  }
  if (inputs.vacancyRatePct <= 9 && ratio >= 0.2) {
    return 'Balanced'
  }
  return 'Aggressive assumptions'
}
