import type { RentalInputs } from '../model/types'
import { FieldCard } from '../fields/FieldCard'

interface ExpensesStepProps {
  inputs: RentalInputs
  errors: Record<string, string>
  onChange: (key: keyof RentalInputs, value: number) => void
}

export function ExpensesStep({ inputs, errors, onChange }: ExpensesStepProps) {
  return (
    <div className="step-grid">
      <FieldCard
        name="taxesMonthly"
        label="Monthly Taxes"
        hint="Average monthly property tax"
        value={inputs.taxesMonthly}
        onChange={(value) => onChange('taxesMonthly', value)}
        error={errors.taxesMonthly}
      />
      <FieldCard
        name="insuranceMonthly"
        label="Monthly Insurance"
        hint="Landlord insurance premium"
        value={inputs.insuranceMonthly}
        onChange={(value) => onChange('insuranceMonthly', value)}
        error={errors.insuranceMonthly}
      />
      <FieldCard
        name="repairsPct"
        label="Repairs"
        hint="Reserve as percent of monthly rent"
        value={inputs.repairsPct}
        onChange={(value) => onChange('repairsPct', value)}
        error={errors.repairsPct}
        step={0.5}
        suffix="%"
      />
      <FieldCard
        name="managementPct"
        label="Management"
        hint="Professional management cost"
        value={inputs.managementPct}
        onChange={(value) => onChange('managementPct', value)}
        error={errors.managementPct}
        step={0.5}
        suffix="%"
      />
      <FieldCard
        name="hoaMonthly"
        label="HOA"
        hint="Monthly HOA dues"
        value={inputs.hoaMonthly}
        onChange={(value) => onChange('hoaMonthly', value)}
        error={errors.hoaMonthly}
      />
      <FieldCard
        name="utilitiesMonthly"
        label="Utilities"
        hint="Landlord-paid utilities"
        value={inputs.utilitiesMonthly}
        onChange={(value) => onChange('utilitiesMonthly', value)}
        error={errors.utilitiesMonthly}
      />
      <FieldCard
        name="reservesMonthly"
        label="Reserves"
        hint="Monthly reserve for unexpected costs"
        value={inputs.reservesMonthly}
        onChange={(value) => onChange('reservesMonthly', value)}
        error={errors.reservesMonthly}
      />
    </div>
  )
}
