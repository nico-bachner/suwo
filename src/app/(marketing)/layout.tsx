import Image from 'next/image'

import ensemble from '@/features/marketing/ensemble.jpg'
import { NoAuditions } from '@/features/marketing/no_auditions'

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Image
        src={ensemble}
        alt="Sydney University Wind Orchestra"
        className="fixed inset-0 -z-10 size-full object-cover brightness-[0.3]"
      />

      {children}

      <NoAuditions />
    </>
  )
}
