import { render, screen } from '@testing-library/react'
import { App } from './app'

it('emptyTest', () => {
  render(<App />)
  expect(screen.getByText("JBL's monorepo")).toBeInTheDocument()
})
