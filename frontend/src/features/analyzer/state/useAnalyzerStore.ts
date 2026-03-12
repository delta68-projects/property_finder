import { useMemo, useState } from 'react'
import { defaultInputs } from '../model/defaults'
import { rentalInputSchema } from '../model/schema'
import type { RentalInputs } from '../model/types'
import { steps } from '../wizard/steps'

export function useAnalyzerStore() {
  const [inputs, setInputs] = useState<RentalInputs>(defaultInputs)
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep])

  const updateField = (key: keyof RentalInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: Number.isNaN(value) ? 0 : value }))
  }

  const reset = () => {
    setInputs(defaultInputs)
    setCurrentStep(0)
    setErrors({})
  }

  const validateCurrent = (fields: (keyof RentalInputs)[]) => {
    const parsed = rentalInputSchema.safeParse(inputs)
    if (parsed.success) {
      setErrors({})
      return true
    }

    const nextErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0])
      if (fields.includes(key as keyof RentalInputs)) {
        nextErrors[key] = issue.message
      }
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  return {
    inputs,
    currentStep,
    errors,
    progress,
    setCurrentStep,
    updateField,
    validateCurrent,
    reset,
  }
}
