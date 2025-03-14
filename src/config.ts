import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/icons'

export const MAX_WEEK = 13
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
    href: '/join',
    label: 'Join',
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
