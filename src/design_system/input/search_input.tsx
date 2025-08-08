import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const SearchInput = ({
  className,
  placeholder = 'Search...',
  ...props
}: ComponentProps<'input'>) => (
  <div
    className={cn(
      'text-neutral-2 focus-within:text-neutral-1 group focus-within:border-neutral-3 border-neutral-4 flex items-center rounded-lg border',
      className,
    )}
  >
    <MagnifyingGlassIcon className="stroke-neutral-3 group-focus-within:stroke-neutral-2 box-content size-5 p-2.5" />
    <input
      type="search"
      placeholder={placeholder}
      className="flex-1 pr-3 outline-none"
      {...props}
    />
  </div>
)
