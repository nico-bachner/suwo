import { StatusCode } from './status_code'

export type JSONResponse =
  | {
      status?: StatusCode.OK | StatusCode.Created
      body: {
        data: unknown
      }
    }
  | {
      status?:
        | StatusCode.BadRequest
        | StatusCode.Unauthorized
        | StatusCode.NotFound
      body: {
        error: string
      }
    }
