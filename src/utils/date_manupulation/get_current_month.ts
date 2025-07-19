import { z } from 'zod'

import { Month } from './month'

export const getCurrentMonth = () => {
  const { data: month, success } = z
    .enum(Month)
    .safeParse(new Date().getMonth())

  if (!success) {
    throw new Error('Invalid month')
  }

  return month
}
