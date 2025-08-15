import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const SearchInput = ({
  placeholder = 'Search...',
  className,
  ...props
}: ComponentProps<'input'>) => (
  <div
    className={cn(
      'group flex gap-4',
      'h-12 rounded-full',
      'bg-neutral-5/80 backdrop-blur',
      'border-neutral-4/80 focus-within:border-neutral-3/80 border',
      className,
    )}
  >
    <MagnifyingGlassIcon className="stroke-neutral-3/80 group-focus-within:stroke-neutral-2/80 -m-1 box-content size-6 self-center pl-6" />

    <input
      type="search"
      placeholder={placeholder}
      className={cn(
        'focus:text-neutral-1/80 text-neutral-2/80 placeholder:text-neutral-3/80 focus:placeholder:text-neutral-2/80',
        'flex-grow pr-6 outline-none',
      )}
      {...props}
    />
  </div>
)
