import { getMember } from '@/lib/db/member/get_member'

import { SetCommunicationsPreferencesForm } from './form'

export const SetCommunicationsPreferences = async () => {
  const { mailing_list } = await getMember()

  return <SetCommunicationsPreferencesForm mailing_list={mailing_list} />
}
