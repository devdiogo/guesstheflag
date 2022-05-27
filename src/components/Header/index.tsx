import { Pill } from '..'

export const Header = () => {
  return (
    <div className="flex items-center justify-center bg-zinc-700 w-full h-20 mb-20">
      <div className="flex">
        <Pill text="GAME" />
        <h1 className="font-bold text-white lg:text-3xl text-2xl">GUESS THE FLAG</h1>
      </div>
    </div>
  )
}
