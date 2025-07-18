'use client'

import Image from 'next/image'
import Link from 'next/link'

import { IMAGES } from '@/config'
import { Button } from '@/design_system/button'
import { routes } from '@/routes'

import { useSessionQuery } from '../auth/session/client/use_session_query'
import { NavbarLink } from './navbar_link'
import { NavbarMenu } from './navbar_menu'

export const Navbar = () => {
  const { session } = useSessionQuery()

  return (
    <nav className="bg-neutral-7 sticky top-0 p-4">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between">
        <Link href="/">
          <Image {...IMAGES.ICON} className="h-12 w-12" />
        </Link>

        <div className="hidden items-center gap-4 sm:flex">
          <NavbarLink href={routes.HOME}>Home</NavbarLink>
          <NavbarLink href={routes.HISTORY}>History</NavbarLink>
          <NavbarLink href={routes.MEMBERS}>Members</NavbarLink>
          {session && (
            <NavbarLink href={routes.ATTENDANCES()}>Attendance</NavbarLink>
          )}
        </div>

        {session ? (
          <Button asChild variant="primary">
            <Link href={routes.SETTINGS}>Settings</Link>
          </Button>
        ) : (
          <div className="hidden items-center gap-2 sm:flex">
            <Button asChild variant="secondary">
              <Link href={routes.LOGIN()}>Login</Link>
            </Button>
            <Button asChild variant="primary">
              <Link href={routes.REGISTER}>Join SUWO</Link>
            </Button>
          </div>
        )}

        <NavbarMenu session={session} className="sm:hidden" />
      </div>
    </nav>
  )
}
