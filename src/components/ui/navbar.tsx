import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/cn'
import { Menu } from '@/components/client/menu'
import { FacebookIcon } from '@/icons/Facebook'
import { InstagramIcon } from '@/icons/Instagram'
import { YouTubeIcon } from '@/icons/YouTube'
import logo from '@/images/logo.png'

import { NavbarLink } from '../client/navbar_link'

type NavbarProps = {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => (
  <nav className={cn('w-full bg-gray-950/80 py-2 backdrop-blur-lg', className)}>
    <div className="mx-auto flex w-full max-w-screen-md flex-row items-center">
      <Link href="/" className="flex-1">
        <Image src={logo} alt="The SUWO logo" className="h-12 w-12" />
      </Link>

      <div className="hidden flex-1 flex-row items-center justify-center gap-4 sm:flex">
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/history">History</NavbarLink>
        <NavbarLink href="/join">Join</NavbarLink>
        <NavbarLink href="/roll-call">Roll Call</NavbarLink>
      </div>

      <div className="hidden flex-1 flex-row items-center justify-end gap-4 sm:flex">
        <a
          href="https://www.youtube.com/user/SydneyUniWindOrch"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YouTubeIcon className="h-6 w-6 stroke-gray-100 stroke-1" />
        </a>
        <a
          href="https://www.facebook.com/sydneyuniversitywindorchestra"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon className="h-6 w-6 stroke-gray-100 stroke-1" />
        </a>
        <a
          href="https://www.instagram.com/suwo.syd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon className="h-6 w-6 stroke-gray-100 stroke-1" />
        </a>
      </div>

      <Menu className="sm:hidden" />
    </div>
  </nav>
)
