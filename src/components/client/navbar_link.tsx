'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

type NavbarLinkProps = {
  children: React.ReactNode
  href: string
  onClick?: () => void
  className?: string
}

export const NavbarLink = ({
  children,
  href,
  onClick,
  className,
}: NavbarLinkProps) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-gray-300 hover:text-gray-100',
        href == pathname && 'text-yellow-300 hover:text-yellow-100',
        className,
      )}
    >
      {children}
    </Link>
  )
}
