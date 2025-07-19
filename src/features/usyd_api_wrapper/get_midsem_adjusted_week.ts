export const getMidsemAdjustedWeek = (
  currentWeek: number,
  midsemStartDate: Date,
) => {
  const currentDate = new Date()

  if (currentDate.getTime() > midsemStartDate.getTime()) {
    return Math.floor(currentWeek)
  }

  return Math.ceil(currentWeek)
}
