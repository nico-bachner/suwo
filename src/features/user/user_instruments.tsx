import { useQuery } from '@tanstack/react-query'

import { UserDTO } from '@/lib/dtos/user_dto_validator'
import { queries } from '@/lib/queries'

type UserInstrumentsProps = {
  user: UserDTO
  className?: string
}

export const UserInstruments = ({ user, className }: UserInstrumentsProps) => {
  const { data: instruments } = useQuery(queries.INSTRUMENTS())

  if (!instruments) {
    return null
  }

  if (user.instruments.length === 0) {
    return <p className={className}>Non-playing member</p>
  }

  return (
    <p className={className}>
      {instruments
        .filter((instrument) => user.instruments.includes(instrument.id))
        .map((instrument) => instrument.name)
        .join(', ')}
    </p>
  )
}
