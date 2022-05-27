import { Country } from '../pages/FlagsQuiz/types'
import { difficulty } from '../components/GameOptions/types'

export interface State {
  countries: Country[]
  filteredCountries: Country[]
  currentRegion: string | null
  difficulty: difficulty
  isGameStarted: boolean
  randomCountry: Country
  randomAnswers: string[]
  rightAnswerNumber: number | null
  guessedCountriesCount: number
  notGuessedCountriesCount: number
}
