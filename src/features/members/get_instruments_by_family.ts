import { getInstruments } from '@/lib/db/instruments/get'
import { Instrument } from '@/lib/db/types'

export const getInstrumentsByFamily = async () => {
  const instruments = await getInstruments()

  const instrumentsByFamily = instruments.reduce<
    Record<Instrument['family'], Instrument[]>
  >((accInstrumentsByFamily, instrument) => {
    const familyExists = Object.keys(accInstrumentsByFamily).includes(
      instrument.family,
    )

    if (!familyExists) {
      return {
        ...accInstrumentsByFamily,
        [instrument.family]: [instrument],
      }
    }

    return {
      ...accInstrumentsByFamily,
      [instrument.family]: [
        ...accInstrumentsByFamily[instrument.family],
        instrument,
      ],
    }
  }, {})

  return instrumentsByFamily
}
