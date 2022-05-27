export interface GameOptionsProps {
  onPlay: () => void
}

export type difficulty = 'hard' | 'easy'

export interface difficultyOptions {
  name: difficulty
  description: string
}
