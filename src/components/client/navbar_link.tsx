'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

type NavbarLinkProps = {
  children: React.ReactNode
  href: string
}

export const NavbarLink = ({ children, href }: NavbarLinkProps) => {
  const pathname = usePathname()

  const topLevelPath = pathname.split('/')[1]
  const topLevelHref = href.split('/')[1]

  return (
    <Link
      href={href}
      className={cn(
        'rounded-lg px-4 py-2 text-lg font-bold text-gray-300 hover:bg-gray-800 hover:text-gray-100',
        topLevelHref == topLevelPath && 'bg-gray-900 text-gray-100',
      )}
    >
      {children}
    </Link>
  )
}
