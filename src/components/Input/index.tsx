import { useEffect } from 'react'
import { InputProps } from './types'

export const Input = ({ highlightRightAnswer, innerRef, ...rest }: InputProps) => {
  useEffect(() => {
    innerRef.current?.focus()
  }, [innerRef, innerRef.current?.value])

  return (
    <input
      type="text"
      className={`w-full h-16 caret-gray bg-opacity-90 outline-none border-2 rounded-lg md:text-2xl text-lg text-white pl-4
        ${
          highlightRightAnswer
            ? 'bg-emerald-400 border-emerald-400'
            : 'bg-[#0B0B0B] border-dark-gray focus:outline-slate-400'
        }`}
      placeholder="Type the name of the country"
      disabled={highlightRightAnswer}
      ref={innerRef}
      autoFocus
      {...rest}
    />
  )
}
