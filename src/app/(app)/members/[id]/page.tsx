import { ProfilePage } from '@/lib/pages/profile_page'

export default async function Page({ params }: PageProps<'/members/[id]'>) {
  const { id } = await params

  return <ProfilePage id={id} />
}
