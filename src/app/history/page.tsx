import Link from 'next/link'

import { getHistory } from './get_history'

export default async function Page() {
  const data = await getHistory()

  return (
    <main className="flex flex-col items-center">
      <div className="prose">
        <h1 className="text-center">{`SUWO's History`}</h1>
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
