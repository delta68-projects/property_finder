import type { RentalInputs } from '../model/types'
import { FieldCard } from '../fields/FieldCard'

interface FinancingStepProps {
  inputs: RentalInputs
  errors: Record<string, string>
  onChange: (key: keyof RentalInputs, value: number) => void
}

export function FinancingStep({ inputs, errors, onChange }: FinancingStepProps) {
  return (
    <div className="step-grid">
      <FieldCard
        name="downPaymentPct"
        label="Down Payment"
        hint="Percent paid up front"
        value={inputs.downPaymentPct}
        onChange={(value) => onChange('downPaymentPct', value)}
        error={errors.downPaymentPct}
        suffix="%"
      />
      <FieldCard
        name="interestRatePct"
        label="Interest Rate"
        hint="Annual rate for the fixed loan"
        value={inputs.interestRatePct}
        onChange={(value) => onChange('interestRatePct', value)}
        error={errors.interestRatePct}
        step={0.1}
        suffix="%"
      />
      <FieldCard
        name="loanTermYears"
        label="Loan Term"
        hint="Amortization in years"
        value={inputs.loanTermYears}
        onChange={(value) => onChange('loanTermYears', value)}
        error={errors.loanTermYears}
        suffix="years"
      />
    </div>
  )
}
