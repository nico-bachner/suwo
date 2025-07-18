import { API_INDENT_SIZE } from '@/config'

import { StatusCode } from './status_code'
import { JSONResponse } from './types'

export const createResponse = (response: JSONResponse): Response => {
  switch (response.status) {
    case StatusCode.OK:
    case StatusCode.Created:
      return new Response(JSON.stringify(response, null, API_INDENT_SIZE), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    case StatusCode.NoContent:
      return new Response(null, {
        status: response.status,
      })
    case StatusCode.BadRequest:
    case StatusCode.Unauthorized:
    case StatusCode.NotFound:
    case StatusCode.InternalServerError:
      return new Response(
        JSON.stringify(response.error, null, API_INDENT_SIZE),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
  }
}
