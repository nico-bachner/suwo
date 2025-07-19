import { API_INDENT_SIZE } from '@/config'

import { StatusCode } from './status_code'
import { JSONResponse } from './types'

/**
 * Creates a standard HTTP Response based on the provided type-safe response
 * object. Handles different status codes and formats the response accordingly.
 *
 * @param response - A type-safe response object containing the response status,
 *   along with data or an error message, depending on the status code.
 */
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
      return new Response(response.error, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      })
  }
}
