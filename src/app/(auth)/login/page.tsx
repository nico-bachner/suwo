import { LoginScreen } from '@/features/auth/login_screen'
import { LoginScreenSearchParamsValidator } from '@/features/auth/login_screen_search_params_validator'
import { PageProps } from '@/types'

export default async function Page({ searchParams }: PageProps) {
  const { data } = LoginScreenSearchParamsValidator.safeParse(
    await searchParams,
  )

  return <LoginScreen method={data?.method} />
}
