import { notFound, redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { LINKS } from '@/config'
import { createSession } from '@/lib/auth/session/create_session'
import { VerificationToken } from '@/lib/db/types'
import { verifyToken } from '@/lib/db/verification_token/verify_token'
import { NextParams } from '@/lib/next/types'

type PageProps = {
  params: NextParams<Pick<VerificationToken, 'member'>>
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

  const isValidToken = await verifyToken({
    member: parseInt(member, 10),
    token,
  })

  if (!isValidToken) {
    return Response.json({ message: 'Invalid token' })
  }

  await createSession(parseInt(member, 10))

  redirect(LINKS.SETTINGS.href)
}
