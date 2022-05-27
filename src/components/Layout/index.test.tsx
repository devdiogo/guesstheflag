import { render, screen } from '@testing-library/react'
import { Layout } from '.'

describe('Component: Layout', () => {
  it('should render component inside layout', () => {
    const someComponent = <h1>title</h1>
    render(<Layout>{someComponent}</Layout>)
    expect(screen.getByText(/title/i)).toBeInTheDocument()
  })
})
