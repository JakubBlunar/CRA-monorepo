import { render, screen } from '@testing-library/react'
import { Clock } from './Clock'

it('Clock test', () => {
  render(<Clock />)
  const element = screen.getByText('Clock')
  expect(element).toBeDefined()
})
