import { FacebookIcon } from '@/icons/Facebook'
import { InstagramIcon } from '@/icons/Instagram'
import { YouTubeIcon } from '@/icons/YouTube'
import { cn } from '@/lib/cn'

type NavbarProps = {
  className?: string
}

export const Footer = ({ className }: NavbarProps) => (
  <section
    className={cn(
      'mx-auto flex w-full max-w-screen-sm flex-col items-center gap-4 border-t border-gray-500 p-8',
      className,
    )}
  >
    <p>Follow our socials</p>

    <div className="flex flex-row items-center gap-4">
      <a
        href="https://www.youtube.com/user/SydneyUniWindOrch"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YouTubeIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
      </a>
      <a
        href="https://www.facebook.com/sydneyuniversitywindorchestra"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
      </a>
      <a
        href="https://www.instagram.com/suwo.syd/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon className="h-6 w-6 stroke-gray-300 stroke-1" />
      </a>
    </div>
  </section>
)
