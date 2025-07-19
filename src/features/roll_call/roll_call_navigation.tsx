import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { MAX_WEEK, MIN_WEEK } from '@/features/usyd_api_wrapper/config'
import { Attendance } from '@/generated/prisma'

export const RollCallNavigation = ({
  year,
  semester,
  week,
}: Pick<Attendance, 'year' | 'semester' | 'week'>) => (
  <nav className="bg-neutral-7/50 sticky bottom-0 mx-auto grid w-full max-w-screen-sm grid-cols-2 gap-4 p-4 backdrop-blur-lg">
    {week > MIN_WEEK && (
      <Button
        variant="secondary"
        asChild
        className="col-start-1 justify-self-start"
      >
        <Link href={`/roll-call/${year}/${semester}/${week - 1}`}>
          <ChevronLeftIcon className="box-content h-5 w-5" />
          <span className="pr-2">Week {week - 1}</span>
        </Link>
      </Button>
    )}

    {week < MAX_WEEK && (
      <Button
        variant="secondary"
        asChild
        className="col-start-2 justify-self-end"
      >
        <Link href={`/roll-call/${year}/${semester}/${week + 1}`}>
          <span className="pl-2">Week {week + 1}</span>
          <ChevronRightIcon className="box-content h-5 w-5" />
        </Link>
      </Button>
    )}
  </nav>
)
