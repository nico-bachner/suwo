import { createResponse } from '@/utils/http/create_response'
import { StatusCode } from '@/utils/http/status_code'

import { fetchCurrentWeek } from './fetch_current_week'

export const GET = async () => {
  const currentWeek = await fetchCurrentWeek()

  return createResponse({
    status: StatusCode.OK,
    data: currentWeek,
  })
}
