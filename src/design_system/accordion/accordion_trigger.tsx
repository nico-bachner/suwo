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
      'bg-neutral-5/80 border-neutral-4/80 group flex h-16 w-full cursor-pointer flex-row items-center rounded-full border px-8 backdrop-blur transition-transform outline-none hover:scale-105 focus-visible:scale-105',
      className,
    )}
    {...props}
  >
    <p className="flex-1 text-left text-lg font-medium">{children}</p>

    <ChevronDownIcon className="box-content size-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
  </Trigger>
)
