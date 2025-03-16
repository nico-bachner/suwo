import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/icons'

// for copy
export const FULL_NAME = 'The University of Sydney Wind Orchestra'
export const SHORT_NAME = 'Sydney University Wind Orchestra'
export const ACRONYM = 'SUWO'

// for Roll Call
export const MAX_WEEK = 13

// for Navigation
export const NAV_LINKS = [
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/history',
    label: 'History',
  },
  {
    href: '/members',
    label: 'Members',
  },
  {
    href: '/roll-call',
    label: 'Roll Call',
  },
  {
    href: `https://calendar.google.com/calendar/u/0?cid=${process.env.GOOGLE_CALENDAR_ID}`,
    label: 'Calendar',
  },
]
export const SOCIAL_LINKS = [
  {
    icon: YouTubeIcon,
    href: 'https://www.youtube.com/user/SydneyUniWindOrch',
  },
  {
    icon: FacebookIcon,
    href: 'https://www.facebook.com/sydneyuniversitywindorchestra',
  },
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/suwo.syd/',
  },
]
