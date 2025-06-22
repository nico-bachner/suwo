import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { IMAGES, NAV_LINKS, NAV_SOCIAL_LINKS } from '@/config'
import { Icon } from '@/design_system/icon'
import { getSession } from '@/lib/auth/session'
import { cn } from '@/utils/cn'

import { Button } from '../../design_system/button'
import { Divider } from '../../design_system/divider'
import { MobileMenu } from '../client/menu'
import { NavbarLink } from '../client/navbar_link'

type PageLayoutProps = {
  children?: ReactNode
  parent?: {
    title: string
    href: string
  }
  title?: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export const PageLayout = async ({
  children,
  parent,
  title,
  subtitle,
  action,
  className,
}: PageLayoutProps) => {
  const { id } = await getSession()

  return (
    <div
      className={cn(
        'mx-auto flex min-h-svh w-full max-w-screen-sm flex-1 flex-col items-stretch',
        'lg:max-w-screen-lg lg:flex-row lg:justify-between',
      )}
    >
      <nav className="flex flex-col gap-8 overflow-y-scroll p-6 lg:sticky lg:top-0 lg:h-screen lg:max-h-svh lg:w-80">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-4 bg-gray-950">
            <Link href="/">
              <Image {...IMAGES.ICON} className="h-12 w-12" />
            </Link>

            <MobileMenu userId={id ?? undefined} />
          </div>

          <div className="-mx-2 flex flex-row items-center justify-between gap-2">
            {parent && (
              <Link
                href={parent.href}
                className="flex cursor-pointer flex-row items-center rounded-full p-2 text-gray-300 transition-colors select-none hover:text-gray-100 focus:text-gray-100 focus:outline-none"
              >
                <ChevronLeftIcon className="h-6 w-6" />

                <span className="px-2 font-medium">{parent.title}</span>
              </Link>
            )}

            {action}
          </div>

          <h1 className="font-serif text-3xl font-bold sm:text-4xl">
            <span className="text-gray-100">{title}</span>
            <br />
            <span className="text-gray-500">{subtitle}</span>
          </h1>
        </div>

        {id ? (
          <div className="flex flex-row gap-2 max-lg:hidden">
            <Button asChild variant="secondary" className="flex-1">
              <Link href={`/members/${id}`}>Profile</Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1">
              <Link href="/settings">Settings</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-row gap-2 max-lg:hidden">
            <Button asChild variant="secondary" className="flex-1">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild variant="primary" className="flex-1">
              <Link href="/join">Join</Link>
            </Button>
          </div>
        )}

        <div className="flex flex-1 flex-col gap-1 max-lg:hidden">
          {NAV_LINKS.map(({ href, label }) => (
            <NavbarLink key={href} href={href}>
              {label}
            </NavbarLink>
          ))}
        </div>

        <Divider className="max-lg:hidden" />

        <div className="flex flex-row items-center justify-center gap-6 max-lg:hidden">
          {NAV_SOCIAL_LINKS.map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              <Icon
                icon={icon}
                size="md"
                className="stroke-neutral-2 stroke-1"
              />
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col gap-12 px-6 pt-2 pb-12 lg:pt-12">
        <main className={cn('flex-1', className)}>{children}</main>

        <Divider className="lg:hidden" />

        <section className="flex flex-col items-center gap-4 lg:hidden">
          <p>Follow our socials</p>

          <div className="flex flex-row items-center gap-4">
            {NAV_SOCIAL_LINKS.map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon={icon}
                  size="md"
                  className="stroke-neutral-2 stroke-1"
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
