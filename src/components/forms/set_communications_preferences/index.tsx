import { getSession } from '@/lib/auth/session/get_session'
import prisma from '@/lib/prisma'

import { SetCommunicationsPreferencesForm } from './form'

export const SetCommunicationsPreferences = async () => {
  const { id } = await getSession()

  if (!id) {
    return null
  }

  const mailingListRecipient = await prisma.mailingListRecipient.findUnique({
    where: {
      user_id: id,
    },
  })

  return (
    <SetCommunicationsPreferencesForm
      isMailingListRecipient={Boolean(mailingListRecipient)}
    />
  )
}
