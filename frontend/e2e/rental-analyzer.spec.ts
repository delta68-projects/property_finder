import { expect, test } from '@playwright/test'

test('user completes wizard and sees results', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /^next$/i }).click()
  await page.getByRole('button', { name: /^next$/i }).click()
  await page.getByRole('button', { name: /^next$/i }).click()
  await page.getByRole('button', { name: /^next$/i }).click()

  await expect(page.getByRole('heading', { name: /monthly cash flow/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /cash-on-cash return/i })).toBeVisible()
  await expect(page.getByText(/^deal score$/i).first()).toBeVisible()
})
