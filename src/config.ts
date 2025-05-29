import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/icons'

// Resend
export const RESEND_DOMAIN = 'transactional.suwo.org.au'

// Notion pages
export const NOTION_HISTORY_DB_ID = '1a68056f6788801d8c00c5c62188d987'

// Google Calendar
export const GOOGLE_CALENDAR_ID = ''

// for copy
export const FULL_NAME = 'The University of Sydney Wind Orchestra'
export const SHORT_NAME = 'Sydney University Wind Orchestra'
export const ACRONYM = 'SUWO'

// for Roll Call
export const MAX_WEEK = 13

// for Navigation
export const LINKS = {
  HOME: {
    href: '/',
    label: 'Home',
  },
  ABOUT: {
    href: '/about',
    label: 'About',
  },
  HISTORY: {
    href: '/history',
    label: 'History',
  },
  MEMBERS: {
    href: '/members',
    label: 'Members',
  },
  ROLL_CALL: {
    href: '/roll-call',
    label: 'Roll Call',
  },
  CALENDAR: {
    href: `https://calendar.google.com/calendar/u/0?cid=${GOOGLE_CALENDAR_ID}`,
    label: 'Calendar',
  },
  SETTINGS: {
    href: '/settings',
    label: 'Settings',
  },
  LOG_IN: {
    href: '/login',
    label: 'Log In',
  },
  JOIN: {
    href: '/join',
    label: 'Join',
  },
}

export const SOCIAL_LINKS = {
  YOUTUBE: {
    icon: YouTubeIcon,
    href: 'https://www.youtube.com/user/SydneyUniWindOrch',
  },
  FACEBOOK: {
    icon: FacebookIcon,
    href: 'https://www.facebook.com/sydneyuniversitywindorchestra',
  },
  INSTAGRAM: {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/suwo.syd/',
  },
}

export const NAV_LINKS = [
  LINKS.HOME,
  LINKS.ABOUT,
  LINKS.HISTORY,
  LINKS.MEMBERS,
  LINKS.ROLL_CALL,
  LINKS.CALENDAR,
]

export const NAV_SOCIAL_LINKS = Object.values(SOCIAL_LINKS)
