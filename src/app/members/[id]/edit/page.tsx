import { notFound, redirect } from 'next/navigation'

import { NavigationBar } from '@/components/ui/navigation_bar'
import { getInstruments } from '@/lib/db/instruments/get'
import { getMemberByID } from '@/lib/db/member/get'
import { getSession } from '@/lib/db/session'
import { Member } from '@/lib/db/types'
import { Params } from '@/lib/types'

import { EditInstrumentForm } from './edit_instrument_form'

type PageProps = {
  params: Params<Pick<Member, 'id'>>
}

export default async function Page({ params }: PageProps) {
  const { id: idParam } = await params

  if (!idParam) {
    notFound()
  }

  const id = parseInt(decodeURIComponent(idParam))

  const session = await getSession()

  if (!session.isAuth) {
    redirect(`/login`)
  }

  if (session.id !== id) {
    redirect(`/members/${id}`)
  }

  const { instrument } = await getMemberByID(id)
  const instruments = await getInstruments()

  return (
    <main className="prose mx-auto flex w-full max-w-screen-sm flex-col gap-6">
      <NavigationBar
        parent={{
          title: `Back to Profile`,
          href: `/members/${id}`,
        }}
        title="Edit Profile"
      />

      <div className="flex flex-col gap-4">
        <EditInstrumentForm instrument={instrument} instruments={instruments} />
      </div>
    </main>
  )
}
