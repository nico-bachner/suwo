'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { IMAGES } from '@/config'
import { Button } from '@/design_system/button'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

import { NavbarLink } from './navbar_link'
import { NavbarMenu } from './navbar_menu'

export const Navbar = () => {
  const { data: session } = useQuery(queries.SESSION())
  const { data: currentWeek } = useQuery(queries.CURRENT_WEEK())

  return (
    <nav className="bg-neutral-7/80 border-neutral-4/50 sticky top-0 border-b p-4 backdrop-blur-lg">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between">
        <Link href={routes.HOME()}>
          <Image {...IMAGES.ICON} className="h-12 w-12" />
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <NavbarLink href={routes.HOME()}>Home</NavbarLink>
          <NavbarLink href={routes.HISTORY()}>History</NavbarLink>
          <NavbarLink href={routes.MEMBERS()}>Members</NavbarLink>
          <NavbarLink href={routes.CALENDAR()}>Calendar</NavbarLink>
          <NavbarLink
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
          </NavbarLink>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {session ? (
            <>
              <Button asChild variant="secondary">
                <Link href={routes.PROFILE(session)}>Profile</Link>
              </Button>
              <Button asChild variant="primary">
                <Link href={routes.SETTINGS()}>Settings</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="secondary">
                <Link href={routes.LOGIN()}>Login</Link>
              </Button>
              <Button asChild variant="primary">
                <Link href={routes.REGISTER()}>Join SUWO</Link>
              </Button>
            </>
          )}
        </div>

        <NavbarMenu className="md:hidden" />
      </div>
    </nav>
  )
}
