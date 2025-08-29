import { Root, Thumb } from '@radix-ui/react-switch'

import { cn } from '@/utils/cn'

import { SwitchProps } from './types'

export const Switch = ({ name, label, className, ...props }: SwitchProps) => (
  <div className={cn('flex flex-row items-center gap-4', className)}>
    <Root
      id={name}
      name={name}
      className={cn(
        'flex h-8 w-20 cursor-pointer items-center rounded-full border p-1 outline-offset-2 focus-visible:outline-4',
        'transition-colors duration-300',
        'data-[state=checked]:bg-positive-3 data-[state=checked]:border-positive-2',
        'data-[state=unchecked]:bg-negative-3 data-[state=unchecked]:border-negative-2',
      )}
      {...props}
    >
      <Thumb
        className={cn(
          'bg-neutral-1 h-full w-10 rounded-full',
          'transition-transform duration-300',
          'data-[state=unchecked]:translate-x-0',
          'data-[state=checked]:translate-x-[calc(100%-10px)]',
        )}
      />
    </Root>

    <label htmlFor={name} className="text-neutral-2 font-bold select-none">
      {label}
    </label>
  </div>
)
