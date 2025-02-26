import Image from 'next/image'

import O_week from '@/images/O_week.png'

export const OWeekCTA = () => (
  <div className="grid gap-8 sm:grid-cols-3">
    <div className="flex flex-col items-center gap-4 sm:items-start">
      <p className="text-lg sm:text-xl">Come see us at the O-week stand!</p>

      <a
        href="https://usu.edu.au/clubs/wind-orchestra/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-gradient-to-br from-amber-700 to-yellow-700 px-4 py-2 text-lg font-semibold"
      >
        Join via USU
      </a>
    </div>

    <Image
      src={O_week}
      alt="The SUWO logo"
      className="h-auto w-full self-center sm:col-span-2 sm:col-start-1 sm:row-start-1"
    />
  </div>
)
