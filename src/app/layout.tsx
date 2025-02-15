import { Bars3BottomRightIcon } from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
import { Limelight, Raleway } from 'next/font/google'
import Image from 'next/image'

import { cn } from '@/cn'
import logo from '@/images/logo.png'

import '../globals.css'

const fontSans = Raleway({
  variable: '--font-sans',
  subsets: ['latin'],
})

const fontSerif = Limelight({
  weight: '400',
  variable: '--font-serif',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SUWO',
  description: 'The Sydney University Wind Orchestra',
}

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

const Layout = ({ children }: LayoutProps) => (
  <html lang="en">
    <body
      className={cn(
        'flex min-h-screen flex-col items-center bg-gray-950 px-6 font-sans text-gray-100 antialiased',
        fontSans.variable,
        fontSerif.variable,
      )}
    >
      <nav className="sticky top-0 my-6 w-full bg-gray-950/50 p-4 backdrop-blur-lg sm:my-12">
        <nav className="mx-auto flex w-full max-w-screen-md flex-row items-center justify-between">
          <Image src={logo} alt="The SUWO logo" className="h-10 w-[167px]" />

          <Bars3BottomRightIcon className="h-8 w-8 stroke-gray-300" />
        </nav>
      </nav>

      {children}
    </body>
  </html>
)

export default Layout
