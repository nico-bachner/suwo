import { Root, Thumb } from '@radix-ui/react-switch'

import { cn } from '@/lib/cn'

import { SwitchProps } from './types'

export const Switch = ({ name, label, className, ...props }: SwitchProps) => (
  <div className={cn('flex flex-row items-center gap-2', className)}>
    <Root
      id={name}
      name={name}
      className="flex w-12 cursor-pointer items-center justify-start rounded-full bg-gray-950 p-1 focus:outline-none data-[state=checked]:justify-end data-[state=checked]:bg-green-600 data-[state=checked]:focus:bg-green-500 data-[state=unchecked]:bg-red-600 data-[state=unchecked]:focus:bg-red-500"
      {...props}
    >
      <Thumb className="h-5 w-5 rounded-full bg-white" />
    </Root>

    <label htmlFor={name} className="text-sm text-gray-300 select-none">
      {label}
    </label>
  </div>
)
