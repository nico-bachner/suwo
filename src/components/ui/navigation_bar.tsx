import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { cn } from '@/lib/cn'

type NavigationBarProps = {
  parent?: {
    href: string
    message?: string
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
  <div className={cn('grid grid-cols-4 items-center gap-4', className)}>
    {parent && (
      <Link
        href={parent.href}
        className="col-start-1 w-fit cursor-pointer justify-self-start rounded-full transition-colors select-none hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
      >
        <ChevronLeftIcon className="box-content h-6 w-6 stroke-gray-300 p-2" />
      </Link>
    )}

    <h1 className="col-span-2 col-start-2 line-clamp-1 justify-self-center text-center font-serif text-3xl font-extrabold text-gray-100 sm:text-4xl">
      {title}
    </h1>

    {action && <div className="col-start-4 justify-self-end">{action}</div>}
  </div>
)
