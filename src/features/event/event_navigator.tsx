import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Divider } from '@/design_system/divider'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'

type EventNavigatorProps = {
  id: string
  className?: string
}

export const EventNavigator = ({ id, className }: EventNavigatorProps) => {
  const { data, error, isPending } = useQuery(queries.EVENTS())

  if (error || isPending) {
    return null
  }

  const index = data.findIndex((event) => event.id === id)

  const prev = data.at(index - 1)
  const next = data.at(index + 1)

  return (
    <nav
      className={cn(
        'bg-neutral-5/20 border-neutral-2/20 rounded-full border backdrop-blur',
        'mx-auto h-12 px-3',
        'flex',
        className,
      )}
    >
      {prev ? (
        <Link
          href={routes.EVENT(prev.id)}
          className="flex flex-1 items-center gap-2 p-2"
        >
          <ChevronDoubleLeftIcon className="size-4" />

          <span className="flex-1 text-left text-sm">{prev.name}</span>
        </Link>
      ) : (
        <div />
      )}

      <Divider orientation="vertical" className="h-1/2 self-center" />

      {next ? (
        <Link
          href={routes.EVENT(next.id)}
          className="flex flex-1 items-center gap-2 p-2"
        >
          <span className="flex-1 text-right text-sm">{next.name}</span>

          <ChevronDoubleRightIcon className="size-4" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
