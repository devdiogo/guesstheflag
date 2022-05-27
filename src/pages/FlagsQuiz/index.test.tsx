/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { defaultRegistry } from 'react-sweet-state'
import { beforeEach, describe, it, vi } from 'vitest'
import FlagsQuiz from '.'
import { Store } from '../../store'
import simulateEvent from 'simulate-event'
import userEvent from '@testing-library/user-event'

import { useCopyToClipboard } from 'usehooks-ts'

const store = defaultRegistry.getStore(Store).storeState

vi.mock('usehooks-ts', () => ({
  useCopyToClipboard: vi.fn(() => ['', vi.fn()])
}))

describe('Component: FlagsQuiz', () => {
  beforeEach(() => {
    store.resetState()
  })
  afterEach(() => {
    store.resetState()
  })

  it('should reset the input and remove one country from state when given the right anwser', async () => {
    render(<FlagsQuiz />)

    fireEvent.click(screen.getByText(/hard/i))
    fireEvent.click(screen.getByText(/play/i))

    userEvent.type(screen.getByRole('textbox'), '$$')

    await waitFor(() => screen.getByText('1 / 193'))

    expect(await screen.findByRole('textbox')).toHaveValue('')
    expect(await screen.findByRole('status')).toHaveTextContent('1 / 193')
    expect(store.getState().filteredCountries).toHaveLength(192)
  })

  it('should go to next flag when pressing one of the answer keys or -', async () => {
    render(<FlagsQuiz />)
    fireEvent.click(screen.getByText(/easy/i))
    fireEvent.click(screen.getByText(/play/i))

    act(() => {
      simulateEvent.simulate(document.body, 'keydown', { keyCode: 49 })
    })
    await screen.findByText('1 / 193')

    act(() => {
      simulateEvent.simulate(document.body, 'keydown', { keyCode: 49 })
    })
    await screen.findByText('2 / 193')

    act(() => {
      simulateEvent.simulate(document.body, 'keydown', { keyCode: 49 })
    })
    await screen.findByText('3 / 193')

    act(() => {
      simulateEvent.simulate(document.body, 'keydown', { keyCode: 109 })
    })
    await screen.findByText('3 / 193')
  })

  it('should have an option to play again the game again when the game is finished', async () => {
    store.setState({ ...store.getState(), randomCountry: undefined })
    render(<FlagsQuiz />)
    fireEvent.click(screen.getByText(/easy/i))
    fireEvent.click(screen.getByText(/play/i))
    expect(screen.getByText(/play again/i)).toBeInTheDocument()
    expect(store.getState().randomCountry).toBeUndefined()
    await waitFor(() => fireEvent.click(screen.getByText(/play again/i)))
    expect(store.getState().randomCountry).not.toBeUndefined()
  })

  it(`should go to next flag when clicking the "I don't know" button`, async () => {
    render(<FlagsQuiz />)
    fireEvent.click(screen.getByText(/play/i))
    const iDontKnowButton = screen.getByText(/i don't know/i)
    expect(iDontKnowButton).toBeInTheDocument()
    await waitFor(() => fireEvent.click(iDontKnowButton))
    await waitFor(() => screen.getByText('1 / 193'))
  })

  it('should copy the text in the congratulations page', async () => {
    store.setState({ ...store.getState(), randomCountry: undefined })
    render(<FlagsQuiz />)
    fireEvent.click(screen.getByText(/easy/i))
    fireEvent.click(screen.getByText(/play/i))
    await waitFor(() => fireEvent.click(screen.getByText(/share/i)))
    expect(useCopyToClipboard).toBeCalled()
  })
})
