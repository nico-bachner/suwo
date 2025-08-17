'use client'

import {
  BookOpenIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  CogIcon,
  UserIcon,
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
  const { data: session } = useQuery(queries.SESSION())
  const { data: currentWeek } = useQuery(queries.CURRENT_WEEK())

  return (
    <nav
      className={cn(
        'bg-neutral-5/20 border-neutral-2/20 rounded-full border backdrop-blur',
        'h-16',
        'flex flex-row items-center',
        className,
      )}
    >
      <TabBarLink href={routes.CALENDAR()} icon={CalendarDaysIcon}>
        Calendar
      </TabBarLink>

      <Divider orientation="vertical" className="h-1/2" />

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

      <Divider orientation="vertical" className="h-1/2" />

      {session ? (
        <TabBarLink href={routes.HISTORY()} icon={UserIcon}>
          Profile
        </TabBarLink>
      ) : (
        <TabBarLink href={routes.MEMBERS()} icon={UsersIcon}>
          Members
        </TabBarLink>
      )}

      <Divider orientation="vertical" className="h-1/2" />

      {session ? (
        <TabBarLink href={routes.SETTINGS()} icon={CogIcon}>
          Settings
        </TabBarLink>
      ) : (
        <TabBarLink href={routes.HISTORY()} icon={BookOpenIcon}>
          History
        </TabBarLink>
      )}
    </nav>
  )
}
