import { Metadata } from 'next'
import Link from 'next/link'

import { PageLayout } from '@/components/ui/page_layout'
import { getHistory } from '@/lib/notion/get_history'
import { getPageMetadata } from '@/lib/notion/get_metadata'

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata()

export default async function Page() {
  const { title } = await getPageMetadata()
  const data = await getHistory()

  return (
    <PageLayout title={title} className="flex flex-col items-center">
      {data
        .map(
          ({ properties }) =>
            properties['Year'].type == 'number' && properties['Year'].number,
        )
        .filter((number) => number)
        .join(' - ')
        .split(' ')
        .map((value, index) =>
          value == '-' ? (
            <hr key={index} className="h-12 w-px bg-gray-100" />
          ) : (
            <Link
              key={value}
              href={`/history/${value}`}
              className="p-1 text-xl"
            >
              {value}
            </Link>
          ),
        )}
    </PageLayout>
  )
}
