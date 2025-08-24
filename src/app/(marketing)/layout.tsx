import Image from 'next/image'

import ensemble from '@/features/marketing/ensemble.jpg'

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Image
          src={ensemble}
          alt="Sydney University Wind Orchestra"
          className="h-full w-full object-cover brightness-[0.25]"
        />
      </div>

      {children}
    </>
  )
}
