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
      'group bg-neutral-7/80 border-neutral-5/80 focus-within:border-neutral-4/80 flex h-12 gap-4 rounded-full border backdrop-blur',
      className,
    )}
  >
    <MagnifyingGlassIcon className="stroke-neutral-3/80 group-focus-within:stroke-neutral-2/80 -m-1 box-content size-6 self-center pl-6" />

    <input
      type="search"
      placeholder={placeholder}
      className="focus:text-neutral-1/80 text-neutral-3/80 placeholder:text-neutral-4/80 focus:placeholder:text-neutral-3/80 flex-grow pr-6 outline-none"
      {...props}
    />
  </div>
)
