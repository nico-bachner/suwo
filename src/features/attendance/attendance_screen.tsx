'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import z from 'zod'

import { Container } from '@/design_system/container'
import { WEEKS } from '@/features/usyd_api_wrapper/config'
import { routes } from '@/routes'
import { getCurrentYear } from '@/utils/date_manupulation'
import { Semester } from '@/utils/date_manupulation/semester'

export const AttendanceScreen = () => {
  const currentYear = getCurrentYear()

  return (
    <Container size="sm" className="prose">
      <h1>Attendance</h1>

      <p>
        Review the {currentYear} attendance sheets by following their
        corresponding links below.
      </p>

      {Array.from({ length: 2 }, (_, index) => index + 1).map((semester) => (
        <Fragment key={semester}>
          <h2>Semester {semester}</h2>

          <div className="flex flex-row flex-wrap gap-1">
            {Array.from({ length: WEEKS }, (_, index) => index + 1).map(
              (week) => (
                <Link
                  key={week}
                  href={routes.WEEKLY_ATTENDANCES({
                    year: currentYear,
                    semester: z.enum(Semester).parse(semester),
                    week,
                  })}
                  className="bg-neutral-4 hover:bg-neutral-3 flex h-16 w-16 items-center justify-center rounded-md text-3xl transition-colors"
                >
                  {week}
                </Link>
              ),
            )}
          </div>
        </Fragment>
      ))}
    </Container>
  )
}
