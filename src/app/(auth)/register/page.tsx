import Link from 'next/link'

import { CreateMemberForm } from '@/components/forms/create_member/form'
import prisma from '@/lib/prisma'
import { routes } from '@/routes'

export default async function Page() {
  const instruments = await prisma.instrument.findMany()

  return (
    <div className="prose mx-auto max-w-screen-sm px-4 py-8">
      <h1>Register</h1>

      <CreateMemberForm instruments={instruments} />

      <p>
        Already have an account? <Link href={routes.LOGIN({})}>Log in</Link>{' '}
        instead
      </p>
    </div>
  )
}
