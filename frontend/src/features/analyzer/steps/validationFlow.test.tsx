import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../../App'

test('blocks navigation when required field is invalid', async () => {
  const user = userEvent.setup()
  render(<App />)
  const purchase = screen.getByLabelText(/purchase price/i)
  await user.clear(purchase)
  await user.type(purchase, '1000')
  await user.click(screen.getByRole('button', { name: /next/i }))
  expect(screen.getByText(/too small/i)).toBeInTheDocument()
})
