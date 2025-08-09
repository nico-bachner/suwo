import z from 'zod'

import { EditProfileScreen } from '@/features/profile/edit_profile_screen'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ params }: PageFileProps) {
  const { user_id } = z
    .object({
      user_id: z.uuid(),
    })
    .parse(await params)

  return <EditProfileScreen user_id={user_id} />
}
