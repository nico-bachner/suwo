import Image from 'next/image'

import logo from '@/images/logo_full.png'

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-screen-md flex-1 flex-col items-stretch justify-center gap-8">
      <Image
        src={logo}
        alt="The SUWO logo"
        className="h-20 w-[336px] self-center"
      />

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
