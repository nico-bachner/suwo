import { getInstruments } from '@/lib/db/instruments/get'

import { CreateMemberForm } from './create_member_form'

export default async function Page() {
  const instruments = await getInstruments()

  return (
    <main className="prose flex w-full flex-col items-center gap-6">
      <h1>Sign Up</h1>

      <p>Please enter your details below</p>

      <CreateMemberForm instruments={instruments} />
    </main>
  )
}
