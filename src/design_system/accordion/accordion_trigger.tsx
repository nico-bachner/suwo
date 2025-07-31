import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Trigger } from '@radix-ui/react-accordion'
import { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export const AccordionTrigger = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Trigger>) => (
  <Trigger
    className={cn(
      'bg-neutral-6 border-neutral-5 hover:border-neutral-4 hover:bg-neutral-5 focus-visible:bg-neutral-5 group flex w-full cursor-pointer flex-row items-center rounded-md border transition-colors outline-none',
      className,
    )}
    {...props}
  >
    <p className="flex-1 pl-5 text-left text-lg font-medium">{children}</p>

    <ChevronDownIcon className="box-content size-5 p-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
  </Trigger>
)
