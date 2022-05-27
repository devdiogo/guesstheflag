import { render, fireEvent } from '@testing-library/react'
import { it, vi } from 'vitest'
import { ProgressBar } from '.'

describe('Component: ProgressBar', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders with right timer', () => {
    const timer = { time: 0, start: () => null, reset: () => null }
    const { getByRole } = render(<ProgressBar timer={timer} quizStatus="0 / 193" />)
    expect(getByRole('timer')).toHaveTextContent('00:00')
  })

  it('should reset when the reset button is clicked', () => {
    const timer = { time: 0, start: () => vi.fn(), reset: vi.fn() }
    const { getByRole } = render(<ProgressBar timer={timer} quizStatus="0 / 193" />)
    fireEvent.click(getByRole('button'))
    expect(getByRole('timer')).toHaveTextContent('00:00')
    expect(timer.reset).toHaveBeenCalledTimes(1)
  })
})
