import { ProfileDTOValidator } from '@/lib/dtos/profile_dto_validator'
import { ProfilePage } from '@/lib/pages/profile_page'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ params }: PageFileProps) {
  const { user_id } = ProfileDTOValidator.pick({ user_id: true }).parse(
    await params,
  )

  return <ProfilePage user_id={user_id} />
}
