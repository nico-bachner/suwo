import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { cn } from '@/lib/cn'

type NavigationBarProps = {
  parent?: {
    title: string
    href: string
  }
  title: string
  action?: React.ReactNode
  className?: string
}

export const NavigationBar = ({
  parent,
  title,
  action,
  className,
}: NavigationBarProps) => (
  <div
    className={cn(
      'grid grid-cols-2 grid-rows-2 items-center gap-4 max-sm:-mx-2 sm:grid-cols-4',
      className,
    )}
  >
    {parent && (
      <Link
        href={parent.href}
        className="col-start-1 flex w-fit cursor-pointer flex-row items-center justify-self-start rounded-full transition-colors select-none hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
      >
        <ChevronLeftIcon className="box-content h-6 w-6 stroke-gray-300 p-2" />

        <span className="pr-4 text-gray-300">{parent.title}</span>
      </Link>
    )}

    <h1 className="col-span-2 line-clamp-1 font-serif text-3xl font-extrabold text-gray-100 max-sm:px-4 sm:col-start-2 sm:justify-self-center sm:text-4xl">
      {title}
    </h1>

    {action && (
      <div className="col-start-2 row-start-1 justify-self-end sm:col-start-4">
        {action}
      </div>
    )}
  </div>
)
