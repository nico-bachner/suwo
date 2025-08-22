'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

import { cn } from '@/utils/cn'
import { useIsActive } from '@/utils/use_is_active'

type FooterLinkProps = {
  children: ReactNode
  href: string
  external?: boolean
}

export const FooterLink = ({ children, href, external }: FooterLinkProps) => {
  const isActive = useIsActive(href)

  if (external) {
    return (
      <a
        href={href}
        className={cn(
          'text-lg outline-none hover:underline focus:underline',
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
        'text-lg outline-none hover:underline focus:underline',
        isActive && 'text-primary-2',
      )}
    >
      {children}
    </Link>
  )
}
