'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

type NavbarLinkProps = {
  children: React.ReactNode
  href: string
  className?: string
}

export const NavbarLink = ({ children, href, className }: NavbarLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname.split('/')[1] === href.split('/')[1]

  return (
    <Link
      href={href}
      className={cn(
        'rounded-lg px-4 py-2 text-lg font-bold text-gray-300 hover:bg-gray-900 hover:text-gray-100 focus:bg-gray-900 focus:outline-none',
        isActive && 'bg-gray-900 text-gray-100',
        className,
      )}
    >
      {children}
    </Link>
  )
}
