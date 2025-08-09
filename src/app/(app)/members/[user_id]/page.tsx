import z from 'zod'

import { ProfileScreen } from '@/features/profile/profile_screen'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ params }: PageFileProps) {
  const { user_id } = z
    .object({
      user_id: z.uuid(),
    })
    .parse(await params)

  return <ProfileScreen user_id={user_id} />
}
