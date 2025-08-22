import { usePathname } from 'next/navigation'

export const useIsActive = (href: string): boolean => {
  const pathname = usePathname()

  if (href === '/') {
    return pathname === '/'
  }

  return pathname.includes(href)
}
