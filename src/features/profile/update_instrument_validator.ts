import z from 'zod'

import { InstrumentNameValidator } from '@/validators/instrument_name'

export const UpdateInstrumentValidator = z.object({
  instrument_name: InstrumentNameValidator,
})
