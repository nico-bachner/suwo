import { PageLayout } from '@/components/server/page_layout'
import { getFullLibrary } from '@/features/library/get_library'
import { getPracticeParts } from '@/features/practice_parts/get_practice_part'
import { getInstruments } from '@/lib/db/instruments/get'

import AddPracticePartForm from './add_practice_part_form'

interface PageProps {
  searchParams?: {
    instrument?: string
  }
}

export default async function Page({ searchParams }: PageProps) {
  const instruments = await getInstruments()
  const library = await getFullLibrary()
  const practiceParts = await getPracticeParts()

  const selectedInstrument = searchParams?.instrument || instruments[0]?.name

  const pieceTitleMap = Object.fromEntries(
    library.map((lib) => [lib.id, lib.title]),
  )

  const filteredParts = practiceParts.filter(
    (part) => part.instrument === selectedInstrument,
  )

  return (
    <PageLayout title="Practice Parts" className="prose">
      <p>
        This page lists practice parts available in the SUWO library. Select an
        instrument to see the parts available for that instrument.
      </p>

      <form className="my-4" method="GET">
        <label className="mb-2 block font-semibold" htmlFor="instrument-select">
          Select Instrument:
        </label>
        <select
          id="instrument-select"
          name="instrument"
          defaultValue={selectedInstrument}
          className="rounded border border-gray-300 p-2"
        >
          {instruments.map((instrument) => (
            <option key={instrument.name} value={instrument.name}>
              {instrument.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="ml-2 rounded bg-gray-800 px-4 py-1 text-white"
        >
          Filter
        </button>
      </form>

      <div className="my-4 overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-amber-900 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">Piece Title</th>
              <th className="border px-4 py-2 text-left">Instrument</th>
              <th className="border px-4 py-2 text-left">URL</th>
            </tr>
          </thead>
          <tbody>
            {filteredParts.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-400">
                  No practice parts for this instrument.
                </td>
              </tr>
            ) : (
              filteredParts.map((part) => (
                <tr key={part.url} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    {pieceTitleMap[part.piece] || 'Unknown'}
                  </td>
                  <td className="border px-4 py-2">{part.instrument}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={part.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Only show if user has permission */}
      <AddPracticePartForm instruments={instruments} library={library} />
    </PageLayout>
  )
}
