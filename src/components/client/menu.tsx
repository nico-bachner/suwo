'use client'

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, VisuallyHidden } from 'radix-ui'
import { useState } from 'react'

import { FacebookIcon } from '@/icons/Facebook'
import { InstagramIcon } from '@/icons/Instagram'
import { YouTubeIcon } from '@/icons/YouTube'

import { NavbarLink } from './navbar_link'

type MenuProps = {
  className?: string
}

export const Menu = ({ className }: MenuProps) => {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={className}>
        <Bars3BottomRightIcon className="h-8 w-8 stroke-gray-100 stroke-1" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed inset-0 z-10 flex flex-col justify-between bg-gray-950/80 p-6 pb-[20vh] backdrop-blur-lg">
          <VisuallyHidden.Root asChild>
            <Dialog.Title>SUWO</Dialog.Title>
          </VisuallyHidden.Root>

          <Dialog.Close className="self-end">
            <XMarkIcon className="h-8 w-8 stroke-gray-100 stroke-1" />
          </Dialog.Close>

          <div className="flex flex-col items-center gap-6">
            <NavbarLink href="/about" onClick={close} className="text-2xl">
              About
            </NavbarLink>
            <NavbarLink href="/history" onClick={close} className="text-2xl">
              History
            </NavbarLink>
            <NavbarLink href="/join" onClick={close} className="text-2xl">
              Join
            </NavbarLink>
          </div>

          <div className="flex flex-row justify-center gap-4">
            <a
              href="https://www.youtube.com/user/SydneyUniWindOrch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon className="h-10 w-10 stroke-gray-100 stroke-1" />
            </a>
            <a
              href="https://www.facebook.com/sydneyuniversitywindorchestra"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="h-10 w-10 stroke-gray-100 stroke-1" />
            </a>
            <a
              href="https://www.instagram.com/suwo.syd/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="h-10 w-10 stroke-gray-100 stroke-1" />
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
