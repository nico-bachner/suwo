'use client'

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Close } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { SOCIAL_LINKS } from '@/config'
import { Dialog } from '@/design_system/dialog'
import { Icon } from '@/design_system/icon'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

import { NavbarMenuLink } from './navbar_menu_link'

type NavbarMenuProps = {
  className?: string
}

export const NavbarMenu = ({ className }: NavbarMenuProps) => {
  const { data: session } = useQuery(queries.SESSION())
  const { data: currentWeek } = useQuery(queries.CURRENT_WEEK())
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
      <Close className="absolute top-6 right-6 cursor-pointer rounded-lg p-1 focus:outline-none">
        <XMarkIcon className="h-8 w-8 stroke-gray-100 stroke-1" />
      </Close>

      <div className="flex flex-col items-center gap-6">
        <NavbarMenuLink href={routes.HOME()}>Home</NavbarMenuLink>
        <NavbarMenuLink href={routes.HISTORY()}>History</NavbarMenuLink>
        <NavbarMenuLink href={routes.MEMBERS()}>Members</NavbarMenuLink>
        <NavbarMenuLink href={routes.CALENDAR()}>Calendar</NavbarMenuLink>
        <NavbarMenuLink
          href={
            currentWeek
              ? routes.WEEKLY_ATTENDANCES({
                  year: getCurrentYear(),
                  semester: getCurrentSemester(),
                  week: currentWeek,
                })
              : routes.ATTENDANCES()
          }
        >
          Attendance
        </NavbarMenuLink>
      </div>

      <div className="flex flex-col items-center gap-6">
        {session ? (
          <>
            <NavbarMenuLink href={routes.PROFILE(session)}>
              Profile
            </NavbarMenuLink>
            <NavbarMenuLink href={routes.SETTINGS()}>Settings</NavbarMenuLink>
          </>
        ) : (
          <>
            <NavbarMenuLink href={routes.LOGIN()}>Login</NavbarMenuLink>
            <NavbarMenuLink href={routes.REGISTER()}>Join SUWO</NavbarMenuLink>
          </>
        )}
      </div>

      <div className="flex flex-row items-center gap-4 self-center">
        {SOCIAL_LINKS.map(({ href, icon }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            <Icon icon={icon} size="lg" className="stroke-neutral-2 stroke-1" />
          </a>
        ))}
      </div>
    </Dialog>
  )
}
