import { UserHomePage } from '@/lib/pages/user_home_page'

export default async function Page({ params }: PageProps<'/[id]'>) {
  const { id } = await params

  return <UserHomePage id={id} />
}
