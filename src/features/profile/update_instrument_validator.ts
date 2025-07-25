import z from 'zod'

import { InstrumentNameValidator } from '@/lib/validators/instrument_name'

export const UpdateInstrumentValidator = z.object({
  instrument_name: InstrumentNameValidator,
})
