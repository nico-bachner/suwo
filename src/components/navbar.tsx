import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, VisuallyHidden } from 'radix-ui'

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

      <Dialog.Root>
        <Dialog.Trigger>
          <Bars3BottomRightIcon className="h-8 w-8 stroke-gray-100 stroke-1 sm:hidden" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content className="fixed inset-0 z-10 flex flex-col gap-8 bg-gray-950 p-6">
            <VisuallyHidden.Root asChild>
              <Dialog.Title>SUWO</Dialog.Title>
            </VisuallyHidden.Root>

            <Dialog.Close className="self-end">
              <XMarkIcon className="h-8 w-8 stroke-gray-100 stroke-1" />
            </Dialog.Close>

            <div className="flex flex-col items-center gap-6">
              <Link
                href="/about"
                className="text-xl text-gray-100 hover:text-white"
              >
                About
              </Link>
              <Link
                href="/history"
                className="text-xl text-gray-100 hover:text-white"
              >
                History
              </Link>
              <Link
                href="/join"
                className="text-xl text-gray-100 hover:text-white"
              >
                Join
              </Link>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  </nav>
)
