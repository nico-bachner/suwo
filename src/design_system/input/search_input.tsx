import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const SearchInput = ({
  placeholder = 'Search...',
  className,
  ...props
}: ComponentProps<'input'>) => (
  <div className={cn('group flex', className)}>
    <div className="bg-neutral-5 group-focus-within:bg-neutral-4 flex items-center justify-center rounded-l-lg px-4 py-3">
      <MagnifyingGlassIcon className="stroke-neutral-3 group-focus-within:stroke-neutral-2 box-content size-6" />
    </div>
    <input
      type="search"
      placeholder={placeholder}
      className="focus:text-neutral-1 text-neutral-2 border-neutral-5 focus:border-neutral-4 flex-1 rounded-r-lg border px-4 py-3 outline-none"
      {...props}
    />
  </div>
)
