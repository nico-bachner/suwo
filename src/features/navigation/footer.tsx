'use client'

import { useQuery } from '@tanstack/react-query'

import { SOCIAL_LINKS } from '@/config'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manipulation'

import { FooterLink } from './footer_link'

type FooterProps = {
  className?: string
}

export const Footer = ({ className }: FooterProps) => {
  const { data: currentWeek } = useQuery(queries.CURRENT_WEEK())

  return (
    <div
      className={cn(
        'border-neutral-5/80 bg-neutral-7/80 border-t py-24 backdrop-blur',
        className,
      )}
    >
      <footer
        className={cn(
          'grid grid-cols-3 gap-x-8 gap-y-8 sm:grid-cols-5 sm:gap-y-16',
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

        <div className="col-span-3 flex flex-col gap-2 text-right sm:col-span-2">
          <address>
            Holme Building (A09), Science Rd, The University of Sydney, NSW 2006
          </address>

          <p>
            We acknowledge the Gadigal people of the Eora Nation as the
            Traditional Custodians of the land on which we hold rehearsals, and
            pay our respects to Elders past, present and emerging.
          </p>
        </div>

        <p className="col-span-3 sm:col-span-2">
          SUWO is supported by the{' '}
          <a
            href="https://usu.edu.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-2 outline-none hover:underline focus:underline"
          >
            University of Sydney Union
          </a>{' '}
          Clubs and Societies program, as well as the University of
          Sydney&apos;s{' '}
          <a
            href="https://www.standrewscollege.edu.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-2 outline-none hover:underline focus:underline"
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
              className="text-primary-2 outline-none hover:underline focus:underline"
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
