'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentType, SVGProps } from 'react'

import { cn } from '@/utils/cn'

type TabBarLinkProps = {
  children: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const TabBarLink = ({ children, href, icon: Icon }: TabBarLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-1 p-2',
      )}
    >
      <Icon
        className={cn(
          'size-6',
          isActive ? 'stroke-primary-2' : 'stroke-neutral-2',
        )}
      />

      <p
        className={cn(
          'text-xs font-bold',
          isActive ? 'text-primary-2' : 'text-neutral-2',
        )}
      >
        {children}
      </p>
    </Link>
  )
}
