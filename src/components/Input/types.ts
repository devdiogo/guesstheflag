import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  highlightRightAnswer?: boolean
  innerRef: any
  // innerRef: React.Ref<HTMLInputElement>
}
