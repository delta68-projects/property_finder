import type { RentalInputs } from '../model/types'
import { FieldCard } from '../fields/FieldCard'

interface IncomeStepProps {
  inputs: RentalInputs
  errors: Record<string, string>
  onChange: (key: keyof RentalInputs, value: number) => void
}

export function IncomeStep({ inputs, errors, onChange }: IncomeStepProps) {
  return (
    <div className="step-grid">
      <FieldCard
        name="rentMonthly"
        label="Monthly Rent"
        hint="Expected average monthly rent"
        value={inputs.rentMonthly}
        onChange={(value) => onChange('rentMonthly', value)}
        error={errors.rentMonthly}
      />
      <FieldCard
        name="otherIncomeMonthly"
        label="Other Monthly Income"
        hint="Parking, laundry, storage, pet fees"
        value={inputs.otherIncomeMonthly}
        onChange={(value) => onChange('otherIncomeMonthly', value)}
        error={errors.otherIncomeMonthly}
      />
      <FieldCard
        name="vacancyRatePct"
        label="Vacancy Rate"
        hint="Expected percentage of vacant months"
        value={inputs.vacancyRatePct}
        onChange={(value) => onChange('vacancyRatePct', value)}
        error={errors.vacancyRatePct}
        step={0.5}
        suffix="%"
      />
    </div>
  )
}
