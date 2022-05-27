import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import { Pill } from '.'

describe('Component: Pill', () => {
  it('should render pill with the right uppercase text', () => {
    const text = 'hello'
    render(<Pill text={text} />)
    expect(screen.getByText(text.toUpperCase())).toBeInTheDocument()
  })
})
