import { Root, Thumb } from '@radix-ui/react-switch'

import { cn } from '@/utils/cn'

import { SwitchProps } from './types'

export const Switch = ({ name, label, className, ...props }: SwitchProps) => (
  <div className={cn('flex flex-row items-center gap-4', className)}>
    <Root
      id={name}
      name={name}
      className="data-[state=unchecked]:bg-negative-3 data-[state=checked]:bg-positive-3 data-[state=unchecked]:inset-shadow-negative-1 data-[state=checked]:inset-shadow-positive-1 flex h-8 w-20 cursor-pointer items-center rounded-full p-1 inset-shadow-xs transition-colors outline-none"
      {...props}
    >
      <Thumb className="bg-neutral-1 h-full w-10 rounded-full transition-transform data-[state=checked]:translate-x-[32px]" />
    </Root>

    <label htmlFor={name} className="text-neutral-2 font-bold select-none">
      {label}
    </label>
  </div>
)
