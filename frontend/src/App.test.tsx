import { render, screen } from '@testing-library/react'
import App from './App'

test('renders rental analyzer heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /rental deal analyzer/i })).toBeInTheDocument()
})
