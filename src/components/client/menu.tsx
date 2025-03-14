'use client'

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, VisuallyHidden } from 'radix-ui'
import { useState } from 'react'

import { SocialLink } from '@/components/ui/social_link'
import { NAV_LINKS, SOCIAL_LINKS } from '@/config'
import { cn } from '@/lib/cn'

type MenuProps = {
  className?: string
}

export const Menu = ({ className }: MenuProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => {
                  setOpen(false)
                }}
                className={cn(
                  'text-xl',
                  pathname.split('/')[1] == href.split('/')[1]
                    ? 'text-amber-300'
                    : 'text-gray-300 hover:text-gray-100',
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-row items-center gap-4 self-center">
            {SOCIAL_LINKS.map(({ href, icon }) => (
              <SocialLink key={href} icon={icon} href={href} size="lg" />
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
