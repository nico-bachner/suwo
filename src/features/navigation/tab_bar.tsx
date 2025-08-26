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

import { useCurrentEvent } from '../event/use_upcoming_event'
import { TabBarLink } from './tab_bar_link'

type TabBarProps = {
  className?: string
}

export const TabBar = ({ className }: TabBarProps) => {
  const { data: session } = useQuery(queries.SESSION())
  const currentEvent = useCurrentEvent()

  return (
    <nav
      className={cn(
        'bg-neutral-5/20 border-neutral-2/20 rounded-full border backdrop-blur',
        'h-16',
        'flex flex-row items-center',
        className,
      )}
    >
      {session ? (
        currentEvent && (
          <TabBarLink
            href={routes.EVENT_ATTENDEES(currentEvent.id)}
            icon={ClipboardDocumentCheckIcon}
          >
            Attendance
          </TabBarLink>
        )
      ) : (
        <TabBarLink href={routes.HISTORY()} icon={BookOpenIcon}>
          History
        </TabBarLink>
      )}

      <Divider orientation="vertical" className="h-1/2" />

      {session ? (
        <TabBarLink href={routes.EVENTS()} icon={CalendarDaysIcon}>
          Events
        </TabBarLink>
      ) : (
        <TabBarLink href={routes.PROFILES()} icon={UsersIcon}>
          Members
        </TabBarLink>
      )}

      <Divider orientation="vertical" className="h-1/2" />

      {session ? (
        <TabBarLink href={routes.PROFILE(session.user_id)} icon={UserIcon}>
          Profile
        </TabBarLink>
      ) : (
        <TabBarLink href={routes.EVENTS()} icon={CalendarDaysIcon}>
          Events
        </TabBarLink>
      )}

      <Divider orientation="vertical" className="h-1/2" />

      {session ? (
        <TabBarLink href={routes.SETTINGS()} icon={CogIcon}>
          Settings
        </TabBarLink>
      ) : (
        currentEvent && (
          <TabBarLink
            href={routes.EVENT_ATTENDEES(currentEvent.id)}
            icon={ClipboardDocumentCheckIcon}
          >
            Attendance
          </TabBarLink>
        )
      )}
    </nav>
  )
}
