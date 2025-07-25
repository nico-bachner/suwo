'use client'

import { useQuery } from '@tanstack/react-query'

import { SOCIAL_LINKS } from '@/config'
import { Container } from '@/design_system/container'
import { Divider } from '@/design_system/divider'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manupulation'

import { FooterLink } from './footer_link'

export const Footer = () => {
  const { data: currentWeek } = useQuery(queries.CURRENT_WEEK())

  return (
    <Container size="md" className="flex flex-col gap-16 px-4 pb-24">
      <Divider />

      <footer className="flex flex-col gap-12 sm:flex-row">
        <div className="flex flex-2 flex-row gap-8">
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-neutral-1 font-bold">The Club</p>
            <FooterLink href={routes.HOME()}>About Us</FooterLink>
            <FooterLink href={routes.HISTORY()}>Our History</FooterLink>
            <FooterLink href={routes.MEMBERS()}>Our Members</FooterLink>
          </div>

          <div className="flex flex-1 flex-col gap-2">
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

          <div className="flex flex-1 flex-col gap-2">
            <p className="text-neutral-1 font-bold">Our Socials</p>
            {SOCIAL_LINKS.map(({ href, title }) => (
              <FooterLink key={href} href={href} external>
                {title}
              </FooterLink>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 sm:text-right">
          <p>
            © {new Date().getFullYear()} The University of Sydney Wind
            Orchestra (SUWO). All rights reserved.
          </p>
          <address>
            Holme Building (A09), Science Rd, The University of Sydney, NSW 2006
          </address>
        </div>
      </footer>
    </Container>
  )
}
