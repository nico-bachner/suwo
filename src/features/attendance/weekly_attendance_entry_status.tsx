'use client'

import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@/design_system/button'
import { Skeleton } from '@/design_system/skeleton'
import { mutations } from '@/lib/mutations'

import { WeeklyAttendanceEntryProps } from './types'

type WeeklyAttendanceEntryStatusProps = WeeklyAttendanceEntryProps & {
  isPresent: boolean
}

export const WeeklyAttendanceEntryStatus = ({
  attendanceData,
  profile,
  isPresent,
}: WeeklyAttendanceEntryStatusProps) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(mutations.LOG_WEEKLY_ATTENDANCE(queryClient))

  switch (isPresent) {
    case true:
      return (
        <div className="px-6">
          <CheckIcon className="stroke-positive-3 -m-1 size-6 stroke-2" />
        </div>
      )
    case false:
      return (
        <Button
          variant="secondary"
          onClick={() => {
            mutate({
              ...attendanceData,
              user_id: profile.user_id,
            })
          }}
        >
          <PlusIcon className="-m-1 size-6" />
        </Button>
      )
  }
}

export const WeeklyAttendanceEntryStatusSkeleton = () => (
  <div className="px-6">
    <Skeleton className="size-6" />
  </div>
)
