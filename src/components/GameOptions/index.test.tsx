import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, vi } from 'vitest'
import { GameOptions } from '..'
import userEvent from '@testing-library/user-event'

describe('Component: GameOptions', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  vi.mock('../../data/regions.json', () => {
    return {
      default: [
        { name: 'WORLD', description: 'Worldwide' },
        { name: 'NA', description: 'North America' }
      ]
    }
  })

  it('should select region and highlight selected options when clicked', async () => {
    render(<GameOptions onPlay={() => null} />)
    const easyOption = screen.getByText('EASY')
    const hardOption = screen.getByText('HARD')
    await userEvent.click(easyOption)
    expect(easyOption).toHaveClass('text-white')
    expect(hardOption).toHaveClass('text-gray-900')
    await userEvent.click(hardOption)
    expect(easyOption).toHaveClass('text-gray-900')
    expect(hardOption).toHaveClass('text-white')
  })

  it('should select region and highlight selected options when clicked', async () => {
    render(<GameOptions onPlay={() => null} />)
    const worldOption = screen.getByText('WORLD')
    const naOption = screen.getByText('NA')
    await userEvent.click(worldOption)
    expect(worldOption).toHaveClass('text-white')
    expect(naOption).toHaveClass('text-gray-900')
    await userEvent.click(naOption)
    expect(worldOption).toHaveClass('text-gray-900')
    expect(naOption).toHaveClass('text-white')
  })
})
