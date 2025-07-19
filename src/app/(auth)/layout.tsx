import { AuthLayout } from '@/features/auth/auth_layout'
import { LayoutFileProps } from '@/utils/next_types'

export default function Layout({ children }: LayoutFileProps) {
  return <AuthLayout>{children}</AuthLayout>
}
