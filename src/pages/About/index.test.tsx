import { render, screen } from '@testing-library/react'
import About from '.'

describe('Component: About', () => {
  it('renders correctly', () => {
    render(<About />)
    expect(screen.getByText(/about/i)).toBeInTheDocument()
  })
})
