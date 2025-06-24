import { getQueryBuilder } from "../query"
import { PracticePart, Table } from "../types"
export const getPracticePartsFromDB = async () => {
  const sql = getQueryBuilder()
    const practiceParts = await sql`
        SELECT *
        FROM practice_parts
        ORDER BY piece ASC
    `
    return practiceParts as Table<PracticePart>
}
