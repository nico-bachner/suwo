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
        body: await response.json(),
      }
    case 201:
      return {
        status: StatusCode.Created,
        body: await response.json(),
      }
    case 400:
      return {
        status: StatusCode.BadRequest,
        body: await response.json(),
      }
    case 401:
      return {
        status: StatusCode.Unauthorized,
        body: await response.json(),
      }
    case 404:
      return {
        status: StatusCode.NotFound,
        body: await response.json(),
      }
    default:
      return {
        body: {
          error: 'Could not parse response',
        },
      }
  }
}
