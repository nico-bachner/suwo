import Image from 'next/image'

import O_week from '@/images/O_week.png'

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-screen-md flex-1 flex-col items-stretch justify-center gap-8">
      <h1 className="text-center font-serif text-3xl sm:text-5xl">
        The University of Sydney Wind Orchestra
      </h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <p className="text-2xl">Come see us at the O-week stand!</p>

        <Image
          src={O_week}
          alt="The SUWO logo"
          className="h-auto w-full self-center sm:col-span-2 sm:col-start-1 sm:row-start-1"
        />
      </div>

      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Australia%2FSydney&hl=en_GB&mode=AGENDA&src=ZDM0ODM2MmRmMGQ4MWIxOTAxYjQxYTMxMWRlMmJiZWFmZmM4ZmJhOGFhMjdiN2MxMDEzMjgxZGIyNzZkY2NkNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23D81B60"
        className="h-[400px] w-full rounded-lg"
      />

      <a
        href="https://calendar.google.com/calendar/u/0?cid=ZDM0ODM2MmRmMGQ4MWIxOTAxYjQxYTMxMWRlMmJiZWFmZmM4ZmJhOGFhMjdiN2MxMDEzMjgxZGIyNzZkY2NkNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
        target="_blank"
        rel="noopener noreferrer"
        className="self-center rounded-md bg-gradient-to-br from-amber-700 to-yellow-700 px-4 py-2 text-lg font-semibold"
      >
        Subscribe to the SUWO calendar
      </a>
    </main>
  )
}
