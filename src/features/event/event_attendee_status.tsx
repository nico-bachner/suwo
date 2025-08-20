'use client'

import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'

import { Button } from '@/design_system/button'
import { Skeleton } from '@/design_system/skeleton'

type EventAttendeeStatusProps = {
  status: boolean
}

export const EventAttendeeStatus = ({ status }: EventAttendeeStatusProps) => {
  switch (status) {
    case true:
      return (
        <div className="px-6">
          <CheckIcon className="stroke-positive-3 -m-1 size-6 stroke-2" />
        </div>
      )
    case false:
      return (
        <Button variant="secondary">
          <PlusIcon className="-m-1 size-6" />
        </Button>
      )
  }
}

export const EventAttendeeStatusSkeleton = () => (
  <div className="px-6">
    <Skeleton className="size-6" />
  </div>
)
