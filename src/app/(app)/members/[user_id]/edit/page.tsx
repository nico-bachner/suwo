import { ProfileEditPage } from '@/lib/pages/profile_edit_page'
import { ProfileValidator } from '@/lib/validators/profile_validator'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ params }: PageFileProps) {
  const { user_id } = ProfileValidator.pick({ user_id: true }).parse(
    await params,
  )

  return <ProfileEditPage user_id={user_id} />
}
