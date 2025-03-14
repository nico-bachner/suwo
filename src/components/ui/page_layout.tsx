import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from 'radix-ui'

import { FacebookIcon } from '@/icons/Facebook'
import { InstagramIcon } from '@/icons/Instagram'
import { YouTubeIcon } from '@/icons/YouTube'
import logo from '@/images/logo.png'
import { cn } from '@/lib/cn'

import { Menu } from '../client/menu'
import { NavbarLink } from '../client/navbar_link'

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

export const PageLayout = ({
  children,
  parent,
  title,
  subtitle,
  action,
  className,
}: PageLayoutProps) => (
  <div
    className={cn(
      'mx-auto flex min-h-svh w-full max-w-screen-sm flex-1 flex-col items-stretch',
      'lg:max-w-screen-lg lg:flex-row lg:justify-between',
    )}
  >
    <nav className="flex flex-col gap-8 p-6 lg:sticky lg:top-0 lg:max-h-svh lg:w-64">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src={logo} alt="The SUWO logo" className="h-12 w-12" />
          </Link>

          <Menu className="lg:hidden" />
        </div>

        <div className="-mx-2 flex flex-row items-center justify-between gap-2">
          {parent && (
            <Link
              href={parent.href}
              className="flex cursor-pointer flex-row items-center rounded-full transition-colors select-none hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
            >
              <ChevronLeftIcon className="box-content h-6 w-6 stroke-gray-300 p-2" />

              <span className="py-2 pr-4 text-gray-300">{parent.title}</span>
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

      <div className="flex flex-col max-lg:hidden">
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/history">History</NavbarLink>
        <NavbarLink
          href={`https://calendar.google.com/calendar/u/0?cid=${process.env.GOOGLE_CALENDAR_ID}`}
        >
          Calendar
        </NavbarLink>
        <NavbarLink href="/members">Members</NavbarLink>
        <NavbarLink href="/roll-call">Roll Call</NavbarLink>
        <NavbarLink href="/join">Join</NavbarLink>
      </div>

      <div className="flex flex-row items-center gap-4 max-lg:hidden">
        <a
          href="https://www.youtube.com/user/SydneyUniWindOrch"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YouTubeIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
        </a>
        <a
          href="https://www.facebook.com/sydneyuniversitywindorchestra"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
        </a>
        <a
          href="https://www.instagram.com/suwo.syd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
        </a>
      </div>
    </nav>

    <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col gap-12 px-6 pt-2 pb-12 lg:pt-12">
      <main className={cn('flex-1', className)}>{children}</main>

      <Separator.Root className="h-px w-full bg-gray-700" />

      <section className="flex flex-col items-center gap-4">
        <p>Follow our socials</p>

        <div className="flex flex-row items-center gap-4">
          <a
            href="https://www.youtube.com/user/SydneyUniWindOrch"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
          </a>
          <a
            href="https://www.facebook.com/sydneyuniversitywindorchestra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
          </a>
          <a
            href="https://www.instagram.com/suwo.syd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
          </a>
        </div>
      </section>
    </div>
  </div>
)
