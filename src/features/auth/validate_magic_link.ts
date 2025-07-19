import { notFound, redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { VerificationToken } from '@/generated/prisma'
import { NextParams } from '@/lib/next/types'
import { prisma } from '@/lib/prisma'
import { routes } from '@/routes'

import { createSession } from './session/server/create_session'

export const GET = async (
  { nextUrl }: NextRequest,
  {
    params,
  }: {
    params: NextParams<Pick<VerificationToken, 'user_id'>>
  },
) => {
  const { user_id } = await params

  if (!user_id) {
    return notFound()
  }

  const token = nextUrl.searchParams.get('token')

  if (!token) {
    return Response.json({ message: 'Please provide a token' })
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      user_id,
      token,
      created_at: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  })

  if (!verificationToken) {
    return Response.json({ message: 'Invalid token' })
  }

  await createSession({
    user_id: verificationToken.user_id,
  })

  redirect(routes.SETTINGS)
}
