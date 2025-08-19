import { ProfilePage } from '@/lib/pages/profile_page'
import { ProfileValidator } from '@/lib/validators/profile_validator'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ params }: PageFileProps) {
  const { user_id } = ProfileValidator.pick({ user_id: true }).parse(
    await params,
  )

  return <ProfilePage user_id={user_id} />
}
