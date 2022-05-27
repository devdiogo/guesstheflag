export interface Timer {
  time: number
  start: () => void
  reset: () => void
}

export interface ProgressBarProps {
  quizStatus: string
  timer: Timer
}
