import { getQueryBuilder } from "../query"
import { PracticePart } from "../types"

export const addPracticePartToDB = async (practicePart: PracticePart) => {
  const sql = getQueryBuilder()

  await sql`
    INSERT INTO practice_parts (piece, instrument, url)
    VALUES (${practicePart.piece}, ${practicePart.instrument}, ${practicePart.url})
  `
    return practicePart
}