import Link from 'next/link'

import { PageLayout } from '@/components/ui/page_layout'
import { getInstruments } from '@/lib/db/instruments/get'

import { CreateMemberForm } from './create_member_form'

export default async function Page() {
  const instruments = await getInstruments()

  return (
    <PageLayout title="Join" className="flex flex-col gap-4">
      <CreateMemberForm instruments={instruments} />

      <p className="text-right text-sm text-gray-300">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-blue-500 hover:underline">
          Log in instead
        </Link>
      </p>
    </PageLayout>
  )
}
