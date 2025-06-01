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
        'rounded-lg px-4 py-2 text-lg font-bold transition-colors',
        'hover:bg-primary-4 hover:text-primary-2',
        'focus:bg-primary-4 focus:text-primary-2 focus:outline-none',
        isActive && 'bg-primary-4 text-primary-2',
        className,
      )}
    >
      {children}
    </Link>
  )
}
