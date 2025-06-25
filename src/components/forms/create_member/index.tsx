import prisma from '@/lib/prisma'

import { CreateMemberForm } from './form'

export const CreateMember = async () => {
  const instruments = await prisma.instrument.findMany()

  return <CreateMemberForm instruments={instruments} />
}
