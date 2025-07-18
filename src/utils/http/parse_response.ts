/* eslint-disable typescript/no-unsafe-assignment */
import { StatusCode } from './status_code'
import { JSONResponse } from './types'

export const parseResponse = async (
  response: Response,
): Promise<JSONResponse> => {
  switch (response.status) {
    case 200:
      return {
        status: StatusCode.OK,
        data: await response.json(),
      }
    case 201:
      return {
        status: StatusCode.Created,
        data: await response.json(),
      }
    case 204:
      return {
        status: StatusCode.NoContent,
      }
    case 400:
      return {
        status: StatusCode.BadRequest,
        error: await response.json(),
      }
    case 401:
      return {
        status: StatusCode.Unauthorized,
        error: await response.json(),
      }
    case 404:
      return {
        status: StatusCode.NotFound,
        error: await response.json(),
      }
    case 500:
      return {
        status: StatusCode.InternalServerError,
        error: await response.json(),
      }
    default:
      throw new Error(
        `Unexpected response status: ${response.status} - ${response.statusText}`,
      )
  }
}
