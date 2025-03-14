import Image from 'next/image'
import Link from 'next/link'

import { Menu } from '@/components/client/menu'
import { FACEBOOK, INSTAGRAM, YOUTUBE } from '@/config'
import { FacebookIcon } from '@/icons/Facebook'
import { InstagramIcon } from '@/icons/Instagram'
import { YouTubeIcon } from '@/icons/YouTube'
import logo from '@/images/logo.png'
import { cn } from '@/lib/cn'

import { NavbarLink } from '../client/navbar_link'

type NavbarProps = {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => (
  <nav className={cn('w-full bg-gray-950/80 py-2 backdrop-blur-lg', className)}>
    <div className="mx-auto flex w-full max-w-screen-md flex-row items-center">
      <div className="hidden flex-3 flex-row items-center justify-center gap-4 sm:flex">
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/history">History</NavbarLink>
        <NavbarLink
          href={`https://calendar.google.com/calendar/u/0?cid=${process.env.GOOGLE_CALENDAR_ID}`}
        >
          Calendar
        </NavbarLink>
        <NavbarLink href="/roll-call">Roll Call</NavbarLink>
        <NavbarLink href="/join">Join</NavbarLink>
      </div>

      <div className="hidden flex-1 flex-row items-center justify-end gap-4 sm:flex">
        <a href={YOUTUBE} target="_blank" rel="noopener noreferrer">
          <YouTubeIcon className="h-6 w-6 stroke-gray-100 stroke-1" />
        </a>
        <a href={FACEBOOK} target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="h-6 w-6 stroke-gray-100 stroke-1" />
        </a>
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="h-6 w-6 stroke-gray-100 stroke-1" />
        </a>
      </div>
    </div>
  </nav>
)
