import { defaultInputs } from '../../features/analyzer/model/defaults'
import { calculateMetrics } from './calculateMetrics'

test('calculates positive monthly cash flow for baseline scenario', () => {
  const result = calculateMetrics(defaultInputs)
  expect(result.monthlyCashFlow).toBeGreaterThan(0)
})
