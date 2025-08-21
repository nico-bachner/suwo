import { useQuery } from '@tanstack/react-query'

import { queries } from '@/lib/queries'
import { Profile } from '@/lib/validators/profile_validator'

type ProfileInstrumentsProps = {
  profile: Profile
  className?: string
}

export const ProfileInstruments = ({
  profile,
  className,
}: ProfileInstrumentsProps) => {
  const { data: instruments } = useQuery(queries.INSTRUMENTS())

  if (!instruments) {
    return null
  }

  if (profile.instruments.length === 0) {
    return <p className={className}>Non-playing member</p>
  }

  return (
    <p className={className}>
      {instruments
        .filter((instrument) => profile.instruments.includes(instrument.id))
        .map((instrument) => instrument.name)
        .join(', ')}
    </p>
  )
}
