import { Bars3BottomRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/cn'
import logo from '@/images/logo.png'

type NavbarProps = {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => (
  <nav className={cn('w-full bg-gray-950/50 py-4 backdrop-blur-lg', className)}>
    <div className="mx-auto flex w-full max-w-screen-md flex-row items-center justify-between">
      <Link href="/">
        <Image src={logo} alt="The SUWO logo" className="h-10 w-[167px]" />
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

      <button>
        <Bars3BottomRightIcon className="h-7 w-7 stroke-gray-300 sm:hidden" />
      </button>
    </div>
  </nav>
)
