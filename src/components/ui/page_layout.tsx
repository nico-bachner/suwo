import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from 'radix-ui'

import { NAV_LINKS, NAV_SOCIAL_LINKS } from '@/config'
import logo from '@/images/logo.png'
import { getSession } from '@/lib/auth/session'
import { cn } from '@/lib/cn'

import { Menu } from '../client/menu'
import { NavbarLink } from '../client/navbar_link'
import { Button } from './button'
import { SocialLink } from './social_link'

type PageLayoutProps = {
  children?: React.ReactNode
  parent?: {
    title: string
    href: string
  }
  title: string
  subtitle?: string
  action?: React.ReactNode
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
  const { isAuth, id } = await getSession()

  return (
    <div
      className={cn(
        'mx-auto flex min-h-svh w-full max-w-screen-sm flex-1 flex-col items-stretch',
        'lg:max-w-screen-lg lg:flex-row lg:justify-between',
      )}
    >
      <nav className="flex flex-col gap-8 p-6 lg:sticky lg:top-0 lg:max-h-svh lg:w-80">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-4 bg-gray-950">
            <Link href="/">
              <Image src={logo} alt="The SUWO logo" className="h-12 w-12" />
            </Link>

            <Menu isAuth={isAuth} className="lg:hidden" />
          </div>

          <div className="-mx-2 flex flex-row items-center justify-between gap-2">
            {parent && (
              <Link
                href={parent.href}
                className="flex cursor-pointer flex-row items-center rounded-full transition-colors select-none hover:bg-gray-900 focus:bg-gray-900 focus:outline-none"
              >
                <ChevronLeftIcon className="box-content h-6 w-6 stroke-gray-300 p-3" />

                <span className="py-2 pr-6 text-gray-300">{parent.title}</span>
              </Link>
            )}

            {action}
          </div>

          <h1 className="font-serif text-3xl font-extrabold sm:text-4xl">
            <span className="text-gray-100">{title}</span>
            <br />
            <span className="text-gray-500">{subtitle}</span>
          </h1>
        </div>

        {id ? (
          <div className="flex flex-row gap-2 max-lg:hidden">
            <Button asChild variant="secondary" className="flex-1">
              <Link href={`/members/${id}`}>My Profile</Link>
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

        <div className="flex flex-col gap-1 max-lg:hidden">
          {NAV_LINKS.map(({ href, label }) => (
            <NavbarLink key={href} href={href}>
              {label}
            </NavbarLink>
          ))}
        </div>

        <div className="flex flex-row items-center gap-4 max-lg:hidden">
          {NAV_SOCIAL_LINKS.map(({ href, icon }) => (
            <SocialLink key={href} icon={icon} href={href} />
          ))}
        </div>
      </nav>

      <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col gap-12 px-6 pt-2 pb-12 lg:pt-12">
        <main className={cn('flex-1', className)}>{children}</main>

        <Separator.Root className="h-px w-full bg-gray-700" />

        <section className="flex flex-col items-center gap-4">
          <p>Follow our socials</p>

          <div className="flex flex-row items-center gap-4">
            {NAV_SOCIAL_LINKS.map(({ href, icon }) => (
              <SocialLink key={href} icon={icon} href={href} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
