import { Root, Thumb } from '@radix-ui/react-switch'

import { cn } from '@/utils/cn'

import { SwitchProps } from './types'

export const Switch = ({ name, label, className, ...props }: SwitchProps) => (
  <div className={cn('flex flex-row items-center gap-2', className)}>
    <Root
      id={name}
      name={name}
      className="data-[state=unchecked]:bg-negative-4 data-[state=checked]:bg-positive-4 flex w-12 cursor-pointer items-center justify-start rounded-full p-1 focus:outline-none data-[state=checked]:justify-end"
      {...props}
    >
      <Thumb className="bg-neutral-2 h-5 w-5 rounded-full" />
    </Root>

    <label htmlFor={name} className="text-sm text-gray-300 select-none">
      {label}
    </label>
  </div>
)
