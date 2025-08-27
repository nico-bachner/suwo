'use client'

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

import { Divider } from '@/design_system/divider'
import { queries, queryKeys } from '@/lib/queries'
import { routes } from '@/lib/routes'
import { cn } from '@/utils/cn'

type EventNavigatorProps = {
  id: string
  className?: string
}

export const EventNavigator = ({ id, className }: EventNavigatorProps) => {
  const queryClient = useQueryClient()
  const { data, error, isPending } = useQuery(queries.EVENTS())

  if (error || isPending) {
    return null
  }

  const index = data.findIndex((event) => event.id === id)

  const prev = data.at(index - 1)
  const next = data.at(index + 1)

  if (prev) {
    queryClient.setQueryData(queryKeys.EVENT(prev.id), prev)
  }
  if (next) {
    queryClient.setQueryData(queryKeys.EVENT(next.id), next)
  }

  return (
    <nav
      className={cn(
        'bg-neutral-5/20 border-neutral-2/20 rounded-full border backdrop-blur',
        'mx-auto h-10 w-[calc(100%-16px)] px-2.5 md:max-w-screen-lg',
        'flex',
        className,
      )}
    >
      {prev ? (
        <Link
          href={routes.EVENT(prev.id)}
          className="flex flex-1 items-center gap-3 px-2"
        >
          <ChevronDoubleLeftIcon className="-m-1 size-4" />

          <span className="flex-1 text-left text-sm">{prev.name}</span>
        </Link>
      ) : (
        <div />
      )}

      <Divider orientation="vertical" className="h-1/2 self-center" />

      {next ? (
        <Link
          href={routes.EVENT(next.id)}
          className="flex flex-1 items-center gap-3 px-2"
        >
          <span className="flex-1 text-right text-sm">{next.name}</span>

          <ChevronDoubleRightIcon className="-m-1 size-4" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
