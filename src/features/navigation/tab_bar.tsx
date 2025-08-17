'use client'

import {
  BookOpenIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'

import { Divider } from '@/design_system/divider'
import { queries } from '@/lib/queries'
import { routes } from '@/routes'
import { cn } from '@/utils/cn'
import { getCurrentSemester, getCurrentYear } from '@/utils/date_manipulation'

import { TabBarLink } from './tab_bar_link'

type TabBarProps = {
  className?: string
}

export const TabBar = ({ className }: TabBarProps) => {
  const { data: currentWeek } = useQuery(queries.CURRENT_WEEK())

  return (
    <nav
      className={cn(
        'bg-neutral-5/20 border-neutral-2/20 rounded-full border backdrop-blur',
        'flex h-16 flex-row items-center px-2',
        className,
      )}
    >
      <TabBarLink href={routes.HISTORY()} icon={BookOpenIcon}>
        History
      </TabBarLink>

      <Divider orientation="vertical" className="h-2/3" />

      <TabBarLink href={routes.MEMBERS()} icon={UsersIcon}>
        Members
      </TabBarLink>

      <Divider orientation="vertical" className="h-2/3" />

      <TabBarLink href={routes.CALENDAR()} icon={CalendarDaysIcon}>
        Calendar
      </TabBarLink>

      <Divider orientation="vertical" className="h-2/3" />

      <TabBarLink
        href={
          currentWeek
            ? routes.WEEKLY_ATTENDANCES({
                year: getCurrentYear(),
                semester: getCurrentSemester(),
                week: currentWeek,
              })
            : routes.ATTENDANCES()
        }
        icon={ClipboardDocumentCheckIcon}
      >
        Attendance
      </TabBarLink>
    </nav>
  )
}
