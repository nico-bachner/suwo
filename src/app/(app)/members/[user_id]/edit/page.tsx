import { ProfileDTOValidator } from '@/lib/dtos/profile_dto_validator'
import { ProfileEditPage } from '@/lib/pages/profile_edit_page'
import { PageFileProps } from '@/utils/next_types'

export default async function Page({ params }: PageFileProps) {
  const { user_id } = ProfileDTOValidator.pick({ user_id: true }).parse(
    await params,
  )

  return <ProfileEditPage user_id={user_id} />
}
