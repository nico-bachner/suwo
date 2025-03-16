import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/icons'

// for copy
export const FULL_NAME = 'The University of Sydney Wind Orchestra'
export const SHORT_NAME = 'Sydney University Wind Orchestra'
export const ACRONYM = 'SUWO'

// for Roll Call
export const MAX_WEEK = 13

// for Navigation
export const LINKS = {
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
    href: `https://calendar.google.com/calendar/u/0?cid=${process.env.GOOGLE_CALENDAR_ID}`,
    label: 'Calendar',
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
  LINKS.ABOUT,
  LINKS.HISTORY,
  LINKS.MEMBERS,
  LINKS.ROLL_CALL,
  LINKS.CALENDAR,
]

export const NAV_SOCIAL_LINKS = Object.values(SOCIAL_LINKS)
