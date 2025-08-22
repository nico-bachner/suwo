'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

import { cn } from '@/utils/cn'
import { useIsActive } from '@/utils/use_is_active'

type NavbarMenuLinkProps = {
  children: ReactNode
  href: string
}

export const NavbarMenuLink = ({ children, href }: NavbarMenuLinkProps) => {
  const isActive = useIsActive(href)

  return (
    <Link
      href={href}
      className={cn(
        'text-xl outline-none hover:underline focus:underline',
        isActive && 'text-primary-2',
      )}
    >
      {children}
    </Link>
  )
}
