import { fetchCurrentWeek } from '@/features/usyd_api_wrapper/fetch_current_week'
import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'

export const GET = async () =>
  createResponse({
    status: StatusCode.OK,
    data: await fetchCurrentWeek(),
  })
