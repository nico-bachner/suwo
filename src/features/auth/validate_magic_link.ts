import { notFound, redirect } from 'next/navigation'
import z from 'zod'

import { routes } from '@/routes'
import { APIRoute } from '@/utils/next_types'
import { prisma } from '@/utils/prisma'

import { createSession } from './session/server/create_session'

export const GET: APIRoute = async ({ nextUrl }, { params }) => {
  const { data, success } = z
    .object({
      user_id: z.uuidv4(),
    })
    .safeParse(await params)

  if (!success) {
    return notFound()
  }

  const token = nextUrl.searchParams.get('token')

  if (!token) {
    return Response.json({ message: 'Please provide a token' })
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      user_id: data.user_id,
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
