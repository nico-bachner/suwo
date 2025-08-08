import Link from 'next/link'
import { Fragment } from 'react'
import z from 'zod'

import { FOUNDING_YEAR } from '@/config'
import { WEEKS } from '@/features/usyd_api_wrapper/config'
import { routes } from '@/routes'
import { Semester } from '@/utils/date_manipulation/semester'

export default function Page() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="prose">
      <h1>Attendance</h1>

      <p>
        Review past attendance sheets by following their corresponding links
        below.
      </p>

      {Array.from(
        { length: currentYear - FOUNDING_YEAR + 1 },
        (_, index) => currentYear - index,
      ).map((year) => (
        <Fragment key={year}>
          <h2 className="text-center">{year}</h2>

          <div className="flex flex-col gap-6 sm:flex-row">
            {Array.from({ length: 2 }, (_, index) => index + 1).map(
              (semester) => (
                <div className="prose" key={semester}>
                  <h3 className="text-center">Semester {semester}</h3>

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
                </div>
              ),
            )}
          </div>
        </Fragment>
      ))}
    </main>
  )
}
