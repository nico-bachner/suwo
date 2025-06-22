import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { MAX_WEEK, MIN_WEEK } from '@/lib/usyd/config'

import { RollCallDate } from './types'

export const RollCallNavigation = ({ year, semester, week }: RollCallDate) => (
  <nav className="bg-neutral-5 sticky bottom-0 mx-auto grid w-full max-w-screen-sm grid-cols-2 gap-4 p-4 backdrop-blur-lg">
    {week > MIN_WEEK && (
      <Link
        href={`/roll-call/${year}/${semester}/${week - 1}`}
        className="col-start-1 flex flex-row items-center justify-self-start rounded-md hover:bg-gray-900"
      >
        <ChevronLeftIcon className="box-content h-5 w-5 stroke-gray-300 p-2" />
        <span className="py-2 pr-4">Week {week - 1}</span>
      </Link>
    )}

    {week < MAX_WEEK && (
      <Button
        variant="tertiary"
        asChild
        className="col-start-2 flex flex-row items-center justify-self-end"
      >
        <Link href={`/roll-call/${year}/${semester}/${week + 1}`}>
          <span className="text-gray-300">Week {week + 1}</span>
          <ChevronRightIcon className="box-content h-5 w-5 p-2" />
        </Link>
      </Button>
    )}
  </nav>
)
