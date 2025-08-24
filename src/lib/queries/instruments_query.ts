import { UseQueryOptions } from '@tanstack/react-query'
import z from 'zod'

import { createURL } from '@/utils/http/create_url'
import { parseResponse } from '@/utils/http/parse_response'
import { StatusCode } from '@/utils/http/status_code'

import {
  InstrumentDTO,
  InstrumentDTOValidator,
} from '../dtos/instrument_dto_validator'

export const instrumentsQueryKey = () => ['instruments']

export const instrumentsQuery = (): UseQueryOptions<InstrumentDTO[]> => ({
  queryKey: instrumentsQueryKey(),
  queryFn: async ({ signal }) => {
    const response = await parseResponse(
      await fetch(createURL({ path: ['api', ...instrumentsQueryKey()] }), {
        signal,
      }),
    )

    switch (response.status) {
      case StatusCode.OK:
        return z.array(InstrumentDTOValidator).parse(response.data)
      default:
        throw new Error('Failed to fetch data')
    }
  },
})
