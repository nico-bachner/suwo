'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

type NavbarLinkProps = {
  children: ReactNode
  href: string
}

export const NavbarLink = ({ children, href }: NavbarLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname.split('/')[1] === href.split('/')[1]

  return (
    <Link
      href={href}
      className={cn(
        'text-lg font-bold transition-transform hover:scale-110 focus:scale-110 focus:outline-none',
        isActive && 'text-primary-2',
      )}
    >
      {children}
    </Link>
  )
}
