export const steps = ['Property', 'Financing', 'Income', 'Expenses', 'Review & Results'] as const

export type StepName = (typeof steps)[number]
