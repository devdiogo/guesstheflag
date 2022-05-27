import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '.'

describe('Component: Input', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const useRefSpy = vi.spyOn(React, 'useRef').mockReturnValue({
    current: {
      value: '',
      focus: () => null
    }
  })

  it('renders correctly', async () => {
    render(<Input highlightRightAnswer={false} innerRef={useRefSpy} />)
    const input = screen.queryByRole('textbox')
    expect(input).toBeDefined()
    expect(useRefSpy).toHaveBeenCalledTimes(1)
  })

  it('should autofocus', async () => {
    render(<Input highlightRightAnswer={false} innerRef={useRefSpy} />)
    const input = screen.queryByRole('textbox')
    expect(document.activeElement).toEqual(input)
  })

  it('should have right classes when highlightRightAnswer is true', async () => {
    render(<Input highlightRightAnswer={true} innerRef={useRefSpy} />)
    const input = screen.queryByRole('textbox')
    expect(input).toHaveClass('bg-emerald-400 border-emerald-400')
  })

  it('should be able to type', async () => {
    render(<Input highlightRightAnswer={false} innerRef={useRefSpy} />)
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')
    expect(input).toHaveValue('test')
  })

  it('should be disabled when highlightRightAnswer is true', async () => {
    render(<Input highlightRightAnswer={true} innerRef={useRefSpy} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })
})
