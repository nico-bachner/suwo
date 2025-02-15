import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/cn'
import logo from '@/images/logo.png'

import { Menu } from './client/menu'

type NavbarProps = {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => (
  <nav className={cn('w-full bg-gray-950/50 py-4 backdrop-blur-lg', className)}>
    <div className="mx-auto flex w-full max-w-screen-md flex-row items-center justify-between">
      <Link href="/">
        <Image src={logo} alt="The SUWO logo" className="h-10 w-12" />
      </Link>

      <div className="hidden flex-1 flex-row items-center justify-end gap-4 sm:flex">
        <Link href="/about" className="text-gray-100 hover:text-white">
          About
        </Link>
        <Link href="/history" className="text-gray-100 hover:text-white">
          History
        </Link>
        <Link href="/join" className="text-gray-100 hover:text-white">
          Join
        </Link>
      </div>

      <Menu />
    </div>
  </nav>
)
