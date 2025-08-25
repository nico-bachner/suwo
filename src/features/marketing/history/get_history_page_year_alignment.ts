export const getHistoryPageYearAlignment = (index: number) => {
  switch (index % 6) {
    case 0:
      return 'col-start-1 col-span-2 row-span-2 text-[min(20vw,240px)]'
    case 1:
    case 2:
      return 'col-start-3 text-[min(10vw,120px)]'
    case 3:
    case 4:
      return 'col-start-1 text-[min(10vw,120px)]'
    case 5:
      return 'col-start-2 col-span-2 row-span-2 text-[min(20vw,240px)]'
  }
}
