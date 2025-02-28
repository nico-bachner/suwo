import { Metadata } from 'next'
import Link from 'next/link'

import { getHistory } from './get_history'
import { getPageMetadata } from './get_metadata'

export const generateMetadata = async (): Promise<Metadata> =>
  await getPageMetadata()

export default async function Page() {
  const { title, description } = await getPageMetadata()
  const data = await getHistory()

  return (
    <main className="flex flex-col items-center gap-20">
      <div className="prose text-center">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="flex flex-col items-center">
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
      </div>
    </main>
  )
}
