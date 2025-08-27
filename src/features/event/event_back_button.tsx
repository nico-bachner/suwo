import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { routes } from '@/lib/routes'
import { cn } from '@/utils/cn'

type EventBackButtonProps = {
  className?: string
}

export const EventBackButton = ({ className }: EventBackButtonProps) => (
  <div
    className={cn(
      'mx-auto flex h-10 w-[calc(100%-16px)] md:max-w-screen-lg',
      className,
    )}
  >
    <Button variant="secondary" asChild className="justify-self-start">
      <Link href={routes.EVENTS()}>
        <ChevronLeftIcon className="-m-1 size-5" />
        Back to Events
      </Link>
    </Button>
  </div>
)
