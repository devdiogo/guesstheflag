import { formatTime } from '../../utils/format-time'
import { ArrowCircleLeft } from 'phosphor-react'

import { useStore } from '../../store'
import { ProgressBarProps } from './types'

export const ProgressBar = ({ quizStatus, timer }: ProgressBarProps) => {
  const { time, start, reset } = timer

  const [, actions] = useStore()

  const restart = () => {
    reset()
    start()
    actions.resetFilteredCountries()
    actions.setIsGameStarted(false)
    actions.setGuessedCountriesCount(0)
    actions.setNotGuessedCountriesCount(0)
  }

  const countdownPercentage = Math.floor(eval(quizStatus) * 100)

  return (
    <div className="flex items-center lg:flex-row flex-col lg:w-1/2 lg:m-0 w-full p-4 gap-4">
      <div
        role="progressbar"
        aria-valuenow={countdownPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="flex-1 h-6 rounded bg-zinc-700 w-full"
      >
        <div
          style={{
            width: `${countdownPercentage}%`,
            transition: 'width 0.5s'
          }}
          className="h-6 rounded bg-emerald-400 transition"
        />
      </div>
      <div role="status" className="w-20 text-center py-1 rounded bg-dark-gray text-white">
        {quizStatus}
      </div>
      <div role="timer" className="w-20 text-center py-1 rounded bg-dark-gray text-white">
        {formatTime(time)}
      </div>
      <div>
        <ArrowCircleLeft role="button" onClick={restart} weight="bold" width={32} height={32} />
      </div>
    </div>
  )
}
