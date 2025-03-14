'use client'

import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Popover } from 'radix-ui'

type ProfileActionProps = {
  id: number
}

export const ProfileAction = ({ id }: ProfileActionProps) => {
  const router = useRouter()

  return (
    <Popover.Root>
      <Popover.Trigger className="cursor-pointer rounded-full hover:bg-gray-900 focus:bg-gray-900 focus:outline-none">
        <AdjustmentsHorizontalIcon className="box-content h-6 w-6 stroke-gray-300 p-3" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex w-60 flex-col gap-1 rounded-lg border border-gray-700 bg-gray-950/90 p-2 backdrop-blur-lg">
          <Popover.Arrow className="fill-gray-700" />

          <Popover.Close
            className="cursor-pointer self-end rounded-full p-2 hover:bg-gray-900 focus:bg-gray-900 focus:outline-none"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5 stroke-gray-300" />
          </Popover.Close>

          <Link
            href={`/members/${id}/edit`}
            className="rounded-md bg-gray-900 px-4 py-2 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
          >
            Edit Profile
          </Link>
          <button className="cursor-pointer rounded-md bg-red-500/20 px-4 py-2 text-start hover:bg-red-500/30 focus:bg-red-500/30 focus:outline-none">
            Log Out
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
