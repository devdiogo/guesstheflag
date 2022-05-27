import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(<Header />)
    expect(screen.getByText(/guess the flag/i)).toBeInTheDocument()
  })
})
