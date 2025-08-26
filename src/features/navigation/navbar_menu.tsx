'use client'

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Close } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { SOCIAL_LINKS } from '@/config'
import { Dialog } from '@/design_system/dialog'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'

import { useCurrentEvent } from '../event/use_upcoming_event'
import { NavbarMenuLink } from './navbar_menu_link'

type NavbarMenuProps = {
  className?: string
}

export const NavbarMenu = ({ className }: NavbarMenuProps) => {
  const { data: session } = useQuery(queries.SESSION())
  const currentEvent = useCurrentEvent()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Dialog
      title="SUWO"
      trigger={
        <Bars3BottomRightIcon
          className={cn(
            'stroke-neutral-1 h-12 w-12 cursor-pointer stroke-1 p-2',
            className,
          )}
        />
      }
      open={open}
      onOpenChange={setOpen}
      className="inset-0 flex flex-col justify-evenly p-6"
    >
      <Close className="absolute top-6 right-6 cursor-pointer rounded-full p-1 outline-none">
        <XMarkIcon className="h-8 w-8 stroke-gray-100 stroke-1" />
      </Close>

      <div className="flex flex-col gap-6 text-center">
        {!session && (
          <NavbarMenuLink href={routes.HISTORY()}>History</NavbarMenuLink>
        )}
        <NavbarMenuLink href={routes.EVENTS()}>Events</NavbarMenuLink>
        <NavbarMenuLink href={routes.PROFILES()}>Members</NavbarMenuLink>

        {currentEvent && (
          <NavbarMenuLink href={routes.EVENT_ATTENDEES(currentEvent.id)}>
            {currentEvent.name} Attendance
          </NavbarMenuLink>
        )}
      </div>

      {session ? (
        <div className="flex flex-col gap-6 text-center">
          <NavbarMenuLink href={routes.PROFILE(session.user_id)}>
            Profile
          </NavbarMenuLink>
          <NavbarMenuLink href={routes.SETTINGS()}>Settings</NavbarMenuLink>
        </div>
      ) : (
        <div className="flex flex-col gap-6 text-center">
          <NavbarMenuLink href={routes.LOGIN()}>Log In</NavbarMenuLink>
          <NavbarMenuLink href={routes.REGISTER()}>Join SUWO</NavbarMenuLink>
        </div>
      )}

      <div className="flex flex-row items-center gap-4 self-center">
        {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            <Icon className="stroke-neutral-2 size-8 stroke-1" />
          </a>
        ))}
      </div>
    </Dialog>
  )
}
