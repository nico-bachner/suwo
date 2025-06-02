export const getCurrentSemester = () => {
  const month = new Date().getMonth()

  switch (month) {
    // Semester 1: February to June
    case 2: // February
    case 3: // March
    case 4: // April
    case 5: // May
    case 6: // June
      return 'S1'

    // Semester 2: July to November
    case 7: // July
    case 8: // August
    case 9: // September
    case 10: // October
    case 11: // November
      return 'S2'

    // Break periods: January and December
    default:
      return 'B'
  }
}
