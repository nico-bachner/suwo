import { notFound } from 'next/navigation'

import { Member } from '@/db/types'
import { getMemberByID } from '@/lib/get_member'
import { Params } from '@/types/next'

type PageProps = {
  params: Params<Pick<Member, 'id'>>
}

export default async function Page({ params }: PageProps) {
  const { id: idParam } = await params

  if (!idParam) {
    notFound()
  }

  const id = parseInt(decodeURIComponent(idParam))

  const { given_name, family_name, instrument } = await getMemberByID(id)

  return (
    <main className="prose">
      <h1>
        {given_name} {family_name}
      </h1>

      {/* TODO: Auth protected route */}
      {/* <p>{email}</p> */}

      {/* <p>{usu}</p> */}

      <p>{instrument}</p>
    </main>
  )
}
