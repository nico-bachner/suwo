import { ProfileEditPage } from '@/lib/pages/profile_edit_page'

export default async function Page({ params }: PageProps<'/members/[id]'>) {
  const { id } = await params

  return <ProfileEditPage id={id} />
}
