'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

type FooterLinkProps = {
  children: ReactNode
  href: string
  external?: boolean
}

export const FooterLink = ({ children, href, external }: FooterLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname === href

  if (external) {
    return (
      <a
        href={href}
        className={cn(
          'text-lg hover:underline focus:underline focus:outline-none',
          isActive && 'text-primary-2',
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'text-lg hover:underline focus:underline focus:outline-none',
        isActive && 'text-primary-2',
      )}
    >
      {children}
    </Link>
  )
}
