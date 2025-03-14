'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-amber-900 text-center hover:bg-amber-700 text-gray-300 hover:text-gray-100 focus:bg-amber-800 focus:outline-none',
  secondary:
    'bg-gray-900 text-center hover:bg-gray-800 text-gray-300 hover:text-gray-100 focus:bg-gray-800 focus:outline-none',
  tertiary:
    'hover:bg-gray-900 text-gray-300 hover:text-gray-100 focus:bg-gray-900 focus:outline-none',
}

type NavbarLinkProps = {
  children: React.ReactNode
  variant: keyof typeof variants
  href: string
  className?: string
}

export const NavbarLink = ({
  children,
  variant,
  href,
  className,
}: NavbarLinkProps) => {
  const pathname = usePathname()

  const topLevelPath = pathname.split('/')[1]
  const topLevelHref = href.split('/')[1]

  return (
    <Link
      href={href}
      className={cn(
        'rounded-lg px-4 py-2 text-lg font-bold',
        // topLevelHref == topLevelPath && 'bg-gray-900 text-gray-100',
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  )
}
