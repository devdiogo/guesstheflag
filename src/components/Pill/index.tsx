import { PillProps } from './types'

export const Pill = ({ text }: PillProps) => {
  return (
    <div className="flex items-center justify-center bg-zinc-800 px-2 text-md font-bold text-gray rounded mr-4">
      {text.toUpperCase()}
    </div>
  )
}
