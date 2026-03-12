import { render, screen } from '@testing-library/react'
import { WizardStepper } from './WizardStepper'

test('shows active financing step', () => {
  render(<WizardStepper currentStep={1} progress={40} />)
  expect(screen.getByText(/financing/i)).toBeInTheDocument()
})
