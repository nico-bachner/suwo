'use client'

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Close } from '@radix-ui/react-dialog'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { LINKS, NAV_LINKS, NAV_SOCIAL_LINKS } from '@/config'
import { Icon } from '@/design_system/icon'
import { Profile } from '@/generated/prisma'
import { cn } from '@/utils/cn'

import { Dialog } from '../../design_system/dialog'

type MenuProps = {
  profile: Profile | null
  className?: string
}

export const MobileMenu = ({ profile }: MenuProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Dialog
      title="SUWO"
      trigger={
        <Bars3BottomRightIcon className="stroke-neutral-1 h-8 w-8 stroke-1 lg:hidden" />
      }
      open={open}
      onOpenChange={setOpen}
      className="inset-0 flex flex-col justify-evenly p-6"
    >
      <Close className="focus:bg-neutral-4 absolute top-6 right-6 cursor-pointer rounded-lg p-1 focus:outline-none">
        <XMarkIcon className="h-8 w-8 stroke-gray-100 stroke-1" />
      </Close>

      <div className="flex flex-col items-center gap-6">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => {
              setOpen(false)
            }}
            className={cn(
              'text-xl',
              pathname.split('/')[1] == href.split('/')[1]
                ? 'text-amber-300 hover:text-amber-100'
                : 'text-gray-300 hover:text-gray-100',
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      {profile ? (
        <div className="flex flex-col items-center gap-6">
          <Link
            href={`/members/${profile.handle}`}
            onClick={() => {
              setOpen(false)
            }}
            className="text-xl font-medium text-gray-300"
          >
            Profile
          </Link>
          <Link
            href="/settings"
            onClick={() => {
              setOpen(false)
            }}
            className="text-xl font-medium text-gray-300"
          >
            Settings
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <Link
            href={LINKS.LOGIN.href}
            onClick={() => {
              setOpen(false)
            }}
            className="text-xl font-medium text-gray-300"
          >
            {LINKS.LOGIN.label}
          </Link>
          <Link
            href={LINKS.REGISTER.href}
            onClick={() => {
              setOpen(false)
            }}
            className="text-xl font-medium text-gray-300"
          >
            {LINKS.REGISTER.label}
          </Link>
        </div>
      )}

      <div className="flex flex-row items-center gap-4 self-center">
        {NAV_SOCIAL_LINKS.map(({ href, icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            <Icon icon={icon} size="lg" className="stroke-neutral-2 stroke-1" />
          </a>
        ))}
      </div>
    </Dialog>
  )
}
