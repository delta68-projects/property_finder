import type { RentalInputs } from '../model/types'
import { FieldCard } from '../fields/FieldCard'

interface PropertyStepProps {
  inputs: RentalInputs
  errors: Record<string, string>
  onChange: (key: keyof RentalInputs, value: number) => void
}

export function PropertyStep({ inputs, errors, onChange }: PropertyStepProps) {
  return (
    <div className="step-grid">
      <FieldCard
        name="purchasePrice"
        label="Purchase Price"
        hint="Contract price for the property"
        value={inputs.purchasePrice}
        onChange={(value) => onChange('purchasePrice', value)}
        error={errors.purchasePrice}
      />
      <FieldCard
        name="closingCosts"
        label="Closing Costs"
        hint="Title, escrow, legal and transfer costs"
        value={inputs.closingCosts}
        onChange={(value) => onChange('closingCosts', value)}
        error={errors.closingCosts}
      />
      <FieldCard
        name="rehabCosts"
        label="Rehab Costs"
        hint="Immediate renovation and turn expenses"
        value={inputs.rehabCosts}
        onChange={(value) => onChange('rehabCosts', value)}
        error={errors.rehabCosts}
      />
    </div>
  )
}
