import { Bars3BottomRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { cn } from '@/cn'
import logo from '@/images/logo.png'

type NavbarProps = {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => (
  <nav className={cn('w-full bg-gray-950/50 py-4 backdrop-blur-lg', className)}>
    <div className="mx-auto flex w-full max-w-screen-md flex-row items-center justify-between">
      <Image src={logo} alt="The SUWO logo" className="h-10 w-[167px]" />

      <Bars3BottomRightIcon className="h-8 w-8 stroke-gray-300" />
    </div>
  </nav>
)
