'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/design_system/button'
import { queries } from '@/lib/queries'
import { routes } from '@/lib/routes'
import { cn } from '@/utils/cn'

import { useCurrentEvent } from '../event/use_upcoming_event'
import { NavbarLink } from './navbar_link'
import { NavbarMenu } from './navbar_menu'
import { SUWOIcon } from './suwo_icon'

type NavbarProps = {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { data: session } = useQuery(queries.SESSION())
  const currentEvent = useCurrentEvent()

  return (
    <nav
      className={cn(
        'bg-neutral-5/20 border-neutral-2/20 rounded-full border backdrop-blur',
        'mx-auto w-[calc(100%-16px)] max-w-screen-lg',
        'h-16 px-4 md:h-20 md:px-5',
        'flex items-center justify-between gap-2',
        className,
      )}
    >
      <Link
        href={routes.HOME()}
        title="Home"
        className="outline-primary-1 rounded-full outline-offset-4 focus-visible:outline-4"
      >
        <SUWOIcon className="-m-1 size-14 md:size-16" />
      </Link>

      <div className="hidden items-center gap-4 md:flex">
        {session ? (
          <NavbarLink href={routes.USER_HOME(session.user_id)}>Home</NavbarLink>
        ) : (
          <NavbarLink href={routes.HISTORY()}>History</NavbarLink>
        )}
        <NavbarLink href={routes.PROFILES()}>Members</NavbarLink>
        <NavbarLink href={routes.EVENTS()}>Events</NavbarLink>
        {currentEvent && (
          <NavbarLink href={routes.EVENT(currentEvent.id)}>
            {currentEvent.name}
          </NavbarLink>
        )}
      </div>

      <div className="hidden items-center gap-2 md:flex">
        {session ? (
          <>
            <Button asChild variant="secondary">
              <Link href={routes.PROFILE(session.user_id)}>Profile</Link>
            </Button>
            <Button asChild variant="primary">
              <Link href={routes.SETTINGS()}>Settings</Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="secondary">
              <Link href={routes.LOGIN()}>Log In</Link>
            </Button>
            <Button asChild variant="primary">
              <Link href={routes.REGISTER()}>Join SUWO</Link>
            </Button>
          </>
        )}
      </div>

      <NavbarMenu className="md:hidden" />
    </nav>
  )
}
