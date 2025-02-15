'use client'

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, VisuallyHidden } from 'radix-ui'
import { useState } from 'react'

import { cn } from '@/cn'
import { InstagramIcon } from '@/icons/Instagram'
import { YouTubeIcon } from '@/icons/YouTube'

export const Menu = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const NavbarLink = ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={cn(
        'text-2xl text-gray-100',
        href == pathname && 'text-yellow-400',
      )}
    >
      {children}
    </Link>
  )

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Bars3BottomRightIcon className="h-8 w-8 stroke-gray-100 stroke-1 sm:hidden" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed inset-0 z-10 flex flex-col justify-between bg-gray-950 p-6 pb-[20vh]">
          <VisuallyHidden.Root asChild>
            <Dialog.Title>SUWO</Dialog.Title>
          </VisuallyHidden.Root>

          <Dialog.Close className="self-end">
            <XMarkIcon className="h-8 w-8 stroke-gray-100 stroke-1" />
          </Dialog.Close>

          <div className="flex flex-col items-center gap-6">
            <NavbarLink href="/about">About</NavbarLink>
            <NavbarLink href="/history">History</NavbarLink>
            <NavbarLink href="/join">Join</NavbarLink>
          </div>

          <div className="flex flex-row justify-center gap-4">
            <a
              href="https://www.instagram.com/suwo.syd/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="h-10 w-10 stroke-gray-100 stroke-1" />
            </a>
            <a
              href="https://www.youtube.com/user/SydneyUniWindOrch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon className="h-10 w-10 stroke-gray-100 stroke-1" />
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
