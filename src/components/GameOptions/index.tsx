import { useEffect, useState } from 'react'
import { difficultyOptions, GameOptionsProps } from './types'
import { useStore } from '../../store'
import regions from '../../data/regions.json'
import { ArrowFatLinesUp, Globe } from 'phosphor-react'
import { Option } from './Option'

export const GameOptions = ({ onPlay }: GameOptionsProps) => {
  const [state, actions] = useStore()

  const [regionSelected, setRegionSelected] = useState(regions[0])

  const difficulties: difficultyOptions[] = [
    {
      name: 'hard',
      description: 'You type the names of countries'
    },
    {
      name: 'easy',
      description: 'You have options to choose from'
    }
  ]

  useEffect(() => {
    actions.setCurrentRegion('WORLD')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="px-4 lg:py-2">
      <div className="mx-auto max-w-md">
        <div className="md:w-96 w-72 mb-10">
          <Option
            icon={<ArrowFatLinesUp className="mt-1 mr-2" size={20} weight="bold" />}
            title="difficulty"
            label="The difficulty level of the game"
            items={difficulties}
            value={state.difficulty}
            onChange={actions.setDifficulty}
          />
        </div>

        <div>
          <Option
            icon={<Globe className="mt-1 mr-2" size={20} weight="bold" />}
            title="region"
            label="Which region the game is gonna be about"
            items={regions}
            value={regionSelected}
            onChange={setRegionSelected}
          />
        </div>
      </div>
      <button
        onClick={onPlay}
        className="w-full bg-dark-gray hover:bg-neutral-600 transition-colors text-white p-4 mt-4 rounded text-2xl font-bold"
      >
        PLAY
      </button>
    </div>
  )
}
