import * as z from 'zod/v4'

import { InstrumentNameValidator } from '@/lib/validators/instrument_name'

export const UpdateInstrumentValidator = z.object({
  instrument_name: InstrumentNameValidator,
})
