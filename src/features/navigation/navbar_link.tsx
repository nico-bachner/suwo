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

  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'text-lg font-bold transition-transform outline-none hover:underline focus:underline',
        isActive && 'text-primary-2',
      )}
    >
      {children}
    </Link>
  )
}
