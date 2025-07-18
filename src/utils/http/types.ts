import { StatusCode } from './status_code'

export type JSONResponse =
  | {
      status: StatusCode.OK | StatusCode.Created
      data: unknown
    }
  | {
      status: StatusCode.NoContent
    }
  | {
      status:
        | StatusCode.BadRequest
        | StatusCode.Unauthorized
        | StatusCode.NotFound
        | StatusCode.InternalServerError
      error: string
    }
