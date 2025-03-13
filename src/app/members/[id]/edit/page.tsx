import { notFound, redirect } from 'next/navigation'

import { SubmitButton } from '@/components/ui/submit_button'
import { TextInput } from '@/components/ui/text_input'
import { getMemberByID } from '@/lib/db/member/get'
import { getSession } from '@/lib/db/session'
import { Member } from '@/lib/db/types'
import { Params } from '@/lib/types'

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

  const { given_name, family_name } = await getMemberByID(id)

  return (
    <main className="prose">
      <h1>Edit Profile</h1>

      <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-4">
        <form className="flex flex-row items-end gap-4">
          <TextInput
            defaultValue={given_name}
            name="given-name"
            label="Given Name"
            autoComplete="given-name"
            placeholder='e.g. "Ambrose"'
            className="flex-1"
          />

          <SubmitButton>Save</SubmitButton>
        </form>

        <form className="flex flex-row items-end gap-4">
          <TextInput
            defaultValue={family_name ?? undefined}
            name="family-name"
            label="Family Name"
            autoComplete="family-name"
            placeholder='e.g. "Phelps"'
            className="mx-auto w-full max-w-screen-sm"
          />

          <SubmitButton>Save</SubmitButton>
        </form>
      </div>
    </main>
  )
}
