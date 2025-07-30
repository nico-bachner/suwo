'use client'

import { useQuery } from '@tanstack/react-query'

import { queries } from '@/lib/queries'

export default function Page() {
  const {
    data: session,
    error: sessionError,
    isPending: isSessionPending,
  } = useQuery(queries.SESSION())
  const {
    data: equipment,
    error: equipmentError,
    isPending: isEquipmentPending,
  } = useQuery(queries.EQUIPMENT())

  if (isSessionPending || isEquipmentPending) {
    return (
      <main className="prose">
        <h1>Loading...</h1>
      </main>
    )
  }

  if (sessionError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{sessionError.message}</p>
      </main>
    )
  }

  if (equipmentError) {
    return (
      <main className="prose">
        <h1>Error</h1>
        <p>{equipmentError.message}</p>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="prose">
        <h1>Not logged in</h1>
        <p>Please log in to view this page.</p>
      </main>
    )
  }

  if (equipment.length === 0) {
    return (
      <main className="prose">
        <h1>Equipment</h1>
        <p>There are currently no equipment items available.</p>
      </main>
    )
  }

  return (
    <main className="prose">
      <h1>Equipment</h1>
      <ul>
        {equipment.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.inventory} in stock
            <p>{item.description || 'No description available.'}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
