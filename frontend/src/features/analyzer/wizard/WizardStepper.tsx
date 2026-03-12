import { steps } from './steps'

interface WizardStepperProps {
  currentStep: number
  progress: number
}

export function WizardStepper({ currentStep, progress }: WizardStepperProps) {
  return (
    <div className="wizard-stepper" aria-label="Analyzer steps">
      <div className="wizard-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step} className={index <= currentStep ? 'active' : ''}>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
