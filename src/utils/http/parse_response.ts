import z from 'zod'

import { StatusCode } from './status_code'
import { JSONResponse } from './types'

/**
 * Parses the response from a fetch request and returns a structured
 * JSONResponse. Handles different status codes and extracts data or error
 * messages accordingly.
 *
 * @param response - The Response object from a fetch request.
 */
export const parseResponse = async (
  response: Response,
): Promise<JSONResponse> => {
  const { data: status, success } = z
    .enum(StatusCode)
    .safeParse(response.status)

  if (!success) {
    throw new Error(
      `Unexpected response status: ${response.status} - ${response.statusText}`,
    )
  }

  switch (status) {
    case StatusCode.OK:
    case StatusCode.Created:
      return {
        status,
        data: await response.json(),
      }
    case StatusCode.NoContent:
      return {
        status,
      }
    case StatusCode.BadRequest:
    case StatusCode.Unauthorized:
    case StatusCode.Forbidden:
    case StatusCode.NotFound:
    case StatusCode.InternalServerError: {
      const { error } = z
        .object({
          error: z.string(),
        })
        .parse(await response.json())

      return {
        status,
        error,
      }
    }
  }
}
