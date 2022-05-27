import { useEffect, useRef, useState } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import useSound from 'use-sound'
import successSound from '../../assets/sounds/success.mp3'
import failureSound from '../../assets/sounds/failure.mp3'
import { ProgressBar, Input, Layout, GameOptions } from '../../components'
import { formatTime } from '../../utils/format-time'
import { Share } from 'phosphor-react'
import { wait } from '../../utils/wait'
import { useStore } from '../../store'
import { useTimer } from 'use-timer'
import { useCopyToClipboard } from 'usehooks-ts'

const FlagsQuiz = () => {
  const [playSuccessSound] = useSound(successSound, { volume: 0.01 })
  const [playFailureSound] = useSound(failureSound, { volume: 1 })

  const { time, start, pause, reset } = useTimer()

  const inputRef = useRef<HTMLInputElement>(null)

  const [state, actions] = useStore()

  const countries = state.filteredCountries
  const [highlightRightAnswer, setHighlightRightAnswer] = useState(false)
  const [highlightWrongAnswer, setHighlightWrongAnswer] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const [currentCountriesLength, setCurrentCountriesLength] = useState(0)

  const [copiedValue, copy] = useCopyToClipboard()

  useEffect(() => {
    start()

    setCurrentCountriesLength(state.filteredCountries.length)
    // disable the rule here because we only change the qty when the game starts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isGameStarted])

  useEffect(() => {
    if (typeof state.randomCountry === 'undefined') {
      pause()
      return
    }
    actions.getRandomAnswers()
  }, [actions, pause, state.randomCountry])

  const isAnswerRight = (value: string) =>
    state.randomCountry?.allowedAnswers.includes(value.toLowerCase())

  const isDifficultyEasy = state.difficulty == 'easy'

  const processAnswer = async (value: string, optionSelected: number | null = null) => {
    if (isProcessing) return
    if (isAnswerRight(value)) {
      setIsProcessing(true)
      playSuccessSound()
      setHighlightRightAnswer(true)
      await wait(200)
      setHighlightRightAnswer(false)
      actions.removeCountry(value !== '$$' ? value : state.randomCountry?.name)
      actions.setRandomCountry()
      actions.setGuessedCountriesCount(state.guessedCountriesCount + 1)
      if (!isDifficultyEasy && inputRef.current) inputRef.current.value = ''
      setIsProcessing(false)
    } else if (isDifficultyEasy) {
      setIsProcessing(true)
      playFailureSound()
      setHighlightWrongAnswer(optionSelected)
      await wait(200)
      setHighlightWrongAnswer(null)
      actions.removeCountry(state.randomCountry?.name)
      actions.setRandomCountry()
      actions.setNotGuessedCountriesCount(
        state.notGuessedCountriesCount && state.notGuessedCountriesCount > 0
          ? state.notGuessedCountriesCount + 1
          : 1
      )
      setIsProcessing(false)
    }
  }

  const onSuccess = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target
    value = value !== '$$' ? value : state.randomCountry?.name
    processAnswer(value)
  }

  const playAgain = () => {
    if (isProcessing) return
    reset()
    setIsProcessing(true)
    actions.resetFilteredCountries()
    actions.setIsGameStarted(false)
    actions.setGuessedCountriesCount(0)
    actions.setNotGuessedCountriesCount(0)
    actions.setRandomCountry()
    setIsProcessing(false)
  }

  const keyboardEventHandler = (key: string) => {
    const intKey = parseInt(key)
    if (intKey == state.rightAnswerNumber || key == '-') {
      processAnswer(state.randomCountry.name)
    } else {
      processAnswer('wrong', intKey - 1)
    }
  }

  const giveUp = async () => {
    if (isProcessing) return
    setIsProcessing(true)
    playFailureSound()
    await wait(100)
    actions.removeCountry(state.randomCountry?.name)
    actions.setRandomCountry()
    actions.setNotGuessedCountriesCount(state.notGuessedCountriesCount + 1)
    setIsProcessing(false)
  }

  const xIsWhatPercentageOfY = (x: number, y: number) => {
    return Math.round((x / y) * 100)
  }

  return (
    <Layout>
      {state.isGameStarted && state.randomCountry && (
        <>
          <ProgressBar
            timer={{ time, start, reset }}
            quizStatus={`${state.guessedCountriesCount + state.notGuessedCountriesCount} / ${
              countries.length + state.guessedCountriesCount + state.notGuessedCountriesCount
            }`}
          />
          {!isDifficultyEasy && (
            <div className="relative lg:block flex justify-center lg:mb-0 mb-4 md:w-1/2 md:m-0 w-full">
              <button
                className="lg:absolute right-5 bg-dark-gray hover:bg-zinc-600 active:bg-zinc-500 text-white text-sm px-4 py-1 rounded"
                onClick={giveUp}
              >
                I don't know
              </button>
            </div>
          )}
        </>
      )}
      <div className="flex flex-col items-center md:w-1/2 w-full px-6 mb-4">
        {!state.isGameStarted ? (
          <div>
            <GameOptions onPlay={() => actions.setIsGameStarted(true)} />
          </div>
        ) : (
          <>
            {state.randomCountry ? (
              <>
                <KeyboardEventHandler
                  handleKeys={['1', '2', '3', '4', '-']}
                  onKeyEvent={(key) => keyboardEventHandler(key)}
                />
                <div className="text-center h-auto md:mt-16 mt-2">
                  <div>
                    <div
                      data-testid="flag"
                      className={`flag flag-${state.randomCountry.code.toString()}`}
                    ></div>
                  </div>
                </div>

                <div className="lg:mt-28 mt-12 w-full">
                  {state.difficulty == 'hard' ? (
                    <Input
                      onChange={onSuccess}
                      innerRef={inputRef}
                      highlightRightAnswer={highlightRightAnswer}
                    />
                  ) : (
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                      {state.randomAnswers.map((country, index) => (
                        <button
                          key={country}
                          className={`flex-1 flex items-center justify-center text-white py-4 rounded  hover:bg-zinc-400 bg-dark-gray border-dark-gray focus:outline-slate-400
                            ${
                              highlightRightAnswer &&
                              country == state.randomCountry.name &&
                              'bg-emerald-400 hover:bg-emerald-400 border-dark-gray focus:outline-slate-400'
                            }
                            ${highlightWrongAnswer == index && 'bg-red hover:bg-red'}`}
                          onClick={() => processAnswer(country, index)}
                        >
                          <span className="bg-zinc-500 rounded text-white py-1 px-2 ml-2">
                            {index + 1}
                          </span>
                          <span className="flex-1">{country}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-2xl leading-loose">
                <p>🎉 Congratulations</p>
                <p>You finished the game in {formatTime(time!)}s</p>
                <div>
                  You guessed
                  <strong className="bg-white text-black p-1 mx-2 rounded-lg">
                    {state.guessedCountriesCount}
                  </strong>
                  ({xIsWhatPercentageOfY(state.guessedCountriesCount, currentCountriesLength)}%) out
                  of {currentCountriesLength} countries ({state.currentRegion}).
                </div>
                <button className="w-full flex items-center justify-center bg-dark-gray hover:bg-neutral-600 transition-colors text-white p-4 mt-4 rounded text-2xl font-bold">
                  <Share />
                  <span
                    className="ml-4"
                    onClick={() =>
                      copy(
                        'I guessed ' +
                          state.guessedCountriesCount +
                          ' (' +
                          xIsWhatPercentageOfY(
                            state.guessedCountriesCount,
                            currentCountriesLength
                          ) +
                          '%) out of ' +
                          currentCountriesLength +
                          ' countries (' +
                          state.currentRegion +
                          ') / https://guesstheflag.vercel.app'
                      )
                    }
                  >
                    SHARE
                  </span>
                </button>
                <button
                  onClick={playAgain}
                  className="w-full flex items-center justify-center bg-dark-gray hover:bg-neutral-600 transition-colors text-white p-4 mt-4 rounded text-2xl font-bold"
                >
                  <Share />
                  <span className="ml-4">PLAY AGAIN</span>
                </button>
                {copiedValue ? (
                  <div className="mt-4 p-2 bg-dark-gray/50 text-white text-center">
                    Copied to clipboard
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

export default FlagsQuiz
