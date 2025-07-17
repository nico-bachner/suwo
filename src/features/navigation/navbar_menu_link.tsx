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

  const isActive = pathname.split('/')[1] === href.split('/')[1]

  return (
    <Link href={href} className={cn('text-xl', isActive && 'text-primary-2')}>
      {children}
    </Link>
  )
}
