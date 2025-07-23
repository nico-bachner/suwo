import { notFound } from 'next/navigation'
import z from 'zod'

import { ProfileScreen } from '@/features/profile/profile_screen'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ params }: PageFileProps) {
  const { data, success } = z
    .object({
      user_id: z.uuid(),
    })
    .safeParse(await params)

  if (!success) {
    notFound()
  }

  return <ProfileScreen {...data} />
}
