import { Root, Thumb } from '@radix-ui/react-switch'

import { cn } from '@/utils/cn'

import { SwitchProps } from './types'

export const Switch = ({ name, label, className, ...props }: SwitchProps) => (
  <div className={cn('flex flex-row items-center gap-4', className)}>
    <Root
      id={name}
      name={name}
      className="data-[state=unchecked]:bg-negative data-[state=checked]:bg-positive flex w-12 cursor-pointer items-center rounded-full p-1 focus:outline-none"
      {...props}
    >
      <Thumb className="bg-neutral-1 h-5 w-5 rounded-full transition-transform data-[state=checked]:translate-x-full" />
    </Root>

    <label htmlFor={name} className="text-neutral-2 select-none">
      {label}
    </label>
  </div>
)
