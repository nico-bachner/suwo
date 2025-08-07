'use client'

import { useQuery } from '@tanstack/react-query'

import { SOCIAL_LINKS } from '@/config'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

import { FooterLink } from './footer_link'

type FooterProps = {
  className?: string
}

export const Footer = ({ className }: FooterProps) => {
  const { data: currentWeek } = useQuery(queries.CURRENT_WEEK())

  return (
    <div className={className}>
      <footer
        className={cn(
          'border-neutral-4 grid grid-cols-3 gap-x-8 gap-y-8 border-t pt-20 pb-24 sm:grid-cols-5 sm:gap-y-16',
          'mx-auto w-full max-w-screen-lg',
        )}
      >
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-neutral-1 text-lg font-bold">The Club</p>
          <FooterLink href={routes.HOME()}>About Us</FooterLink>
          <FooterLink href={routes.HISTORY()}>Our History</FooterLink>
          <FooterLink href={routes.MEMBERS()}>Our Members</FooterLink>
        </div>

        <div className="flex flex-1 flex-col gap-2 text-lg">
          <p className="text-neutral-1 font-bold">Members</p>
          <FooterLink href={routes.CALENDAR()}>Events Calendar</FooterLink>
          <FooterLink
            href={
              currentWeek
                ? routes.WEEKLY_ATTENDANCES({
                    year: getCurrentYear(),
                    semester: getCurrentSemester(),
                    week: currentWeek,
                  })
                : routes.ATTENDANCES()
            }
          >
            Attendance Sheet
          </FooterLink>
        </div>

        <div className="flex flex-1 flex-col gap-2 text-lg">
          <p className="text-neutral-1 font-bold">Our Socials</p>
          {SOCIAL_LINKS.map(({ href, title }) => (
            <FooterLink key={href} href={href} external>
              {title}
            </FooterLink>
          ))}
        </div>

        <address className="col-span-3 text-right sm:col-span-2">
          Holme Building (A09), Science Rd, The University of Sydney, NSW 2006
        </address>

        <p className="col-span-3 sm:col-span-2">
          SUWO is supported by the{' '}
          <a
            href="https://usu.edu.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-2 hover:underline focus:underline focus:outline-none"
          >
            University of Sydney Union
          </a>{' '}
          Clubs and Societies program, as well as the University of
          Sydney&apos;s{' '}
          <a
            href="https://www.standrewscollege.edu.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-2 hover:underline focus:underline focus:outline-none"
          >
            St Andrew&apos;s College
          </a>
          .
        </p>

        <div className="col-span-3 flex flex-col gap-2 text-right sm:col-span-2 sm:col-start-4">
          <p>
            © {new Date().getFullYear()} The University of Sydney Wind
            Orchestra (SUWO). All rights reserved.
          </p>
          <p>
            Developed by{' '}
            <a
              href="https://nicobachner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-2 hover:underline focus:underline focus:outline-none"
            >
              Nico Bachner
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
