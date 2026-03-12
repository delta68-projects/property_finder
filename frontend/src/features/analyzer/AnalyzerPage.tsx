import { calculateMetrics } from '../../lib/analysis/calculateMetrics'
import { assumptionHealth } from '../../lib/analysis/assumptionHealth'
import type { RentalInputs } from './model/types'
import { useAnalyzerStore } from './state/useAnalyzerStore'
import { ExpensesStep } from './steps/ExpensesStep'
import { FinancingStep } from './steps/FinancingStep'
import { IncomeStep } from './steps/IncomeStep'
import { PropertyStep } from './steps/PropertyStep'
import { ResultsPanel } from './results/ResultsPanel'
import { SummaryRail } from './results/SummaryRail'
import { WizardStepper } from './wizard/WizardStepper'

const stepFieldMap: Record<number, (keyof RentalInputs)[]> = {
  0: ['purchasePrice', 'closingCosts', 'rehabCosts'],
  1: ['downPaymentPct', 'interestRatePct', 'loanTermYears'],
  2: ['rentMonthly', 'otherIncomeMonthly', 'vacancyRatePct'],
  3: [
    'taxesMonthly',
    'insuranceMonthly',
    'repairsPct',
    'managementPct',
    'hoaMonthly',
    'utilitiesMonthly',
    'reservesMonthly',
  ],
  4: [],
}

export function AnalyzerPage() {
  const { inputs, currentStep, errors, progress, setCurrentStep, updateField, validateCurrent, reset } =
    useAnalyzerStore()

  const metrics = calculateMetrics(inputs)
  const health = assumptionHealth(inputs)

  const goNext = () => {
    const requiredFields = stepFieldMap[currentStep] ?? []
    if (!validateCurrent(requiredFields)) {
      return
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <main className="analyzer-shell">
      <section className="analyzer-card">
        <header className="hero-block">
          <p className="eyebrow">Prop Buyer MVP</p>
          <h1>Rental Deal Analyzer</h1>
          <p className="lead">
            Build confidence fast. Enter assumptions step-by-step and get monthly cash flow, cash-on-cash
            return, and a transparent deal score.
          </p>
        </header>

        <WizardStepper currentStep={currentStep} progress={progress} />

        {currentStep === 0 ? <PropertyStep inputs={inputs} errors={errors} onChange={updateField} /> : null}
        {currentStep === 1 ? <FinancingStep inputs={inputs} errors={errors} onChange={updateField} /> : null}
        {currentStep === 2 ? <IncomeStep inputs={inputs} errors={errors} onChange={updateField} /> : null}
        {currentStep === 3 ? <ExpensesStep inputs={inputs} errors={errors} onChange={updateField} /> : null}
        {currentStep === 4 ? <ResultsPanel metrics={metrics} health={health} /> : null}

        <div className="wizard-controls">
          <button type="button" onClick={goBack} disabled={currentStep === 0}>
            Back
          </button>
          <button type="button" onClick={reset} className="ghost">
            Reset to baseline
          </button>
          {currentStep < 4 ? (
            <button type="button" onClick={goNext} className="primary">
              Next
            </button>
          ) : null}
        </div>
      </section>

      <SummaryRail metrics={metrics} />
    </main>
  )
}
