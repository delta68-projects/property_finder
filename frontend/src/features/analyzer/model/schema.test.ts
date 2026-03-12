import { defaultInputs } from './defaults'
import { rentalInputSchema } from './schema'

test('rejects vacancy above 100 percent', () => {
  const result = rentalInputSchema.safeParse({
    ...defaultInputs,
    vacancyRatePct: 150,
  })
  expect(result.success).toBe(false)
})

test('accepts default inputs', () => {
  const result = rentalInputSchema.safeParse(defaultInputs)
  expect(result.success).toBe(true)
})
