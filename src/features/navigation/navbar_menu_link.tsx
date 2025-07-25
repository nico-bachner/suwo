'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

type NavbarMenuLinkProps = {
  children: ReactNode
  href: string
}

export const NavbarMenuLink = ({ children, href }: NavbarMenuLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'text-xl hover:underline focus:underline focus:outline-none',
        isActive && 'text-primary-2',
      )}
    >
      {children}
    </Link>
  )
}
