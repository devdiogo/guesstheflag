import { createStore, createHook, defaults, Action } from 'react-sweet-state'
import countries from '../data/countries.json'
import regions from '../data/regions.json'
import { Country } from '../pages/FlagsQuiz/types'
import { State } from './types'
import { difficulty } from '../components/GameOptions/types'
import { sampleSize, shuffle } from 'lodash-es'

defaults.devtools = true

const initialState = {
  countries,
  filteredCountries: countries,
  currentRegion: null,
  difficulty: 'hard',
  isGameStarted: false,
  randomCountry: countries[Math.floor(Math.random() * countries.length)],
  randomAnswers: [],
  rightAnswerNumber: null,
  guessedCountriesCount: 0,
  notGuessedCountriesCount: 0
} as State

const actions = {
  setCurrentRegion:
    (regionCode: string | null): Action<State> =>
    ({ setState }) => {
      const currentRegion = regions.find((region) => region.name === regionCode)!
      setState({ currentRegion: currentRegion.description })
    },
  removeCountry:
    (answer: string): Action<State> =>
    ({ setState, getState }) => {
      const filteredCountries = getState().filteredCountries.filter(
        (country) => !country.allowedAnswers.includes(answer.toLowerCase())
      )
      setState({ filteredCountries })
    },
  resetFilteredCountries:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({ filteredCountries: getState().countries })
    },
  setRandomCountry:
    (): Action<State> =>
    ({ setState, getState }) => {
      let countriesArr = getState().filteredCountries
      if (getState().isGameStarted) countriesArr = getState().filteredCountries
      const randomCountry = countriesArr[Math.floor(Math.random() * countriesArr.length)]
      setState({ randomCountry })
    },
  filterByRegion:
    (region: string | null): Action<State> =>
    ({ setState, getState }) => {
      if (region === 'WORLD') {
        setState({ filteredCountries: getState().countries })
      } else {
        setState({
          filteredCountries: getState().countries.filter(
            (country: Country) => country.region === region
          )
        })
      }
    },
  setIsGameStarted:
    (isGameStarted: boolean): Action<State> =>
    ({ setState }) => {
      setState({ isGameStarted })
    },
  setDifficulty:
    (difficulty: difficulty): Action<State> =>
    ({ setState }) => {
      setState({ difficulty })
    },
  setGuessedCountriesCount:
    (count: number): Action<State> =>
    ({ setState }) => {
      setState({ guessedCountriesCount: count })
    },
  setNotGuessedCountriesCount:
    (count: number): Action<State> =>
    ({ setState }) => {
      setState({ notGuessedCountriesCount: count })
    },
  // get 3 unique random countries from + the right country
  getRandomAnswers:
    (): Action<State> =>
    ({ setState, getState }) => {
      const randomCountries = sampleSize(
        getState()
          .countries.filter((el) => el.name !== getState().randomCountry.name)
          .map((el) => el.name),
        3
      )
      const randomAnswers = [...randomCountries, getState().randomCountry.name]
      const shuffledRandomAnswers = shuffle(randomAnswers)
      const rightAnswerNumberIndex =
        shuffledRandomAnswers.findIndex((el) => el == getState().randomCountry.name) + 1
      setState({ randomAnswers: shuffledRandomAnswers })
      setState({ rightAnswerNumber: rightAnswerNumberIndex })
    }
}

export const Store = createStore<State, typeof actions>({
  initialState,
  actions
})

export const useStore = createHook(Store)
