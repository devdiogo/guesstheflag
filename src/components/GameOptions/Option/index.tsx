/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup } from '@headlessui/react'
import { ReactNode, SVGProps } from 'react'
import { useStore } from '../../../store'

interface Item {
  name: string
  description: string
}

interface Options {
  icon: ReactNode
  title: string
  label: string
  items: Item[]
  value: any
  onChange: (arg: any) => void | Promise<void>
}

export const Option = ({ icon, title, label, items, value, onChange }: Options) => {
  const [, actions] = useStore()
  const setRegion = (item: Item) => {
    if (title.toLowerCase() == 'region') {
      const filter = item.name !== 'WORLD' ? item.name : 'WORLD'
      actions.setCurrentRegion(filter)
      actions.filterByRegion(filter)
      actions.setRandomCountry()
    }
  }
  return (
    <>
      <div className="flex items-center mb-5">
        <div>{icon}</div>
        <h2 className="text-xl">{title.toUpperCase()}</h2>
      </div>
      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
        <div className="grid grid-flow-row lg:grid-cols-2 gap-2">
          {items.map((item) => (
            <RadioGroup.Option
              onClick={() => setRegion(item)}
              key={item.name}
              value={title.toLowerCase() !== 'region' ? item.name : item}
              className={({ active, checked }) =>
                `
                ${
                  (item.name == 'WORLD' || title.toLowerCase() == 'difficulty') &&
                  'col-span-full w-full'
                } 
                ${active && 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'}
                ${checked ? 'bg-dark-gray bg-opacity-75 text-white' : 'bg-slate-50 text-black'}
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none]
                `
              }
            >
              {({ checked }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                        >
                          {item.name.toUpperCase()}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'}`}
                        >
                          <span>{item.description}</span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 ml-2 text-white">
                        <CheckIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  )
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
