import { notFound, redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { createSession } from '@/lib/auth/session'
import { VerificationToken } from '@/lib/db/types'
import { verifyToken } from '@/lib/db/verification_token/verify_token'
import { Params } from '@/lib/types'

type PageProps = {
  params: Params<Pick<VerificationToken, 'member'>>
}

export const GET = async (req: NextRequest, { params }: PageProps) => {
  const { member } = await params

  if (!member) {
    return notFound()
  }

  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return Response.json({ message: 'Please provide a token' })
  }

  const isValidToken = await verifyToken(token)

  if (!isValidToken) {
    return Response.json({ message: 'Invalid token' })
  }

  await createSession(parseInt(member))

  redirect(`/members/${member}/edit`)
}
